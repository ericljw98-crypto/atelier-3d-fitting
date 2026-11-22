/* ============================================================
   写实女性人体 —— 现成扫描级基础人体模型（CC0 · Woman Base Mesh）
   ------------------------------------------------------------
   程序化曲面拼出来的人体，比例和肌肉走向都不可能真。
   现在加载现成模型 models/woman.glb（蒙皮网格＋人体骨骼），
   做三件事：

   1) 摆姿势：A-pose 上臂内旋，双臂自然下垂；
   2) 量体型：按骨骼权重把顶点分成 躯干 / 手臂 / 腿，
      在最终场景尺度下逐高度切片统计极坐标轮廓 r(y,θ)；
   3) 供服装：导出与旧接口同名的 bodyProfile / radiusAt /
      shellGeometry，服装按「真实轮廓 + 放松量」外偏移生成。

   注意：轮廓必须在**缩放后的最终网格**上测量。骨骼带旋转，
   非均匀缩放在蒙皮后并不等于「把半径乘个系数」，先测后乘会
   系统性偏小，导致胸部、腰头从衣服里戳出来。
   ============================================================ */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone as skeletonClone } from 'three/addons/utils/SkeletonUtils.js';
import { DEFAULT_MODEL, FOOT_Y } from './body.js';

const U = 1 / 50;
const MODEL_URL = 'models/woman.glb';
const ARM_DROP_DEG = 30;          // 上臂内旋角：A-pose 外张约 38°，回旋后自然下垂
const NY = 200, NTH = 96;         // 切片高度数 × 方位数
const DTH = Math.PI * 2 / NTH;

/* ---------------- 加载 ---------------- */

let _gltfPromise = null;
function loadGltf() {
  if (!_gltfPromise) {
    _gltfPromise = new Promise((resolve, reject) => {
      new GLTFLoader().load(MODEL_URL, resolve, undefined,
        err => reject(new Error('人体模型加载失败：' + (err && err.message || err))));
    });
  }
  return _gltfPromise;
}

let NORM = null;            // 归一化空间（身高 1、脚底 0）的骨骼锚点
let WL = null;              // 最终尺度下的真实轮廓网格（场景单位）
let _readyPromise = null;

/* ---------------- 顶点采集 ---------------- */

function collectVertices(mesh) {
  const geo = mesh.geometry;
  const pos = geo.attributes.position;
  const si = geo.attributes.skinIndex;
  const sw = geo.attributes.skinWeight;
  const bones = mesh.skeleton.bones;
  const n = pos.count;
  const X = new Float32Array(n), Y = new Float32Array(n), Z = new Float32Array(n);
  const KIND = new Uint8Array(n);      // 0 躯干 1 手臂 2 腿
  const SIDE = new Int8Array(n);
  const v = new THREE.Vector3();
  mesh.skeleton.update();
  mesh.updateMatrixWorld(true);

  for (let i = 0; i < n; i++) {
    v.fromBufferAttribute(pos, i);
    if (mesh.applyBoneTransform) mesh.applyBoneTransform(i, v);
    v.applyMatrix4(mesh.matrixWorld);
    X[i] = v.x; Y[i] = v.y; Z[i] = v.z;

    const w0 = sw.getX(i), w1 = sw.getY(i), w2 = sw.getZ(i), w3 = sw.getW(i);
    let bw = w0, bk = 0;
    if (w1 > bw) { bw = w1; bk = 1; }
    if (w2 > bw) { bw = w2; bk = 2; }
    if (w3 > bw) { bw = w3; bk = 3; }
    const bi = bk === 0 ? si.getX(i) : bk === 1 ? si.getY(i) : bk === 2 ? si.getZ(i) : si.getW(i);
    const name = (bones[bi] && bones[bi].name) || '';
    if (/Arm|Hand/.test(name)) { KIND[i] = 1; SIDE[i] = /^Left/.test(name) ? 1 : -1; }
    else if (/UpLeg|Leg|Foot|Toe/.test(name)) { KIND[i] = 2; SIDE[i] = /^Left/.test(name) ? 1 : -1; }
  }
  return { X, Y, Z, KIND, SIDE, n };
}

/** 补齐空 bin + 填平极角凹陷（腿间缝隙）+ 轻度平滑；不得侵入原始轮廓 */
function tidySlice(r, cnt) {
  for (let i = 0; i < NTH; i++) {
    if (cnt[i] > 0) continue;
    let l = 1, rr = 1;
    while (l < NTH && cnt[(i - l + NTH) % NTH] === 0) l++;
    while (rr < NTH && cnt[(i + rr) % NTH] === 0) rr++;
    if (l >= NTH) { r[i] = 0; continue; }
    const a = r[(i - l + NTH) % NTH], b = r[(i + rr) % NTH];
    r[i] = (a * rr + b * l) / (l + rr);
  }
  const raw = r.slice();
  for (let pass = 0; pass < 3; pass++) {
    const src = r.slice();
    for (let i = 0; i < NTH; i++) {
      const avg = (src[(i - 1 + NTH) % NTH] + src[(i + 1) % NTH]) * 0.5;
      if (src[i] < avg) r[i] = avg;
    }
  }
  for (let pass = 0; pass < 2; pass++) {
    const src = r.slice();
    for (let i = 0; i < NTH; i++) {
      r[i] = src[(i - 1 + NTH) % NTH] * 0.25 + src[i] * 0.5 + src[(i + 1) % NTH] * 0.25;
    }
  }
  for (let i = 0; i < NTH; i++) if (raw[i] > r[i]) r[i] = raw[i];
}

/* ---------------- 核心：在给定空间量轮廓 ---------------- */

function bakeSilhouette(mesh, H, baseY) {
  const V = collectVertices(mesh);
  const bones = mesh.skeleton.bones;
  const bpos = n => {
    const b = bones.find(x => x.name === n);
    return b ? b.getWorldPosition(new THREE.Vector3()) : null;
  };
  const pArmL = bpos('LeftArm'), pArmR = bpos('RightArm');
  const pHandL = bpos('LeftHand'), pHandR = bpos('RightHand');
  const pUpLegL = bpos('LeftUpLeg');
  const pLegL = bpos('LeftLeg'), pFootL = bpos('LeftFoot');
  const pNeck = bpos('neck'), pHead = bpos('Head');

  const uOf = y => Math.min(0.999, Math.max(0, (y - baseY) / H));
  const sliceOf = y => Math.min(NY - 1, Math.max(0, Math.floor(uOf(y) * NY)));

  /* 截面中心（z）：取该高度前后缘的中点，比均值稳定；
     再沿高度做多遍平滑，避免逐行跳动导致裙面出现一圈圈台阶 */
  const azMax = new Float32Array(NY), azMin = new Float32Array(NY);
  for (let iy = 0; iy < NY; iy++) { azMax[iy] = -Infinity; azMin[iy] = Infinity; }
  for (let i = 0; i < V.n; i++) {
    if (V.KIND[i] === 1) continue;
    const iy = sliceOf(V.Y[i]);
    if (V.Z[i] > azMax[iy]) azMax[iy] = V.Z[i];
    if (V.Z[i] < azMin[iy]) azMin[iy] = V.Z[i];
  }
  const cz = new Float32Array(NY);
  for (let iy = 0; iy < NY; iy++) {
    cz[iy] = isFinite(azMax[iy]) && isFinite(azMin[iy]) ? (azMax[iy] + azMin[iy]) * 0.5 : 0;
  }
  for (let pass = 0; pass < 6; pass++) {
    const src = cz.slice();
    for (let i = 1; i < NY - 1; i++) cz[i] = (src[i - 1] + src[i] * 2 + src[i + 1]) / 4;
  }

  /* 单腿中心线：髋关节 x → 脚踝 x */
  const legCx = new Float32Array(NY);
  {
    const hipX = pUpLegL ? pUpLegL.x : 0.09 * H;
    const ankX = pFootL ? pFootL.x : 0.07 * H;
    const hipU0 = pUpLegL ? uOf(pUpLegL.y) : 0.50;
    const ankU0 = pFootL ? uOf(pFootL.y) : 0.05;
    for (let iy = 0; iy < NY; iy++) {
      const t = Math.min(1, Math.max(0, (hipU0 - iy / NY) / Math.max(hipU0 - ankU0, 1e-3)));
      legCx[iy] = hipX + (ankX - hipX) * t;
    }
  }

  /* 手臂轴线 */
  const armVec = pArmL && pHandL ? new THREE.Vector3().subVectors(pHandL, pArmL) : new THREE.Vector3(0, -0.3 * H, 0);
  const armLen = Math.max(armVec.length(), 1e-3);
  const armDir = armVec.clone().normalize();

  /* 第二遍：轮廓 + 剖面 */
  const rBody = new Float32Array(NY * NTH);
  const cntBody = new Uint16Array(NY * NTH);
  const maxAx = new Float32Array(NY), maxZ = new Float32Array(NY), minZ = new Float32Array(NY);
  for (let iy = 0; iy < NY; iy++) { maxZ[iy] = -Infinity; minZ[iy] = Infinity; }
  const legRSum = new Float32Array(NY), legRCnt = new Uint32Array(NY);
  const armRSum = new Float32Array(NY), armRCnt = new Uint32Array(NY);

  for (let i = 0; i < V.n; i++) {
    const x = V.X[i], y = V.Y[i], z = V.Z[i];
    const iy = sliceOf(y);
    if (V.KIND[i] === 1) {
      const b = V.SIDE[i] > 0 ? pArmL : pArmR;
      const px = x - (b ? b.x : 0), py = y - (b ? b.y : 0.8 * H), pz = z - (b ? b.z : 0);
      const t = px * armDir.x + py * armDir.y + pz * armDir.z;
      const rx = px - armDir.x * t, ry = py - armDir.y * t, rz = pz - armDir.z * t;
      armRSum[iy] += Math.sqrt(rx * rx + ry * ry + rz * rz);
      armRCnt[iy]++;
      continue;
    }
    const dz = z - cz[iy];
    let it = Math.floor((Math.atan2(dz, x) + Math.PI) / DTH);
    it = ((it % NTH) + NTH) % NTH;
    const idx = iy * NTH + it;
    const r = Math.hypot(x, dz);
    if (r > rBody[idx]) rBody[idx] = r;
    cntBody[idx]++;
    const ax = Math.abs(x);
    if (ax > maxAx[iy]) maxAx[iy] = ax;
    if (dz > maxZ[iy]) maxZ[iy] = dz;
    if (dz < minZ[iy]) minZ[iy] = dz;

    if (V.KIND[i] === 2) {
      legRSum[iy] += Math.hypot(x - V.SIDE[i] * legCx[iy], dz);
      legRCnt[iy]++;
    }
  }

  /* 整理 + 周长 */
  const meanR = new Float32Array(NY);
  for (let iy = 0; iy < NY; iy++) {
    const r = rBody.subarray(iy * NTH, iy * NTH + NTH);
    const cnt = cntBody.subarray(iy * NTH, iy * NTH + NTH);
    let any = false;
    for (let i = 0; i < NTH; i++) if (cnt[i]) { any = true; break; }
    if (!any) continue;
    tidySlice(r, cnt);
    let per = 0;
    for (let i = 0; i < NTH; i++) per += r[i] * DTH;
    meanR[iy] = per / (Math.PI * 2);
  }
  for (let iy = 0; iy < NY; iy++) {
    if (meanR[iy] > 0) continue;
    let a = iy - 1, b = iy + 1;
    while (a >= 0 && meanR[a] === 0) a--;
    while (b < NY && meanR[b] === 0) b++;
    if (a >= 0 && b < NY) {
      const t = (iy - a) / (b - a);
      meanR[iy] = meanR[a] + (meanR[b] - meanR[a]) * t;
      for (let i = 0; i < NTH; i++) rBody[iy * NTH + i] = rBody[a * NTH + i] * (1 - t) + rBody[b * NTH + i] * t;
      maxAx[iy] = maxAx[a] * (1 - t) + maxAx[b] * t;
      maxZ[iy] = maxZ[a] * (1 - t) + maxZ[b] * t;
      minZ[iy] = minZ[a] * (1 - t) + minZ[b] * t;
      cz[iy] = cz[a] * (1 - t) + cz[b] * t;
    }
  }
  for (let pass = 0; pass < 2; pass++) {
    const src = meanR.slice();
    for (let i = 2; i < NY - 2; i++) meanR[i] = (src[i - 1] + src[i] * 2 + src[i + 1]) / 4;
  }

  const armR = new Float32Array(NY), legR = new Float32Array(NY);
  for (let iy = 0; iy < NY; iy++) {
    if (armRCnt[iy]) armR[iy] = armRSum[iy] / armRCnt[iy];
    if (legRCnt[iy]) legR[iy] = legRSum[iy] / legRCnt[iy];
  }
  for (let pass = 0; pass < 5; pass++) {
    const s1 = armR.slice(), s2 = legR.slice();
    for (let i = 1; i < NY - 1; i++) {
      if (armR[i] > 0) armR[i] = (s1[i - 1] + s1[i] * 2 + s1[i + 1]) / 4;
      if (legR[i] > 0) legR[i] = (s2[i - 1] + s2[i] * 2 + s2[i + 1]) / 4;
    }
  }

  /* 关键高度（u = 占身高比例，与尺度无关） */
  const shoulderU = pArmL ? uOf(pArmL.y) : 0.82;
  const hipU = pUpLegL ? uOf(pUpLegL.y) : 0.52;
  const kneeU = pLegL ? uOf(pLegL.y) : 0.28;
  const ankleU = pFootL ? uOf(pFootL.y) : 0.05;
  const neckU = pNeck ? uOf(pNeck.y) : shoulderU + 0.04;
  const headU = pHead ? uOf(pHead.y) : 0.92;

  const scan = (a, b, fn, findMax) => {
    const i0 = Math.max(1, Math.floor(a * NY)), i1 = Math.min(NY - 2, Math.floor(b * NY));
    let best = findMax ? -Infinity : Infinity, bestU = (a + b) / 2;
    for (let iy = i0; iy <= i1; iy++) {
      const v = fn(iy);
      if (!isFinite(v) || v === 0) continue;
      if (findMax ? v > best : v < best) { best = v; bestU = iy / NY; }
    }
    return bestU;
  };
  const waistU = scan(hipU + 0.02, shoulderU - 0.12, iy => meanR[iy], false);
  const bustU = scan(waistU + 0.04, shoulderU - 0.03,
    iy => meanR[iy] * (1 + 0.5 * (maxZ[iy] / Math.max(maxAx[iy], 1e-4))), true);
  const seatU = scan(Math.max(0.02, hipU - 0.10), hipU + 0.06, iy => meanR[iy], true);

  return {
    H, baseY,
    meanR, rBody, cz, maxAx, maxZ, minZ, legR, armR, legCx, armLen,
    shoulderU, hipU, kneeU, ankleU, neckU, headU, waistU, bustU, seatU,
    armX: pArmL ? Math.abs(pArmL.x) : 0.10 * H,
    armTilt: Math.atan2(Math.abs((pHandL ? pHandL.x : 0) - (pArmL ? pArmL.x : 0)),
      Math.max((pArmL ? pArmL.y : 0.8 * H) - (pHandL ? pHandL.y : 0.5 * H), 1e-3)),
    legHalf: pLegL ? Math.abs(pLegL.x) : 0.07 * H,
  };
}

/* ---------------- 网格采样 ---------------- */

const atU = (arr, u) => arr[Math.min(NY - 1, Math.max(0, Math.floor(u * NY)))];
/** 纵向线性插值：避免按切片取整导致的横向条纹 */
function lerpU(arr, u) {
  const f = Math.min(NY - 1.001, Math.max(0, u * NY));
  const i0 = Math.floor(f), i1 = i0 + 1, t = f - i0;
  const a = arr[i0], b = arr[i1];
  if (!isFinite(a)) return b;
  if (!isFinite(b)) return a;
  return a + (b - a) * t;
}

function silR(src, u, th) {
  const fy = Math.min(NY - 1.001, Math.max(0, u * NY));
  const i0 = Math.floor(fy), i1 = Math.min(NY - 1, i0 + 1), ty = fy - i0;
  const at = iy => {
    const ft = (th + Math.PI) / DTH;
    const j = Math.floor(ft);
    const it0 = ((j % NTH) + NTH) % NTH;
    const it1 = (it0 + 1) % NTH;
    const tt = ft - j;
    return src.rBody[iy * NTH + it0] * (1 - tt) + src.rBody[iy * NTH + it1] * tt;
  };
  return at(i0) * (1 - ty) + at(i1) * ty;
}
function silCz(src, u) {
  const f = Math.min(NY - 1, Math.max(0, u * NY));
  const i0 = Math.floor(f), i1 = Math.min(NY - 1, i0 + 1), t = f - i0;
  return src.cz[i0] * (1 - t) + src.cz[i1] * t;
}

/* ---------------- 预热 ---------------- */

export function prepareBody() {
  if (_readyPromise) return _readyPromise;
  _readyPromise = loadGltf().then(gltf => {
    const root = gltf.scene;
    const bones = {};
    root.traverse(o => { if (o.isBone) bones[o.name] = o; });
    for (const side of ['Left', 'Right']) {
      const b = bones[side + 'Arm'];
      if (b) b.rotation.z += (side === 'Left' ? -1 : 1) * ARM_DROP_DEG * Math.PI / 180;
    }
    root.updateMatrixWorld(true);

    let mesh = null;
    root.traverse(o => { if (o.isSkinnedMesh && !mesh) mesh = o; });
    if (!mesh) throw new Error('模型不是蒙皮网格');
    mesh.frustumCulled = false;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (mesh.material) {
      mesh.material.side = THREE.FrontSide;
      if ('envMapIntensity' in mesh.material) mesh.material.envMapIntensity = 0.7;
    }

    // 归一化：身高 1、脚底 0（后续克隆都继承这个基准）
    const pos = mesh.geometry.attributes.position;
    const v = new THREE.Vector3();
    const bounds = () => {
      const b = new THREE.Box3();
      root.updateMatrixWorld(true);
      for (let i = 0; i < pos.count; i += 2) {
        v.fromBufferAttribute(pos, i);
        mesh.applyBoneTransform(i, v);
        v.applyMatrix4(mesh.matrixWorld);
        b.expandByPoint(v);
      }
      return b;
    };
    const b0 = bounds();
    root.scale.multiplyScalar(1 / (b0.max.y - b0.min.y));
    const b1 = bounds();
    root.position.y -= b1.min.y;
    root.updateMatrixWorld(true);

    NORM = bakeSilhouette(mesh, 1, 0);   // 归一化后身高恰为 1、脚底 y=0
    const H0 = DEFAULT_MODEL.height;
    NORM.girthCm = {
      bust: NORM.meanR[Math.floor(NORM.bustU * NY)] * Math.PI * 2 * H0,
      waist: NORM.meanR[Math.floor(NORM.waistU * NY)] * Math.PI * 2 * H0,
      hip: NORM.meanR[Math.floor(NORM.seatU * NY)] * Math.PI * 2 * H0,
    };
    return gltf;
  });
  return _readyPromise;
}

export function bodyReady() { return !!WL; }
export function bodyGirthCm() { return NORM ? NORM.girthCm : null; }

/* ---------------- 对外接口（与旧版同名） ---------------- */

export function radiusAt(dense, y) {
  if (!dense || !dense.length) return 0.02;
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

function denseProfile(pick, u0, u1, H, base, steps) {
  const out = [];
  for (let i = 0; i <= steps; i++) {
    const u = u0 + (u1 - u0) * (i / steps);
    out.push([pick(u), base + u * H]);
  }
  return out.sort((a, b) => a[1] - b[1]);
}

export function bodyProfile(model) {
  const p = { ...DEFAULT_MODEL, ...(model || {}) };
  const H = p.height * U;
  const base = FOOT_Y;
  const S = WL || NORM;
  if (!S) throw new Error('人体模型尚未加载完成');
  const isEmptyWorld = !WL;
  const sc = isEmptyWorld ? H : 1;      // 归一化空间量出的是「占身高比例」，要乘身高

  const yOf = u => base + u * H;
  const R = r => r * sc;
  const armU = isEmptyWorld ? S.armLen : S.armLen / H;   // 手臂长度换算成身高比例

  const torso = denseProfile(u => R(lerpU(S.meanR, u)), Math.max(0, S.hipU - 0.12), S.shoulderU + 0.03, H, base, 110);
  const leg = denseProfile(u => R(lerpU(S.legR, u)), S.ankleU - 0.01, S.hipU + 0.02, H, base, 70);
  const arm = denseProfile(u => R(lerpU(S.armR, u)), S.shoulderU - armU - 0.02, S.shoulderU + 0.02, H, base, 60);

  const depthAt = yy => {
    const u = Math.min(1, Math.max(0, (yy - base) / H));
    const w = lerpU(S.maxAx, u) * 2;
    const d = lerpU(S.maxZ, u) - lerpU(S.minZ, u);
    return w > 1e-4 ? Math.min(1.25, Math.max(0.55, d / w)) : 0.78;
  };

  return {
    p, H, base,
    hipY: yOf(S.hipU), waistY: yOf(S.waistU), bustY: yOf(S.bustU), topY: yOf(S.shoulderU),
    shoulderTop: yOf(S.shoulderU + 0.012),
    headY: yOf(S.headU), hr: (1 - S.headU) * H * 0.45,
    neckR: R(lerpU(S.meanR, S.neckU)),
    rBust: R(lerpU(S.meanR, S.bustU)),
    rWaist: R(lerpU(S.meanR, S.waistU)),
    rHip: R(lerpU(S.meanR, S.seatU)),
    rShoulder: R(S.armX),
    depth: depthAt(yOf(S.bustU)),
    depthAt,
    bust: { y: yOf(S.bustU), amp: 0, spread: 0.30, band: 0.082, under: 0 },
    seat: { y: yOf(S.seatU), amp: 0, band: 0.10 },
    torso, arm, leg,
    armX: R(S.armX), armTilt: S.armTilt, palmY: yOf(S.shoulderU - armU),
    legHalf: R(S.legHalf), legTop: yOf(S.hipU - 0.02), ankleY: yOf(S.ankleU),
    legDepth: 0.94,
    _H: H, _src: S, _scale: sc,
  };
}

/** 服装壳体：真实截面轮廓 × 半径比例，放松量沿径向外扩 */
export function shellGeometry(P, y0, y1, ny, radiusFn, easeFn, nTheta = 64) {
  const H = P._H, base = P.base, S = P._src;
  const MIN_PAD = 0.006;
  const PAD = 0.016;                        // 布料与皮肤间隙（约 8mm）
  const pos = [], idx = [];
  const row = nTheta + 1;

  for (let iy = 0; iy <= ny; iy++) {
    const yy = y0 + (y1 - y0) * (iy / ny);
    const u = Math.min(0.999, Math.max(0, (yy - base) / H));
    const target = Math.max(radiusFn(yy) + (easeFn ? easeFn(yy) : 0) + MIN_PAD, 0.02);
    const bodyR = Math.max(lerpU(S.meanR, u), 0.02);
    // 上身只跟随人体轮廓做「贴合式」外扩（放松量），摆幅留给裙摆分支，
    // 否则下摆张开量会把胯部也一起撑开，形成一圈凸缘
    const k = Math.min(1.12, Math.max(1.0, target / bodyR));
    const cz = silCz(S, u);
    const rx = Math.max(lerpU(S.maxAx, u), 0.02);
    const rz = Math.max((lerpU(S.maxZ, u) - lerpU(S.minZ, u)) * 0.5, 0.02);
    const dRatio = Math.min(1.15, Math.max(0.72, rz / Math.max(rx, 1e-4)));
    // 逐行按实际深度比归一化椭圆平均半径，避免版型在胯线出现台阶
    let meanE = 0;
    for (let it = 0; it < nTheta; it++) {
      const th = it / nTheta * Math.PI * 2;
      meanE += dRatio / Math.sqrt(Math.pow(dRatio * Math.cos(th), 2) + Math.pow(Math.sin(th), 2));
    }
    meanE /= nTheta;
    const w = smoothstep(S.hipU - 0.055, S.hipU - 0.150, u);
    for (let it = 0; it <= nTheta; it++) {
      const th = (it / nTheta) * Math.PI * 2;
      let r = silR(S, u, th) * k + PAD;
      if (w > 0.001) {
        const c = Math.cos(th), sn = Math.sin(th);
        const e1 = dRatio / Math.sqrt(Math.pow(dRatio * c, 2) + Math.pow(sn, 2));
        r = r * (1 - w) + (target * (e1 / meanE) + PAD) * w;
      }
      pos.push(r * Math.cos(th), yy, cz + r * Math.sin(th));
    }
  }
  for (let iy = 0; iy < ny; iy++) {
    for (let it = 0; it < nTheta; it++) {
      const a = iy * row + it, c = a + row;
      idx.push(a, a + 1, c, a + 1, c + 1, c);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a || 1e-6)));
  return t * t * (3 - 2 * t);
}

/* ---------------- 构建人体 ---------------- */

export async function buildSmoothBody(model) {
  const gltf = await prepareBody();
  const p = { ...DEFAULT_MODEL, ...(model || {}) };
  const H = p.height * U;

  const group = new THREE.Group();
  const figure = new THREE.Group();
  group.add(figure);

  const root = skeletonClone(gltf.scene);
  root.updateMatrixWorld(true);
  const norm = root.scale.clone();           // 归一化基准（身高 1）
  const hf = horizontalFactor(p);

  root.scale.set(norm.x * H * hf, norm.y * H, norm.z * H * hf);
  root.position.set(0, FOOT_Y, 0);
  root.updateMatrixWorld(true);

  let mesh = null;
  root.traverse(o => { if (o.isSkinnedMesh && !mesh) mesh = o; });
  // 关键：在最终尺度（含横向比例）上量真实轮廓
  WL = bakeSilhouette(mesh, H, FOOT_Y);

  root.traverse(o => {
    if (!o.isMesh) return;
    o.frustumCulled = false;
    o.castShadow = true;
    o.receiveShadow = true;
    if (o.material) { o.material.side = THREE.FrontSide; o.material.needsUpdate = true; }
  });
  figure.add(root);

  return {
    group, figure, root, hf,
    applyProfile: () => { },                 // 档案固定：尺度不变
    footY: () => FOOT_Y,
  };
}

/** 横向比例：让模特围度贴近档案实测值，限制在 ±10% 内避免走形 */
function horizontalFactor(p) {
  const g = NORM && NORM.girthCm;
  if (!g) return 1;
  const rb = p.bust / g.bust, rw = p.waist / g.waist, rh = p.hip / g.hip;
  const raw = [rb, rw, rh].every(v => isFinite(v) && v > 0) ? rb * 0.5 + rw * 0.2 + rh * 0.3 : 1;
  return Math.min(1.06, Math.max(0.97, raw));
}
