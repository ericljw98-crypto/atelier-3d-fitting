/* ============================================================
   写实人体模块：加载 Mixamo 风格 GLB 人体，按模特档案做体型变形
   - 整体身高：根节点缩放
   - 胖瘦（BMI）：躯干骨骼 X/Z 缩放
   - 胸围：Chest/Spine2 缩放；腰围：Spine/Spine1；臀围：Hips
   - 肩宽：Shoulder 骨骼 X 缩放；臂长/腿长：对应骨骼 Y 缩放
   ============================================================ */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone as cloneSkeletonGraph } from 'three/addons/utils/SkeletonUtils.js';
import { DEFAULT_MODEL, FOOT_Y } from './body.js';

// 与主应用坐标系统一：1 单位 = 50cm，基准身高 170cm = 3.4 单位，脚底 y = FOOT_Y
const U = 1 / 50;

const MODEL_URL = 'models/female_real.glb';

let cachedScene = null;        // 缓存已解析的原始场景，避免重复请求
let cachedNativeHeight = null; // 原生模型高度（自动测量，不依赖硬编码）
let cachedNativeMinY = null;   // 原生模型脚底 y（模块级缓存，不能挂在单次 clone 上）

function cloneSkeleton(src) {
  // 必须用 SkeletonUtils.clone 才能正确复制蒙皮骨骼与网格的绑定关系
  const clone = cloneSkeletonGraph(src);
  clone.updateMatrixWorld(true);
  clone.traverse(o => { if (o.isMesh && o.skeleton) { o.skeleton.update(); } });
  clone.traverse(o => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
      o.frustumCulled = false; // 蒙皮模型包围盒可能不准，关闭视锥裁剪避免误剔除
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach(m => {
          if ('roughness' in m) m.roughness = 0.85;
          if ('metalness' in m) m.metalness = 0.0;
          m.side = THREE.DoubleSide;
          // 肤色：按用户要求改为亚洲人偏白；原 GLB 为偏红演示材质
          if (m.color) {
            const nm = (m.name || '').toLowerCase();
            // 两个材质都是人体：统一成亚洲偏白肤色，关节材质略深一点点
            m.color.set(nm.indexOf('joint') >= 0 ? 0xe8c3a5 : 0xf0cdb2);
          }
        });
      }
    }
  });
  return clone;
}

function loadModel() {
  if (cachedScene) return Promise.resolve(cachedScene);
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(MODEL_URL, gltf => { cachedScene = gltf.scene; resolve(gltf.scene); }, undefined, reject);
  });
}

/* ============================================================
   按用户真实照片还原外貌：
   - 黑色齐肩波波头（中短发、略偏分）
   - 细金属圆框眼镜
   配饰加入 figure（GLB 原生单位）坐标系。模型为静态站姿，
   头部不做动画，因此直接按头部包围盒定位即可稳定显示。
   原生单位：头中心 y≈1.68，头顶 y≈1.806，头半径≈0.115，面部朝 +Z。
   ============================================================ */
function addPortrait(figure) {
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.8, metalness: 0.0, side: THREE.DoubleSide });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x8a8172, roughness: 0.35, metalness: 0.75 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0xeaf4fa, roughness: 0.05, metalness: 0.0, transparent: true, opacity: 0.08, side: THREE.DoubleSide });

  const HY = 1.685;     // 头部中心高度
  const HR = 0.118;     // 头半径
  const g = new THREE.Group();

  // 头盖：覆盖头顶的球壳（上 62%）
  const cap = new THREE.Mesh(new THREE.SphereGeometry(HR * 1.06, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat);
  cap.position.set(0, HY + 0.022, -0.010);
  cap.scale.set(1.0, 0.95, 1.02);
  g.add(cap);

  // 波波头两侧发片：从头顶垂到下颌/齐肩，包住脸颊两侧
  [-1, 1].forEach(s => {
    const side = new THREE.Mesh(new THREE.SphereGeometry(HR, 20, 16), hairMat);
    side.position.set(s * HR * 0.80, HY - 0.05, -0.028);
    side.scale.set(0.48, 1.5, 0.86);
    g.add(side);
    // 齐肩发尾
    const tip = new THREE.Mesh(new THREE.SphereGeometry(HR * 0.72, 16, 12), hairMat);
    tip.position.set(s * HR * 0.84, HY - 0.21, -0.01);
    tip.scale.set(0.5, 1.05, 0.82);
    g.add(tip);
  });
  // 后脑发片
  const back = new THREE.Mesh(new THREE.SphereGeometry(HR, 20, 16), hairMat);
  back.position.set(0, HY - 0.025, -0.045);
  back.scale.set(1.0, 1.35, 0.66);
  g.add(back);
  // 偏分刘海：覆盖额头一侧
  const fringe = new THREE.Mesh(new THREE.SphereGeometry(HR * 0.98, 18, 14, 0, Math.PI * 1.2), hairMat);
  fringe.position.set(-0.012, HY + 0.075, HR * 0.34);
  fringe.scale.set(0.92, 0.30, 0.52);
  fringe.rotation.z = 0.14;
  g.add(fringe);

  // 金属圆框眼镜：位于眼睛前方
  const eyeY = HY + 0.015, eyeX = 0.052, lensR = 0.040, lensZ = HR * 1.0;
  [-1, 1].forEach(s => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(lensR, 0.0032, 8, 28), metalMat);
    ring.position.set(s * eyeX, eyeY, lensZ);
    g.add(ring);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(lensR * 0.97, 24), lensMat);
    lens.position.set(s * eyeX, eyeY, lensZ);
    g.add(lens);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.0026, 0.0026, 0.14, 6), metalMat);
    arm.rotation.x = Math.PI / 2;
    arm.position.set(s * (eyeX + lensR), eyeY + 0.004, lensZ - 0.065);
    g.add(arm);
  });
  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.0026, 0.0026, eyeX * 2 - lensR * 2 + 0.012, 6), metalMat);
  bridge.rotation.z = Math.PI / 2;
  bridge.position.set(0, eyeY + 0.01, lensZ);
  g.add(bridge);

  g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
  figure.add(g);
  return g;
}

/** 生成写实人体，返回 { group, applyProfile(model) } */
export async function buildRealBody(model) {
  const src = await loadModel();
  const group = new THREE.Group();
  const figure = cloneSkeleton(src);
  group.add(figure);

  // 按名字建立骨骼索引。兼容三种命名：
  //   mixamorig:Hips / mixamorigHips / mixamorig:Hips_01
  // 需去掉数字后缀，否则 LeftArm_09 之类无法被标准名索引到。
  const bones = {};
  figure.traverse(o => {
    if (o.isBone) {
      const short = o.name.replace(/^mixamorig:?/, '');
      bones[short] = o;                 // Head_06
      bones[o.name] = o;                // mixamorig:Head_06
      const noSuffix = short.replace(/_\d+$/, '');
      bones[noSuffix] = o;              // Head  ← 标准名
    }
  });

  // 记录骨骼初始缩放，便于每次重算
  const baseScale = {};
  Object.keys(bones).forEach(k => { baseScale[k] = bones[k].scale.clone(); });

  // 手臂自然下垂：Mixamo T-pose 的上臂沿 X 轴水平伸出，绕 Z 轴旋转使手臂垂向身体两侧。
  // 左臂(+X)向下需绕 Z 负向旋转，右臂(-X)向下需绕 Z 正向旋转。
  // 保留轻微外张（约 8°），避免手臂与躯干穿插。
  const DEG = Math.PI / 180;
  if (bones.LeftArm) { bones.LeftArm.rotation.set(0, 0, -82 * DEG); }
  if (bones.RightArm) { bones.RightArm.rotation.set(0, 0, 82 * DEG); }
  // 前臂略微弯曲，手贴身体前方，姿态更自然
  // 前臂保持自然伸直，不再额外弯曲

  // 按真实照片还原发型与眼镜：黑色齐肩波波头 + 细金属圆框眼镜
  const portraitGroup = addPortrait(figure);

  function setBone(name, sx, sy, sz) {
    const b = bones[name];
    if (!b) return;
    const base = baseScale[name] || new THREE.Vector3(1, 1, 1);
    b.scale.set(base.x * sx, base.y * sy, base.z * sz);
  }

  // 自动测量原生高度（静止姿态），不依赖硬编码常量
  // 关键：测量值必须缓存在模块级变量。若挂在 figure.userData 上，
  // 首次加载期间被竞态取消后第二次 buildRealBody 会拿到 undefined，
  // 最终 figure.position.y = NaN，导致模特整体消失。
  if (cachedNativeHeight == null || cachedNativeMinY == null) {
    const box = new THREE.Box3().setFromObject(figure);
    cachedNativeHeight = box.max.y - box.min.y;
    cachedNativeMinY = box.min.y;
    figure.userData.nativeMinY = cachedNativeMinY;
  }
  const nativeMinY = cachedNativeMinY ?? figure.userData.nativeMinY ?? 0;

  function applyProfile(m) {
    const p = { ...DEFAULT_MODEL, ...(m || {}) };

    // 先复位所有骨骼缩放，避免多次调用累积
    Object.keys(bones).forEach(k => { bones[k].scale.copy(baseScale[k] || new THREE.Vector3(1, 1, 1)); });

    // 整体缩放：目标身高(cm) × U → 场景单位，除以原生高度；脚底对齐 FOOT_Y
    const targetHeight = p.height * U;
    const hs = (cachedNativeHeight && isFinite(cachedNativeHeight))
      ? targetHeight / cachedNativeHeight : 1;
    figure.scale.set(hs, hs, hs);

    // 胖瘦：由 BMI 推导躯干横向系数
    const bmi = p.weight / Math.pow(p.height / 100, 2);
    const girthK = THREE.MathUtils.clamp(0.82 + bmi / 22 * 0.2, 0.82, 1.3);

    // 各围度相对标准值的比例，映射到对应骨骼横向缩放
    const bustK = THREE.MathUtils.clamp(p.bust / 90, 0.75, 1.4) * (0.55 + girthK * 0.45);
    const waistK = THREE.MathUtils.clamp(p.waist / 70, 0.7, 1.5) * (0.5 + girthK * 0.5);
    const hipK = THREE.MathUtils.clamp(p.hip / 96, 0.75, 1.4) * (0.55 + girthK * 0.45);

    // 体型变形统一作用于模型根节点（安全的整体缩放），不逐骨骼缩放，
    // 因为 Mixamo 蒙皮骨骼的非均匀缩放会导致网格错乱。
    // X/Z 用胖瘦系数，Y 用身高系数。
    const widthK = THREE.MathUtils.clamp(
      (hipK + waistK + bustK) / 3, 0.78, 1.35
    );
    figure.scale.set(hs * widthK, hs, hs * widthK);
    // 脚底对齐到 FOOT_Y：nativeMinY 是原生模型脚底 y，缩放后偏移
    figure.position.y = FOOT_Y - nativeMinY * hs;
    // 兜底：任何非有限变换都会让 Three.js 直接跳过渲染，必须复位
    if (!isFinite(figure.position.y) || !isFinite(figure.scale.x)) {
      figure.position.set(0, FOOT_Y, 0);
      figure.scale.set(1, 1, 1);
    }
  }

  applyProfile(model);

  // 计算模型底部 y，供对齐地台使用
  function footY() {
    const box = new THREE.Box3().setFromObject(group);
    return box.min.y;
  }

  return { group, figure, bones, applyProfile, footY };
}

/** 预加载模型（应用启动时调用） */
export function preloadRealBody() { return loadModel(); }
