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

/** 生成写实人体，返回 { group, applyProfile(model) } */
export async function buildRealBody(model) {
  const src = await loadModel();
  const group = new THREE.Group();
  const figure = cloneSkeleton(src);
  group.add(figure);

  // 按名字建立骨骼索引
  const bones = {};
  figure.traverse(o => {
    if (o.isBone) {
      // 兼容两种命名：mixamorig:Hips 与 mixamorigHips
      const short = o.name.replace(/^mixamorig:?/, '');
      bones[short] = o;
      bones[o.name] = o;
    }
  });

  // 记录骨骼初始缩放，便于每次重算
  const baseScale = {};
  Object.keys(bones).forEach(k => { baseScale[k] = bones[k].scale.clone(); });

  function setBone(name, sx, sy, sz) {
    const b = bones[name];
    if (!b) return;
    const base = baseScale[name] || new THREE.Vector3(1, 1, 1);
    b.scale.set(base.x * sx, base.y * sy, base.z * sz);
  }

  // 自动测量原生高度（静止姿态），不依赖硬编码常量
  if (cachedNativeHeight == null) {
    const box = new THREE.Box3().setFromObject(figure);
    cachedNativeHeight = box.max.y - box.min.y;
    figure.userData.nativeMinY = box.min.y;
  }

  function applyProfile(m) {
    const p = { ...DEFAULT_MODEL, ...(m || {}) };

    // 先复位所有骨骼缩放，避免多次调用累积
    Object.keys(bones).forEach(k => { bones[k].scale.copy(baseScale[k] || new THREE.Vector3(1, 1, 1)); });

    // 整体缩放：目标身高(cm) × U → 场景单位，除以原生高度；脚底对齐 FOOT_Y
    const targetHeight = p.height * U;
    const hs = targetHeight / cachedNativeHeight;
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
    figure.position.y = FOOT_Y - figure.userData.nativeMinY * hs;
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
