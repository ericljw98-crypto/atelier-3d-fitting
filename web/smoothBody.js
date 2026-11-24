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
import { DEFAULT_MODEL, FOOT_Y } from './body.js';
import { inlineGlb, LAND as LAND_DATA } from './models_inline.js';

const U = 1 / 50;
const MODEL_URL = 'models/body_anny.glb';
const LAND_URL = 'models/body_anny.json';
const NY = 200, NTH = 96;         // 切片高度数 × 方位数
const DTH = Math.PI * 2 / NTH;

/* ---------------- 加载 ---------------- */

let _gltfPromise = null;
let LAND = null;
function loadGltf() {
  if (!_gltfPromise) {
    /* 走内联数据，不经过 fetch。
       原先用 GLTFLoader().load(url)，而它内部是 fetch()，在 file://
       协议下必被浏览器拒绝 —— APK 内 WebView 与桌面双击都是 file://，
       于是人体一直加载失败、静默回退成椭球人台。 */
    _gltfPromise = new Promise((resolve, reject) => {
      inlineGlb(new GLTFLoader(), MODEL_URL, resolve,
        err => reject(new Error('人体模型加载失败：' + (err && err.message || err))));
    }).then(gltf => { LAND = LAND_DATA || {}; return gltf; });
  }
  return _gltfPromise;
}

let NORM = null;            // 归一化空间（身高 1、脚底 0）的骨骼锚点
let WL = null;              // 最终尺度下的真实轮廓网格（场景单位）
let _readyPromise = null;

/* 皮肤材质：白皙哑光人台质感 —— 无贴图、靠次表面色调与柔和光泽撑住真实感，
   避免扫描贴图被围度拉伸后出现横带 */
const BODY_MAT = new THREE.MeshPhysicalMaterial({
  color: 0xf0d0bd,
  roughness: 0.56,
  metalness: 0.0,
  sheen: 0.45,
  sheenRoughness: 0.65,
  sheenColor: new THREE.Color(0xffe4d6),
  clearcoat: 0.05,
  clearcoatRoughness: 0.55,
  // 人体是闭合实体：必须单面。用双面会在某些角度看到内表面（反面法线朝外），
  // 渲染成大片"无意义的黑色"。
  side: THREE.FrontSide,
});

/* ---------------- 顶点采集 ---------------- */

function collectVertices(mesh) {
  const geo = mesh.geometry;
  const pos = geo.attributes.position;
  const col = geo.attributes.color;     // R=手臂权重 G=腿权重 B=左右
  const n = pos.count;
  const X = new Float32Array(n), Y = new Float32Array(n), Z = new Float32Array(n);
  const KIND = new Uint8Array(n);      // 0 躯干 1 手臂 2 腿
  const SIDE = new Int8Array(n);
  const v = new THREE.Vector3();
  mesh.updateMatrixWorld(true);

  for (let i = 0; i < n; i++) {
    v.fromBufferAttribute(pos, i);
    v.applyMatrix4(mesh.matrixWorld);
    X[i] = v.x; Y[i] = v.y; Z[i] = v.z;

    const aw = col ? col.getX(i) : 0;
    const lw = col ? col.getY(i) : 0;
    if (aw > 0.5) KIND[i] = 1;
    else if (lw > 0.5) KIND[i] = 2;
    SIDE[i] = (col && col.getZ(i) > 0.5) ? 1 : -1;
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
  const L = LAND || {};
  /* ⚠ 关键点分两类：y 是「脚底基准 + 占身高比例」，x 是「以身体中线为原点的
     横向偏移」，只乘身高、不加脚底偏移。此前一个 lit() 同时给 x 和 y 加了
     baseY（= −1.73），armX 0.144 被算成 −1.25、legHalf 0.08 算成 −1.47，
     于是袖子被摆到身侧一米开外，成了两根悬空的黑柱子。 */
  const litY = (k, d) => (isFinite(L[k]) ? L[k] * H + baseY : d);
  const litX = (k, d) => (isFinite(L[k]) ? L[k] * H : d);
  // 关键点（归一化空间 → 当前尺度，y 为高度、x 为左右、z 前后取 0）
  const pArmL = new THREE.Vector3(litX('armX', 0.16 * H), litY('shoulderU', 0.82 * H), 0);
  const pArmR = new THREE.Vector3(-pArmL.x, pArmL.y, 0);
  const pHandL = new THREE.Vector3(litX('handX', 0.17 * H), litY('handU', 0.49 * H), 0);
  const pHandR = new THREE.Vector3(-pHandL.x, pHandL.y, 0);
  const pUpLegL = new THREE.Vector3(litX('legHalf', 0.10 * H), litY('hipU', 0.52 * H), 0);
  const pLegL = new THREE.Vector3(litX('legHalf', 0.10 * H), litY('kneeU', 0.28 * H), 0);
  const pFootL = new THREE.Vector3(litX('ankleX', 0.09 * H), litY('ankleU', 0.05 * H), 0);
  const pNeck = new THREE.Vector3(0, litY('neckU', 0.86 * H), 0);
  const pHead = new THREE.Vector3(0, litY('headU', 0.93 * H), 0);

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

  /* 手臂轴线的长度稍后再算——它要用「逐切片实测的手臂中心」，
     而那批数据正是下面这一遍循环要收集的。 */

  /* 第二遍：轮廓 + 剖面 */
  const rBody = new Float32Array(NY * NTH);
  const cntBody = new Uint16Array(NY * NTH);
  const maxAx = new Float32Array(NY), maxZ = new Float32Array(NY), minZ = new Float32Array(NY);
  // 哨兵必须用有限值。若某个切片没有躯干顶点，maxZ/minZ 会保留哨兵，
  // 而 shellGeometry 里 (maxZ - minZ) 得到 NaN，顶点 NaN 光栅化成横贯全屏的巨型
  // 三角形——这正是"外套变成挡住镜头的黑块"的成因。
  for (let iy = 0; iy < NY; iy++) { maxZ[iy] = -0.06; minZ[iy] = 0.06; }
  const legRSum = new Float32Array(NY), legRCnt = new Uint32Array(NY);
  /* 手臂：逐切片求「左右对称的 |x| 中心」与二阶矩。
     不能拿 armX 当轴线再量到轴线的距离：armX 是肩部最外侧的半宽，
     不是手臂中心，轴线整整偏出一个臂半径，量出的半径被 sqrt(r²+d²) 放大，
     袖筒因此被削成一截粗壮的方柱，还被推到肩膀外面。 */
  const armAxSum = new Float32Array(NY), armZSum = new Float32Array(NY);
  const armA2Sum = new Float32Array(NY), armZ2Sum = new Float32Array(NY);
  const armRCnt = new Uint32Array(NY);

  for (let i = 0; i < V.n; i++) {
    const x = V.X[i], y = V.Y[i], z = V.Z[i];
    const iy = sliceOf(y);
    if (V.KIND[i] === 1) {
      const ax = Math.abs(x);
      armAxSum[iy] += ax; armZSum[iy] += z;
      armA2Sum[iy] += ax * ax; armZ2Sum[iy] += z * z;
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
  const armCx = new Float32Array(NY);
  for (let iy = 0; iy < NY; iy++) {
    if (armRCnt[iy]) {
      const n = armRCnt[iy];
      const mx = armAxSum[iy] / n, mz = armZSum[iy] / n;
      const vx = Math.max(armA2Sum[iy] / n - mx * mx, 0);
      const vz = Math.max(armZ2Sum[iy] / n - mz * mz, 0);
      armR[iy] = Math.sqrt(vx + vz);   // 均方根半径：圆截面即半径本身
      armCx[iy] = mx;
    }
    if (legRCnt[iy]) legR[iy] = legRSum[iy] / legRCnt[iy];
  }
  for (let pass = 0; pass < 5; pass++) {
    const s1 = armR.slice(), s2 = legR.slice();
    for (let i = 1; i < NY - 1; i++) {
      if (armR[i] > 0) armR[i] = (s1[i - 1] + s1[i] * 2 + s1[i + 1]) / 4;
      if (legR[i] > 0) legR[i] = (s2[i - 1] + s2[i] * 2 + s2[i + 1]) / 4;
    }
  }

  /* 统一清洗：任何 NaN / 非有限值 / 0 半径都不得进入几何 */
  const sanitize = (arr, fallback = 0.05) => {
    let firstOk = -1;
    for (let i = 0; i < arr.length; i++) {
      if (isFinite(arr[i]) && arr[i] > 1e-6) { firstOk = i; break; }
    }
    if (firstOk < 0) { arr.fill(fallback); return arr; }
    for (let i = 0; i < arr.length; i++) {
      if (!isFinite(arr[i]) || arr[i] <= 1e-6) {
        let a = i - 1, b = i + 1;
        while (a >= 0 && (!isFinite(arr[a]) || arr[a] <= 1e-6)) a--;
        while (b < arr.length && (!isFinite(arr[b]) || arr[b] <= 1e-6)) b++;
        if (a >= 0 && b < arr.length) {
          const t = (i - a) / (b - a);
          arr[i] = arr[a] + (arr[b] - arr[a]) * t;
        } else if (a >= 0) arr[i] = arr[a];
        else arr[i] = arr[b];
      }
    }
    return arr;
  };
  sanitize(meanR); sanitize(maxAx); sanitize(maxZ); sanitize(minZ);
  sanitize(armR, 0.045); sanitize(legR, 0.055);
  for (let i = 0; i < NY * NTH; i++) {
    if (!isFinite(rBody[i]) || rBody[i] < 0) rBody[i] = 0.02;
  }
  for (let i = 0; i < NY; i++) { if (!isFinite(cz[i])) cz[i] = 0; }

  /* 关键高度（u = 占身高比例，与尺度无关） */
  const shoulderU = pArmL ? uOf(pArmL.y) : 0.82;
  const hipU = pUpLegL ? uOf(pUpLegL.y) : 0.52;
  const kneeU = pLegL ? uOf(pLegL.y) : 0.28;
  const ankleU = pFootL ? uOf(pFootL.y) : 0.05;
  const neckU = pNeck ? uOf(pNeck.y) : shoulderU + 0.04;
  const headU = pHead ? uOf(pHead.y) : 0.92;

  /* 手臂中心：取上臂中段（肩点下 0.05 个身高）实测的 |x| 中心。
     LAND 里的 armX 是肩部最外侧半宽，当轴线用会偏出一个臂半径。 */
  sanitize(armCx, Math.abs(pArmL ? pArmL.x : 0.12 * H));
  /* 手臂中心必须平滑。逐切片均值在肩部会把三角肌与腋窝混在一起，
     相邻切片跳两三毫米；拿它当袖筒轴线，袖子就变成一圈圈横向棱。
     只在手臂存在的区间内平滑，避免把腰部的手性数据带偏。 */
  for (let pass = 0; pass < 4; pass++) {
    const src = armCx.slice();
    for (let iy = 1; iy < NY - 1; iy++) {
      if (armRCnt[iy] && armRCnt[iy - 1] && armRCnt[iy + 1]) {
        armCx[iy] = (src[iy - 1] + src[iy] * 2 + src[iy + 1]) / 4;
      }
    }
  }
  const iArmC = Math.min(NY - 1, Math.max(0, Math.round((shoulderU - 0.05) * NY)));
  const armXm = (isFinite(armCx[iArmC]) && armCx[iArmC] > 1e-3)
    ? armCx[iArmC]
    : Math.abs(pArmL ? pArmL.x : 0.12 * H);
  if (pArmL) pArmL.x = armXm;

  /* 手臂长度：肩点 → 手部关键点的直线距离（用于换算袖长覆盖范围） */
  const armVec = (pArmL && pHandL)
    ? new THREE.Vector3().subVectors(pHandL, pArmL)
    : new THREE.Vector3(0, -0.30 * H, 0);
  const armLen = Math.max(armVec.length(), 1e-3);

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
    armX: armXm,
    armCx,                                   // 逐切片实测的手臂中心 |x|（衣袖轴线用）
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
    root.updateMatrixWorld(true);

    let mesh = null;
    root.traverse(o => { if (o.isMesh && !mesh) mesh = o; });
    if (!mesh) throw new Error('模型不是网格');
    mesh.frustumCulled = false;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (mesh.material) {
      mesh.material.side = THREE.FrontSide;
      mesh.material.vertexColors = false;      // COLOR_0 只是部件标记，不参与着色
      if ('envMapIntensity' in mesh.material) mesh.material.envMapIntensity = 0.7;
      mesh.material.needsUpdate = true;
    }

    // 归一化：身高 1、脚底 0、左右居中
    mesh.geometry.computeBoundingBox();
    const bb = mesh.geometry.boundingBox;
    const h0 = bb.max.y - bb.min.y;
    const s = 1 / h0;
    root.scale.multiplyScalar(s);
    root.position.set(-(bb.max.x + bb.min.x) * 0.5 * s,
      -bb.min.y * s,
      -(bb.max.z + bb.min.z) * 0.5 * s);
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
export function bodyGirthCm() {
  // 优先回报建模实测值：2π·meanR 对非圆截面会低估 8–10%，别拿它当"当前围度"
  const M = (LAND_DATA && LAND_DATA.measured) || null;
  if (M) return { bust: M.bust, waist: M.waist, hip: M.hip };
  return NORM ? NORM.girthCm : null;
}

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
    const rzRaw = (lerpU(S.maxZ, u) - lerpU(S.minZ, u)) * 0.5;
    const rz = isFinite(rzRaw) ? Math.max(rzRaw, 0.02) : 0.06;
    const dRatio = Math.min(1.15, Math.max(0.72, rz / Math.max(rx, 1e-4)));
    const rMax = bodyR * 1.55;             // 硬上限：绝不允许壳体半径离体
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
      if (!isFinite(r)) r = bodyR;
      r = Math.min(Math.max(r, 0.02), rMax);
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

/* ============================================================
   变边壳体（v2）—— 领口、袖窿、斜下摆
   ------------------------------------------------------------
   shellGeometry 的顶边是一条水平环，做成衣就是一截「平口筒」：
   无论什么版型，领口都是一条横线绕脖子一圈，肩部完全不存在。
   这个版本把顶边与底边都改成按方位角变化的曲线，
   于是 V 领、圆领、一字领、袖窿、斜摆都只是同一个函数的参数。

   ⚠ 放松量的写法也换了：旧版是 r = 人体半径 × k（k = 目标/人体），
   这是「同比放大」，肩宽和腰宽被同一个比例一起撑开，宽松款直接变成
   桶状。布料实际是「离体一个几乎等距的空气层」，所以改为
   r = 人体半径 + 间隙（米），宽处窄处加同样的量。
   ============================================================ */
export function shellVarying(P, opt) {
  const H = P._H, base = P.base, S = P._src;
  const rows = opt.rows || 90;
  const nTheta = opt.nTheta || 72;
  const gap = opt.gap || (() => 0.004);
  const mul = opt.mul || (() => 1);
  const maxMul = opt.maxMul || 1.8;
  const rimTop = opt.rimTop || 0;        // 领口/袖窿翻边深度（米）
  const rimBot = opt.rimBot || 0;        // 下摆折边深度
  const rimIn = opt.rimIn || 0.006;      // 折边向内收的量

  const yBot = typeof opt.yBot === 'function' ? opt.yBot : () => opt.yBot;
  const yTop = typeof opt.yTop === 'function' ? opt.yTop : () => opt.yTop;

  const pos = [], idx = [], uvs = [];
  const row = nTheta + 1;
  const R = new Float32Array((rows + 1) * row);
  const Y = new Float32Array((rows + 1) * row);
  const U = new Float32Array((rows + 1) * row);

  for (let iy = 0; iy <= rows; iy++) {
    for (let it = 0; it <= nTheta; it++) {
      const th = (it % nTheta) / nTheta * Math.PI * 2;
      const t = iy / rows;
      const yy = yBot(th) + (yTop(th) - yBot(th)) * t;
      const u = Math.min(0.999, Math.max(0, (yy - base) / H));
      let r = silR(S, u, th);
      if (!isFinite(r) || r < 0.02) r = 0.02;
      const bodyR = Math.max(lerpU(S.meanR, u), 0.02);
      // 宽松量的上限跟着人体走：绝不出现离体半米的壳体
      const g = Math.min(Math.max(gap(u, yy, th), 0), bodyR * (maxMul - 1));
      r = (r + g) * mul(yy, th);
      r = Math.min(Math.max(r, 0.02), bodyR * maxMul);
      const i = iy * row + it;
      R[i] = r; Y[i] = yy; U[i] = u;
    }
  }

  /* 沿高度方向轻抹两遍半径。
     轮廓表按 200 条切片量化，切片之间的最大半径本身带着 1–2mm 的抖动；
     壳体逐行去采样它，就会在裙面上留下一圈圈横向波纹（看着像布面起皱，
     实际是半径抖动被逐行复述）。抹平的是「行与行之间」的差，
     不改变整体版型。 */
  for (let pass = 0; pass < 2; pass++) {
    for (let it = 0; it <= nTheta; it++) {
      let prev = R[it];
      for (let iy = 1; iy < rows; iy++) {
        const i = iy * row + it;
        const cur = R[i];
        R[i] = prev * 0.25 + cur * 0.5 + R[i + row] * 0.25;
        prev = cur;
      }
    }
  }

  /* 再抹一遍方位角：乳点在轮廓表里是一个尖峰，布面如果逐方位复述它，
     胸前就会顶出一个点。一圈三点的轻微平滑把峰顶摊开，胸型仍在。 */
  for (let iy = 0; iy <= rows; iy++) {
    const base2 = iy * row;
    const src = R.slice(base2, base2 + row);
    for (let it = 0; it < nTheta; it++) {
      const a = src[(it - 1 + nTheta) % nTheta];
      const b = src[it];
      const c = src[(it + 1) % nTheta];
      R[base2 + it] = a * 0.22 + b * 0.56 + c * 0.22;
    }
    R[base2 + nTheta] = R[base2];
  }

  /* 逐行最大半宽：UV 要按「正面投影」给，不能再按方位角均分。
     按方位角均分时，一张商品图会被绕着身子拉一圈，正面只剩左半边、
     侧面直接采到浅灰背景，看起来像贴了一块布片。 */
  const rowX = new Float32Array(rows + 1);
  for (let iy = 0; iy <= rows; iy++) {
    let mx = 0.02;
    for (let it = 0; it < nTheta; it++) {
      const th = it / nTheta * Math.PI * 2;
      const x = Math.abs(R[iy * row + it] * Math.cos(th));
      if (x > mx) mx = x;
    }
    rowX[iy] = mx;
  }

  for (let iy = 0; iy <= rows; iy++) {
    for (let it = 0; it <= nTheta; it++) {
      const i = iy * row + it;
      const th = (it % nTheta) / nTheta * Math.PI * 2;
      const r = R[i], yy = Y[i];
      const cz = silCz(S, U[i]);
      const x = r * Math.cos(th);
      pos.push(x, yy, cz + r * Math.sin(th));
      uvs.push(Math.min(1, Math.max(0, 0.5 + 0.5 * x / rowX[iy])), iy / rows);
    }
  }
  for (let iy = 0; iy < rows; iy++) {
    for (let it = 0; it < nTheta; it++) {
      const a = iy * row + it, c = a + row;
      idx.push(a, a + 1, c, a + 1, c + 1, c);
    }
  }

  /* 折边：把开口边缘往内翻一小段，视觉上就有了布料厚度，
     不会像纸片一样薄得透光。内翻面法线朝内，靠双面材质兜住。 */
  const addRim = (edgeRow, isTop, depth, inw) => {
    if (!(depth > 0)) return;
    const start = (edgeRow === 'top' ? rows : 0);
    const src = [];
    for (let it = 0; it <= nTheta; it++) {
      const i = start * row + it;
      src.push([pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]]);
    }
    const off = pos.length / 3;
    for (let it = 0; it <= nTheta; it++) {
      const th = (it % nTheta) / nTheta * Math.PI * 2;
      const [x, y, z] = src[it];
      const u = Math.min(0.999, Math.max(0, (y - base) / H));
      const cz = silCz(S, u);
      const r = Math.hypot(x, z - cz);
      const rr = Math.max(r - inw, 0.02);
      const yy = y + (isTop ? -depth : depth);
      pos.push(rr * Math.cos(th), yy, cz + rr * Math.sin(th));
      uvs.push(it / nTheta, isTop ? 1 : 0);
    }
    for (let it = 0; it < nTheta; it++) {
      const a = start * row + it, c = a + 1;
      const a2 = off + it, c2 = off + it + 1;
      if (isTop) idx.push(a, a2, c, c, a2, c2);
      else idx.push(a, c, a2, c, c2, a2);
    }
  };
  addRim('top', true, rimTop, rimIn);
  addRim('bot', false, rimBot, rimIn);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/** 顶边轮廓：按方位角给出「肩线高度 → 领口/袖窿下挖」的曲线。
    θ 约定：0 = +x（右侧），π/2 = +z（正前），π = −x，3π/2 = 后中。 */
export function topEdgeFn(P, o) {
  const yShoulder = o.yShoulder;
  const yArm = o.yArm;             // 袖窿最低点（腋下）
  const yFront = o.yFront;         // 前领深
  const yBack = o.yBack;           // 后领深
  const ySide = o.ySide ?? yArm;   // 一字领用得上：侧缝可以不下挖
  // 八个方位控制点（弧度 → 高度）。肩点不能是单点：单点会在肩上留一条
  // 一根手指宽的窄带，看着像吊带。给一个平台，肩缝才有宽度。
  const SIDE_N = o.shoulderSpread ?? 0.62;   // 肩峰角度：正前/正后偏 36°
  const PLAT = o.shoulderPlateau ?? 0.15;    // 肩峰平台半宽
  const pts = [];
  const addS = a => { pts.push([a - PLAT, yShoulder], [a + PLAT, yShoulder]); };
  pts.push([0, ySide]);
  addS(SIDE_N);
  pts.push([Math.PI / 2, yFront]);
  addS(Math.PI - SIDE_N);
  pts.push([Math.PI, ySide]);
  addS(Math.PI + SIDE_N);
  pts.push([Math.PI * 1.5, yBack]);
  addS(Math.PI * 2 - SIDE_N);
  pts.push([Math.PI * 2, ySide]);
  pts.sort((a, b) => a[0] - b[0]);
  // 余弦插值：控制点之间用 smoothstep，导数为零，不会出现折角
  return th => {
    let a = ((th % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    for (let i = 1; i < pts.length; i++) {
      if (a <= pts[i][0]) {
        const [a0, y0] = pts[i - 1], [a1, y1] = pts[i];
        const t = (a - a0) / Math.max(a1 - a0, 1e-6);
        return y0 + (y1 - y0) * (t * t * (3 - 2 * t));
      }
    }
    return pts[0][1];
  };
}


/* ============================================================
   头发与配饰
   ------------------------------------------------------------
   沿用此前按照片还原的发型：黑色齐肩波波头（中短发、略偏分）
   + 偏分刘海，另配细金属圆框眼镜。人体是静态网格（无骨骼），
   头部按 Landmark 定位、整体随身高等比缩放即可稳定显示。
   ============================================================ */

const HAIR_MAT = new THREE.MeshStandardMaterial({
  color: 0x1c1917, roughness: 0.78, metalness: 0.0, side: THREE.DoubleSide,
});
const METAL_MAT = new THREE.MeshStandardMaterial({
  color: 0x8a8172, roughness: 0.35, metalness: 0.75,
});
const LENS_MAT = new THREE.MeshStandardMaterial({
  color: 0xeaf4fa, roughness: 0.05, metalness: 0.0,
  transparent: true, opacity: 0.08, side: THREE.DoubleSide,
});

/* 头发：现成资源（MakeHuman CC0 资产包 hair01 · toigo_inverted_bob_with_bangs）
   ------------------------------------------------------------
   发丝几何不再由程序生成：作者做好的反向波波头 + 刘海，
   在 Python 侧按 mhclo 的 fit 数据落到本模型头上，导出 hair.glb。
   这里只负责加载、贴图与按身高缩放。 */
const HAIR_URL = 'models/hair.glb';
const HAIR_TEX = 'models/hair_long_black.png';

/* 口红：已整体回退关闭（LIPS_ENABLED = false）。
   唇片是"从人体抄一份唇部三角面再外扩"的贴片方案，几何上与皮肤共面，
   长期受三件事折磨：浮空（曾用 depthTest:false 强行置顶）、背面剔除、
   以及 0.4mm 偏移在不同视角下的深度冲突。人脸回到素唇，不再加载。
   若将来确要恢复，把下面开关置 true 即可，其余代码保持可用。 */
const LIPS_ENABLED = false;
const LIPS_URL = 'models/lips.glb';
const LIPS_MAT = new THREE.MeshStandardMaterial({
  color: 0x9c3540,
  roughness: 0.52,
  metalness: 0.0,
  side: THREE.FrontSide,
  polygonOffset: true,
  polygonOffsetFactor: -2,
  polygonOffsetUnits: -2,
});
let _lipsPromise = null;
function loadLips() {
  if (_lipsPromise) return _lipsPromise;
  _lipsPromise = new Promise((resolve) => {
    // 内联解析，理由同 loadGltf（fetch 在 file:// 下不可用）
    inlineGlb(new GLTFLoader(), LIPS_URL,
      g => {
        g.scene.traverse(o => { if (o.isMesh) { o.material = LIPS_MAT; o.frustumCulled = false; o.castShadow = false; o.receiveShadow = false; } });
        resolve(g.scene);
      },
      () => resolve(null)   // 唇片缺失不影响人体
    );
  });
  return _lipsPromise;
}

let _hairPromise = null;
function loadHair() {
  if (_hairPromise) return _hairPromise;
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.62,
    metalness: 0.0,
    alphaTest: 0.14,          // 发丝卡片：按 alpha 裁形，不做半透明排序
                              // 0.28 会裁掉过多边缘像素，发缝透出头皮，故调低
    transparent: false,
    side: THREE.DoubleSide,
  });
  /* 贴图取不到时（file:// 下 img 被拦、或资源缺失）材质会退回默认白色，
     整头白发比露头皮更刺眼。这里失败就把底色压成深发色。 */
  const tex = new THREE.TextureLoader().load(HAIR_TEX, undefined, undefined, () => {
    /* 贴图取不到（file:// 下 img 被拦）时必须把 map 一并摘掉：
       留着一个空纹理，three 会上传白色 1×1，整头发白；
       alphaTest 也要归零，否则卡片被当成全透明区域裁掉。 */
    mat.map = null;
    mat.alphaTest = 0;
    mat.color.setHex(0x120d0b);
    mat.needsUpdate = true;
  });
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  mat.map = tex;
  _hairPromise = new Promise((resolve, reject) => {
    inlineGlb(new GLTFLoader(), HAIR_URL, g => {
      const meshes = [];
      g.scene.traverse(o => { if (o.isMesh) meshes.push(o); });
      meshes.forEach(o => {
        if (!o.geometry.attributes.normal) o.geometry.computeVertexNormals();
        o.material = mat;
        o.castShadow = false;
        o.receiveShadow = false;
        o.frustumCulled = false;
      });
      resolve({ scene: g.scene, meshes });
    }, () => reject(new Error('发型加载失败')));
  });
  return _hairPromise;
}

/* 头皮发帽
   ------------------------------------------------------------
   发丝是卡片网格，靠贴图的 alpha 裁形（alphaTest）。发缝、颅顶
   和鬓角这些地方卡片本身就稀，裁完会透出肤色，看上去像"头顶秃了"。
   补一块紧贴头皮、比皮肤外 1–2mm 的深色壳，藏在发丝内侧：
   头发密的地方完全被盖住，稀的地方由它兜底，不会再有肉色透出来。

   下沿按方位给不同高度：前侧停在发际线（0.947），侧后一路压到
   后颈发根（0.890），否则会盖住额头和耳朵。 */

function makeScalpCap(S, H, base) {
  const NT = 56, NR = 14;
  const U_TOP = 0.9990, U_FRONT = 0.9680, U_BACK = 0.8960;
  const uLo = th => U_FRONT + (U_BACK - U_FRONT) * (0.5 - 0.5 * Math.cos(th));

  /* 体表某高度、某方位的点，取该方位的实测半径再外扩 2mm。
     不能用「最大半宽 × 半深」的椭圆近似：头部各方位半径差得远
     （两侧扁、后脑凸），椭圆会在侧面撑出来，看着像扣了顶黑帽子。
     rBody 的方位角 φ = atan2(z - cz, x)，θ=0 指向 +z，故 φ = π/2 − θ。 */
  const angIdx = th => {
    let i = Math.floor(((Math.PI * 0.5 - th) + Math.PI) / DTH);
    return ((i % NTH) + NTH) % NTH;
  };
  const pt = (u, th) => {
    const iy = Math.min(NY - 1, Math.max(0, Math.round(u * NY)));
    const r = Math.max(S.rBody[iy * NTH + angIdx(th)], 0.004) + 0.0012;
    return [r * Math.sin(th), base + Math.min(u, 1) * H, S.cz[iy] + r * Math.cos(th)];
  };

  const pos = [], idx = [];
  for (let r = 0; r <= NR; r++) {
    const t = r / NR;
    for (let i = 0; i < NT; i++) {
      const th = -Math.PI + i * (2 * Math.PI) / NT;
      const u = uLo(th) + (U_TOP - uLo(th)) * t;
      pos.push(...pt(u, th));
    }
  }
  for (let r = 0; r < NR; r++) {
    for (let i = 0; i < NT; i++) {
      const a = r * NT + i, b = r * NT + (i + 1) % NT;
      const c = (r + 1) * NT + i, d = (r + 1) * NT + (i + 1) % NT;
      idx.push(a, c, b, b, c, d);
    }
  }
  // 顶盖：把最上一圈收成一个点，避免颅顶留一个洞
  const topY = base + 1.0015 * H;
  const topZ = S.cz[NY - 1];
  const apex = pos.length / 3;
  pos.push(0, topY, topZ);
  for (let i = 0; i < NT; i++) {
    idx.push(NR * NT + i, apex, NR * NT + (i + 1) % NT);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x140f0c,          // 接近黑发暗部，遮住发丝卡片的空隙
    roughness: 0.80,
    metalness: 0.0,
    side: THREE.DoubleSide,   // 发丝内侧视角也不能露洞
  });
  const cap = new THREE.Mesh(geo, mat);
  cap.name = 'scalp-cap';
  cap.castShadow = false;
  cap.receiveShadow = false;
  cap.frustumCulled = false;
  return cap;
}

function addHair(S, H, base) {
  // 眼镜仍按实测头宽定位（发型资源里不含眼镜）
  let iwide = Math.floor(0.93 * NY), bestA = 0;
  for (let iy = Math.floor(0.86 * NY); iy < NY - 1; iy++) {
    if (S.maxAx[iy] > bestA) { bestA = S.maxAx[iy]; iwide = iy; }
  }
  const hx = Math.max(bestA / H, 0.035);
  const hz = Math.max((S.maxZ[iwide] - S.minZ[iwide]) * 0.5 / H, 0.045);
  const czN = S.cz[iwide] / H;

  const g = new THREE.Group();
  g.position.set(0, base, 0);
  g.scale.setScalar(H);

  // 镜框 z 必须按「脸颊在镜片横向位置的深度」取，不能按头部平均深度：
  // 取 0.95 时下半圈会陷进脸颊，从正面看镜框只剩上半个弧。
  const eyeU = 0.9315, eyeX = hx * 0.42, lensR = hx * 0.30, lensZ = czN + hz * 1.12;
  [-1, 1].forEach(s => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(lensR, hx * 0.026, 8, 26), METAL_MAT);
    ring.position.set(s * eyeX, eyeU, lensZ);
    g.add(ring);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(lensR * 0.97, 22), LENS_MAT);
    lens.position.set(s * eyeX, eyeU, lensZ);
    g.add(lens);
    const temple = new THREE.Mesh(
      new THREE.CylinderGeometry(hx * 0.022, hx * 0.022, hx * 1.30, 6), METAL_MAT);
    temple.rotation.x = Math.PI / 2;
    temple.position.set(s * (eyeX + lensR), eyeU + hx * 0.04, lensZ - hz * 0.60);
    g.add(temple);
  });
  g.traverse(o => { if (o.isMesh) o.castShadow = false; });
  return g;
}

/* ---------------- 构建人体 ---------------- */

/* 人体造型定版：罩杯 B+ / 乳点抹平 / 腰线收紧 / 双腿并拢
   ------------------------------------------------------------
   扫描人体自带 C 杯、直腰与自然站距，这里直接改顶点，不动拓扑：
   ① 罩杯：只收前半身（z>0）、以乳点为心的两个高斯，前后向压低约 1.2cm，
      对应 C→B+；外侧用 z/0.035 的线性因子收边，侧面不会出折痕。
   ② 乳点：在同一位置叠一个窄高斯（σ≈2.6mm），把顶出的那一点抹平，
      避免试衣时胸前凸点（之前用户提过露点问题）。
   ③ 腰线：腰节处躯干径向收 1cm（≈围度 −6cm），高斯 σ≈9cm，
      和 2D 模特照片对上；四肢不动，只收躯干。
   ④ 腿：裆点往下把 x 往中线收，末梢收到 87%，站姿变窄仍保留自然间隙。
   全部在归一化空间做，1cm ≈ 1/165。 */
function reshapeFigure(geo, S) {
  const pos = geo.attributes.position;
  const arr = pos.array;
  const col = geo.attributes.color;
  const CM = 1 / 165;
  const yBust = S.bustU, ySeat = S.seatU, yWaist = S.waistU;
  geo.computeBoundingBox();
  const bb = geo.boundingBox;
  const cx = (bb.min.x + bb.max.x) * 0.5;
  const xc = 0.058;                       // 乳点距中线的横向位置（归一化）

  const ampWide = 1.15 * CM, ampPeak = 0.55 * CM;
  for (let i = 0; i < arr.length; i += 3) {
    const x = arr[i] - cx, y = arr[i + 1], z = arr[i + 2];
    if (z > 0) {
      const wy = Math.exp(-0.5 * ((y - yBust) / 0.052) ** 2);
      if (wy > 0.01) {
        const dx = Math.abs(Math.abs(x) - xc);
        const wx = Math.exp(-0.5 * (dx / 0.040) ** 2);
        const fz = Math.min(1, z / 0.035);
        const w = wy * wx * fz;
        if (w > 1e-4) {
          const wp = Math.exp(-0.5 * ((y - yBust) / 0.016) ** 2)
                   * Math.exp(-0.5 * (dx / 0.016) ** 2) * fz;
          arr[i + 2] = z - ampWide * w - ampPeak * wp;
        }
      }
    }
    // ③ 腰线：只收躯干（COLOR_0 标记的四肢跳过）
    const v = i / 3;
    const limb = col ? (col.getX(v) > 0.5 || col.getY(v) > 0.5) : false;
    if (!limb) {
      const ww = Math.exp(-0.5 * ((y - yWaist) / 0.055) ** 2);
      if (ww > 0.02) {
        const f = 1 - 0.075 * ww;
        arr[i] = cx + x * f;
        arr[i + 2] = z * f;
      }
    }
    if (y < ySeat * 0.96) {
      const t = Math.min(1, (ySeat * 0.96 - y) / (ySeat * 0.82));
      arr[i] = cx + x * (1 - 0.13 * t);
    }
  }
  pos.needsUpdate = true;
  if (geo.index) geo.computeVertexNormals();
  geo.computeBoundingSphere();
}

export async function buildSmoothBody(model) {
  const gltf = await prepareBody();
  const p = { ...DEFAULT_MODEL, ...(model || {}) };
  const H = p.height * U;

  const group = new THREE.Group();
  const figure = new THREE.Group();
  group.add(figure);

  const root = gltf.scene.clone(true);
  root.updateMatrixWorld(true);
  const norm = root.scale.clone();           // 归一化基准（身高 1）

  root.scale.set(norm.x * H, norm.y * H, norm.z * H);
  root.position.set(root.position.x, FOOT_Y, root.position.z);
  root.updateMatrixWorld(true);

  let mesh = null;
  root.traverse(o => { if (o.isMesh && !mesh) mesh = o; });
  mesh.geometry = mesh.geometry.clone();     // 塑形只改副本，不动缓存

  // 参数化人体：三围在生成模型时已解算到位，运行时不再二次塑形
  WL = bakeSilhouette(mesh, H, FOOT_Y);

  /* 造型定版：罩杯降到 B+、乳点抹平、双腿并拢。
     都改在归一化局部空间（身高=1、脚底=0），所以 1cm ≈ 1/165。
     改完必须重烘轮廓——程序化服装的松量是按轮廓给的，胸和腿变了，
     衣服也得跟着变，否则壳体会穿模。 */
  reshapeFigure(mesh.geometry, WL);
  WL = bakeSilhouette(mesh, H, FOOT_Y);

  root.traverse(o => {
    if (!o.isMesh) return;
    o.frustumCulled = false;
    o.castShadow = true;
    o.receiveShadow = true;
    o.material = BODY_MAT;
  });
  figure.add(root);

  const hair = await loadHair();
  const hairRoot = hair.scene.clone(true);
  hairRoot.traverse(o => {
    if (!o.isMesh) return;
    o.material = hair.meshes[0] ? hair.meshes[0].material : o.material;
    o.frustumCulled = false;
  });
  hairRoot.scale.setScalar(H);
  hairRoot.position.set(0, FOOT_Y, 0);
  figure.add(hairRoot);
  figure.add(makeScalpCap(WL, H, FOOT_Y));   // 发帽：藏在发丝内侧
  figure.add(addHair(WL, H, FOOT_Y));

  // 口红已回退：不再加载唇片薄片。人脸采用素唇（人体材质本身是纯肤色）。
  if (LIPS_ENABLED) {
    const lips = await loadLips();
    if (lips) root.add(lips.clone(true));
  }

  /* ---------------- 滑块实时塑形 ----------------
     三围滑块必须真的改变人体，否则调节毫无意义。做法是按身高方向分段
     做径向缩放：胸/腰/臀各一段高斯权重，系数 = 目标围度 / 当前围度。
     顶点只沿水平方向缩放，不改身高、不动四肢粗细，避免整体走形。 */
  const basePos = mesh.geometry.attributes.position.array.slice();
  const nVert = basePos.length / 3;
  const KIND = new Uint8Array(nVert);
  {
    const col = mesh.geometry.attributes.color;
    for (let i = 0; i < nVert; i++) {
      const armW = col ? col.getX(i) : 0;
      const legW = col ? col.getY(i) : 0;
      KIND[i] = (armW > 0.5 || legW > 0.5) ? 1 : 0;   // 只缩躯干
    }
  }

  /* 当前（已烘焙）人体在三段高度的实际围度，单位 cm。
     ⚠ 不要用 2π·meanR 当基准：meanR 是各方位极角的平均半径，
     对非圆形截面（胸部、臀部）系统性低估 8–10%，一比就把人体放大。
     直接取建模时的实测围度（models/body_anny.json 的 measured），
     再按身高等比修正 —— 模型等腰放大时围度同比例增大。 */
  const S = WL;
  const MEAS = (LAND_DATA && LAND_DATA.measured) || null;
  const K_H = (MEAS && LAND_DATA.height_cm) ? p.height / LAND_DATA.height_cm : 1;
  const girthCm = u => 2 * Math.PI * lerpU(S.meanR, u) * (1 / U);   // 兜底用
  const U_BUST = S.bustU, U_WAIST = S.waistU, U_HIP = S.seatU;
  const G_BUST = MEAS ? MEAS.bust * K_H : girthCm(U_BUST);
  const G_WAIST = MEAS ? MEAS.waist * K_H : girthCm(U_WAIST);
  const G_HIP = MEAS ? MEAS.hip * K_H : girthCm(U_HIP);

  let curKey = '';
  function applyProfile(model) {
    const m = { ...DEFAULT_MODEL, ...(model || {}) };
    const key = [m.bust, m.waist, m.hip].join(',');
    if (key === curKey) return;          // 没变就不重算
    curKey = key;

    const rb = (m.bust || G_BUST) / G_BUST;
    const rw = (m.waist || G_WAIST) / G_WAIST;
    const rh = (m.hip || G_HIP) / G_HIP;
    const clampR = v => Math.min(1.45, Math.max(0.65, v));
    const kb = clampR(rb) - 1, kw = clampR(rw) - 1, kh = clampR(rh) - 1;

    const pos = mesh.geometry.attributes.position;
    const arr = pos.array;
    const gs = (c, sd) => Math.exp(-0.5 * ((c) / sd) ** 2);
    for (let i = 0; i < nVert; i++) {
      const j = i * 3;
      const y = basePos[j + 1];
      const wb = gs(y - U_BUST, 0.075);
      const ww = gs(y - U_WAIST, 0.070);
      const wh = gs(y - U_HIP, 0.078);
      const sum = wb + ww + wh;
      const k = KIND[i] === 1 || sum < 1e-6 ? 0
        : (kb * wb + kw * ww + kh * wh) / sum;
      const f = 1 + k;
      arr[j] = basePos[j] * f;
      arr[j + 2] = basePos[j + 2] * f;
      arr[j + 1] = y;                    // 身高不动
    }
    pos.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeBoundingSphere();

    // 轮廓重烘焙：程序化服装读它生成，因此会跟着滑块一起变
    WL = bakeSilhouette(mesh, H, FOOT_Y);
  }

  return {
    group, figure, root,
    applyProfile,
    footY: () => FOOT_Y,
  };
}
