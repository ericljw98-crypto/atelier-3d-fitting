/* ============================================================
   平滑写实人体（程序化 + 真人照片面部）
   ------------------------------------------------------------
   - 躯干/四肢用剖面曲线生成连续曲面，无机械球形关节
   - 三围按锁定档案精确驱动（胸94.5 / 腰85 / 臀99）
   - 面部使用真人照片贴图（带羽化透明通道）贴合头颅
   - 对外导出 bodyProfile()，服装模块据此按「人体截面 + 布料放松量」
     逐层外偏移生成，贴合由几何构造保证，不再靠手调系数凑
   ============================================================ */
import * as THREE from 'three';
import { DEFAULT_MODEL, FOOT_Y } from './body.js';

const U = 1 / 50;

/** 剖面重采样：线性加密 + 移动平均，避免样条过冲自交（同心环条纹） */
function resample(controls, samples) {
  const dense = [];
  const spans = controls.length - 1;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples * spans;
    const k = Math.min(Math.floor(t), spans - 1);
    const f = t - k;
    const a = controls[k], b = controls[k + 1];
    dense.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
  }
  for (let pass = 0; pass < 2; pass++) {
    const src = dense.map(p => p[0]);
    for (let i = 1; i < dense.length - 1; i++) {
      dense[i][0] = (src[i - 1] + src[i] * 2 + src[i + 1]) / 4;
    }
  }
  // 统一自下而上排列，radiusAt() 的插值依赖这一点（手臂剖面原本是自上而下）
  return dense.sort((a, b) => a[1] - b[1]);
}

/** 在剖面曲线上取某个高度处的半径（按 y 线性插值） */
export function radiusAt(dense, y) {
  if (y <= dense[0][1]) return dense[0][0];
  const last = dense[dense.length - 1];
  if (y >= last[1]) return last[0];
  for (let i = 1; i < dense.length; i++) {
    const a = dense[i - 1], b = dense[i];
    if (y <= b[1]) {
      const t = (y - a[1]) / (b[1] - a[1] || 1);
      return a[0] + (b[0] - a[0]) * t;
    }
  }
  return last[0];
}

/* ============================================================
   统一体型剖面：人体建模与服装建模共用的唯一数据源
   锚点采用真实人体比例（占身高）：髋 0.515 / 腰 0.624 / 胸 0.715 / 肩 0.818
   ============================================================ */
export function bodyProfile(model) {
  const p = { ...DEFAULT_MODEL, ...(model || {}) };
  const H = p.height * U;
  const base = FOOT_Y;

  // 人体测量锚点（占身高）。165cm 参照：髋隆突 84.5cm / 自然腰 99cm / 胸点 118cm / 肩峰 135cm
  const hipY = base + H * 0.512;
  const waistY = base + H * 0.600;
  const bustY = base + H * 0.713;
  const topY = base + H * 0.818;
  const shoulderTop = topY + 0.045;
  const hr = H * 0.0600;
  const headY = base + H - hr * 1.12;

  const neckR = p.neck * U / (2 * Math.PI);
  const rBust = p.bust * U / (2 * Math.PI) * 1.02;
  const rWaist = p.waist * U / (2 * Math.PI) * 1.00;
  const rHip = p.hip * U / (2 * Math.PI) * 1.10;
  const rShoulder = p.shoulder * U * 0.5;

  // 前后厚度随高度变化：腰收、髋圆、胸背厚 —— 女性侧面曲线主要来自这里
  const depthAt = y => {
    const t = (y - hipY) / Math.max(bustY - hipY, 0.01);
    if (y <= hipY) return 0.80;
    if (t <= 0.45) return 0.80 - 0.15 * (t / 0.45);
    if (t <= 1.0) return 0.65 + 0.17 * ((t - 0.45) / 0.55);
    return 0.82;
  };

  const torso = [
    [rHip * 0.42, hipY - 0.105],
    [rHip * 0.92, hipY - 0.062],
    [rHip, hipY],
    [rHip * 0.95, hipY + 0.06],
    [rWaist * 1.10, hipY + (waistY - hipY) * 0.55],
    [rWaist, waistY],
    [rWaist * 1.00, waistY + 0.06],
    [(rWaist + rBust) * 0.515, waistY + (bustY - waistY) * 0.52],
    [rBust * 0.98, bustY - 0.055],
    [rBust, bustY],
    [rBust * 0.99, bustY + 0.075],
    [rBust * 1.00, topY - 0.06],
    [rBust * 0.94, topY],
    [rBust * 0.72, topY + 0.075],
    [rBust * 0.46, topY + 0.115],
  ];

  const armLen = p.arm * U;
  const armX = rShoulder * 0.845;
  const palmY = topY - armLen * 0.93;
  const arm = [
    [0.028, topY + 0.050],
    [0.062, topY + 0.030],
    [0.080, topY + 0.002],
    [0.084, topY - 0.040],                 // 三角肌
    [0.075, topY - armLen * 0.16],         // 肱二头肌
    [0.062, topY - armLen * 0.32],
    [0.050, topY - armLen * 0.46],         // 肘
    [0.053, topY - armLen * 0.58],         // 前臂最粗
    [0.043, topY - armLen * 0.76],
    [0.029, topY - armLen * 0.93],         // 腕
  ];

  const legTop = hipY - 0.045;
  const ankleY = base + 0.095;
  const kneeY = base + H * 0.285;
  const legHalf = rHip * 0.47;
  const leg = [
    [rHip * 0.60, legTop + 0.10],
    [rHip * 0.55, legTop],
    [rHip * 0.46, legTop - (legTop - kneeY) * 0.35],
    [0.090, kneeY],
    [0.104, kneeY - (kneeY - ankleY) * 0.22],   // 小腿肚
    [0.072, kneeY - (kneeY - ankleY) * 0.62],
    [0.046, ankleY],
  ];

  return {
    p, H, base, hipY, waistY, bustY, topY, shoulderTop, headY, hr,
    neckR, rBust, rWaist, rHip, rShoulder, depth: 0.74, depthAt,
    bust: { y: bustY, amp: 0.062, spread: 0.30, band: 0.082, under: 0 },
    seat: { y: hipY + 0.01, amp: 0.050, band: 0.10 },
    torso: resample(torso, 58),
    arm: resample(arm, 38),
    leg: resample(leg, 36),
    armX, palmY, armTilt: 0.055, legHalf, legTop, ankleY, legDepth: 0.92,
  };
}

/** 躯干/服装共用的曲面点：椭圆截面（深度随高度变化）+ 胸部前向 + 臀部后向 */
function surfPoint(P, y, theta, R, ampBoost) {
  const cz = Math.cos(theta), sz = Math.sin(theta);
  const d = P.depthAt(y);
  const x = R * cz;
  let z = R * d * sz;

  // 胸：左右双峰，下缘收得急，形成乳房下缘的转折
  const B = P.bust;
  const dy = y - B.y;
  if (sz > 0 && Math.abs(dy) < B.band * 3) {
    const band = dy < 0 ? B.band * 0.78 : B.band * 1.20;
    const vy = Math.exp(-Math.pow(dy / band, 2));
    const d1 = theta - (Math.PI / 2 + B.spread);
    const d2 = theta - (Math.PI / 2 - B.spread);
    const g = 0.34;
    const twin = Math.max(Math.exp(-(d1 * d1) / (g * g)), Math.exp(-(d2 * d2) / (g * g)));
    z += vy * twin * (B.amp + ampBoost);
  }

  // 臀：后侧双瓣
  const S = P.seat;
  if (sz < 0 && Math.abs(y - S.y) < S.band * 3) {
    const vy = Math.exp(-Math.pow((y - S.y) / (S.band * 1.25), 2));
    const d1 = theta - (Math.PI * 1.5 + 0.30);
    const d2 = theta - (Math.PI * 1.5 - 0.30);
    const g = 0.40;
    const twin = Math.max(Math.exp(-(d1 * d1) / (g * g)), Math.exp(-(d2 * d2) / (g * g)));
    z -= vy * twin * (S.amp + ampBoost * 0.5);
  }
  return [x, z];
}

/** 生成壳体：人体 easeFn=null；服装传放松量函数，自动跟随胸部与臀部曲面 */
export function shellGeometry(P, y0, y1, ny, radiusFn, easeFn, nTheta = 64) {
  const pos = [];
  const idx = [];
  const row = nTheta + 1;
  for (let iy = 0; iy <= ny; iy++) {
    const y = y0 + (y1 - y0) * (iy / ny);
    const ease = easeFn ? easeFn(y) : 0;
    const ampBoost = easeFn ? Math.max(ease, 0) : 0;
    for (let it = 0; it <= nTheta; it++) {
      const th = (it / nTheta) * Math.PI * 2;
      const R = Math.max(radiusFn(y) + ease, 0.02);
      const [x, z] = surfPoint(P, y, th, R, ampBoost);
      pos.push(x, y, z);
    }
  }
  for (let iy = 0; iy < ny; iy++) {
    for (let it = 0; it < nTheta; it++) {
      const a = iy * row + it;
      const c = a + row;
      idx.push(a, a + 1, c, a + 1, c + 1, c);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/* ---------------- 材质与几何helper ---------------- */

function skinMat(color) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.84, metalness: 0.0, side: THREE.DoubleSide });
}

function latheOf(dense, zScale, material, segments = 48, yMin = -Infinity, yMax = Infinity) {
  const pts = dense
    .filter(([, y]) => y >= yMin && y <= yMax)
    .slice()
    .sort((a, b) => a[1] - b[1])          // 统一自下而上，保证法线朝外
    .map(([r, y]) => new THREE.Vector2(Math.max(r, 0.005), y));
  const mesh = new THREE.Mesh(new THREE.LatheGeometry(pts, segments), material);
  if (zScale !== 1) mesh.scale.z = zScale;
  return mesh;
}

function ellipsoid(pos, scale, material, seg = 24) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, seg, 18), material);
  m.position.set(pos[0], pos[1], pos[2]);
  m.scale.set(scale[0], scale[1], scale[2]);
  return m;
}

/* ---------------- 真人照片面部贴图 ---------------- */

const FACE_URL = 'images/face.png';
let faceMat = null;

function getFaceMaterial(skinColor) {
  if (!faceMat) {
    faceMat = new THREE.MeshBasicMaterial({
      color: skinColor, transparent: true, side: THREE.FrontSide,
      depthWrite: true, alphaTest: 0.01,
    });
    new THREE.TextureLoader().load(FACE_URL, tex => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      faceMat.map = tex;
      faceMat.color.set(0xffffff);
      faceMat.needsUpdate = true;
    }, undefined, err => console.warn('面部贴图加载失败，回退纯肤色', err));
  }
  return faceMat;
}

/** 轻微弧面的面部面片：UV 为等距平面投影（照片比例不失真），
    仅四周向 -Z 退让以贴合头颅曲率 */
function facePlate(w, h, radius, material, seg = 26) {
  const geo = new THREE.PlaneGeometry(w, h, seg, seg);
  const pos = geo.attributes.position;
  const r2 = radius * radius;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i);
    pos.setZ(i, Math.sqrt(Math.max(r2 - (x * x + y * y), 0)) - radius);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, material);
}

/* ============================================================
   构建人体
   ============================================================ */
export function buildSmoothBody(model) {
  const group = new THREE.Group();
  const figure = new THREE.Group();
  group.add(figure);

  const skin = skinMat(0xd8b79f);
  const skinSoft = skinMat(0xd2b098);
  const hair = skinMat(0x1a1512);

  function build(m) {
    while (figure.children.length) figure.remove(figure.children[0]);
    const P = bodyProfile(m);
    const { p, H, base, hipY, waistY, bustY, topY, shoulderTop, headY, hr,
      neckR, rBust, rWaist, rHip, rShoulder, depth, bust, torso, arm, leg,
      armX, palmY, legHalf, legTop, ankleY } = P;

    // ---- 躯干（含胸部曲面）----
    const torsoGeo = shellGeometry(P, torso[0][1], torso[torso.length - 1][1], 60,
      y => radiusAt(torso, y), null, 64);
    const torsoMesh = new THREE.Mesh(torsoGeo, skin);
    figure.add(torsoMesh);

    // ---- 颈：从肩部上缘平滑过渡到下颌 ----
    const neck = resample([
      [neckR * 1.55, shoulderTop - 0.02],
      [neckR * 1.20, shoulderTop + 0.04],
      [neckR * 1.06, headY - hr * 0.95],
      [neckR * 1.02, headY - hr * 0.75],
    ], 16);
    figure.add(latheOf(neck, 0.94, skin));



    // ---- 头部：头颅椭球，正面压扁为照片面片让位 ----
    figure.add(ellipsoid([0, headY, 0], [hr * 0.90, hr * 1.12, hr * 0.86], skin));

    // ---- 正面：真人照片贴图（含真实五官与圆框眼镜）----
    const plateH = hr * 1.66;
    const plate = facePlate(plateH * 0.8235, plateH, hr * 3.0, getFaceMaterial(0xd8b79f));
    plate.position.set(0, headY + hr * 0.02, hr * 0.90);
    plate.renderOrder = 1;
    figure.add(plate);

    // ---- 头发：黑色齐肩直发，侧分，露出额头 ----
    const cap = new THREE.Mesh(new THREE.SphereGeometry(hr * 1.04, 32, 22, 0, Math.PI * 2, 0, Math.PI * 0.37), hair);
    cap.position.set(0, headY + hr * 0.03, -0.006);
    cap.scale.set(1.02, 1.04, 1.06);
    figure.add(cap);
    [-1, 1].forEach(s => {
      // 鬓角
      figure.add(ellipsoid([s * hr * 0.74, headY + hr * 0.22, hr * 0.26], [hr * 0.30, hr * 0.40, hr * 0.48], hair));
      // 侧发：沿脸颊垂落
      figure.add(ellipsoid([s * hr * 0.88, headY - hr * 0.28, -0.004], [hr * 0.28, hr * 0.84, hr * 0.86], hair));
      // 发梢齐肩
      figure.add(ellipsoid([s * hr * 0.90, headY - hr * 1.12, -0.014], [hr * 0.26, hr * 0.62, hr * 0.72], hair));
    });
    // 后脑发团
    figure.add(ellipsoid([0, headY - hr * 0.18, -hr * 0.36], [hr * 0.92, hr * 1.10, hr * 0.62], hair));
    // 侧分的一缕
    const sweep = ellipsoid([-hr * 0.24, headY + hr * 0.62, hr * 0.30], [hr * 0.40, hr * 0.18, hr * 0.42], hair);
    sweep.rotation.z = -0.30;
    sweep.rotation.x = 0.30;
    figure.add(sweep);

    // ---- 手臂：平滑锥形，顶端用三角肌衔接，无球关节 ----
    [-1, 1].forEach(s => {
      const a = latheOf(arm, 0.94, skin);
      a.position.x = s * armX;
      a.rotation.z = s * P.armTilt;
      figure.add(a);
      // 手掌
      figure.add(ellipsoid([s * (armX + 0.020), palmY - 0.062, 0.006], [0.035, 0.075, 0.027], skin));
    });

    // ---- 腿 ----
    [-1, 1].forEach(s => {
      const l = latheOf(leg, P.legDepth, skin);
      l.position.x = s * legHalf;
      figure.add(l);
      figure.add(ellipsoid([s * legHalf, base + 0.045, 0.055], [0.068, 0.045, 0.142], skin));
    });

    figure.traverse(o => {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; }
    });
  }

  build(model);
  return { group, figure, applyProfile: build, footY: () => FOOT_Y };
}
