import * as THREE from 'three';

/* ============================================================
   参数化人体建模
   ------------------------------------------------------------
   所有几何体由模特建档参数驱动：
   - 胸围 / 腰围 / 臀围 → 躯干各截面半径
   - 肩宽 → 肩关节横向位置
   - 臂长 → 上肢长度
   - 腿长(内缝) → 胯部高度与下肢长度
   - 身高 → 整体纵向比例
   - 体重 → 结合身高修正围度厚度
   坐标约定：脚底 y = FOOT_Y，1 单位 = 50 cm。
   ============================================================ */

export const FOOT_Y = -1.73;
const U = 1 / 50;                       // 每厘米对应的场景单位
const BASE_HEIGHT = 170;                // 基准身高

/* 固定模特档案：按用户实测数据锁定，不再由用户调整 */
export const DEFAULT_MODEL = {
  height: 165,
  weight: 62.5,
  bust: 94.5,      // 胸围 94–95cm，取中值
  waist: 85,       // 腰围（贴身）
  hip: 99,
  shoulder: 40,
  arm: 51.5,       // 臂长 50–53cm，取中值
  inseam: 78,      // 内缝长：用户给的腿长94cm为腰至脚整体口径，内缝取合理值78cm
  neck: 34,
  skin: 'asian-fair', // 亚洲人偏白肤色
};

/* 该文件为只读固定档案，FIXED_PROFILE 供 UI 判断是否隐藏调节入口 */
export const FIXED_PROFILE = true;

/* 建档参数的取值范围与提示 */
export const FIELD_META = [
  { key: 'height',   label: '身高',   unit: 'cm', min: 140, max: 200, step: 1, hint: '净身高' },
  { key: 'weight',   label: '体重',   unit: 'kg', min: 35,  max: 110, step: 0.5, hint: '用于围度厚度修正' },
  { key: 'bust',     label: '胸围',   unit: 'cm', min: 70,  max: 125, step: 1, hint: '胸部最丰满处水平围度' },
  { key: 'waist',    label: '腰围',   unit: 'cm', min: 50,  max: 110, step: 1, hint: '腰部最细处水平围度' },
  { key: 'hip',      label: '臀围',   unit: 'cm', min: 75,  max: 135, step: 1, hint: '臀部最丰满处水平围度' },
  { key: 'shoulder', label: '肩宽',   unit: 'cm', min: 32,  max: 52,  step: 0.5, hint: '左右肩峰点间距' },
  { key: 'arm',      label: '臂长',   unit: 'cm', min: 48,  max: 72,  step: 1, hint: '肩峰至手腕' },
  { key: 'inseam',   label: '腿长',   unit: 'cm', min: 68,  max: 96,  step: 1, hint: '内缝长（裆至脚踝）' },
  { key: 'neck',     label: '领围',   unit: 'cm', min: 28,  max: 45,  step: 0.5, hint: '颈部根部围度' },
];

/* 参数 → 派生度量（供人体与服装共用） */
export function bodyMetrics(model) {
  const m = { ...DEFAULT_MODEL, ...model };
  const hs = m.height / BASE_HEIGHT;                 // 身高缩放
  const bmi = m.weight / Math.pow(m.height / 100, 2);
  // 三围已由用户直接给定，体重仅作小幅厚度修正，避免重复放大
  const girthK = THREE.MathUtils.clamp(0.94 + bmi / 24 * 0.06, 0.92, 1.12);
  const circ = c => c * U * 0.5 / Math.PI * girthK; // r = 围度 /(2π)

  const rBust = circ(m.bust);
  const rWaist = circ(m.waist);
  const rHip = circ(m.hip);
  const shoulderX = m.shoulder * U * 0.5 * girthK;

  // 腿长决定胯部高度；躯干各点相对胯部排布
  const hipY = FOOT_Y + m.inseam * U + 0.13;
  const waistY = hipY + 0.42;
  const bustY = hipY + 0.74;
  const shoulderY = hipY + 1.08;
  const neckY = shoulderY + 0.17;
  const headY = shoulderY + 0.50;
  const armLen = m.arm * U;
  const neckR = m.neck * U / (Math.PI * 2) * girthK;

  return {
    m, hs, girthK, rBust, rWaist, rHip, shoulderX,
    hipY, waistY, bustY, shoulderY, neckY, headY,
    armLen, neckR,
    depth: 0.76, // 截面椭圆的 z/x 比
  };
}

/* 几何工具 */
function mat(color, rough = 0.86) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 });
}
function limb(p1, p2, r1, r2, material, seg = 14) {
  const dir = new THREE.Vector3().subVectors(p2, p1);
  const len = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r2, r1, len, seg, 1), material);
  mesh.position.copy(p1).add(p2).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return mesh;
}
function ball(pos, scale, material) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 14), material);
  mesh.position.copy(pos); mesh.scale.copy(scale);
  return mesh;
}
function lathe(profile, zScale, material) {
  const pts = profile.map(([r, y]) => new THREE.Vector2(Math.max(r, 0.01), y));
  const mesh = new THREE.Mesh(new THREE.LatheGeometry(pts, 36), material);
  if (zScale !== 1) mesh.scale.z = zScale;
  return mesh;
}

/* 构建人体（返回 Group，局部坐标；整体高度缩放由外部 avatarGroup 处理） */
export function buildBody(model) {
  const k = bodyMetrics(model);
  const g = new THREE.Group();
  const skin = mat(0xd7a980);
  const hair = mat(0x2a2320, 0.94);

  // 头与颈
  g.add(ball(new THREE.Vector3(0, k.headY, 0), new THREE.Vector3(0.215, 0.25, 0.205), skin));
  const hairMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.222, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.56), hair
  );
  hairMesh.scale.set(1, 1.18, 1.02);
  hairMesh.position.set(0, k.headY + 0.02, -0.012);
  hairMesh.rotation.x = -0.18;
  g.add(hairMesh);
  g.add(limb(new THREE.Vector3(0, k.shoulderY + 0.02, 0),
             new THREE.Vector3(0, k.neckY + 0.08, 0), k.neckR, k.neckR * 0.92, skin));

  // 躯干：臀 → 腰 → 胸 → 肩，半径由建档围度驱动
  const depth = k.depth;
  g.add(lathe([
    [k.rHip * 0.82, k.hipY - 0.16],
    [k.rHip,        k.hipY],
    [k.rWaist * 1.02, k.waistY - 0.08],
    [k.rWaist,      k.waistY],
    [k.rBust * 0.96, k.bustY - 0.12],
    [k.rBust,       k.bustY],
    [k.rBust * 0.92, k.shoulderY - 0.08],
    [k.shoulderX * 0.78, k.shoulderY],
    [k.neckR * 1.1, k.shoulderY + 0.1],
  ], depth, skin));

  // 肩、臂、手
  const sx = k.shoulderX;
  const upperEndY = k.shoulderY - k.armLen * 0.5;
  const wristY = k.shoulderY - k.armLen;
  [-1, 1].forEach(s => {
    g.add(ball(new THREE.Vector3(s * sx, k.shoulderY - 0.02, 0), new THREE.Vector3(0.105, 0.105, 0.105), skin));
    g.add(limb(new THREE.Vector3(s * sx, k.shoulderY - 0.02, 0),
               new THREE.Vector3(s * (sx + 0.05), upperEndY, 0), 0.10, 0.083, skin));
    g.add(ball(new THREE.Vector3(s * (sx + 0.05), upperEndY, 0), new THREE.Vector3(0.082, 0.082, 0.082), skin));
    g.add(limb(new THREE.Vector3(s * (sx + 0.05), upperEndY, 0),
               new THREE.Vector3(s * (sx + 0.09), wristY, 0), 0.078, 0.058, skin));
    g.add(ball(new THREE.Vector3(s * (sx + 0.09), wristY - 0.06, 0), new THREE.Vector3(0.055, 0.095, 0.042), skin));
  });

  // 腿、脚：腿长由内缝决定
  const legTop = k.hipY - 0.02;
  const kneeY = FOOT_Y + (legTop - FOOT_Y) * 0.48;
  const ankleY = FOOT_Y + 0.10;
  const hipHalf = k.rHip * 0.52;
  [-1, 1].forEach(s => {
    g.add(lathe([
      [k.rHip * 0.5, legTop + 0.12],
      [k.rHip * 0.52, legTop],
      [k.rHip * 0.42, kneeY + 0.1],
    ], 0.9, skin));
    g.add(limb(new THREE.Vector3(s * hipHalf, kneeY + 0.08, 0),
               new THREE.Vector3(s * (hipHalf + 0.01), ankleY, 0), 0.098, 0.062, skin));
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.09, 0.30), skin);
    foot.position.set(s * (hipHalf + 0.01), FOOT_Y + 0.045, 0.07);
    g.add(foot);
  });

  g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  g.userData.k = k;
  return g;
}

/* 档案文字摘要 */
export function modelSummary(model) {
  const m = { ...DEFAULT_MODEL, ...model };
  const bmi = m.weight / Math.pow(m.height / 100, 2);
  let shape = '标准';
  if (bmi < 18.5) shape = '偏瘦';
  else if (bmi < 24) shape = '匀称';
  else if (bmi < 28) shape = '微丰腴';
  else shape = '丰腴';
  return `${m.height}cm · ${m.weight}kg · ${shape} · 三围 ${m.bust}/${m.waist}/${m.hip}`;
}
