/* ============================================================
   平滑写实人体（程序化）
   - 躯干/四肢用 Catmull-Rom 平滑曲线生成连续曲面，无机械球形关节
   - 三围按锁定档案精确驱动（胸94.5 / 腰85 / 臀99）
   - 肩/胸/腰/髋 Y 锚点与 garment.js 完全一致，服装可精确贴合
   - 肤色：亚洲人偏白；发型：黑色齐肩波波头；金属圆框眼镜
   ============================================================ */
import * as THREE from 'three';
import { DEFAULT_MODEL, FOOT_Y } from './body.js';

const U = 1 / 50;

function skinMat(color) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.84, metalness: 0.0, side: THREE.DoubleSide });
}

/** 由 [半径, y] 控制点生成平滑旋转体。
    先线性加密，再做移动平均平滑，避免 SplineCurve 在急变处过冲自交（同心环）。 */
function smoothLathe(controls, zScale, material, segments = 48, samples = 48) {
  // 线性加密到 samples+1 个点
  const dense = [];
  const spans = controls.length - 1;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples * spans;
    const k = Math.min(Math.floor(t), spans - 1);
    const f = t - k;
    const a = controls[k], b = controls[k + 1];
    dense.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
  }
  // 移动平均平滑（两端不动），迭代 2 次
  for (let pass = 0; pass < 2; pass++) {
    const src = dense.map(p => p[0]);
    for (let i = 1; i < dense.length - 1; i++) {
      dense[i][0] = (src[i - 1] + src[i] * 2 + src[i + 1]) / 4;
    }
  }
  const pts2 = dense.map(([r, y]) => new THREE.Vector2(Math.max(r, 0.005), y));
  const mesh = new THREE.Mesh(new THREE.LatheGeometry(pts2, segments), material);
  if (zScale !== 1) mesh.scale.z = zScale;
  return mesh;
}

function ellipsoid(pos, scale, material, seg = 24) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, seg, 18), material);
  m.position.set(pos[0], pos[1], pos[2]);
  m.scale.set(scale[0], scale[1], scale[2]);
  return m;
}

/** 构建平滑写实人体，返回 { group, applyProfile(model) } */
export function buildSmoothBody(model) {
  const group = new THREE.Group();
  const figure = new THREE.Group();
  group.add(figure);

  const skin = skinMat(0xf0cdb2);
  const skinSoft = skinMat(0xecc4aa);
  const hair = skinMat(0x1c1917);
  const metal = new THREE.MeshStandardMaterial({ color: 0x8a8172, roughness: 0.35, metalness: 0.75 });
  const lens = new THREE.MeshStandardMaterial({ color: 0xeaf4fa, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.10, side: THREE.DoubleSide });

  function build(m) {
    while (figure.children.length) figure.remove(figure.children[0]);
    const p = { ...DEFAULT_MODEL, ...(m || {}) };
    const H = p.height * U;
    const base = FOOT_Y;
    const topY = base + H * 0.798;
    const bustY = base + H * 0.739;
    const waistY = base + H * 0.633;
    const hipY = base + H * 0.576;
    const shoulderTop = topY + 0.08;
    const headY = shoulderTop + 0.185;    // 头部中心：缩短脖子
    const hr = 0.115 * (p.height / 165);

    const rBust = p.bust * U / (2 * Math.PI) * 1.03;
    const rWaist = p.waist * U / (2 * Math.PI) * 1.02;
    const rHip = p.hip * U / (2 * Math.PI) * 1.05;
    const rShoulder = p.shoulder * U * 0.5;
    const depth = 0.72;

    // ---- 躯干：髋→腰→胸→肩，平滑曲线（更多控制点）----
    figure.add(smoothLathe([
      [rHip * 0.80, hipY - 0.14],
      [rHip * 0.95, hipY - 0.05],
      [rHip,        hipY + 0.01],
      [rHip * 0.94, hipY + 0.10],
      [rWaist * 1.08, (hipY + waistY) * 0.5],
      [rWaist,      waistY],
      [rWaist * 0.98, waistY + 0.06],
      [(rWaist + rBust) * 0.5, (waistY + bustY) * 0.5],
      [rBust * 0.94, bustY - 0.06],
      [rBust,       bustY],
      [rBust * 0.96, bustY + 0.08],
      [rShoulder * 0.88, topY - 0.02],
      [rShoulder * 0.66, shoulderTop - 0.01],
      [rShoulder * 0.40, shoulderTop + 0.02],
    ], depth, skin));

    // ---- 颈：短而平滑，与肩自然衔接 ----
    const neckR = p.neck * U / (2 * Math.PI);
    figure.add(smoothLathe([
      [neckR * 1.35, shoulderTop - 0.01],
      [neckR * 1.08, shoulderTop + 0.05],
      [neckR,        headY - hr * 0.85],
    ], 0.92, skin));

    // ---- 头部：椭圆头颅 + 柔和下颌 + 鼻梁 ----
    figure.add(ellipsoid([0, headY, 0], [hr * 0.90, hr * 1.12, hr * 0.96], skin));
    // 下颌（收窄、略前）
    figure.add(ellipsoid([0, headY - hr * 0.78, hr * 0.16], [hr * 0.56, hr * 0.42, hr * 0.66], skinSoft));
    // 鼻梁（正面 +Z）
    figure.add(ellipsoid([0, headY - hr * 0.05, hr * 0.92], [hr * 0.10, hr * 0.20, hr * 0.13], skinSoft));
    // 面部细节：眉、眼（在镜片后方）、唇
    const eyeDark = skinMat(0x3a2e2a);
    const lipMat = skinMat(0xba7f76);
    [-1, 1].forEach(s => {
      figure.add(ellipsoid([s * hr * 0.44, headY + hr * 0.02, hr * 0.90], [hr * 0.15, hr * 0.07, hr * 0.05], eyeDark));
      figure.add(ellipsoid([s * hr * 0.44, headY + hr * 0.22, hr * 0.88], [hr * 0.18, hr * 0.035, hr * 0.04], hair));
    });
    figure.add(ellipsoid([0, headY - hr * 0.55, hr * 0.80], [hr * 0.18, hr * 0.045, hr * 0.05], lipMat));

    // ---- 手臂：肩到腕，平滑锥形，模拟肌肉起伏但无球形关节 ----
    const armLen = p.arm * U;
    const sx = rShoulder * 0.86;
    const palmY = topY - armLen * 0.94;
    [-1, 1].forEach(s => {
      const arm = smoothLathe([
        [0.070, topY - 0.01],
        [0.072, topY - armLen * 0.14],
        [0.064, topY - armLen * 0.30],
        [0.054, topY - armLen * 0.48],   // 肘部自然收窄
        [0.056, topY - armLen * 0.56],   // 前臂略粗
        [0.048, topY - armLen * 0.74],
        [0.032, palmY],
      ], 0.94, skin);
      arm.position.x = s * sx;
      arm.rotation.z = s * 0.08;
      figure.add(arm);
      figure.add(ellipsoid([s * (sx + 0.018), palmY - 0.06, 0.008], [0.034, 0.072, 0.026], skin));
    });

    // ---- 腿：髋到踝，平滑曲线，含大腿/膝/小腿肚起伏 ----
    const legTop = hipY - 0.05;
    const ankleY = base + 0.09;
    const legHalf = rHip * 0.5;
    const kneeY = (legTop + ankleY) * 0.52;
    [-1, 1].forEach(s => {
      const leg = smoothLathe([
        [rHip * 0.54, legTop + 0.10],
        [rHip * 0.52, legTop],
        [rHip * 0.46, (legTop + kneeY) * 0.5],
        [0.086,   kneeY],                // 膝
        [0.098,   (kneeY + ankleY) * 0.42], // 小腿肚
        [0.070,   (kneeY + ankleY) * 0.78],
        [0.050,   ankleY],
      ], 0.92, skin);
      leg.position.x = s * legHalf;
      figure.add(leg);
      // 脚：扁椭圆带脚尖
      const foot = ellipsoid([s * legHalf, base + 0.045, 0.06], [0.070, 0.045, 0.145], skin);
      figure.add(foot);
    });

    // ---- 头发：黑色齐肩波波头 ----
    const cap = new THREE.Mesh(new THREE.SphereGeometry(hr * 1.07, 30, 22, 0, Math.PI * 2, 0, Math.PI * 0.62), hair);
    cap.position.set(0, headY + hr * 0.06, -0.006);
    cap.scale.set(1.0, 1.0, 1.03);
    figure.add(cap);
    [-1, 1].forEach(s => {
      figure.add(ellipsoid([s * hr * 0.84, headY - hr * 0.12, -0.012], [hr * 0.40, hr * 1.45, hr * 0.90], hair));
      figure.add(ellipsoid([s * hr * 0.88, headY - hr * 1.02, -0.004], [hr * 0.36, hr * 0.85, hr * 0.78], hair));
    });
    figure.add(ellipsoid([0, headY - hr * 0.10, -hr * 0.40], [hr * 0.95, hr * 1.30, hr * 0.60], hair));
    const fringe = new THREE.Mesh(new THREE.SphereGeometry(hr, 20, 16, 0, Math.PI * 1.2), hair);
    fringe.position.set(-hr * 0.10, headY + hr * 0.42, hr * 0.52);
    fringe.scale.set(1.0, 0.34, 0.60);
    fringe.rotation.z = 0.14;
    figure.add(fringe);

    // ---- 金属圆框眼镜 ----
    const eyeY = headY + hr * 0.02, eyeX = hr * 0.44, lensR = hr * 0.33, lensZ = hr * 0.94;
    [-1, 1].forEach(s => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(lensR, 0.0024, 8, 28), metal);
      ring.position.set(s * eyeX, eyeY, lensZ);
      figure.add(ring);
      const l = new THREE.Mesh(new THREE.CircleGeometry(lensR * 0.97, 24), lens);
      l.position.set(s * eyeX, eyeY, lensZ);
      figure.add(l);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.0020, 0.0020, hr * 1.2, 6), metal);
      arm.rotation.x = Math.PI / 2;
      arm.position.set(s * (eyeX + lensR), eyeY + 0.003, lensZ - hr * 0.55);
      figure.add(arm);
    });
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.0020, 0.0020, eyeX * 2 - lensR * 2 + 0.01, 6), metal);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, eyeY + 0.008, lensZ);
    figure.add(bridge);

    figure.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; } });
  }

  build(model);
  return { group, figure, applyProfile: build, footY: () => FOOT_Y };
}
