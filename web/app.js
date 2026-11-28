import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DB, DB_BY_ID, DB_CATEGORIES, DB_META, BRANDS, PREMIUM_BRANDS, PREMIUM_TAB, EU_TAB, SIZE_CHART, SIZES, SILHOUETTE_NAMES, PALETTE, slotOf, normalizeSize, sizeLetter, sizeNumber } from './data.js';
import { isShoe } from './shoeFilter.js';
import { isAllowedLine } from './brandLineFilter.js';
import { MEN_SALE } from './menSaleCatalog.js';
import { KAMERON_DEEP } from './kameronDeepCatalog.js';
import { DEFAULT_MODEL, FIELD_META, FOOT_Y, buildBody, modelSummary, bodyMetrics } from './body.js';
import { buildGarment, recommendSize, specText } from './garment.js';
import { buildSmoothBody, bodyReady } from './smoothBody.js';
import { evaluateFit, evaluateItem, garmentMeasurements, fitSizeForModel, fitGrade } from './fitEngine.js';
import { premiumSizeLabel } from './premiumBrands.js';
import { initUpdate } from './update.js';
import { matchImage } from './imageMatch.js';

/* ============================================================
   3D 场景（沿用既有渲染框架）
   ============================================================ */
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
camera.position.set(0, 0.35, 6.2);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.target.set(0, 0, 0);
controls.minDistance = 3.2;
controls.maxDistance = 10;
controls.minPolarAngle = Math.PI * 0.12;
controls.maxPolarAngle = Math.PI * 0.88;
controls.enablePan = false;

scene.add(new THREE.AmbientLight(0xffffff, 0.55));
scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x2a2118, 0.55));
const key = new THREE.DirectionalLight(0xfff3e0, 2.1);
key.position.set(3.5, 6, 5);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -3; key.shadow.camera.right = 3;
key.shadow.camera.top = 4; key.shadow.camera.bottom = -3;
key.shadow.camera.near = 0.5; key.shadow.camera.far = 20;
// normalBias 按法线方向偏移阴影采样点，消除曲面自阴影（shadow acne）。
// 但不能过大：3.5cm 在 1.75m 的人体上会让腋窝、背沟这种凹处的阴影整体错位，
// 表现为一块块深色斑（用户看到的"黑点"）。按身高量级取 1cm 级才正确。
key.shadow.normalBias = 0.012;
key.shadow.bias = -0.0005;
scene.add(key);
const fill = new THREE.DirectionalLight(0xa8c0ff, 0.8);
fill.position.set(-4, 2, -3); scene.add(fill);
const rim = new THREE.DirectionalLight(0xffd9a8, 0.9);
rim.position.set(0, 3, -5); scene.add(rim);

const platform = new THREE.Mesh(
  new THREE.CylinderGeometry(1.85, 1.85, 0.09, 64),
  new THREE.MeshStandardMaterial({ color: 0x1b2029, roughness: 0.55, metalness: 0.25 })
);
platform.position.y = -1.80; platform.receiveShadow = true; scene.add(platform);
const ring = new THREE.Mesh(
  new THREE.RingGeometry(1.86, 1.90, 64),
  new THREE.MeshBasicMaterial({ color: 0xc9a87c, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
);
ring.rotation.x = -Math.PI / 2; ring.position.y = -1.75; scene.add(ring);

const avatarGroup = new THREE.Group();
const garmentGroup = new THREE.Group();
avatarGroup.add(garmentGroup);
scene.add(avatarGroup);

/* ============================================================
   应用状态
   ============================================================ */
const LS_KEY = 'atelier_model_profile_v1';
const state = {
  model: null,                         // 建档后的模特参数
  brand: PREMIUM_TAB.id,               // 默认打开 HIGH UA；标签顺序 HIGH UA → HIGH EU
  category: 'dresses',
  size: 'IT 46',
  sizeLocked: false,                   // 用户手动指定过尺码后，不再被自动推荐覆盖
  outfit: { tops: null, bottoms: null, dresses: null, outer: null },
  activeSlot: null,
  color: PALETTE.black.hex,
  colorName: PALETTE.black.name,
  customPhoto: null,                   // 上传照片直接上身：{ url, category }
  query: '',                           // 商品搜索关键词：命中时跨品牌、跨品类全局搜索
  filterColor: '',                     // 颜色筛选
  filterStyle: '',                     // 款式（版型）筛选
  filterGrade: '',                     // 合身等级筛选（3/2/1 星）
  filterPBrand: '',                    // 高分服饰页里的品牌筛选
  filterPlatform: '',                  // 高分服饰页里的销售平台筛选
};

function loadProfile() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return (p && typeof p.height === 'number') ? p : null;
  } catch { return null; }
}
function saveProfile(p) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch { /* 隐私模式忽略 */ }
}

/* 重建人体：写实模特（视觉外壳），尺寸由档案驱动 */
let currentAvatarMesh = null;
let currentRealBody = null;
let bodyPromise = null;

/** 加载写实模特（只做一次），返回 Promise */
function ensureBody() {
  if (currentRealBody) return Promise.resolve(currentRealBody);
  if (bodyPromise) return bodyPromise;
  bodyPromise = buildSmoothBody(state.model).then(body => {
    currentRealBody = body;
    currentAvatarMesh = body.group;
    avatarGroup.add(body.group);
    avatarGroup.add(garmentGroup);
    return body;
  }).catch(err => {
    // 静默回退会让"模型怎么还是最初那个"变得无从判断，这里明确提示出来
    console.error('写实人体加载失败，回退参数化人体', err);
    toast('写实人体加载失败，已回退简化人台（' + ((err && err.message) || err) + '）');
    currentAvatarMesh = buildBody(state.model);
    avatarGroup.add(currentAvatarMesh);
    avatarGroup.add(garmentGroup);
    applyBodyScale();
    return null;
  });
  return bodyPromise;
}

function rebuildAvatar() {
  if (currentRealBody) { currentRealBody.applyProfile(state.model); return Promise.resolve(currentRealBody); }
  return ensureBody();
}
function applyBodyScale() {
  // 写实模特自身已处理缩放，参数化回退时才需要
  if (currentRealBody) return;
  const k = bodyMetrics(state.model);
  avatarGroup.scale.set(k.hs, k.hs, k.hs);
  avatarGroup.position.y = FOOT_Y * (1 - k.hs);
}

/* ============================================================
   2D 平面视图（与 3D 同时试穿）
   ------------------------------------------------------------
   右边的 2D 不是另建一套模型，而是同一场景、同一台模特、同一件衣服，
   换一台「正交相机」再渲染一遍：正交投影没有近大远小，画出来就是服装
   制图里的平立面图——肩线、袖长、下摆到哪里，都能直接和 3D 对照看。
   换色、换码、换款只改一处状态，两边同一个数据源，不会各说各话。
   ============================================================ */
const flatEls = {
  fit: document.getElementById('canvas-2d-fit'),
  label: document.getElementById('flat-view-label'),
  caption: document.getElementById('flat-caption'),
  empty: document.getElementById('flat-empty'),
  clear: document.getElementById('flat-clear'),
};
const flat = { dirty: true };
function flatMark() { flat.dirty = true; }

/* ---------------- 2D 上身合成 ----------------
   底图是一张按档案尺寸（165cm / 94.5-87-100）生成的正面站姿人像，
   商品图抠掉浅色背景后按「胸宽 / 臀宽」等比贴合上去，再用人体剪影遮罩
   把溢出体外的部分裁掉——这样袖子和下摆不会像贴纸一样浮在背景上。
   标定点全部落在像素坐标上：1420px 对应 165cm，故 1cm ≈ 8.61px。 */
/* 人手标定的像素参数（底图 1024×1536，头顶 y=56 到脚底 y=1476 对应 165cm，
   故 1cm = 1420/165 = 8.606px）。这些数值是把标定线画回原图逐条核对过的，
   不是按比例估的：
     肩峰 y=340，左右外缘 343..686 → 343px = 39.9cm（档案肩宽 40cm）
     腋下 y=412
     胸围线 y=470
     腰线 y=620，躯干 380..640 → 260px = 30.2cm（对应围度 ≈86cm，档案 87cm）
     胯线 y=780，345..672 → 332px = 38.6cm（对应围度 ≈104cm，比档案 100cm 宽 4%）
     裆点 y=825，脚底 y=1476 */
const FIT = {
  W: 1024, H: 1536, pxPerCm: 8.606,
  top: 56, feet: 1476, cx: 510,
  shoulderY: 340, shoulderW: 343,
  armpitY: 412,
  bustY: 470, chestW: 302,
  waistY: 620, waistW: 279,
  hipY: 780, hipW: 319,
  crotchY: 825,
};
const fitCache = { model: null, mask: null, layer: null, cuts: new Map() };
let fitReady = false, fitLoading = null, fitLeadId = null;

/* ---------------- 商品图源 ----------------
   三级策略，优先级从高到低：
   ① INLINE_IMAGES —— 内联 data URL（--inline 预览用）。data URL 不会污染画布。
   ② ASSET_BASE —— 远端基址（GitHub raw / jsDelivr）。服务端带
      Access-Control-Allow-Origin: *，画到 canvas 上不会污染，file:// 下也能抠底。
   ③ 相对路径 —— 同源 HTTP 下正常；file:// 下本地图片会污染画布，
      getImageData 抛 SecurityError，抠底直接失败，衣服就完全不显示。

   file:// 打开时自动切到远端基址：桌面 Chrome 对 file:// 图片一律污染画布，
   这是「WorkBuddy 内置预览换衣不显示」的根因。
   APP 用 android_asset:// 加载，本地图片不污染，所以 APK 打包时显式注入空基址
   强制走本地，保证离线可用。 */
const INLINE_IMAGES = (typeof window !== 'undefined' && window.__ATELIER_INLINE_IMAGES__) || null;
const REMOTE_ASSET_BASE =
  (typeof window !== 'undefined' && window.__ATELIER_ASSET_BASE__ !== undefined)
    ? window.__ATELIER_ASSET_BASE__
    : ((typeof location !== 'undefined' && location.protocol === 'file:')
        ? 'https://raw.githubusercontent.com/ericljw98-crypto/atelier-3d-fitting/main/web/'
        : '');
const isRemote = src => /^https?:\/\//i.test(src);
function assetURL(src) {
  if (INLINE_IMAGES && INLINE_IMAGES[src]) return INLINE_IMAGES[src];
  if (REMOTE_ASSET_BASE && !isRemote(src) && !/^data:|^blob:/i.test(src)) {
    return REMOTE_ASSET_BASE + src.replace(/^\.?\//, '');
  }
  return src;
}

/* 加载商品图：远端优先，失败回退本地相对路径（网络不通时至少还能显示） */
function loadImg(src) {
  return new Promise((res, rej) => {
    const im = new Image();
    im.decoding = 'async';
    /* 跨域图片必须显式声明 crossOrigin，否则即使服务端返回
       Access-Control-Allow-Origin: *，画到 canvas 上仍算「不透明来源」，
       getImageData 会抛 SecurityError，抠底直接失败。 */
    if (REMOTE_ASSET_BASE && !isRemote(src) && !/^data:|^blob:/i.test(src)) {
      im.crossOrigin = 'anonymous';
    }
    im.onload = () => res(im);
    im.onerror = () => {
      const local = REMOTE_ASSET_BASE ? src.replace(REMOTE_ASSET_BASE, '') : src;
      if (REMOTE_ASSET_BASE && local !== src && !isRemote(local)) {
        const im2 = new Image();
        im2.decoding = 'async';
        im2.onload = () => res(im2);
        im2.onerror = () => rej(new Error(src));
        im2.src = local;
      } else rej(new Error(src));
    };
    im.src = assetURL(src);
  });
}

function fitEnsure() {
  if (!fitLoading) {
    fitLoading = (async () => {
      /* file:// 下本地图片会污染画布，抠底必然失败。
         但只要图源带 CORS（远端 raw / jsDelivr），或已内联为 data URL，
         画布就是干净的，2D 可以正常工作。
         这里的判断交给实际取图结果，不再按协议一刀切。 */
      try {
        const [m, k] = await Promise.all([
          loadImg('images/model-2d-front.jpg'),
          loadImg('images/model-2d-mask.png'),
        ]);
        fitCache.model = m;
        const mk = document.createElement('canvas');
        mk.width = FIT.W; mk.height = FIT.H;
        mk.getContext('2d').drawImage(k, 0, 0, FIT.W, FIT.H);
        fitCache.mask = mk;
        const ly = document.createElement('canvas');
        ly.width = FIT.W; ly.height = FIT.H;
        fitCache.layer = ly;
        fitReady = true;
        return true;
      } catch (err) {
        console.warn('2D 模特底图加载失败', err);
        return false;
      }
    })();
  }
  return fitLoading;
}

/* ============================================================
   抠图：把一张图里的「衣服」整块抠出来
   ------------------------------------------------------------
   旧逻辑只抹「与画布四边连通的浅色像素」（RGB ≥200），
   白底棚拍的商品图能用；换成真实场景的照片（背景是墙、街景、房间）
   就一片都抹不掉，抠出来的是「人 + 整幅背景」，贴到模特身上根本没法看。

   新逻辑四步：
     ① 背景建模：取画布四周一圈的像素，统计出「背景色集合」
        （覆盖四边 60% 以上的量化色桶）。
     ② 自适应泛洪：从四边往里扩散，颜色落在背景色集合附近就算背景；
        容差由四边颜色自身的离散度决定，浅灰墙、米色布景都能抠。
     ③ 人像清理（仅上传照片）：肤色用 YCbCr 判据去掉；头发取
        「与画面上边缘连通的暗色块」，深色衣服的肩膀不会被误删。
     ④ 连通域：只保留画面中央那件衣服。
   ============================================================ */

/** 四边颜色的量化统计：背景色集合 + 容差 */
function backgroundModel(p, w, h, strict = false) {
  const buckets = new Map();
  const ring = [];
  const push = (x, y) => {
    const i = (y * w + x) * 4;
    const key = ((p[i] >> 4) << 8) | ((p[i + 1] >> 4) << 4) | (p[i + 2] >> 4);
    let b = buckets.get(key);
    if (!b) { b = [0, 0, 0, 0]; buckets.set(key, b); }
    b[0] += p[i]; b[1] += p[i + 1]; b[2] += p[i + 2]; b[3]++;
    ring.push(i);
  };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, 1); push(x, h - 1); push(x, h - 2); }
  for (let y = 2; y < h - 2; y++) { push(0, y); push(1, y); push(w - 1, y); push(w - 2, y); }
  if (!ring.length) return null;
  const sorted = [...buckets.entries()].sort((a, b) => b[1][3] - a[1][3]);
  const total = ring.length;
  const bg = [];
  let acc = 0;
  for (const [, b] of sorted) {
    bg.push([b[0] / b[3], b[1] / b[3], b[2] / b[3]]);
    acc += b[3];
    if (acc >= total * 0.65) break;
  }
  let dev = 0, n = 0;
  for (const i of ring) {
    let best = 1e9;
    for (const c of bg) {
      const d = Math.abs(p[i] - c[0]) + Math.abs(p[i + 1] - c[1]) + Math.abs(p[i + 2] - c[2]);
      if (d < best) best = d;
    }
    dev += best; n++;
  }
  const mean = n ? dev / n : 20;
  /* 容差不能再放到 72：白/米白衣服与浅灰棚拍底只差 30–70（三通道合计），
     容差一大整件衣身都会被当成背景泛洪掉，最后只剩一条门襟贴到模特身上。 */
  return { bg, tol: strict ? 20 : Math.max(18, Math.min(60, mean * 2.0 + 14)) };
}

/** 肤色判据（YCbCr）：比 RGB 启发式稳，不会把米色/浅杏色衣服整片删掉 */
function isSkinPixel(r, g, b) {
  const Y = 0.299 * r + 0.587 * g + 0.114 * b;
  const Cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
  const Cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
  return Y > 55 && Cb >= 76 && Cb <= 128 && Cr >= 132 && Cr <= 178 && r > g && g >= b - 6;
}

/* 抠底：先把背景整块抹掉，再按品类需要处理领口。
   uploaded=true 时额外做「人物照片→单件衣服」的清洗：去掉肤色（脸、脖子、
   手、手臂）和头顶的深色头发，只留中间那件衣服。 */
function cutGarment(img, uploaded = false, item = null, strict = false) {
  const w = img.naturalWidth, h = img.naturalHeight;
  if (!w || !h) return null;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(img, 0, 0);
  let data;
  try { data = x.getImageData(0, 0, w, h); } catch (e) { return null; }
  const p = data.data;
  const seen = new Uint8Array(w * h);
  let bgModel = null;
  {
    /* 背景泛洪：从四边往里扩散，颜色接近「四边背景色」就算背景 */
    const model = backgroundModel(p, w, h, strict);
    bgModel = model;
    const stack = [];
    /* 旧逻辑把「所有 RGB ≥200 的浅色像素」无条件当背景。白色开衫、白色 T 恤
       在浅灰棚拍底上就是这样整件消失的。现在只信「从四边连通、且贴近四边实测
       背景色」的像素，浅色衣身即使和背景很接近也能留下来。 */
    const nearBg = j => {
      if (!model) return false;
      for (const c2 of model.bg) {
        const d = Math.abs(p[j] - c2[0]) + Math.abs(p[j + 1] - c2[1]) + Math.abs(p[j + 2] - c2[2]);
        if (d <= model.tol) return true;
      }
      return false;
    };
    const seed = (px, py) => {
      const i = py * w + px;
      if (seen[i]) return;
      const j = i * 4;
      if (!nearBg(j)) return;
      seen[i] = 1; stack.push(i);
    };
    for (let px = 0; px < w; px++) { seed(px, 0); seed(px, 1); seed(px, h - 1); seed(px, h - 2); }
    for (let py = 2; py < h - 2; py++) { seed(0, py); seed(1, py); seed(w - 1, py); seed(w - 2, py); }
    while (stack.length) {
      const i = stack.pop(), px = i % w, py = (i / w) | 0;
      if (px > 0) seed(px - 1, py);
      if (px < w - 1) seed(px + 1, py);
      if (py > 0) seed(px, py - w);
      if (py < h - 1) seed(px, py + w);
    }
  }

  let py0 = h, py1 = -1;
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      if (seen[py * w + px]) continue;
      if (py < py0) py0 = py;
      if (py > py1) py1 = py;
    }
  }
  if (py1 < 0) return null;

  /* 上传的是真人照片：肤色区域和头顶深色头发不属于衣服，先删掉。
     阴影很重的黑衣可能被肤色规则误伤，因此只在照片路径启用。 */
  if (uploaded) {
    /* 人像清理：肤色用 YCbCr 判据（脸、脖子、手、手臂）；
       头发取「与画面上边缘连通的暗色块」——
       旧逻辑是「上半幅所有暗像素都算头发」，深色上衣的肩膀会被误删，
       袖子和肩线直接缺一块。 */
    const darkMask = new Uint8Array(w * h);
    {
      const stack = [];
      const isDark = j => {
        const l = 0.299 * p[j] + 0.587 * p[j + 1] + 0.114 * p[j + 2];
        return l < 108;
      };
      /* 头发判定：
         ① 先求前景外框；顶上那一行如果明显比整体窄，说明上面那小块是头；
         ② 在前景上四分之一高度里收集暗色前景像素（头发的暗块），
            从它们向下漫延；
         ③ 漫延如果越过了上四分之一的高度，说明这块暗色其实是深色衣服，
            整块放弃——深色上衣的肩膀不能被削掉。
         直接从画面上边缘漫延不行（头顶和上边之间还有背景，连不上）；
         直接删掉上半幅所有暗像素也不行（深色上衣的肩膀会被削掉）。 */
      let fx0 = w, fx1 = -1, fy0 = h, fy1 = -1;
      for (let py = 0; py < h; py++) {
        let lo = -1, hi = -1;
        for (let px = 0; px < w; px++) {
          if (seen[py * w + px]) continue;
          if (lo < 0) lo = px;
          hi = px;
        }
        if (lo < 0) continue;
        if (fy0 === h) { fy0 = py; fx0 = lo; fx1 = hi; }
        fy1 = py;
      }
      let maxW = 0;
      for (let py = fy0; py <= fy1; py++) {
        let lo = -1, hi = -1;
        for (let px = 0; px < w; px++) {
          if (seen[py * w + px]) continue;
          if (lo < 0) lo = px;
          hi = px;
        }
        if (lo >= 0 && hi - lo + 1 > maxW) maxW = hi - lo + 1;
      }
      const topW = fx1 - fx0 + 1;
      const headLike = maxW > 0 && topW < maxW * 0.62;
      /* 头带：从画面顶部的前景行往下，直到前景宽度超过整体宽度 45%（肩膀）
         为止。头与头发都在这条带子里，肩膀以下不在。 */
      let zoneBot = fy0;
      for (let py = fy0; py <= fy1; py++) {
        let lo = -1, hi = -1;
        for (let px = 0; px < w; px++) {
          if (seen[py * w + px]) continue;
          if (lo < 0) lo = px;
          hi = px;
        }
        if (lo >= 0 && hi - lo + 1 > maxW * 0.45) { zoneBot = py; break; }
        zoneBot = py;
      }
      if (headLike) {
        for (let py = fy0; py <= zoneBot; py++) {
          for (let px = 0; px < w; px++) {
            const i = py * w + px, j = i * 4;
            if (seen[i] || darkMask[i] || !isDark(j)) continue;
            darkMask[i] = 1; stack.push(i);
          }
        }
        while (stack.length) {
          const i = stack.pop(), px = i % w, py = (i / w) | 0;
          const nb = [px > 0 ? i - 1 : -1, px < w - 1 ? i + 1 : -1,
                      py > 0 ? i - w : -1, py < h - 1 ? i + w : -1];
          for (const kk of nb) {
            if (kk < 0 || seen[kk] || darkMask[kk] || !isDark(kk * 4)) continue;
            darkMask[kk] = 1; stack.push(kk);
          }
        }
        // 漫延越过头顶区 = 这块暗色其实是衣服，放弃删除
        let over = 0;
        for (let py = zoneBot + 1; py < h; py++) {
          for (let px = 0; px < w; px++) if (darkMask[py * w + px]) { over = 1; break; }
          if (over) break;
        }
        let dm2 = 0; for (let i2 = 0; i2 < darkMask.length; i2++) dm2 += darkMask[i2];
        if (over) darkMask.fill(0);
      }
    }
    for (let py = py0; py <= py1; py++) {
      for (let px = 0; px < w; px++) {
        const i = py * w + px, j = i * 4;
        if (seen[i]) continue;
        const r = p[j], g = p[j + 1], b = p[j + 2];
        if (isSkinPixel(r, g, b) || darkMask[i]) { seen[i] = 1; p[j + 3] = 0; }
      }
    }
    // 去掉孤立小碎块（头发丝、手指残片），保留画面中央的大块衣身
    const lab = new Int32Array(w * h).fill(-1);
    const comp = [];
    for (let i = 0; i < w * h; i++) {
      if (seen[i] || lab[i] >= 0) continue;
      const id = comp.length, q = [i];
      lab[i] = id; let n = 0, cx = 0, cy = 0;
      while (q.length) {
        const k = q.pop(), kx = k % w, ky = (k / w) | 0;
        n++; cx += kx; cy += ky;
        const nb = [kx > 0 ? k - 1 : -1, kx < w - 1 ? k + 1 : -1,
                    ky > 0 ? k - w : -1, ky < h - 1 ? k + w : -1];
        for (const kk of nb) {
          if (kk < 0 || seen[kk] || lab[kk] >= 0) continue;
          lab[kk] = id; q.push(kk);
        }
      }
      comp.push({ id, n, cx: cx / n, cy: cy / n });
    }
    if (comp.length) {
      comp.sort((a, b) => b.n - a.n);
      const main = comp[0];
      for (const k of comp) {
        if (k.id === main.id) continue;
        /* 开襟衫/马甲会被门襟分成左右两片，不能用「离主块中心很近」来判：
           两片相隔可能超过画幅 30%，丢掉一片就只剩半件衣服。 */
        if (k.n > main.n * (strict ? 0.01 : 0.06) && k.cx > w * 0.14 && k.cx < w * 0.86) continue;
        for (let i = 0; i < w * h; i++) {
          if (lab[i] === k.id) { seen[i] = 1; p[i * 4 + 3] = 0; }
        }
      }
    }
  }

  /* 袖口与衣身围出的封闭浅色区，四边泛洪进不去，会留下一道白横带。
     再按四边实测背景色清一次，阈值 26 远小于白衣身与浅灰底的差值，
     所以白 T 恤、白开衫不会被误删。 */
  if (bgModel) {
    for (let py = py0; py <= py1; py++) {
      for (let px = 0; px < w; px++) {
        const i = py * w + px, j = i * 4;
        if (seen[i]) continue;
        let close = false;
        for (const c of bgModel.bg) {
          const d = Math.abs(p[j] - c[0]) + Math.abs(p[j + 1] - c[1]) + Math.abs(p[j + 2] - c[2]);
          if (d <= (strict ? 3 : 12)) { close = true; break; }
        }
        if (close) { seen[i] = 1; p[j + 3] = 0; }
      }
    }
  }

  let x0 = w, x1 = -1, y0 = h, y1 = -1;
  const prof = new Float32Array(h);
  const loA = new Int32Array(h).fill(-1), hiA = new Int32Array(h).fill(-1);
  for (let py = 0; py < h; py++) {
    let lo = -1, hi = -1;
    for (let px = 0; px < w; px++) {
      const i = py * w + px;
      if (seen[i]) { p[i * 4 + 3] = 0; continue; }
      if (lo < 0) lo = px;
      hi = px;
    }
    loA[py] = lo; hiA[py] = hi;
    if (lo >= 0) {
      prof[py] = hi - lo + 1;
      if (lo < x0) x0 = lo;
      if (hi > x1) x1 = hi;
      if (py < y0) y0 = py;
      if (py > y1) y1 = py;
    }
  }
  if (x1 < 0) return null;
  /* 商品图是白底棚拍，边缘有一圈半透明的抗锯齿像素，直接贴到人像上会
     留一道发白的描边。这里把 alpha 往内收 1px，描边就没了。 */
  {
    const a0 = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) a0[i] = seen[i] ? 0 : p[i * 4 + 3];
    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        const i = py * w + px;
        if (!a0[i]) continue;
        if ((px > 0 && !a0[i - 1]) || (px < w - 1 && !a0[i + 1]) ||
            (py > 0 && !a0[i - w]) || (py < h - 1 && !a0[i + w])) {
          p[i * 4 + 3] = 0;
        } else {
          p[i * 4 + 3] = a0[i];
        }
      }
    }
  }

  const box = { x0, y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
  const shoulder = detectShoulder(loA, hiA, y0, y1, box.h);

  /* 领口开洞：幽灵模特商品图里领口内侧有时是衬布/拉链（不透明），
     直接整块贴上去会把穿者的脖子盖住；但领口本来就是敞开的款
     （深 V、抹胸、宽肩带 V 领），抠底后那里已经是透明，挖了反而
     把衣服本体挖掉、在胸口露出突兀的肤色块。
     所以先量领口区域抠底后的透明占比：
       · 本来就空（占比高）→ 不挖，让底模皮肤自然透出来；
       · 仍是不透明布料 → 只在领型明确是敞口时才挖，且范围收窄。
     领型判断优先看名称里的领口词；圆领/高领/翻领/衬衫领一律不挖。 */
  if (item && item.category !== 'bottoms' && shoulder && !shoulder.strapless) {
    const mid = (shoulder.lo + shoulder.hi + 1) / 2;
    const nw = Math.max(18, 0.34 * shoulder.w);
    const text = ((item.nameEn || '') + ' ' + (item.name || '')).toLowerCase();
    // 领口区（肩线以下、中心 nw 宽）的透明像素占比
    const probeTop = Math.max(0, Math.floor(shoulder.y));
    const probeBot = Math.min(h - 1, Math.ceil(shoulder.y + 0.20 * shoulder.w));
    let empty = 0, total = 0;
    for (let py = probeTop; py <= probeBot; py++) {
      for (let px = Math.max(0, Math.floor(mid - nw / 2)); px <= Math.min(w - 1, Math.ceil(mid + nw / 2)); px++) {
        total++;
        if (p[(py * w + px) * 4 + 3] < 40) empty++;
      }
    }
    const openRatio = total ? empty / total : 0;
    /* 有领/高领/衬衫领等闭合领口：领口内侧是衣服本体，不能挖。
       名称匹配会漏（"PB Labyrinth jacquard dress" 这类高领针织不含领型词），
       所以再加一道几何判据：领高比 = 领顶到肩点的距离 ÷ 肩宽。
       领子占肩宽两成以上，说明这是高领/大翻领/立领款——它的领口内侧
       本来就是衣服，挖了会在胸口留下一块突兀的肤色块。
       深 V、抹胸、宽肩带的领高比普遍小于 0.12，不受影响。 */
    const collarK = (shoulder.y - box.y0) / Math.max(shoulder.w, 1);
    const tallCollar = collarK > 0.16;
    const closed = tallCollar
      || /crew|round[-\s]?neck|high[-\s]?neck|turtle|mock|blouse|shirt|collar|knit|polo|camisole|turtleneck|jersey|rib/.test(text);
    // 明确敞口的领型
    const openV = /deep|plunge|v[-\s]?neck|vneck|d[eé]collet|dos[-\s]?nu|backless|halter|cowl|strapless/.test(text);
    if (openRatio < 0.28 && !closed) {
      let depthK = 0.16, shape = 'u';
      if (openV) {
        depthK = 0.30; shape = 'v';
      } else if (/square|carr[eé]|carre/.test(text)) {
        depthK = 0.18; shape = 'square';
      }
      const topY = shoulder.y - 0.045 * shoulder.w;
      const botY = shoulder.y + depthK * shoulder.w;
      for (let py = Math.max(0, Math.floor(topY)); py <= Math.min(h - 1, Math.ceil(botY)); py++) {
        for (let px = Math.max(0, Math.floor(mid - nw / 2)); px <= Math.min(w - 1, Math.ceil(mid + nw / 2)); px++) {
          const u = (px - mid) / (nw / 2);
          if (Math.abs(u) > 1) continue;
          let yb;
          if (shape === 'v') yb = topY + (botY - topY) * (1 - Math.abs(u));
          else if (shape === 'square') yb = botY - (botY - topY) * 0.55 * Math.pow(Math.abs(u), 8);
          else yb = topY + (botY - topY) * Math.sqrt(Math.max(0, 1 - u * u));
          if (py <= yb) p[(py * w + px) * 4 + 3] = 0;
        }
      }
    }
  }

  /* 白/米白衣身在浅灰棚拍底上只差十几个灰阶，常规容差可能把整件吃光，
     只剩一条门襟（主体不足画幅 8%）。这时用更严格容差重抠一次。 */
  if (!strict) {
    let fg = 0, lum = 0;
    for (let i = 0; i < seen.length; i++) {
      if (seen[i]) continue;
      fg++;
      const j = i * 4;
      lum += 0.299 * p[j] + 0.587 * p[j + 1] + 0.114 * p[j + 2];
    }
    const meanLum = fg ? lum / fg : 0;
    /* 浅色衣身（均值 >205）即使面积够大也用严格容差重抠，
       否则白 T 恤下半截会被浅灰底一路吃掉，只剩上半件。 */
    if (fg < w * h * 0.12 || meanLum > 205) {
      const retry = cutGarment(img, uploaded, item, true);
      if (retry) return retry;
    }
  }

  x.putImageData(data, 0, 0);
  /* 取某相对高度处的衣身宽（跳过袖口、吊带这类极窄行，也跳过被袖子撑开的顶行） */
  const widthAt = frac => {
    const y = Math.min(h - 1, Math.max(0, Math.round(y0 + frac * box.h)));
    const lo = Math.max(y0, y - 4), hi = Math.min(y1, y + 4);
    let acc = 0, n = 0;
    for (let yy = lo; yy <= hi; yy++) { if (prof[yy] > 0) { acc += prof[yy]; n++; } }
    return n ? acc / n : box.w;
  };
  return { canvas: c, box, widthAt, shoulder };
}

/* 找衣肩线（肩点所在的那一行）
   ------------------------------------------------------------
   商品图是幽灵模特平铺图，上缘轮廓从领口向两侧下坡，到肩点处坡度骤停、
   往下变成近乎垂直的袖筒。所以「外缘向外扩张的速度第一次掉下来」的位置
   就是肩线：
     · 取上 34% 高度做搜索带，用 ±2% 高度的窗口斜率抵消锯齿；
     · 左右取平均，抗单侧被袖子撑开；
     · 加两道闸：该行宽度至少要达到带内最大宽度的 55%，避免停在领口尖上。
   找不到拐点时退回「宽度首次到 90%」的经验值。 */
function detectShoulder(lo, hi, y0, y1, H) {
  const band = Math.min(y1, y0 + Math.round(H * 0.34));
  const k = Math.max(2, Math.round(H * 0.022));
  const rows = [];
  let mx = 0, maxw = 0;
  for (let y = y0; y <= band; y++) {
    const ya = Math.min(y1, y + k), yb = Math.max(y0, y - k);
    const dl = ya === yb ? 0 : (lo[ya] - lo[yb]) / (ya - yb);
    const dr = ya === yb ? 0 : (hi[ya] - hi[yb]) / (ya - yb);
    const s = (-dl + dr) / 2;
    rows.push({ y, s });
    if (s > mx) mx = s;
    const wd = hi[y] - lo[y] + 1;
    if (wd > maxw) maxw = wd;
  }
  let ys = -1;
  for (const r of rows) {
    if (r.y - y0 < H * 0.02) continue;
    if (r.s < mx * 0.25 && (hi[r.y] - lo[r.y] + 1) >= maxw * 0.55) { ys = r.y; break; }
  }
  if (ys < 0) for (const r of rows) {
    if (hi[r.y] - lo[r.y] + 1 >= maxw * 0.9) { ys = r.y; break; }
  }
  if (ys < 0) ys = y0 + Math.round(H * 0.1);
  const wSh = hi[ys] - lo[ys] + 1;
  return { y: ys, lo: lo[ys], hi: hi[ys], w: wSh,
           maxw, strapless: wSh < maxw * 0.45 };
}

function cutFor(item) {
  if (!item || !item.image) return null;
  let job = fitCache.cuts.get(item.id);
  if (!job) {
    job = loadImg(item.image)
      .then(img => cutGarment(img, item.id === '__upload__' || item.photoCut, item))
      .catch(() => null);
    fitCache.cuts.set(item.id, job);
  }
  return job;
}

function fitDrawModelOnly() {
  const ctx = flatEls.fit.getContext('2d');
  ctx.clearRect(0, 0, FIT.W, FIT.H);
  ctx.drawImage(fitCache.model, 0, 0, FIT.W, FIT.H);
}

/* 尺码 → 图样放码倍率（成衣围度来自合身基准线）
   ------------------------------------------------------------
   倍率取「该码成衣围度 / EU38 基准码成衣围度」，与合身诊断读的
   是同一个 garmentMeasurements()：基准线（净体 + 合身放松量）定了以后，
   各码只是在基准上加减档差，所以图样宽度与诊断结论同增同减。
   横向直接取围度比，不取平方根——√ 会把档差压到肉眼看不出来。 */
function sizeFitFactors(item, size) {
  const model = state.model || DEFAULT_MODEL;
  const fitSize = fitSizeForModel(model);
  const gm = garmentMeasurements(item.id, size, model) || {};
  const gmBase = garmentMeasurements(item.id, 'IT 42', model) || {};
  const key = (item && item.category === 'bottoms') ? 'hip' : 'bust';
  const denom = gmBase[key] || 1;
  const w = Math.min(1.22, Math.max(0.82, (gm[key] || denom) / denom));
  const i = Math.max(0, SIZES.indexOf(size)) - Math.max(0, SIZES.indexOf(fitSize));
  const h = Math.min(1.14, Math.max(0.90, 1 + i * 0.012));
  return { w, h };
}

/* 商品图定位：肩宽和衣长分别定标。
   旧版取 min(kSh,kLen) 再等比例缩放：长款大衣的图又窄又长，kLen 一压，
   肩宽就只剩人体肩宽的 70–80%，看上去「贴上去小小一件」。现在横向按肩宽、
   纵向按衣长分别缩放，只在 1.5/0.67 以内限制拉伸，既对齐肩线又保留衣长。
   抠图异常时（浅色衣身被削成窄条）不采信这条假肩线，改用主体框宽度。 */
function fitPlacement(item, cut) {
  const cat = item.category;
  const lenCm = (item.measurements && item.measurements.length) || (cat === 'dresses' ? 100 : 62);
  const fm = item.flatMeta;
  let sh = fm
    ? { y: fm.shoulderY, w: fm.shoulderW, lo: FIT.cx - fm.shoulderW / 2, hi: FIT.cx + fm.shoulderW / 2 }
    : cut.shoulder;
  if (sh && cat !== 'bottoms' && sh.w < cut.box.w * 0.28) sh = null;
  const kSh = cat === 'bottoms'
    ? (FIT.hipW * 1.02) / Math.max(cut.widthAt(0.35), 1)
    : (sh && sh.w > 6)
      ? (FIT.shoulderW * 0.99) / sh.w
      : FIT.shoulderW / Math.max(cut.widthAt(0.06), cut.box.w * 0.72, 1);
  const kLen = (lenCm * FIT.pxPerCm) / Math.max(cut.box.h, 1);
  let kw = Math.min(Math.max(kSh, 0.5), 3.6);
  let kh = Math.min(Math.max(kLen, 0.5), 3.6);
  const ar = kw / kh;
  if (ar > 1.5) kw = kh * 1.5;
  else if (ar < 0.67) kw = kh * 0.67;
  /* 按当前尺码放码：宽度按围度档差，长度按衣长档差。 */
  const fitF = sizeFitFactors(item, state.size);
  kw = Math.min(Math.max(kw * fitF.w, 0.5), 4.2);
  kh = Math.min(Math.max(kh * fitF.h, 0.5), 4.2);

  /* 贴合：肩线对到人体肩点所在 y，横向按肩线中点对中线。 */
  let anchorY, srcY, midX;
  if (cat === 'bottoms') {
    anchorY = FIT.waistY - 4; srcY = cut.box.y0;
    midX = cut.box.x0 + cut.box.w / 2;
  } else if (sh) {
    anchorY = FIT.shoulderY; srcY = sh.y;
    midX = (sh.lo + sh.hi + 1) / 2;
  } else {
    anchorY = FIT.shoulderY - 4; srcY = cut.box.y0 + cut.box.h * 0.04;
    midX = cut.box.x0 + cut.box.w / 2;
  }
  return {
    cat, lenCm, sh, kSh, kLen, kw, kh, fitF,
    anchorY, srcY, midX,
    dx: FIT.cx - midX * kw,
    dy: anchorY - srcY * kh,
  };
}

/* 单件商品图合成：把裁好的商品图按人体标定贴到画布上。
   只负责「画这一件」，不负责清屏——多件搭配（上衣+下装）由
   fitDrawOutfit 统一编排：先画模特，再按下装→上衣→外套的顺序叠。 */
function fitDrawGarment(item, ctx) {
  if (!fitReady || !item) return Promise.resolve(false);
  const job = cutFor(item);
  if (!job) return Promise.resolve(false);
  return job.then(cut => {
    if (!cut) return false;
    const pf = fitPlacement(item, cut);
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(cut.canvas, pf.dx, pf.dy, cut.canvas.width * pf.kw, cut.canvas.height * pf.kh);
    ctx.restore();
    return true;
  });
}

/* 2D 整体编排：可同时穿上衣与下装。
   层次按真实穿着顺序——下装在下、上衣压住下装腰头、外套最外层。
   连衣裙自带一身，出现时独占整身，不再叠加其它件。 */
function fitDrawOutfit(items) {
  if (!fitReady || !flatEls.fit) return;
  const ctx = flatEls.fit.getContext('2d');
  ctx.clearRect(0, 0, FIT.W, FIT.H);
  ctx.drawImage(fitCache.model, 0, 0, FIT.W, FIT.H);
  const list = items.filter(Boolean);
  if (!list.length) return;
  // 连衣裙独占；否则按下装 → 上衣 → 外套的顺序叠
  const dress = list.find(i => i.category === 'dresses');
  const order = dress
    ? [dress]
    : [
        ...list.filter(i => i.category === 'bottoms'),
        ...list.filter(i => i.category === 'tops'),
        ...list.filter(i => i.category === 'outer'),
      ];
  fitLeadId = order.map(i => i.id).join('|');
  order.forEach(i => fitDrawGarment(i, ctx));
}

function flatDraw() {
  if (!flatEls.fit) return;

  /* 2D 只有一条路：照片模特 + 商品图合成。旧的 3D 正交人台（木偶人）
     渲染器、相机、隐藏列表与画布已整段删除，不存在任何回退分支。 */
  const wornNow = Object.values(state.outfit).filter(Boolean);
  const lead = wornNow[wornNow.length - 1] || null;
  const custom = uploadedPhotoItem();
  const leadItem = custom || (lead ? DB_BY_ID[lead.id] : null);

  if (!fitReady) fitEnsure().then(ok => { if (ok) flatMark(); });
  if (!fitReady || !flatEls.fit) {
    flatEls.empty.classList.remove('hidden');
    flatEls.empty.textContent = '正在准备模特…';
    return;
  }

  const cv = flatEls.fit;
  if (cv.width !== FIT.W) cv.width = FIT.W;
  if (cv.height !== FIT.H) cv.height = FIT.H;

  /* 2D 只认真实平铺商品图，不做纯色渲染。
     曾经给「没有商品图」的款兜底走 3D 网格投影，渲出来是一块纯色剪影，
     跟商品图的印花、质感完全对不上，用户看到的就是「又回退了」。
     现在没有商品图就只显示模特底图，并在下方说明原因。 */
  /* 2D 支持同时穿上衣与下装：把所有已着装的成衣按层次合成。
     只取真正带官方商品图的款；没有图的款不参与合成（不做纯色兜底）。 */
  /* composite:false = 该款只有实拍/杂志图，或主体颜色太浅会被抠底算法误判为背景，
     这类款在 2D 里合成出来是错的，直接不参与合成（列表里会标注「仅浏览」）。 */
  const photoItems = wornNow
    .map(o => DB_BY_ID[o.id])
    .filter(it => it && it.image && it.composite !== false);
  const hasPhoto = photoItems.length > 0;
  if (hasPhoto) {
    fitDrawOutfit(photoItems);
  } else {
    fitLeadId = null;
    fitDrawModelOnly();
  }

  cv.classList.add('on');
  flatEls.empty.classList.add('hidden');
  if (flatEls.clear) flatEls.clear.classList.toggle('hidden', wornNow.length === 0 && !custom);
  if (flatEls.label) flatEls.label.textContent = custom ? '照片上身' : hasPhoto ? '正面合成' : (leadItem ? '无平铺图' : '模特底图');
  if (flatEls.caption) {
    const hcm = state.model ? state.model.height : 165;
    const worn = wornNow.map(o => DB_BY_ID[o.id]).filter(Boolean);
    const lines = worn.map(it => {
      const g = garmentMeasurements(it.id, state.size, state.model);
      const t = g ? ` · 成衣${it.category === 'bottoms' ? '臀围' : '胸围'} ${Math.round(g[it.category === 'bottoms' ? 'hip' : 'bust'])}cm` : '';
      return `<b>${it.code}</b> ${it.name}${t}`;
    });
    /* 该款只有实拍/杂志图（或主体太浅、抠底会误伤）时，2D 合成结果必然是错的，
       明确告诉用户「没有平铺图可用」，而不是让画面看起来像点了没反应。 */
    const noFlat = leadItem && leadItem.composite === false;
    flatEls.caption.innerHTML = custom
      ? `上传照片 · 已按 ${state.size} 放码<br>2D 直接合成 · 模特 ${hcm}cm · 3D 不显示上传款`
      : (hasPhoto
        ? `${lines.join('<br>')}<br>2D 合成 · 模特 ${hcm}cm · 尺码 ${state.size}`
        : noFlat
          ? `<b>${leadItem.code}</b> ${leadItem.name}<br>该款只有实拍图，没有可用平铺图，2D 无法合成<br>请切「3D 试衣」看版型`
          : leadItem
            ? `<b>${leadItem.code}</b> ${leadItem.name}<br>该款没有平铺商品图，2D 不做纯色兜底 · 请切「3D 试衣」看版型`
            : `未着装 · 模特 ${hcm}cm · 2D 底模`);
  }
}
/* ============================================================
   着装逻辑
   ============================================================ */
let realLoadToken = 0;   // 防止快速切换时旧异步请求覆盖新选择
function clearSlot(slot) {
  const item = state.outfit[slot];
  if (!item) return;
  garmentGroup.remove(item.group);
  item.group.traverse(o => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose?.(); } });
  state.outfit[slot] = null;
}
function selectGarment(itemId, opt = {}) {
  const item = DB_BY_ID[itemId];
  if (!item || !state.model) return;
  // 选了库里的衣服就退出「上传照片直接上身」状态
  state.customPhoto = null;
  fitCache.cuts.delete('__upload__');
  /* 槽位互斥规则：连衣裙与外套各自独占一身；
     上衣与下装可以同时穿（2D 要能搭一套），所以只清同槽与冲突槽。 */
  const slot = slotOf(item);
  if (slot === 'dresses') { ['tops', 'bottoms', 'dresses'].forEach(clearSlot); }
  else if (slot === 'outer') { ['outer'].forEach(clearSlot); }
  else { clearSlot(slot); clearSlot('dresses'); }

  // 配色板已撤：每件成衣按自己的首个官方配色上场，风格差异靠花色而不是全局色块
  const own = (item.colors && item.colors[0]) || null;
  const color = opt.color ?? (own ? own.hex : state.color);
  const colorName = opt.colorName ?? (own ? own.name : state.colorName);

  // 程序化服装（含完整尺码放码）
  ++realLoadToken;
  if (!bodyReady()) {
    ensureBody().then(() => { if (bodyReady()) selectGarment(itemId, opt); });
    return;
  }
  /* 面料贴图：直接取卡片上已经解码好的商品图，不额外发请求。
     取不到（图片未就绪 / 该款无图）就退回纯色。 */
  /* 高分库商品只买得到平台在售的那几档：当前尺码买不到时，
     自动切到在售尺码里最接近的一档（该款的最优码）。 */
  if (item.premium && item.availSizes && item.availSizes.length) {
    if (!item.availSizes.includes(state.size)) {
      const best = item.fitSize && item.availSizes.includes(item.fitSize)
        ? item.fitSize
        : item.availSizes.reduce((a, b) =>
            Math.abs(sizeNumber(b) - sizeNumber(item.fitSize || state.size)) <
            Math.abs(sizeNumber(a) - sizeNumber(item.fitSize || state.size)) ? b : a);
      state.size = best;
      state.sizeLocked = true;
    }
  }
  const group = buildGarment(itemId, state.size, state.model, color, true, fabricTexOf(itemId), fabricSolidTexOf(itemId));
  if (!group) return;
  garmentGroup.add(group);
  state.outfit[slot] = { id: itemId, slot, group, color, colorName };
  state.activeSlot = slot;
  state.color = color; state.colorName = colorName;
  renderGarments(); renderSummary(); updateStatus(); renderColors(); renderSizes(); renderFitReport();
  /* 左页选中 → 右页翻页；已在右页时只做一次内容刷新，不反复整页翻转。 */
  setBookPage('fitting', item, { refresh: bookEls.book && bookEls.book.dataset.page === 'fitting' });
  toast(`已试穿：${item.name}`);
}
function clearAll() {
  Object.keys(state.outfit).forEach(clearSlot);
  state.activeSlot = null;
  state.customPhoto = null;
  fitCache.cuts.delete('__upload__');
  renderGarments(); renderSummary(); updateStatus(); renderFitReport();
  setBookPage('catalog');
}
function setColor(hex, name) {
  state.color = hex; state.colorName = name;
  if (state.activeSlot && state.outfit[state.activeSlot]) {
    const entry = state.outfit[state.activeSlot];
    entry.group.userData.dyeMaterials?.forEach(m => m.color.setHex(hex));
    entry.color = hex; entry.colorName = name;
    renderSummary();
    flatMark();
  } else toast('请先选择一件服饰');
  renderColors();
}

/* ============================================================
   UI 元素
   ============================================================ */
const els = {
  brands: document.getElementById('brand-tabs'),
  wardrobeTitle: document.getElementById('wardrobe-title'),
  wardrobeSub: document.getElementById('wardrobe-sub'),
  tabs: document.getElementById('category-tabs'),
  promoStrip: document.getElementById('promo-strip'),
  promoList: document.getElementById('promo-list'),
  promoUpdated: document.getElementById('promo-updated'),
  list: document.getElementById('garment-list'),
  colors: document.getElementById('color-swatches'),
  sizes: document.getElementById('size-buttons'),
  sizeHint: document.getElementById('size-hint'),
  sizeInput: null,   // 手输尺码已移除
  sizeNote: null,
  views: null,   // 视角切换已移除
  summary: document.getElementById('outfit-summary'),
  status: document.getElementById('stage-status'),
  toast: document.getElementById('toast'),
  modelChip: document.getElementById('model-chip'),
  fitVerdict: document.getElementById('fit-verdict'),
  fitReport: document.getElementById('fit-report'),
  searchInput: document.getElementById('search-input'),
  searchClear: document.getElementById('search-clear'),
  filterColor: document.getElementById('filter-color'),
  filterStyle: document.getElementById('filter-style'),
  filterGrade: document.getElementById('filter-grade'),
  filterPBrand: document.getElementById('filter-pbrand'),
  filterPBrandWrap: document.getElementById('filter-pbrand-wrap'),
  filterPlatform: document.getElementById('filter-platform'),
  filterPlatformWrap: document.getElementById('filter-platform-wrap'),
};

/* ============================================================
   书页式左右联动：左页 01 商品与促销 / 右页 02 试衣与准确度
   ============================================================ */
const bookEls = {
  book: document.getElementById('book'),
  nav: document.getElementById('page-nav'),
  flipper: document.getElementById('page-flipper'),
  coverImg: document.getElementById('cover-img'),
  coverPlaceholder: document.getElementById('cover-placeholder'),
  coverBrand: document.getElementById('cover-brand'),
  coverName: document.getElementById('cover-name'),
  coverPrice: document.getElementById('cover-price'),
  coverCta: document.getElementById('cover-cta'),
  sheetItem: document.getElementById('sheet-item'),
  accuracy: document.getElementById('accuracy-report'),
};
let selectedCoverItem = null;

function coverPriceText(item) {
  if (!item) return '';
  if (item.discontinued) return `€${item.priceEUR.toLocaleString()} · 停产档案`;
  if (item.premium && item.curUAH > 0) {
    return `${item.platform || '平台在售'} · ₴${item.curUAH.toLocaleString()}${item.discountPct ? ` · -${item.discountPct}%` : ''}`;
  }
  return `€${item.priceEUR.toLocaleString()}`;
}

/** 只画封面，不改动「已选中」状态；用于左页卡片悬停预览。 */
function paintCover(item) {
  if (!bookEls.coverImg) return;
  if (!item) {
    bookEls.coverImg.hidden = true;
    bookEls.coverImg.removeAttribute('src');
    bookEls.coverPlaceholder.hidden = false;
    bookEls.coverPlaceholder.innerHTML = '从左侧挑一件商品<br/>右侧自动翻到它的试衣报告';
    bookEls.coverBrand.textContent = '尚未选择款式';
    bookEls.coverName.textContent = '商品目录 · 限时折扣 · 高分库';
    bookEls.coverPrice.textContent = '';
    bookEls.coverCta.disabled = true;
    return;
  }
  bookEls.coverBrand.textContent = `${resolveBrandLabel(item)} · ${item.code || ''}`.trim();
  bookEls.coverName.textContent = item.name || item.nameEn || '未命名款式';
  bookEls.coverPrice.textContent = coverPriceText(item);
  bookEls.coverCta.disabled = false;
  if (item.image) {
    bookEls.coverImg.src = assetURL(item.image);
    bookEls.coverImg.hidden = false;
    bookEls.coverPlaceholder.hidden = true;
  } else {
    bookEls.coverImg.hidden = true;
    bookEls.coverImg.removeAttribute('src');
    bookEls.coverPlaceholder.hidden = false;
    bookEls.coverPlaceholder.innerHTML = `${resolveBrandLabel(item)}<br/>${item.name || ''}<br/>暂无商品图`;
  }
}

function updateCover(item) {
  selectedCoverItem = item || null;
  paintCover(selectedCoverItem);
}

function setBookPage(page, item, opt = {}) {
  const target = page === 'fitting' ? 'fitting' : 'catalog';
  if (item) updateCover(item);
  if (!bookEls.book) return;
  bookEls.book.dataset.page = target;
  if (bookEls.nav) {
    bookEls.nav.querySelectorAll('.page-nav-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.page === target));
  }
  if (target === 'fitting' && opt.refresh && bookEls.flipper) {
    bookEls.flipper.classList.remove('refreshed');
    void bookEls.flipper.offsetWidth;
    bookEls.flipper.classList.add('refreshed');
    setTimeout(() => bookEls.flipper.classList.remove('refreshed'), 540);
  }
}

if (bookEls.nav) {
  bookEls.nav.addEventListener('click', e => {
    const b = e.target.closest('.page-nav-btn');
    if (b) setBookPage(b.dataset.page);
  });
}
if (bookEls.coverCta) bookEls.coverCta.addEventListener('click', () => setBookPage('fitting'));
{
  const back = document.getElementById('btn-back-page');
  if (back) back.addEventListener('click', () => setBookPage('catalog'));
}
/* 窄屏手势：横向滑动翻页；纵向滑动仍交给商品列表和报告区自己滚动。 */
if (bookEls.book) {
  let swipeStart = null;
  bookEls.book.addEventListener('touchstart', e => {
    if (e.touches.length !== 1) { swipeStart = null; return; }
    swipeStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
  }, { passive: true });
  bookEls.book.addEventListener('touchend', e => {
    if (!swipeStart || !e.changedTouches.length) return;
    const dx = e.changedTouches[0].clientX - swipeStart.x;
    const dy = e.changedTouches[0].clientY - swipeStart.y;
    const dt = Date.now() - swipeStart.t;
    swipeStart = null;
    if (dt > 900 || Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    setBookPage(dx < 0 ? 'fitting' : 'catalog');
  }, { passive: true });
}
document.addEventListener('keydown', e => {
  if (e.target && e.target.closest('input, select, textarea')) return;
  if (document.querySelector('.modal-backdrop.open')) return;
  if (e.key === 'ArrowRight') setBookPage('fitting');
  if (e.key === 'ArrowLeft') setBookPage('catalog');
});

/* 搜索框：输入即跨品牌全局检索；Esc / 点 × 清空 */
if (els.searchInput) {
  els.searchInput.addEventListener('input', () => {
    state.query = els.searchInput.value;
    if (els.searchClear) els.searchClear.hidden = !state.query;
    renderGarments();
  });
  els.searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') { els.searchInput.value = ''; els.searchInput.dispatchEvent(new Event('input')); }
  });
}
if (els.searchClear) {
  els.searchClear.addEventListener('click', () => {
    els.searchInput.value = '';
    els.searchInput.dispatchEvent(new Event('input'));
    els.searchInput.focus();
  });
}
/* 颜色 / 款式筛选：与搜索叠加，三个条件同时生效 */
function renderFilterOptions() {
  const opts = filterOptions();
  if (els.filterColor) {
    const cur = state.filterColor;
    els.filterColor.innerHTML = `<option value="">全部颜色</option>` +
      opts.colors.map(([name, n]) => `<option value="${name}">${name} (${n})</option>`).join('');
    els.filterColor.value = cur;
    els.filterColor.closest('.filter-sel')?.classList.toggle('has-value', !!cur);
  }
  if (els.filterStyle) {
    const cur = state.filterStyle;
    els.filterStyle.innerHTML = `<option value="">全部款式</option>` +
      opts.styles.map(([name, n]) => `<option value="${name}">${name} (${n})</option>`).join('');
    els.filterStyle.value = cur;
    els.filterStyle.closest('.filter-sel')?.classList.toggle('has-value', !!cur);
  }
  if (els.filterPBrand) {
    const cur = state.filterPBrand;
    const counts = new Map();
    [...DB, ...KAMERON_DEEP.filter(g => g.onlyBrowse && g.gender !== 'men' && !isShoe(g) && isAllowedLine(g))].forEach(g => {
      if (g.premium) counts.set(g.brand, (counts.get(g.brand) || 0) + 1);
    });
    const known = PREMIUM_BRANDS.filter(b => counts.get(b.id))
      .map(b => ({ id: b.id, name: b.name }));
    /* Kameron 深折里的 Polo Ralph Lauren 等品牌不在高分库清单，按真实品牌名补入。 */
    for (const [id, n] of counts) {
      if (!known.some(b => b.id === id)) known.push({ id, name: KAMERON_DEEP.find(g => g.brand === id)?.brandLabel || id });
    }
    els.filterPBrand.innerHTML = `<option value="">全部品牌</option>` +
      known.map(b => `<option value="${b.id}">${b.name} (${counts.get(b.id)})</option>`).join('');
    els.filterPBrand.value = cur;
    els.filterPBrand.closest('.filter-sel')?.classList.toggle('has-value', !!cur);
    if (els.filterPBrandWrap) els.filterPBrandWrap.hidden = state.brand !== PREMIUM_TAB.id;
  }
  if (els.filterPlatform) {
    const cur = state.filterPlatform;
    const pc = new Map();
    [...DB, ...KAMERON_DEEP.filter(g => g.onlyBrowse && g.gender !== 'men' && !isShoe(g) && isAllowedLine(g))].forEach(g => {
      if (g.premium) { const p = g.platform || '其他'; pc.set(p, (pc.get(p) || 0) + 1); }
    });
    els.filterPlatform.innerHTML = `<option value="">全部平台</option>` +
      [...pc.entries()].sort((a, b) => b[1] - a[1])
        .map(([p, n]) => `<option value="${p}">${p} (${n})</option>`).join('');
    els.filterPlatform.value = cur;
    els.filterPlatform.closest('.filter-sel')?.classList.toggle('has-value', !!cur);
    if (els.filterPlatformWrap) els.filterPlatformWrap.hidden = state.brand !== PREMIUM_TAB.id;
  }
  if (els.filterGrade) {
    const cur = state.filterGrade;
    const c = opts.grades;
    els.filterGrade.innerHTML = `<option value="">全部等级</option>` +
      [3, 2, 1].map(s => `<option value="${s}">${STAR_TEXT[s]} (${c[s] || 0})</option>`).join('');
    els.filterGrade.value = cur;
    els.filterGrade.closest('.filter-sel')?.classList.toggle('has-value', !!cur);
  }
}
if (els.filterColor) {
  els.filterColor.addEventListener('change', () => {
    state.filterColor = els.filterColor.value;
    renderFilterOptions();
    renderGarments();
  });
}
if (els.filterStyle) {
  els.filterStyle.addEventListener('change', () => {
    state.filterStyle = els.filterStyle.value;
    renderFilterOptions();
    renderGarments();
  });
}
if (els.filterGrade) {
  els.filterGrade.addEventListener('change', () => {
    state.filterGrade = els.filterGrade.value;
    renderFilterOptions();
    renderGarments();
  });
}
if (els.filterPBrand) {
  els.filterPBrand.addEventListener('change', () => {
    state.filterPBrand = els.filterPBrand.value;
    renderFilterOptions();
    renderGarments();
  });
}
if (els.filterPlatform) {
  els.filterPlatform.addEventListener('change', () => {
    state.filterPlatform = els.filterPlatform.value;
    renderFilterOptions();
    renderGarments();
  });
}

const SWATCHES = [
  PALETTE.black, PALETTE.ivory, PALETTE.red, PALETTE.wine,
  PALETTE.navy, PALETTE.emerald, PALETTE.camel, PALETTE.gold,
  PALETTE.powder, PALETTE.leopard, PALETTE.olive, PALETTE.chocolate,
];


/* ---------------- 面料贴图 ---------------- */

/** 把商品图的大块明暗压平，只留下花型与织纹。
    平铺商品图自带摄影棚的光影：肩部一条暗影、裙摆一片反光。
    这些明暗一旦当面料贴上模型，就会被读成「这块布换了一种颜色」——
    袖山采到亮区、衣身采到暗影时，肩上就出现一块对不上的贴片。
    做法是除以低频亮度（大半径模糊），把光照成分除掉，保留高频纹样。
    同时量出「胸前那块面料」的平均色，供袖筒取色。 */
function flattenShading(img) {
  const N = 256;
  const cv = document.createElement('canvas');
  cv.width = cv.height = N;
  const g = cv.getContext('2d', { willReadFrequently: true });
  g.drawImage(img, 0, 0, N, N);
  let data;
  try { data = g.getImageData(0, 0, N, N); } catch (e) { return null; }   // 跨域污染则放弃
  const px = data.data;
  const luma = new Float32Array(N * N);
  for (let i = 0, p = 0; i < px.length; i += 4, p++) luma[p] = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
  // 可分离盒式模糊，半径 22（约占画幅 1/6），只留大尺度光照
  const R = 22, tmp = new Float32Array(N * N), low = new Float32Array(N * N);
  const box = (src, dst, horizontal) => {
    for (let y = 0; y < N; y++) {
      let sum = 0;
      const at = (k) => horizontal ? src[y * N + Math.min(N - 1, Math.max(0, k))] : src[Math.min(N - 1, Math.max(0, k)) * N + y];
      for (let k = -R; k <= R; k++) sum += at(k);
      for (let x = 0; x < N; x++) {
        if (horizontal) dst[y * N + x] = sum / (2 * R + 1);
        else dst[x * N + y] = sum / (2 * R + 1);
        sum += at(x + R + 1) - at(x - R);
      }
    }
  };
  box(luma, tmp, true); box(tmp, low, false);
  // 以中央区域（一定落在衣身上）的平均亮度为基准
  let ref = 0, cnt = 0;
  for (let y = N * 0.35; y < N * 0.65; y++) for (let x = N * 0.35; x < N * 0.65; x++) { ref += low[(y | 0) * N + (x | 0)]; cnt++; }
  ref = cnt ? ref / cnt : 128;
  if (!isFinite(ref) || ref < 12) return null;
  for (let p = 0, i = 0; p < N * N; p++, i += 4) {
    const k = Math.min(2.6, Math.max(0.5, ref / Math.max(8, low[p])));
    px[i] = Math.min(255, px[i] * k);
    px[i + 1] = Math.min(255, px[i + 1] * k);
    px[i + 2] = Math.min(255, px[i + 2] * k);
  }
  g.putImageData(data, 0, 0);
  // 整件成衣所在区域的平均色（贴图坐标 u 0.36–0.64 / v 0.40–0.74，canvas 的 y 是反的）
  const x0 = Math.floor(N * 0.36), x1 = Math.ceil(N * 0.64);
  const y0 = Math.floor(N * (1 - 0.74)), y1 = Math.ceil(N * (1 - 0.40));
  let r = 0, gg = 0, b = 0, n = 0;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    const i = (y * N + x) * 4;
    r += px[i]; gg += px[i + 1]; b += px[i + 2]; n++;
  }
  const mean = n ? [Math.round(r / n), Math.round(gg / n), Math.round(b / n)] : [128, 128, 128];
  /* 袖筒专用的小块面料：裁一块胸前那块布下来，绕着袖子贴一圈。
     用实色会让有花型的衣服出现「素色袖子」，用整幅图又会把花纹拉变形，
     裁一小块再重复，袖子的花色和衣身才是同一匹料。 */
  let tile = null;
  const cw = Math.round(N * 0.16), ch = Math.round(N * 0.16);
  const cx0 = Math.round(N * 0.42), cy0 = Math.round(N * (1 - 0.68));
  if (cw > 4 && ch > 4 && cx0 + cw <= N && cy0 + ch <= N) {
    const tc = document.createElement('canvas');
    tc.width = cw; tc.height = ch;
    const tg = tc.getContext('2d');
    tg.drawImage(cv, cx0, cy0, cw, ch, 0, 0, cw, ch);
    tile = tc;
  }
  return { canvas: cv, mean, tile };
}

/* 袖筒专用的面料贴图：取胸前那块布的一小块，绕着袖子重复贴。
   平铺图里没有袖子对应的区域，袖筒若按自己的 UV 去采样，
   采到的多半是背景或阴影，肩头就会拼出一块异色的贴片；
   用素色又会让有花型的衣服出现「素色袖子」。
   裁一小块重复贴，袖子才和衣身是同一匹料。 */
const _solidTexCache = new Map();
function fabricSolidTexOf(itemId) {
  if (_solidTexCache.has(itemId)) return _solidTexCache.get(itemId);
  const flat = _flatCache.get(itemId);
  let tex = null;
  if (flat && flat.tile) {
    tex = new THREE.Texture(flat.tile);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
  } else if (flat && flat.mean) {
    const cv = document.createElement('canvas');
    cv.width = cv.height = 4;
    const g = cv.getContext('2d');
    const [r, gg, b] = flat.mean;
    g.fillStyle = `rgb(${r},${gg},${b})`;
    g.fillRect(0, 0, 4, 4);
    tex = new THREE.Texture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
  }
  _solidTexCache.set(itemId, tex);
  return tex;
}

const _flatCache = new Map();
const _texCache = new Map();
function fabricTexOf(itemId) {
  if (_texCache.has(itemId)) return _texCache.get(itemId);
  const item = DB_BY_ID[itemId];
  const src = item && item.image;
  let tex = null;
  if (src) {
    const url = assetURL(src);
    /* 本地 file:// 图片画进 canvas 会污染画布，getImageData 直接抛安全错误，
       贴图就整个做不出来。远端图（预览页统一走 raw.githubusercontent，带 CORS
       头）不会污染，可以正常用——所以这里只看图片本身是不是本地文件，
       不再按页面协议一刀切。 */
    if (url.startsWith('file:') && !INLINE_IMAGES) { _texCache.set(itemId, null); return null; }
    // 已经取到并压平过的图（可能是异步补到的），直接用
    const ready = _flatCache.get(itemId);
    const img = document.querySelector(`.garment-card[data-id="${itemId}"] .db-photo`);
    if (ready) {
      tex = new THREE.Texture(ready.canvas);
    } else if (img && img.complete && img.naturalWidth > 0) {
      const flat = flattenShading(img);
      if (flat) {
        _flatCache.set(itemId, flat);
        tex = new THREE.Texture(flat.canvas);
      } else {
        tex = new THREE.Texture(img);
      }
    } else if (img) {
      /* 卡片图还没解码完（懒加载刚进视口，或远端图还在排队）：
         自己再取一次，带 CORS；到位后重建当前这件，
         衣服才不会是没花色的纯色壳。 */
      const pending = new Image();
      if (REMOTE_ASSET_BASE) pending.crossOrigin = 'anonymous';
      pending.onload = () => {
        const flat = flattenShading(pending);
        if (flat) _flatCache.set(itemId, flat);
        _texCache.delete(itemId); _solidTexCache.delete(itemId);
        fabricTexOf(itemId);
        refreshGarmentTexture(itemId);
      };
      pending.src = assetURL(src);
    }
    if (tex) {
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    }
  }
  _texCache.set(itemId, tex);
  return tex;
}

/* 面料贴图到位后，把正在穿的这件重建一次 */
function refreshGarmentTexture(itemId) {
  const slot = Object.keys(state.outfit).find(k => state.outfit[k] && state.outfit[k].id === itemId);
  if (!slot) return;
  const entry = state.outfit[slot];
  const group = buildGarment(itemId, state.size, state.model, entry.color, true,
    fabricTexOf(itemId), fabricSolidTexOf(itemId));
  if (!group) return;
  garmentGroup.remove(entry.group);
  entry.group = group;
  garmentGroup.add(group);
}

/* 折扣门槛：2 折及以下（现价不超过原价 20%，即折扣 ≥80%）。
   浅折扣商品不进限时折扣页。 */
const SALE_MIN_DISCOUNT = 80;

/* 限时折扣：女装来自高分库（在售码里仍有 90+ 合身档），
   男装来自 Symbol / Domino 男装 sale 页，只进折扣信息、不进试穿库。
   两边都先过 2 折门槛，再按折扣降序全部展示，不设条数上限。 */
function saleItems() {
  const women = DB.filter(g => g.premium && g.category !== 'accessories' && hasFittingSaleSize(g) &&
    g.discountPct >= SALE_MIN_DISCOUNT && g.curUAH > 0 && g.origUAH > g.curUAH);
  const men = MEN_SALE.filter(g => !isShoe(g) && isAllowedLine(g) && g.discountPct >= SALE_MIN_DISCOUNT &&
    g.curUAH > 0 && g.origUAH > g.curUAH);
  /* Kameron 深折女装成衣已在构建期按 fitEngine 90 分入库，随 DB 一起展示；
     这里只补入仅浏览的男装与配件，避免重复。 */
  const kameron = KAMERON_DEEP.filter(g => g.onlyBrowse && !isShoe(g) && isAllowedLine(g) &&
    g.discountPct >= SALE_MIN_DISCOUNT && g.curUAH > 0 && g.origUAH > g.curUAH);
  return [...women, ...men, ...kameron]
    .sort((a, b) => b.discountPct - a.discountPct || (b.fitScore || 0) - (a.fitScore || 0));
}
/* 深折条目按 id 查找（不进 DB_BY_ID，避免把无成衣围度的款混进 3D/2D 试穿）。 */
const KAMERON_BY_ID = Object.fromEntries(KAMERON_DEEP.map(g => [g.id, g]));

/* 折扣预览图加载失败时的占位（灰色衣形），保证每条都有可视预览，
   不再因为单张图缺失就把 img 从 DOM 里摘掉。 */
const PROMO_PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="68" height="88" viewBox="0 0 68 88">' +
  '<rect width="68" height="88" fill="#2a2622"/>' +
  '<path d="M24 14 L34 20 L44 14 L56 26 L49 34 L46 30 L46 74 L22 74 L22 30 L19 34 L12 26 Z" fill="#544a3e"/>' +
  '</svg>');

/* 当前品牌页的商品集。
   HIGH UA 是默认首页：四个乌克兰平台在售的女装高分款，逐款带平台标注。
   HIGH EU 是欧洲官网高分款。vintage 已整体下架，两个页面都不再显示。 */
function currentBrandItems() {
  if (state.brand === SALE_TAB.id) return saleItems();
  /* HIGH UA：四个乌克兰平台在售的女装高分款，逐款带平台标注。 */
  if (state.brand === PREMIUM_TAB.id) {
    /* 在售码里没有一档合身（90+）的平台款不进 HIGH UA。
       Kameron 女装成衣已按同一门槛入库并走试穿；余下的女装配件
       仅浏览 + 外链。男装一律不进 HIGH UA，只在限时折扣区展示。 */
    return [...DB.filter(g => g.premium && hasFittingSaleSize(g)),
      ...KAMERON_DEEP.filter(g => g.onlyBrowse && g.gender !== 'men' && !isShoe(g) && isAllowedLine(g))];
  }
  /* HIGH EU：杜嘉班纳、巴尔曼官网库，以及各奢侈品牌官网当季款。
     只保留合身评分 80 分以上的款——按新判据重算后低于 80 的一律不显示。 */
  if (state.brand === EU_TAB.id) {
    return DB.filter(g => !g.premium && gradeOf(g).score >= 80);
  }
  return DB.filter(g => g.brand === state.brand);
}

function clearSearch() {
  state.query = '';
  if (els.searchInput) els.searchInput.value = '';
  if (els.searchClear) els.searchClear.hidden = true;
}
/* 切品牌/分类时把筛选一并清掉：这两个下拉是全局口径，
   留着会让用户以为当前分类只有几款。 */
function clearFilters() {
  state.filterColor = '';
  state.filterStyle = '';
  state.filterGrade = '';
  state.filterPBrand = '';
  state.filterPlatform = '';
  if (els.filterPBrand) { els.filterPBrand.value = ''; els.filterPBrand.closest('.filter-sel')?.classList.remove('has-value'); }
  if (els.filterPlatform) { els.filterPlatform.value = ''; els.filterPlatform.closest('.filter-sel')?.classList.remove('has-value'); }
  if (els.filterColor) { els.filterColor.value = ''; els.filterColor.closest('.filter-sel')?.classList.remove('has-value'); }
  if (els.filterStyle) { els.filterStyle.value = ''; els.filterStyle.closest('.filter-sel')?.classList.remove('has-value'); }
  if (els.filterGrade) { els.filterGrade.value = ''; els.filterGrade.closest('.filter-sel')?.classList.remove('has-value'); }
}

/* ---------------- 合身等级（星级） ---------------- */
/* 每一款的等级取它在可选尺码里「最优的那一档」的合身评分：
   评分越高说明这件衣服对当前身形越友好。等级与尺码无关，
   所以可以直接用来排序和筛选。
   同批商品共用 31 个测量模板，引擎内部按模板缓存，这里只做逐款的取值。 */
const _gradeCache = new Map();
function gradeOf(item) {
  /* 配件与仅浏览款没有成衣围度，不能套 fitEngine 产出伪评分。 */
  if (item.category === 'accessories' || item.composite === false) {
    return { score: 0, stars: 0, verdict: '仅浏览', size: '', parts: [] };
  }
  let g = _gradeCache.get(item.id);
  if (!g) {
    /* 全站同一把尺子：平台商品与 DG 库都走 fitEngine 的 fitGrade。
       平台商品的 measurements 由官方净体表 + 版型余量构造，
       sizes 只保留详情页抓到的在售码，与 DG 商品同一判据。 */
    g = fitGrade(item.id, state.model);
    _gradeCache.set(item.id, g);
  }
  return g;
}

/** HIGH UA 在售款：只有在售尺码里存在一档 90 分以上合身码才留在库里。
    配件按既定规则仅浏览、不评分。 */
function hasFittingSaleSize(item) {
  if (!item || !item.premium || item.category === 'accessories' || item.composite === false) return true;
  const av = (item.availSizes && item.availSizes.length) ? item.availSizes : item.sizes;
  if (!av || !av.length) return false;
  const g = gradeOf(item);
  return !!(g && g.score >= 90 && g.size && av.some(s => normalizeSize(s).size === g.size));
}

const STAR_TEXT = { 3: '★★★ 满分', 2: '★★ 合身', 1: '★ 略偏', 0: '' };

/* 统一解析商品品牌名，覆盖官网品牌、奢侈品牌与乌克兰平台。
   卡片品牌标签始终显示，不再受搜索/筛选状态控制。 */
function resolveBrandLabel(item) {
  const all = [...BRANDS, ...PREMIUM_BRANDS];
  const found = all.find(b => b.id === item.brand);
  if (found) return found.name;
  return item.brand || '';
}

/* 高分库商品的规格文字：与 DG 库同口径，直接显示引擎算出的
   该码成衣尺寸（官方净体基准档 + 设计余量，按官方档比放缩），
   再附各部位相对合身基准线的偏差。 */
function premiumSpecText(item, size) {
  if (item.onlyBrowse) return '深折仅浏览 · 点击打开平台商品页';
  if (item.category === 'accessories') return `${item.style || '配件'} · 仅浏览，不参与合身评分`;
  const g = gradeOf(item);
  const gm = item.measurements ? garmentMeasurements(item.id, size, state.model) || {} : {};
  const parts = [];
  if (gm.bust != null) parts.push(`胸围 ${Math.round(gm.bust)}`);
  if (gm.waist != null && item.category !== 'bottoms') parts.push(`腰围 ${Math.round(gm.waist)}`);
  if (gm.hip != null && item.category === 'bottoms') parts.push(`臀围 ${Math.round(gm.hip)}`);
  const fit = g.parts && g.parts.length
    ? g.parts.map(p => `${p.label}${p.delta > 0 ? '+' : ''}${p.delta}`).join(' ')
    : '';
  return `${parts.join(' / ')} cm${fit ? ` · ${fit}` : ''}`;
}
/* 星级徽章：满分档才给三星，其余两档也标出来，用户一眼能看出排序依据 */
function starBadge(item) {
  const g = gradeOf(item);
  if (!g.stars) return '';
  const cls = g.stars === 3 ? 'star3' : g.stars === 2 ? 'star2' : 'star1';
  const tip = `合身评分 ${g.score} 分（最优尺码 ${g.size} · ${g.verdict}）`;
  return `<span class="db-tag ${cls}" title="${tip}">${'★'.repeat(g.stars)} ${g.score}</span>`;
}

/* 商品搜索：有关键词时跨品牌、跨品类全局检索；空关键词回到当前品牌+品类。
   匹配字段覆盖中文名、英文名、款号、面料、版型、季节、品牌名与品类名，
   并把多词用空格拆开做 AND，缩小范围更准（如「真丝 连衣裙」）。 */
function matchingItems() {
  const q = (state.query || '').trim().toLowerCase();
  const fc = state.filterColor || '';
  const fst = state.filterStyle || '';
  const fg = state.filterGrade || '';
  const fb = state.filterPBrand || '';
  const fp = state.filterPlatform || '';
  if (!q && !fc && !fst && !fg && !fb && !fp) return currentBrandItems().filter(g => g.category === state.category);
  const terms = q.split(/\s+/).filter(Boolean);
  const catName = Object.fromEntries(DB_CATEGORIES.map(c => [c.id, c.name + ' ' + c.en]));
  const brandName = Object.fromEntries([...BRANDS, ...PREMIUM_BRANDS].map(b => [b.id, `${b.name} ${b.en} ${b.short}`]));
  /* 搜索池同时包含 HIGH UA 高分款与 Kameron 女装仅浏览款；男装只在折扣区出现。 */
  const pool = state.brand === PREMIUM_TAB.id
    ? [...DB, ...KAMERON_DEEP.filter(g => g.onlyBrowse && g.gender !== 'men' && !isShoe(g) && isAllowedLine(g))] : DB;
  return pool.filter(g => {
    /* 跨品牌搜索也执行同一条 HIGH UA 在售合身门槛。 */
    if (!hasFittingSaleSize(g)) return false;
    if (fc && !(g.colors || []).some(c => c.name === fc)) return false;
    if (fst && g.style !== fst) return false;
    if (fg && String(gradeOf(g).stars) !== fg) return false;
    if (fb && g.brand !== fb) return false;
    if (fp && (g.platform || '其他') !== fp) return false;
    const hay = [
      g.name, g.nameEn, g.code, g.fabric, g.style,
      SILHOUETTE_NAMES[g.silhouette] || '', g.silhouette || '',
      g.season || '', g.collection || '', g.platform || '',
      catName[g.category] || '', brandName[g.brand] || '',
      (g.colors || []).map(c => c && c.name).join(' '),
    ].join(' ').toLowerCase();
    return terms.every(t => hay.includes(t));
  });
}

/* 按合身评分降序排列：满分（★★★）在最前，其余依次往后。
   同分保持原有目录顺序，避免整页被打乱。 */
function sortByFit(items) {
  return items
    .map((item, i) => ({ item, g: gradeOf(item), i }))
    .sort((a, b) => (b.g.score - a.g.score) || (a.i - b.i))
    .map(x => x.item);
}

/* HIGH UA 低价优先：按现价（格里夫纳）升序，无现价的排最后，
   同价保持目录原顺序，避免同价位反复跳动。 */
function sortByPriceAsc(items) {
  return items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => {
      const pa = a.item.curUAH > 0 ? a.item.curUAH : Infinity;
      const pb = b.item.curUAH > 0 ? b.item.curUAH : Infinity;
      return (pa - pb) || (a.i - b.i);
    })
    .map(x => x.item);
}

/* 筛选项来源：始终用全库统计，用户能直接看到每个颜色/款式各有多少款，
   不会因为当前品牌或分类不同而看到忽多忽少的选项。 */
function filterOptions() {
  const colors = new Map(), styles = new Map();
  const grades = { 3: 0, 2: 0, 1: 0, 0: 0 };
  DB.forEach(g => {
    (g.colors || []).forEach(c => {
      if (!c || !c.name) return;
      colors.set(c.name, (colors.get(c.name) || 0) + 1);
    });
    if (g.style) styles.set(g.style, (styles.get(g.style) || 0) + 1);
    grades[gradeOf(g).stars] = (grades[gradeOf(g).stars] || 0) + 1;
  });
  const top = (m, n) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
  return { colors: top(colors, 26), styles: top(styles, 40), grades };
}

/* 折扣页排在最前，之后是 HIGH UA、HIGH EU。
   vintage 已整体下架，不再占用标签位。 */
const SALE_TAB = { id: 'SALE', name: '限时折扣', short: '限时折扣', isSale: true };
const BRAND_TABS = [SALE_TAB, PREMIUM_TAB, EU_TAB];

function setBrandHeading(b) {
  if (!b || !els.wardrobeTitle) return;
  els.wardrobeTitle.textContent = b.name;
  if (b.isSale) {
    const stamp = promoFeedMeta.generatedAt ? `更新 ${promoStamp(promoFeedMeta.generatedAt)}` : '每2小时刷新';
    els.wardrobeSub.textContent = `${saleItems().length} 条 · 含男装 · ${stamp} · 男装仅浏览`;
  } else {
    els.wardrobeSub.textContent = `${currentBrandItems().length} 款 · 点击试穿，数据驱动合身`;
  }
}

function renderBrands() {
  if (!els.brands) return;
  els.brands.innerHTML = BRAND_TABS.map(b => {
    const cls = `brand-tab ${b.id === state.brand ? 'active' : ''} high`;
    const inner = `<b>${b.short}</b>`;
    return `<button class="${cls}" data-brand="${b.id}">${inner}</button>`;
  }).join('');
  els.brands.querySelectorAll('.brand-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.brand = btn.dataset.brand;
      clearSearch(); clearFilters();
      const b = BRAND_TABS.find(x => x.id === state.brand);
      /* 进「HIGH」页时若当前品类里没有高分款，自动切到有货的品类，
         免得打开就是空列表。 */
      if (b.isPremium || b.isEu) {
        const counts = DB_CATEGORIES.map(c => ({ id: c.id, n: currentBrandItems().filter(g => g.category === c.id).length }));
        if (!counts.some(c => c.id === state.category && c.n > 0)) {
          const best = counts.sort((a, b2) => b2.n - a.n)[0];
          if (best && best.n > 0) state.category = best.id;
        }
      }
      setBrandHeading(b);
      renderBrands(); renderCategories(); renderGarments(); renderPromo();
      renderFilterOptions();
      renderSizes(); syncSizeControls();   // 品牌换了，官方码名（IT/FR）随之切换
    });
  });
}

/* ---------- 促销数据源：每 2 小时刷新 ----------
   商品库里的价格是抓库时的快照。这里从 GitHub 上的 promo-feed.json
   读取最新商品页价格，覆盖高分库 DB 中的现价/原价/折扣；拿不到远端时
   沿用本地缓存，离线也不会把已有的促销提示清空。 */
const PROMO_FEED_URLS = [
  'https://raw.githubusercontent.com/ericljw98-crypto/atelier-3d-fitting/main/web/promo-feed.json',
  'https://cdn.jsdelivr.net/gh/ericljw98-crypto/atelier-3d-fitting@main/web/promo-feed.json',
];
const PROMO_CACHE_KEY = 'atelier_promo_feed_v1';
const PROMO_REFRESH_MS = 2 * 60 * 60 * 1000;
let promoFeedMeta = { generatedAt: '', source: '' };
let promoLastFetch = 0;

function promoStamp(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const p = n => String(n).padStart(2, '0');
  return `${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function applyPromoFeed(feed) {
  if (!feed || !Array.isArray(feed.items) || !feed.generatedAt) return false;
  const byId = new Map(feed.items.filter(x => x && x.id).map(x => [x.id, x]));
  let applied = 0;
  for (const item of [...DB, ...MEN_SALE, ...KAMERON_DEEP]) {
    const p = byId.get(item.id);
    if (!p) continue;
    item.curUAH = Number(p.curUAH) || 0;
    item.origUAH = Number(p.origUAH) || 0;
    item.discountPct = Number(p.discountPct) || 0;
    item.priceNote = p.priceNote || '';
    if (p.priceEUR) item.priceEUR = p.priceEUR;
    if (p.priceCNY) item.priceCNY = p.priceCNY;
    applied++;
  }
  promoFeedMeta = { generatedAt: feed.generatedAt, source: feed.source || '远端促销数据' };
  return applied > 0;
}

function restorePromoFeed() {
  try {
    const raw = localStorage.getItem(PROMO_CACHE_KEY);
    if (raw) applyPromoFeed(JSON.parse(raw));
  } catch { /* 隐私模式或缓存损坏时不阻断应用 */ }
}

async function fetchPromoFeed() {
  for (const base of PROMO_FEED_URLS) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 9000);
      const res = await fetch(`${base}?t=${Date.now()}`, { cache: 'no-store', signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) continue;
      const feed = await res.json();
      if (!applyPromoFeed(feed)) continue;
      promoLastFetch = Date.now();
      try { localStorage.setItem(PROMO_CACHE_KEY, JSON.stringify(feed)); } catch { /* 忽略存储配额 */ }
      renderPromo();
      renderGarments();
      return;
    } catch { /* 换下一个源 */ }
  }
}

function initPromoFeed() {
  restorePromoFeed();
  fetchPromoFeed();
  setInterval(fetchPromoFeed, PROMO_REFRESH_MS);
  /* 移动端后台会节流定时器；回到前台时发现超过 2 小时未拉取就立刻补刷。 */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && Date.now() - promoLastFetch > PROMO_REFRESH_MS) fetchPromoFeed();
  });
}

/* 限时折扣独立标签页：女装来自高分库，男装来自 Symbol / Domino 男装 sale 页，
   按折扣降序全部展示。男装只展示价格与来源，不进入女装试穿流程。 */
function renderPromo() {
  if (!els.promoList || !els.promoStrip) return;
  const sale = state.brand === SALE_TAB.id;
  const left = document.querySelector('.page-left');
  if (left) left.dataset.mode = sale ? 'sale' : 'catalog';
  els.promoStrip.hidden = false;
  els.promoStrip.classList.remove('collapsed');
  if (els.promoUpdated) {
    els.promoUpdated.textContent = promoFeedMeta.generatedAt
      ? `更新 ${promoStamp(promoFeedMeta.generatedAt)} · 每2小时` : '每2小时刷新';
  }
  const top = saleItems();
  const titleEl = document.getElementById('promo-title-text');
  if (titleEl) titleEl.textContent = sale ? `限时折扣 · ${top.length} 条在售折扣 · 含男装` : '限时折扣';
  if (!sale) { els.promoList.innerHTML = ''; return; }

  const brandLabel = g => (g.gender === 'men' || g.onlyBrowse
    ? (g.brandLabel || g.brand)
    : (resolveBrandLabel({ brand: g.brand }) || g.brand));
  els.promoList.innerHTML = top.map((g, i) => {
    const men = g.gender === 'men';
    const detail = men
      ? `男装 · 仅浏览 · ${g.platform} · ${g.kind || '男装'}`
      : g.onlyBrowse
        ? `${g.platform} · 2 折深折 · 仅浏览外链`
        : `${g.platform} · ${g.fitScore || 0} 分 · 可试穿`;
    return `
    <button class="promo-item${men ? ' is-men' : ''}" data-id="${g.id}" type="button" title="${g.priceNote || g.url || ''}">
      <span class="promo-rank">${i + 1}</span>
      <img class="promo-thumb" src="${assetURL(g.image)}" alt="" loading="lazy"${REMOTE_ASSET_BASE ? ' crossorigin="anonymous"' : ''}/>
      <span class="promo-off">-${g.discountPct}%</span>
      <span class="promo-info">
        <span class="promo-name">${brandLabel(g)} · ${g.name}</span>
        <span class="promo-sub">${detail}</span>
        <span class="promo-price"><s>₴${g.origUAH.toLocaleString()}</s> <b>₴${g.curUAH.toLocaleString()}</b></span>
      </span>
    </button>`;
  }).join('');
  /* 预览图兜底：任一图片加载失败都用衣形占位替换，保证每条折扣都有预览。 */
  els.promoList.querySelectorAll('.promo-thumb').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallback) return;
      img.dataset.fallback = '1';
      img.src = PROMO_PLACEHOLDER;
    });
  });
  els.promoList.querySelectorAll('.promo-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const men = MEN_SALE.find(x => x.id === id);
      const promoted = men || KAMERON_BY_ID[id] || DB_BY_ID[id];
      if (!promoted) return;
      /* 折扣条目点击一律打开平台商品详情页外链（网页新标签，APK 走系统浏览器）。
         没有链接时才回退到站内试穿。 */
      if (promoted.url) {
        try { window.open(promoted.url, '_blank', 'noopener'); return; } catch { /* 落到站内 */ }
      }
      if (men) {
        toast(`男装折扣仅浏览：${men.brand} · ${men.name} · ${men.platform}`);
        return;
      }
      state.category = promoted.category || DB_CATEGORIES[0].id;
      renderCategories(); clearSearch(); clearFilters();
      selectGarment(id);
    });
  });
}

function renderCategories() {
  els.tabs.innerHTML = DB_CATEGORIES.map(c =>
    `<button class="category-tab ${c.id === state.category ? 'active' : ''}" data-cat="${c.id}">${c.name}<span class="tab-count">${currentBrandItems().filter(g => g.category === c.id).length}</span></button>`
  ).join('');
  els.tabs.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.cat;
      clearSearch(); clearFilters();
      renderCategories(); renderGarments();
    });
  });
}

/** 价格区块：HIGH UA 直接给平台原价与折扣价（格里夫纳），不折算人民币；
    官网档案款仍按欧元与当年零售价标注。 */
function priceMarkup(item) {
  if (item.premium && item.curUAH > 0) {
    const orig = item.origUAH > item.curUAH
      ? `<s>₴${item.origUAH.toLocaleString()}</s> ` : '';
    const off = item.discountPct > 0 ? ` · -${item.discountPct}%` : '';
    return `<span class="price-eur">${orig}₴${item.curUAH.toLocaleString()}</span>` +
      `<span class="price-cny">${item.platform || '平台'} 在售价${off}</span>`;
  }
  if (item.discontinued) {
    return `<span class="price-eur">€${item.priceEUR.toLocaleString()}</span><span class="price-cny">${item.archiveYear || ''} 年零售价 · 已停产</span>`;
  }
  return `<span class="price-eur">€${item.priceEUR.toLocaleString()}</span><span class="price-cny">约 ¥${item.priceCNY.toLocaleString()}</span>`;
}

function renderGarments() {
  /* 折扣页用独立列表渲染，不占商品网格。 */
  if (state.brand === SALE_TAB.id) return;
  const searching = !!(state.query || '').trim();
  const filtering = !!(state.filterColor || state.filterStyle || state.filterGrade);
  const matched = matchingItems();
  /* HIGH UA 按现价从低到高；HIGH EU 等保持合身评分降序。 */
  const items = state.brand === PREMIUM_TAB.id ? sortByPriceAsc(matched) : sortByFit(matched);
  const starCount = matched.filter(i => gradeOf(i).stars === 3).length;
  /* 副标题要说明当前看到的是「筛选后」还是「该品牌全部」，
     否则 1922 款和筛选出的 463 款看起来像数据对不上。 */
  const scope = () => {
    const parts = [];
    if (searching) parts.push(`搜索「${state.query.trim()}」`);
    if (state.filterColor) parts.push(`颜色 ${state.filterColor}`);
    if (state.filterStyle) parts.push(`款式 ${state.filterStyle}`);
    if (state.filterGrade) parts.push(`${'★'.repeat(+state.filterGrade)} 档`);
    return parts.join(' · ');
  };
  if (!items.length) {
    els.list.innerHTML = `<div class="search-empty">没有找到匹配的商品。<br/>试试款号、中文名、英文名、面料或下拉筛选，例如「真丝」「jacquard」「SK0000000144」。</div>`;
    if (els.wardrobeSub) {
      els.wardrobeSub.textContent = (searching || filtering)
        ? `${scope()} · 0 款`
        : `${currentBrandItems().length} 款 · 点击试穿，数据驱动合身`;
    }
    return;
  }
  els.list.innerHTML = items.map(item => {
    const chosen = Object.values(state.outfit).some(o => o && o.id === item.id);
    const brandLabel = resolveBrandLabel(item);
    const cat = DB_CATEGORIES.find(c => c.id === item.category);
    return `<div class="garment-card db-card ${chosen ? 'selected' : ''} ${gradeOf(item).stars === 3 ? 'is-perfect' : ''}" data-id="${item.id}">
      <span class="garment-check"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <div class="db-thumb">
        ${item.image
          ? `<img class="db-photo" src="${assetURL(item.image)}" alt="${item.nameEn}" loading="lazy"${REMOTE_ASSET_BASE ? ' crossorigin="anonymous"' : ''} onerror="this.remove()"/>`
          : `<div class="db-thumb-fallback"><span>${item.archiveYear || 'ARCHIVE'}</span><b>${item.nameEn}</b><i>停产款 · 无官方图</i></div>`}
      </div>
      <div class="db-card-head">
        <span class="db-code">${item.code}</span>
        ${starBadge(item)}
        ${item.premium && item.platform ? `<span class="db-tag platform">${item.platform}</span>` : ''}
        ${item.premium && item.discountPct > 0 ? `<span class="db-tag discount">-${item.discountPct}%</span>` : ''}
        ${item.composite === false ? `<span class="db-tag nofit">仅浏览</span>` : ''}
        ${item.discontinued ? `<span class="db-tag archive">停产 ${item.archiveYear || ''}</span>` : ''}
        <span class="db-fit">${item.fit}</span>
      </div>
      <div class="garment-name">${item.name}</div>
      <div class="db-meta"><span class="db-brand">${brandLabel}</span> · ${item.fabric}${cat ? ` · ${cat.name}` : ''}</div>
      <div class="db-price">${priceMarkup(item)}</div>
      ${item.premium && item.availSizesText ? `<div class="db-avail">平台在售尺码 ${item.availSizesText}</div>` : ''}
      <div class="db-foot"><span class="db-spec">${item.premium ? premiumSpecText(item, state.size) : specText(item, state.size)}</span></div>
    </div>`;
  }).join('');
  els.list.querySelectorAll('.garment-card').forEach(card => {
    const item = DB_BY_ID[card.dataset.id] || KAMERON_BY_ID[card.dataset.id];
    /* 左页悬停先预览右页封面，点击才真正翻页；离开后回到已试穿款。 */
    if (item) {
      card.addEventListener('mouseenter', () => {
        if (bookEls.book && bookEls.book.dataset.page === 'catalog') paintCover(item);
      });
      card.addEventListener('mouseleave', () => {
        if (bookEls.book && bookEls.book.dataset.page === 'catalog') paintCover(selectedCoverItem);
      });
    }
    /* 配件没有成衣槽位，点击只提示，不进入 3D/2D 换装流程。 */
    if (item && item.category === 'accessories' && !item.onlyBrowse) {
      card.addEventListener('click', () =>
        toast(`配件仅浏览：${item.name} · ${item.platform}；不参与 2D 试穿`));
      return;
    }
    /* Kameron 深折款没有成衣围度，点击直接打开平台商品页，不进试穿流程。 */
    if (item && item.onlyBrowse) {
      card.addEventListener('click', () => {
        if (item.url) { try { window.open(item.url, '_blank', 'noopener'); return; } catch { /* 落到提示 */ } }
        toast(`仅浏览：${item.brandLabel} · ${item.name} · ${item.platform}`);
      });
      return;
    }
    card.addEventListener('click', () => selectGarment(card.dataset.id));
  });
  if (els.wardrobeSub) {
    if (state.brand === PREMIUM_TAB.id && !filtering) {
      const best = matched.reduce((m, i) => Math.max(m, gradeOf(i).score), 0);
      const brs = new Set(matched.map(i => i.brand)).size;
      const browse = matched.filter(i => i.onlyBrowse).length;
      els.wardrobeSub.textContent =
        `${matched.length} 款 · ${brs} 个品牌女装 · 合身 90 分以上 + ${browse} 款深折仅浏览 · 当前最高 ${best} 分`;
    } else {
      els.wardrobeSub.textContent = (searching || filtering)
        ? `${scope()} · ${items.length} 款（全品牌全品类）`
        : `${currentBrandItems().length} 款 · 本类 ${items.length} 款 · 按合身评分排序 · ${starCount} 款满分置顶`;
    }
  }
}

function renderColors() {
  // 成衣按官方花色呈现，配色板已撤掉；这里保留空实现以兼容旧调用
  if (!els.colors) return;
  els.colors.innerHTML = SWATCHES.map(c =>
    `<div class="swatch ${c.hex === state.color ? 'active' : ''}" data-hex="${c.hex}" data-name="${c.name}" title="${c.name}" style="background:#${c.hex.toString(16).padStart(6, '0')}"></div>`
  ).join('');
  els.colors.querySelectorAll('.swatch').forEach(sw => {
    sw.addEventListener('click', () => setColor(parseInt(sw.dataset.hex, 10), sw.dataset.name));
  });
}

/* Balmain 官方 FR↔IT 对照：IT36→FR32、IT38→FR34 … IT50→FR46 */
const IT_TO_FR = { 36: 32, 38: 34, 40: 36, 42: 38, 44: 40, 46: 42, 48: 44, 50: 46 };

/* 尺码显示：按当前品牌的官方码名标注。
   DG 用意大利码 IT，Balmain 用法国码 FR（官方 FR↔IT 对照），
   同一个 IT42 在 DG 显示「IT 42 · M」，在 Balmain 显示「FR 40 · M」。 */
function sizeText(size) {
  const n = sizeNumber(size);
  const l = sizeLetter(size);
  /* 高分服饰页每款品牌不同，码名要按该品牌官方体系显示：
     法国码品牌显示 FR 38，法国数字码品牌（爱马仕）显示 36，其余显示 IT 42。 */
  const wornIds = Object.values(state.outfit).filter(Boolean).map(o => o.id);
  const worn = wornIds.map(id => DB_BY_ID[id]).find(it => it && it.premium);
  if (worn) {
    const lab = premiumSizeLabel(worn.brand, n);
    return l ? `${lab} · ${l}` : lab;
  }
  /* DG/BL 合并进 HIGH EU 后，state.brand 不再区分品牌；
     按当前试穿商品的 brand 判断码制：BL 用 FR，其余用 IT。 */
  const active = wornIds.map(id => DB_BY_ID[id]).find(Boolean);
  const brandId = active ? active.brand : state.brand;
  if (brandId === 'BL') {
    const fr = IT_TO_FR[n];
    return fr != null ? `FR ${fr} · ${l}` : (l ? `${n} · ${l}` : String(n ?? size));
  }
  return l ? `IT ${n} · ${l}` : `IT ${n}`;
}

/** 把当前尺码回写到输入框与按钮态，不触发重建 */
function syncSizeControls() {
  if (els.sizes) {
    els.sizes.querySelectorAll('button').forEach(b => {
      b.classList.toggle('active', b.dataset.size === state.size);
    });
  }
}


function renderSizes() {
  const rec = recommendSize(state.model || DEFAULT_MODEL);
  /* 高分库商品受平台在售尺码限制：只买得到那几个码。
     其他码照常显示但标灰并注明「平台无此码」，让用户知道这件买哪档。 */
  const wornItem = Object.values(state.outfit).filter(Boolean)
    .map(o => DB_BY_ID[o.id]).find(it => it && it.premium && it.availSizes && it.availSizes.length);
  const avail = wornItem ? wornItem.availSizes : null;
  els.sizes.innerHTML = SIZES.map(s => {
    const off = avail && !avail.includes(s);
    return `<button class="${s === state.size ? 'active' : ''}${off ? ' off-size' : ''}" data-size="${s}" title="${SIZE_CHART[s].label}${off ? ' · 平台无此码' : ''}">${sizeText(s)}${s === rec ? '<i class="rec-dot"></i>' : ''}${off ? '<i class="no-size">无</i>' : ''}</button>`;
  }).join('');
  els.sizes.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      state.size = b.dataset.size;
      state.sizeLocked = true;           // 手选后不再被推荐覆盖
      if (els.sizeNote) {
        els.sizeNote.textContent = `已按 ${sizeText(state.size)} 试穿`;
        els.sizeNote.className = 'size-input-note ok';
      }
      syncSizeControls();
      renderGarments(); recomputeOutfitForSize(); updateStatus();
    });
  });
  syncSizeControls();
  const m = state.model || {};
  const bustW = m.bust != null && m.waist != null ? Math.round(m.bust - m.waist) : null;
  const bodyType = bustW == null ? '' : bustW >= 17 ? 'Y型' : bustW >= 12 ? 'A型' : bustW >= 8 ? 'B型' : 'C型';
  /* 高分库商品有自己的最优码（按平台在售尺码判定），
     不能拿通用的 fitSizeForModel 结果去覆盖它的提示。 */
  const wornNow = Object.values(state.outfit).filter(Boolean)
    .map(o => DB_BY_ID[o.id]).find(it => it && it.premium && it.fitSize);
  const recShown = wornNow ? wornNow.fitSize : rec;
  els.sizeHint.textContent = `三围 ${m.bust ?? '—'} / ${m.waist ?? '—'} / ${m.hip ?? '—'}cm${bodyType ? ` · ${bodyType}身材` : ''}，${wornNow ? '本款最优码' : '按胸臀厘米对标推荐'} ${sizeText(recShown)}${!wornNow && (bodyType === 'B型' || bodyType === 'C型') ? '（腰围偏大，已按胸臀放宽一档）' : ''}`;
}

/* 换尺码后，用新尺码重建已穿服装 */
function recomputeOutfitForSize() {
  Object.keys(state.outfit).forEach(slot => {
    const entry = state.outfit[slot];
    if (!entry) return;
    const color = entry.color;
    const group = buildGarment(entry.id, state.size, state.model, color, true, fabricTexOf(entry.id), fabricSolidTexOf(entry.id));
    garmentGroup.remove(entry.group);
    entry.group.traverse(o => { if (o.isMesh) o.geometry.dispose(); });
    garmentGroup.add(group);
    entry.group = group;
  });
  renderSummary(); renderFitReport();
}

function renderSummary() {
  const worn = Object.values(state.outfit).filter(Boolean);
  if (!worn.length) {
    els.summary.innerHTML = '<div class="outfit-empty">尚未选择服饰</div>';
    return;
  }
  els.summary.innerHTML = worn.map(o => {
    const item = DB_BY_ID[o.id];
    return `<div class="outfit-row"><span class="label">${item.name}<small>${state.size}</small></span><span class="value">${item.fabric || ''}</span></div>`;
  }).join('');
}
/* 合身诊断：按成衣固定尺寸 vs 模特身体尺寸判断 */
/** 高分库商品的诊断结果：与 DG 库同一个 fitEngine 判据，
    只是针对当前选中的那一档码（列表排序用的是在售码里的最优档）。 */
function premiumFitResult(item, size, model) {
  const r = evaluateItem(item, size, model);
  if (!r) return null;
  const avail = item.availSizes || [];
  const onSale = avail.length ? avail.includes(size) : true;
  const g = fitGrade(item.id, model);
  let verdict = r.verdict;
  if (!onSale) verdict = '平台无此码';
  const level = !onSale ? 'tooLoose' : r.level;
  return {
    score: r.score, level, verdict, parts: r.parts,
    recommendation: g.size || item.fitSize,
    summary: r.summary,
    recommendationNote: (onSale
      ? `平台在售尺码 ${item.availSizesText}`
      : `平台在售尺码 ${item.availSizesText}（不含当前这一档）`
    ) + ' · 成衣尺寸按官方码表+版型余量估算，非逐款实测',
  };
}

/** 准确度细节：只拆解 evaluateItem 返回的同一份结果，不另立评分体系。 */
function renderAccuracy(result, item) {
  if (!bookEls.accuracy) return;
  if (!result || !result.parts || !result.parts.length) {
    bookEls.accuracy.innerHTML = '<p class="fit-empty">当前款式没有可核验的围度数据</p>';
    return;
  }
  const totalW = result.parts.reduce((s, p) => s + (p.weight || 1), 0) || 1;
  const roleText = p => p.role === 'baseline' ? '基准线 ×2'
    : p.role === 'reference' ? '参考位 ×0.25' : '主判据 ×1';
  const rows = result.parts.map(p => {
    const w = p.weight || 1;
    const contribution = Math.round(p.score * w / totalW);
    return `<div class="acc-row">
      <div class="acc-row-head">
        <b>${p.label} <em class="acc-role ${p.role === 'baseline' ? 'base' : ''}">${roleText(p)}</em></b>
        <span>${p.statusLabel} · 该项 ${p.score} 分</span>
      </div>
      <div class="acc-row-data">
        <span>成衣 ${p.garment} · 基准 ${p.baseline} · 身体 ${p.body}cm</span>
        <span>偏差 ${p.delta > 0 ? '+' : ''}${p.delta}cm · 贡献 ${contribution}</span>
      </div>
    </div>`;
  }).join('');
  /* 封顶只认主判据，和 evaluateItem 完全一致：参考位不合身不触发封顶。 */
  const cappedPart = result.parts.find(p => p.role !== 'reference' && /tight|loose/.test(p.status));
  const capText = cappedPart
    ? `<div class="acc-cap">主判据短板封顶：${cappedPart.label} ${cappedPart.statusLabel}，总分最高 ${/^too/.test(cappedPart.status) ? 59 : 77}。</div>`
    : '';
  const source = item && item.premium
    ? `成衣：平台码表 + 版型余量估算（${item.availSizesText || '以平台在售码为准'}），非逐款实测；身体：锁定档案。`
    : `成衣：官网码表 + 档案测量；身体：锁定档案。均非逐款实测。`;
  bookEls.accuracy.innerHTML = `
    <div class="acc-summary">
      <div class="acc-total"><b>${result.score}</b><span>分 · ${result.verdict}</span></div>
      <div class="acc-formula">口径：加权均分（Σ权重 ${totalW.toFixed(2)}）+ 主判据短板封顶；参考位只计权重、不封顶。</div>
      ${capText}
      <div class="acc-source">${source}</div>
    </div>
    <div class="acc-rows">${rows}</div>`;
}

function renderFitReport() {
  const worn = Object.values(state.outfit).filter(Boolean);
  if (!worn.length || !state.model) {
    els.fitVerdict.textContent = '未试穿';
    els.fitVerdict.className = 'fit-badge';
    els.fitReport.innerHTML = '<p class="fit-empty">试穿任意款式后，这里会给出各部位的合身判断</p>';
    if (bookEls.accuracy) bookEls.accuracy.innerHTML = '<p class="fit-empty">试穿后显示评分权重、偏差与数据来源</p>';
    if (bookEls.sheetItem) bookEls.sheetItem.textContent = '未选择款式';
    return;
  }

  // 以当前选中服饰为判断对象；无选中则取第一件
  const entry = (state.activeSlot && state.outfit[state.activeSlot]) || worn[0];
  const wornItem = DB_BY_ID[entry.id];
  /* 高分库商品与 DG 库同一套 fitEngine 判据，只是测量结果来源不同。 */
  const result = wornItem && wornItem.premium
    ? premiumFitResult(wornItem, state.size, state.model)
    : evaluateFit(entry.id, state.size, state.model);
  if (!result) return;

  if (bookEls.sheetItem) {
    const label = wornItem ? `${resolveBrandLabel(wornItem)} · ${wornItem.name}` : entry.id;
    bookEls.sheetItem.textContent = `${label} · ${state.size}`;
  }

  const levelClass = 'fit-' + result.level;
  els.fitVerdict.textContent = result.verdict;
  els.fitVerdict.className = 'fit-badge ' + levelClass;

  const partsHtml = result.parts.map(p => {
    const fill = Math.max(4, Math.min(100, p.score));
    const roleTag = p.role === 'baseline' ? '<em class="fit-role-base">基准线</em>'
      : p.role === 'reference' ? '<em class="fit-role-ref">参考</em>' : '';
    return `<div class="fit-part">
      <div class="fit-part-head"><span>${p.label}${roleTag}</span><span class="fit-part-status ${p.status}">${p.statusLabel}</span></div>
      <div class="fit-part-bar"><i class="${p.status}" style="width:${fill}%"></i></div>
      <div class="fit-part-data">成衣 ${p.garment} · 合身基准 ${p.baseline} · 身体 ${p.body}<span>基准放松 ${p.designEase > 0 ? '+' : ''}${p.designEase} · 偏差 ${p.delta > 0 ? '+' : ''}${p.delta}cm</span></div>
    </div>`;
  }).join('');

  const recHtml = result.recommendationNote
    ? `<div class="fit-recommend ${result.recommendationNote.indexOf('不含') >= 0 ? '' : 'ok'}">${result.recommendationNote}${result.recommendation && result.recommendation !== state.size ? ` · 建议 ${result.recommendation}` : ''}</div>`
    : (result.recommendation !== state.size
      ? `<div class="fit-recommend">系统推荐尺码 <b>${result.recommendation}</b>，当前 ${state.size} 可能不够合身</div>`
      : `<div class="fit-recommend ok">当前尺码 ${state.size} 与推荐一致</div>`);

  /* 该款在所有可选尺码里的最好状态：星级 + 最优码 + 评分。
     列表按它排序，诊断面板也把它摆出来，两处口径一致。 */
  const g = gradeOf(DB_BY_ID[entry.id]);
  const gradeHtml = `<div class="fit-grade ${g.stars === 3 ? 'star3' : g.stars === 2 ? 'star2' : 'star1'}">
      <span class="fit-grade-stars">${'★'.repeat(g.stars) || '☆'}</span>
      <span class="fit-grade-text">本款最佳状态：${STAR_TEXT[g.stars] || '不合身'} · 最优尺码 ${g.size} · 评分 ${g.score}</span>
    </div>`;

  els.fitReport.innerHTML = `
    <div class="fit-score-row">
      <div class="fit-score ${levelClass}">${result.score}<small>分</small></div>
      <div class="fit-score-desc">${result.summary}</div>
    </div>
    ${gradeHtml}
    ${partsHtml}
    ${recHtml}`;
  renderAccuracy(result, wornItem);
}

function updateStatus() {
  const n = Object.values(state.outfit).filter(Boolean).length;
  els.status.textContent = n ? `已搭配 ${n} 件 · ${state.size}` : '未着装';
  els.status.classList.toggle('has-outfit', n > 0);
  flatMark();          // 2D 与 3D 同一处状态源：这里刷新，两边一起变
}
function renderModelChip() {
  els.modelChip.textContent = modelSummary(state.model) + ' · 已锁定';
}

let toastTimer = null;
function toast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2200);
}
window.__atelierToast = toast;

/* ============================================================
   建档向导
   ============================================================ */
const profileModal = document.getElementById('profile-modal');
const profileForm = document.getElementById('profile-form');
const profileTitle = document.getElementById('profile-title');
const profileSubtitle = document.getElementById('profile-subtitle');
let profileDraft = { ...DEFAULT_MODEL };

function openProfileModal(isEdit) {
  profileDraft = { ...(state.model || DEFAULT_MODEL) };
  profileTitle.textContent = isEdit ? '编辑模特档案' : '建立模特档案';
  profileSubtitle.textContent = '请填写身体测量数据，这些参数将决定 3D 模特体型与服装的合身程度';
  document.getElementById('profile-save').textContent = isEdit ? '保存并更新' : '创建模特并开始';
  renderProfileForm();
  profileModal.classList.add('open');
}
const profileTip = document.getElementById('profile-tip');
function closeProfileModal() { profileModal.classList.remove('open'); }
const tipEditEl = document.getElementById('tip-edit');
if (tipEditEl) tipEditEl.addEventListener('click', () => toast('模特尺寸已按实测数据锁定，不可调整'));
const tipCloseEl = document.getElementById('tip-close');
if (tipCloseEl) tipCloseEl.addEventListener('click', () => profileTip && profileTip.classList.add('hidden'));

function renderProfileForm() {
  const groups = [
    { title: '基础信息', fields: FIELD_META.slice(0, 2) },
    { title: '三围数据', fields: FIELD_META.slice(2, 5) },
    { title: '体态细节', fields: FIELD_META.slice(5) },
  ];
  profileForm.innerHTML = groups.map(grp => `
    <div class="profile-group">
      <h4>${grp.title}</h4>
      ${grp.fields.map(f => `
        <div class="profile-field">
          <div class="profile-field-label">
            <label for="pf-${f.key}">${f.label}</label>
            <span class="pf-hint">${f.hint}</span>
          </div>
          <div class="profile-input-row">
            <input type="range" id="pf-range-${f.key}" data-key="${f.key}" min="${f.min}" max="${f.max}" step="${f.step}" value="${profileDraft[f.key]}" />
            <div class="number-wrap">
              <input type="number" id="pf-${f.key}" data-key="${f.key}" min="${f.min}" max="${f.max}" step="${f.step}" value="${profileDraft[f.key]}" />
              <span>${f.unit}</span>
            </div>
          </div>
        </div>`).join('')}
    </div>`).join('');

  profileForm.querySelectorAll('input[type=range]').forEach(r => {
    r.addEventListener('input', e => {
      const key = e.target.dataset.key;
      profileDraft[key] = parseFloat(e.target.value);
      profileForm.querySelector(`#pf-${key}`).value = profileDraft[key];
      updateRangeFill(r);
      updateProfilePreview();
      liveApplyProfile();          // 拖动即变形，不必等确认
    });
  });
  profileForm.querySelectorAll('input[type=number]').forEach(n => {
    n.addEventListener('input', e => {
      const key = e.target.dataset.key;
      const f = FIELD_META.find(x => x.key === key);
      let v = parseFloat(e.target.value);
      if (!isFinite(v)) return;
      v = Math.min(f.max, Math.max(f.min, v));
      profileDraft[key] = v;
      const range = profileForm.querySelector(`#pf-range-${key}`);
      range.value = v; updateRangeFill(range);
      updateProfilePreview();
      liveApplyProfile();
    });
  });
  profileForm.querySelectorAll('input[type=range]').forEach(updateRangeFill);
  updateProfilePreview();
}
/* 滑块实时塑形：拖动时逐帧重算人体顶点代价高（5 万顶点），
   用 90ms 节流；服装几何重建也一并跟进，否则布料会留在旧体形上。 */
let _liveTimer = null, _livePending = false;
function liveApplyProfile() {
  if (_liveTimer) { _livePending = true; return; }
  _liveTimer = setTimeout(() => {
    _liveTimer = null;
    if (currentRealBody) {
      currentRealBody.applyProfile(profileDraft);
      renderGarments();
    }
    if (_livePending) { _livePending = false; liveApplyProfile(); }
  }, 90);
}
function updateRangeFill(el) {
  const min = parseFloat(el.min), max = parseFloat(el.max);
  const p = (parseFloat(el.value) - min) / (max - min) * 100;
  el.style.setProperty('--fill', p + '%');
}
function updateProfilePreview() {
  const box = document.getElementById('profile-live-summary');
  if (box) box.textContent = modelSummary(profileDraft);
  const rec = recommendSize(profileDraft);
  const recBox = document.getElementById('profile-rec-size');
  if (recBox) recBox.textContent = `推荐尺码 ${rec}`;
}

document.getElementById('profile-save').addEventListener('click', () => {
  state.model = { ...profileDraft };
  saveProfile(state.model);
  const rec = recommendSize(state.model);
  if (!state.sizeLocked) state.size = rec;      // 手选过就尊重用户选择
  rebuildAvatar();
  renderSizes(); renderModelChip(); renderGarments(); renderSummary(); updateStatus(); renderFitReport();
  closeProfileModal();
  toast(`模特档案已建立 · 推荐 ${rec}`);
});
document.getElementById('profile-cancel').addEventListener('click', () => {
  if (!state.model) return; // 首次建档不可取消
  closeProfileModal();
});
const tipEditEl2 = document.getElementById('tip-edit');
if (tipEditEl2) tipEditEl2.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  toast('模特尺寸已按实测数据锁定，不可调整');
}, true);

/* ============================================================
   视角与操作
   ============================================================ */
const VIEWS = {
  front: new THREE.Vector3(0, 0.35, 6.2),
  side: new THREE.Vector3(6.2, 0.35, 0),
  back: new THREE.Vector3(0, 0.35, -6.2),
};
let camAnim = null;
function moveCameraTo(pos) { camAnim = { from: camera.position.clone(), to: pos.clone(), t: 0 }; }
document.getElementById('btn-clear').addEventListener('click', clearAll);
if (flatEls.clear) flatEls.clear.addEventListener('click', clearAll);

/* ============================================================
   渲染循环
   ============================================================ */
function resize() {
  const w = container.clientWidth, h = container.clientHeight;
  if (!w || !h) return;
  camera.aspect = w / h;
  // 竖屏舞台较窄：增大垂直视角，避免模特头部被上边缘裁掉
  const targetFov = camera.aspect < 1.05 ? 48 : 36;
  if (Math.abs(camera.fov - targetFov) > 0.1) camera.fov = targetFov;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
  flatMark();
}
new ResizeObserver(resize).observe(container);
window.addEventListener('resize', resize);
if (flatEls.fit && flatEls.fit.parentElement) {
  new ResizeObserver(() => flatMark()).observe(flatEls.fit.parentElement);
}
/* ============================================================
   舞台模式：默认 2D 上身，3D 作为独立标签按需开启
   ------------------------------------------------------------
   2D 是「看得懂版型」的主视图，3D 用来转着看侧面和背面。两套渲染不
   同时跑：留在 2D 时 3D 一次都不渲，省掉整个 WebGL 主循环的功耗。 */
let stageMode = '2d';
function setStageMode(m) {
  stageMode = m === '3d' ? '3d' : '2d';
  const st = document.getElementById('stage');
  if (st) st.dataset.mode = stageMode;
  document.querySelectorAll('#stage-tabs button').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === stageMode);
  });
  if (stageMode === '3d') {
    // 刚从隐藏切回来时容器尺寸是 0，下一帧再量
    requestAnimationFrame(() => { try { resize(); } catch (e) {} });
  } else {
    flatMark();
  }
}
{
  const tabs = document.getElementById('stage-tabs');
  if (tabs) tabs.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (b && b.dataset.mode) setStageMode(b.dataset.mode);
  });
  setStageMode('2d');
}
/* 2D 是主视图，底模启动就载入，不必等选中衣服 */
fitEnsure().then(ok => { if (ok) flatMark(); });

function animate() {
  requestAnimationFrame(animate);
  if (stageMode !== '3d') {
    if (flat.dirty) { flat.dirty = false; try { flatDraw(); } catch (err) { console.warn('2D 视图绘制失败', err); } }
    return;
  }
  if (camAnim) {
    camAnim.t += 0.06;
    const e = 1 - Math.pow(1 - camAnim.t, 3);
    camera.position.lerpVectors(camAnim.from, camAnim.to, e);
    if (camAnim.t >= 1) camAnim = null;
  }
  controls.update();
  renderer.render(scene, camera);

  /* 2D：只在状态或尺寸变化时重绘一次。同一份场景用正交相机再渲一遍，
     不进每帧循环，手机上不会多烧一倍 GPU。 */
  if (flat.dirty) {
    flat.dirty = false;
    try { flatDraw(); } catch (err) { console.warn('2D 平面视图绘制失败', err); }
  }
}

/* ============================================================
   照片识别换衣（修复版）
   ------------------------------------------------------------
   修复点：
   1) 文件输入框移出 drop-zone，避免 click 事件冒泡递归触发文件选择器
   2) 不依赖 file.type / 扩展名，直接读取文件字节并用 magic bytes 判定图片类型，
      解决 APK 内 copyToInternal 生成 .img 导致 MIME 丢失的问题
   3) 主色提取加入四角背景估计 + 中心区域加权 + 低饱和过滤，抗真实照片背景干扰
   ============================================================ */
const photoModal = document.getElementById('photo-modal');
const dropZone = document.getElementById('drop-zone');
const photoFile = document.getElementById('photo-file');
const scanResult = document.getElementById('scan-result');
const scanImg = document.getElementById('scan-img');
const detectedSwatch = document.getElementById('detected-swatch');
const detectedColorName = document.getElementById('detected-color-name');
const detectedTypeName = document.getElementById('detected-type-name');
const detectedSpec = document.getElementById('detected-spec');
const matchSelect = document.getElementById('detected-match');
const applyBtn = document.getElementById('photo-apply');
const matchImg = document.getElementById('match-img');
const matchCaption = document.getElementById('match-caption');
const matchThumbs = document.getElementById('match-thumbs');
let detected = null;
let detectedSize = null;
let detectedMatches = [];

function openPhotoModal() {
  if (!state.model) { toast('请先建立模特档案'); return; }
  photoModal.classList.add('open');
}
function closePhotoModal() { photoModal.classList.remove('open'); }
document.getElementById('btn-photo-upload').addEventListener('click', openPhotoModal);
document.getElementById('photo-modal-close').addEventListener('click', closePhotoModal);
photoModal.addEventListener('click', e => { if (e.target === photoModal) closePhotoModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closePhotoModal(); closeProfileModal(); } });

// 关键修复：dropZone 只负责视觉，click 直接触发文件输入；输入框不在 dropZone 内部，无冒泡递归
dropZone.addEventListener('click', () => photoFile.click());
photoFile.addEventListener('change', e => {
  if (e.target.files && e.target.files[0]) handlePhoto(e.target.files[0]);
  e.target.value = '';
});
['dragenter', 'dragover'].forEach(ev =>
  dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.add('dragover'); })
);
['dragleave', 'drop'].forEach(ev =>
  dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.remove('dragover'); })
);
dropZone.addEventListener('drop', e => {
  const file = e.dataTransfer.files && e.dataTransfer.files[0];
  if (file) handlePhoto(file); else toast('请上传图片文件');
});

function resetScanUI() {
  detected = null; detectedMatches = []; applyBtn.disabled = true;
  scanResult.hidden = true; dropZone.style.display = '';
  photoFile.value = ''; scanImg.removeAttribute('src');
  if (matchImg) matchImg.removeAttribute('src');
  if (matchCaption) matchCaption.textContent = '库内匹配';
  if (matchThumbs) matchThumbs.innerHTML = '';
  if (applyBtn) applyBtn.textContent = '试穿到模特';
  const hint = document.getElementById('scan-fallback-hint');
  if (hint) hint.hidden = true;
  if (matchSelect) matchSelect.style.display = '';
  const badge = document.getElementById('scan-badge');
  if (badge) badge.textContent = '识别完成';
}

/* 用 magic bytes 判定真实图片类型，绕开 MIME / 扩展名丢失 */
function sniffImageType(bytes) {
  if (!bytes || bytes.length < 4) return null;
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) return 'image/jpeg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) return 'image/png';
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) return 'image/webp';
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return 'image/gif';
  if (bytes[0] === 0x42 && bytes[1] === 0x4D) return 'image/bmp';
  return null;
}

function handlePhoto(file) {
  const reader = new FileReader();
  reader.onerror = () => toast('文件读取失败，请换一张试试');
  reader.onload = e => {
    const bytes = new Uint8Array(e.target.result);
    const type = sniffImageType(bytes) || (file.type && file.type.startsWith('image/') ? file.type : null);
    if (!type) { toast('无法识别该图片格式，请上传 JPG / PNG / WEBP'); return; }
    const blob = new Blob([bytes], { type });
    const url = URL.createObjectURL(blob);
    analyzePhoto(url);
  };
  reader.readAsArrayBuffer(file);
}

function analyzePhoto(url) {
  const img = new Image();
  img.onload = () => {
    /* 真正的以图搜图：用 pHash / dHash / HSV 直方图 / 灰度结构在全库比对，
       不再靠长宽比猜品类，也不再被当前品牌 tab 限制候选集。 */
    let result;
    try { result = matchImage(img, 8); }
    catch (err) { console.warn('图片指纹比对失败', err); toast('图片分析失败，请换一张试试'); return; }
    const { dominantHex, matches } = result;
    const best = matches.find(m => DB_BY_ID[m.id]);
    const bestItem = best && DB_BY_ID[best.id];
    const pct = best ? Math.round(best.score * 100) : 0;
    const reliable = !!best && best.score >= 0.86;

    scanImg.src = url;
    const rs = (dominantHex >> 16) & 255, gs = (dominantHex >> 8) & 255, bs = dominantHex & 255;
    detectedSwatch.style.background = '#' + dominantHex.toString(16).padStart(6, '0');
    detectedColorName.textContent = colorName(rs, gs, bs);
    detectedTypeName.textContent = bestItem
      ? (SILHOUETTE_NAMES[bestItem.silhouette] || bestItem.style || bestItem.category)
      : '—';
    detectedSpec.textContent = bestItem
      ? `${bestItem.name} · ${bestItem.code} · 相似度 ${pct}%`
      : '未找到相似款 · 将直接使用上传照片';
    const badge = document.getElementById('scan-badge');
    if (badge) badge.textContent = reliable ? `识别完成 · ${pct}%` : (bestItem ? `找到相似款 · ${pct}%` : '未匹配到款号');
    const hint = document.getElementById('scan-fallback-hint');
    if (hint) hint.hidden = reliable;
    if (matchSelect) matchSelect.style.display = bestItem ? '' : 'none';
    applyBtn.textContent = reliable ? '试穿到模特' : (bestItem ? '按所选款式试穿' : '直接贴到模特身上');

    // 视觉匹配结果置顶，按相似度排序；其余款仍可手动选择
    matchSelect.innerHTML = '';
    const matchedIds = new Set(matches.map(m => m.id));
    if (matches.length) {
      const og = document.createElement('optgroup');
      og.label = '视觉匹配 · 按相似度';
      matches.forEach(m => {
        const g = DB_BY_ID[m.id];
        if (!g) return;
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = `${Math.round(m.score * 100)}% · ${g.name}`;
        if (bestItem && g.id === bestItem.id) opt.selected = true;
        og.appendChild(opt);
      });
      matchSelect.appendChild(og);
    }
    DB_CATEGORIES.forEach(cat => {
      const og = document.createElement('optgroup');
      og.label = cat.name;
      DB.filter(g => g.category === cat.id && !matchedIds.has(g.id)).forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.id; opt.textContent = g.name;
        og.appendChild(opt);
      });
      matchSelect.appendChild(og);
    });
    detected = {
      hex: dominantHex,
      colorName: colorName(rs, gs, bs),
      garmentId: best ? best.id : null,
      reliable, url, category: bestItem ? bestItem.category : 'dresses',
      score: pct,
    };
    detectedMatches = matches;
    renderMatchThumbnails(matches);
    renderMatchCompare(best);
    detectedSize = recommendSize(state.model);
    renderScanSizes();
    dropZone.style.display = 'none';
    scanResult.hidden = false;
    applyBtn.disabled = false;
  };
  img.onerror = () => { toast('图片解码失败，请换一张试试'); URL.revokeObjectURL(url); };
  img.src = url;
}

/* 候选缩略图：每张都是库内真实商品图，点选即更新右侧对比图与试穿目标 */
function renderMatchThumbnails(matches) {
  if (!matchThumbs) return;
  matchThumbs.innerHTML = '';
  matches.forEach(m => {
    const g = DB_BY_ID[m.id];
    if (!g) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'match-thumb';
    btn.dataset.id = g.id;
    btn.title = `${g.name} · ${Math.round(m.score * 100)}%`;
    const im = document.createElement('img');
    im.src = assetURL(m.img || g.image);
    im.alt = g.name;
    im.loading = 'lazy';
    const sp = document.createElement('span');
    sp.className = 'thumb-score';
    sp.textContent = Math.round(m.score * 100) + '%';
    btn.appendChild(im); btn.appendChild(sp);
    btn.addEventListener('click', () => renderMatchCompare(m));
    matchThumbs.appendChild(btn);
  });
}

/* 把选中的候选画到对比栏；试穿按钮读取同一个 detected.garmentId，所见即所穿 */
function renderMatchCompare(m) {
  const g = m && DB_BY_ID[m.id];
  if (!g) {
    if (matchImg) matchImg.removeAttribute('src');
    if (matchCaption) matchCaption.textContent = '库内匹配';
    if (detectedSpec) detectedSpec.textContent = '未找到相似款 · 将直接使用上传照片';
    return;
  }
  const pct = Math.round((m.score || 0) * 100);
  if (matchImg) matchImg.src = assetURL(m.img || g.image);
  if (matchCaption) matchCaption.textContent = `库内匹配 · ${pct}%`;
  if (detectedSpec) detectedSpec.textContent = `${g.name} · ${g.code} · 相似度 ${pct}%`;
  if (matchSelect) matchSelect.value = g.id;
  if (detected) { detected.garmentId = g.id; detected.score = pct; }
  if (matchThumbs) {
    matchThumbs.querySelectorAll('.match-thumb').forEach(b =>
      b.classList.toggle('active', b.dataset.id === g.id));
  }
}

if (matchSelect) {
  matchSelect.addEventListener('change', () => {
    const m = detectedMatches.find(x => x.id === matchSelect.value);
    if (m) { renderMatchCompare(m); return; }
    const g = DB_BY_ID[matchSelect.value];
    if (g) {
      if (matchImg) matchImg.src = assetURL(g.image);
      if (matchCaption) matchCaption.textContent = '库内候选 · 手动选择';
      if (detectedSpec) detectedSpec.textContent = `${g.name} · ${g.code} · 手动选择`;
      if (detected) detected.garmentId = g.id;
      if (matchThumbs) matchThumbs.querySelectorAll('.match-thumb').forEach(b => b.classList.remove('active'));
    }
  });
}

/* 主体主色：四角背景估计 + 中心加权 + 低饱和过滤 + 颜色量化 */
function extractDominantColor(img) {
  const W = 128, H = 128;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
  const scale = Math.min(W / img.width, H / img.height);
  const dw = img.width * scale, dh = img.height * scale;
  ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
  const d = ctx.getImageData(0, 0, W, H).data;

  // 四角取样估计背景色
  const corners = [];
  const cs = 10;
  [[0, 0], [W - cs, 0], [0, H - cs], [W - cs, H - cs]].forEach(([x, y]) => {
    let r = 0, g = 0, b = 0, n = 0;
    for (let yy = y; yy < y + cs; yy++) for (let xx = x; xx < x + cs; xx++) {
      const i = (yy * W + xx) * 4; r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
    }
    corners.push([r / n, g / n, b / n]);
  });
  const bg = [0, 1, 2].map(c => corners.reduce((s, p) => s + p[c], 0) / corners.length);

  const buckets = new Map();
  const cx = W / 2, cy = H / 2;
  // 主体包围盒（排除背景后的有效像素范围），用于判断衣服实际形状
  let minX = W, maxX = 0, minY = H, maxY = 0, subjectCount = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
    if (a < 128) continue;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    // 排除接近背景的像素
    const distBg = Math.abs(r - bg[0]) + Math.abs(g - bg[1]) + Math.abs(b - bg[2]);
    if (distBg < 48 && mn > 150) continue;
    if (mn > 240 && mx - mn < 18) continue;   // 纯白
    if (mx < 20) continue;                    // 纯黑
    // 记录主体范围
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    subjectCount++;
    // 中心区域权重更高
    const nx = (x - cx) / cx, ny = (y - cy) / cy;
    const w = 1 + 1.5 * Math.max(0, 1 - Math.sqrt(nx * nx + ny * ny));
    const key = ((r >> 5) << 6) | ((g >> 5) << 3) | (b >> 5);
    let bk = buckets.get(key);
    if (!bk) { bk = { n: 0, r: 0, g: 0, b: 0 }; buckets.set(key, bk); }
    bk.n += w; bk.r += r * w; bk.g += g * w; bk.b += b * w;
  }
  const subjectRatio = subjectCount > 30
    ? (maxY - minY) / Math.max(1, maxX - minX)
    : img.height / img.width;

  let r = 90, g = 90, b = 90;
  if (buckets.size) {
    let best = null;
    buckets.forEach(v => { if (!best || v.n > best.n) best = v; });
    r = Math.round(best.r / best.n); g = Math.round(best.g / best.n); b = Math.round(best.b / best.n);
  }
  // 明度归一化，避免过暗/过曝
  const hsl = rgbToHsl(r, g, b);
  let L = Math.min(0.8, Math.max(0.22, hsl[2]));
  const rgb = hslToRgb(hsl[0], hsl[1], L);
  return {
    hex: (rgb[0] << 16) | (rgb[1] << 8) | rgb[2],
    name: colorName(rgb[0], rgb[1], rgb[2]),
    subjectRatio,
  };
}

/* 款式识别：按画面中衣服主体的包围盒长宽比 + 颜色明度，映射到数据库品类与版型
   subRatio = 主体高度/宽度：>1.6 长款连衣裙；1.15~1.6 中长裙/裤；<0.9 上装；其余上装 */
function guessGarment(img, color, subRatio) {
  const ratio = subRatio || img.height / img.width;
  const hsl = rgbToHsl((color.hex >> 16) & 255, (color.hex >> 8) & 255, color.hex & 255);
  let category, silhouette, label;
  if (ratio > 1.6) {
    category = 'dresses'; silhouette = hsl[1] < 0.25 ? 'fitted' : 'aline';
    label = '长款主体（推测连衣裙）';
  } else if (ratio > 1.15) {
    // 中长主体：深色偏裤装，浅色偏半身裙/中长裙
    if (hsl[2] < 0.35) { category = 'bottoms'; silhouette = 'straight'; label = '竖长深色主体（推测裤装）'; }
    else { category = 'dresses'; silhouette = 'aline'; label = '中长主体（推测连衣裙）'; }
  } else if (ratio < 0.9) {
    category = 'tops'; silhouette = hsl[2] > 0.68 ? 'blouse' : 'fitted';
    label = '宽短主体（推测上装）';
  } else {
    category = 'tops'; silhouette = hsl[1] < 0.2 ? 'knit' : 'fitted';
    label = '常规比例（推测上装）';
  }
  // 优先匹配品类 + 版型，其次按明度挑合体/宽松款
  const candidates = currentBrandItems().filter(g => g.category === category);
  const byShape = candidates.find(g => g.silhouette === silhouette);
  const byFit = candidates.find(g => g.fit === (hsl[1] < 0.2 ? '宽松' : '合体'));
  const item = byShape || byFit || candidates[0] || DB[0];
  /* 只凭长宽比和颜色不可能认出具体款号：只有「品类 + 版型 + 色调」同时对上
     才算可信，否则宁可承认没认出来 —— 硬套一个款号会给用户完全错误的试穿。 */
  const itemHex = item.colors && item.colors[0] && item.colors[0].hex;
  const hueOK = itemHex == null || Math.abs(rgbToHsl(...hexRgb(itemHex))[0] - hsl[0]) < 0.12;
  const confidence = byShape ? (hueOK ? 0.9 : 0.68) : byFit ? 0.45 : 0.15;
  return { item, silhouette: item.silhouette, label, category, confidence };
}

function hexRgb(hex) {
  if (typeof hex === 'string') {
    const m = hex.replace('#', '');
    return [parseInt(m.slice(0, 2), 16) || 0, parseInt(m.slice(2, 4), 16) || 0, parseInt(m.slice(4, 6), 16) || 0];
  }
  return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
}

function colorName(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);
  if (s < 0.13) {
    if (l > 0.88) return '白色';
    if (l < 0.16) return '黑色';
    return '灰色';
  }
  const hue = h * 360;
  if (hue < 15 || hue >= 345) return l < 0.45 ? '酒红' : '红色';
  if (hue < 42) return l < 0.4 ? '棕色' : (s < 0.45 ? '驼色' : '橙色');
  if (hue < 70) return '黄色';
  if (hue < 160) return l < 0.4 ? '墨绿' : '绿色';
  if (hue < 200) return '青色';
  if (hue < 255) return l < 0.4 ? '藏蓝' : '蓝色';
  if (hue < 290) return '紫色';
  return l < 0.45 ? '玫红' : '粉色';
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0; const l = (mx + mn) / 2, d = mx - mn;
  if (d) {
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6; if (h < 0) h += 1;
  }
  return [h, s, l];
}
function hslToRgb(h, s, l) {
  const f = n => {
    const k = (n + h * 12) % 12, a = s * Math.min(l, 1 - l);
    return l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function renderScanSizes() {
  const row = document.getElementById('scan-size-row');
  if (!row) return;
  const rec = recommendSize(state.model);
  row.innerHTML = SIZES.map(sz =>
    `<button type="button" class="${sz === detectedSize ? 'active' : ''}" data-size="${sz}">${sz.replace('EU ', '')}${sz === rec ? '<i class="rec-dot"></i>' : ''}</button>`
  ).join('');
  row.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => { detectedSize = b.dataset.size; renderScanSizes(); });
  });
}

document.getElementById('photo-reselect').addEventListener('click', resetScanUI);
applyBtn.addEventListener('click', () => {
  if (!detected) return;
  // 识图尺码同样落到全局，2D 图样按这个码放码
  if (detectedSize) { state.size = detectedSize; renderSizes(); }
  const chosenId = matchSelect.value || detected.garmentId;
  if (detected.reliable || chosenId) {
    /* 图像检索是全库范围，命中的款可能不在当前品牌 tab；先把 tab 切过去，
       否则用户试穿成功却看不到对应卡片。 */
    const item = DB_BY_ID[chosenId];
    if (item) {
      const tab = item.premium ? PREMIUM_TAB.id : EU_TAB.id;
      if (tab && state.brand !== tab && els.brands) {
        const btn = els.brands.querySelector(`.brand-tab[data-brand="${tab}"]`);
        if (btn) btn.click();
      }
      /* 命中的是配件/下装时要同步品类，否则卡片留在原分类里看不见。 */
      if (state.category !== item.category) {
        state.category = item.category;
        renderCategories(); renderGarments();
      }
    }
    selectGarment(chosenId);
    renderGarments();   // 让卡片高亮跟上本次选中
    toast(detected.reliable ? '照片识别换衣完成' : '已按所选款式试穿');
  } else {
    applyUploadedPhoto(detected.url, detected.category);
    toast('未认出款号，已把照片直接贴到模特身上');
  }
  closePhotoModal(); resetScanUI();
});

/* 识图不可靠时不再硬套款号：把上传的原始图片当作平铺商品图，
   走和商品图完全相同的抠底 + 肩线对齐 + 尺码放码管线贴到 2D 模特身上。
   3D 这边保持模特与肉色打底衣，避免出现「用假版型冒充这件衣服」。 */
function applyUploadedPhoto(url, category) {
  clearAll();
  state.customPhoto = { url, category: category || 'dresses' };
  fitCache.cuts.delete('__upload__');
  fitLeadId = '__upload__';
  if (typeof setStageMode === 'function') setStageMode('2d');
  else {
    const st = document.getElementById('stage');
    if (st) st.dataset.mode = '2d';
  }
  flatMark();
  updateStatus();
  setBookPage('fitting', uploadedPhotoItem(), { refresh: bookEls.book && bookEls.book.dataset.page === 'fitting' });
}

function uploadedPhotoItem() {
  if (!state.customPhoto) return null;
  const cat = state.customPhoto.category;
  return {
    id: '__upload__',
    code: '上传照片',
    name: '自定义服装',
    image: state.customPhoto.url,
    category: cat,
    measurements: { length: cat === 'dresses' ? 100 : cat === 'bottoms' ? 70 : 60 },
  };
}

/* ============================================================
   初始化
   ============================================================ */
// 模特档案已按用户实测数据锁定，忽略本地缓存，始终使用固定档案
state.model = { ...DEFAULT_MODEL };
state.size = recommendSize(state.model);
// 打开即构建并显示 3D 人体模型
rebuildAvatar();
renderBrands();
setBrandHeading(PREMIUM_TAB);   // 默认目录从 HIGH UA 开始，不再显示杜嘉班纳单品牌页
renderCategories();
initPromoFeed();
renderPromo();
renderFilterOptions();
renderColors();
renderSizes();
renderModelChip();
renderGarments();
renderSummary();
renderFitReport();
updateStatus();
resize();
animate();
// 等模特就位再收起遮罩，避免先看到空台座
ensureBody().then(() => {
  document.getElementById('loading').classList.add('hidden');
});

/* 模特数据已锁定，不再弹出建档向导 */

/* 自动更新检查 */
initUpdate();

/* 调试/自动化接口 */
window.__atelier = {
  state, DB,
  setBookPage,
  debugFit(id) {
    const item = DB_BY_ID[id];
    if (!item || !item.image) return Promise.resolve(null);
    return cutFor(item).then(cut => {
      if (!cut) return null;
      const pf = fitPlacement(item, cut);
      const { cat, sh, kSh, kLen, kw, kh, lenCm } = pf;
      let opaque = 0;
      try {
        const px = cut.canvas.getContext('2d').getImageData(0, 0, cut.canvas.width, cut.canvas.height).data;
        for (let i = 3; i < px.length; i += 4) if (px[i] > 16) opaque++;
      } catch (e) {}
      return {
        id, cat, name: item.name, image: item.image,
        composite: item.composite, photoCut: item.photoCut, brand: item.brand,
        imgWH: [cut.canvas.width, cut.canvas.height],
        opaque,
        box: cut.box, shoulder: sh,
        kSh: +kSh.toFixed(3), kLen: +kLen.toFixed(3), k: +Math.min(kSh, kLen).toFixed(3),
        kw: +kw.toFixed(3), kh: +kh.toFixed(3),
        renderW: Math.round(cut.canvas.width * kw),
        renderH: Math.round(cut.canvas.height * kh),
        garmentW: Math.round(cut.box.w * kw),
        garmentH: Math.round(cut.box.h * kh),
        shoulderRenderW: sh ? Math.round(sh.w * kw) : null,
        anchorY: pf.anchorY, srcY: pf.srcY,
        dx: Math.round(pf.dx), dy: Math.round(pf.dy),
        lenCm,
      };
    });
  },
  debugTryOn(id) {
    if (!DB_BY_ID[id]) return false;
    selectGarment(id);
    return true;
  },
  debugAvatar() {
    return {
      avatarChildren: avatarGroup.children.length,
      hasReal: !!currentRealBody,
      meshChildren: avatarGroup.children.map(c => c.type + ':' + c.children.length),
      avatarScale: avatarGroup.scale.toArray(),
      avatarPos: avatarGroup.position.toArray(),
    };
  },
  applyProfile(p) {
    state.model = { ...DEFAULT_MODEL, ...p };
    if (!state.sizeLocked) state.size = recommendSize(state.model);
    saveProfile(state.model);
    rebuildAvatar(); renderSizes(); renderModelChip(); renderGarments();
    profileModal.classList.remove('open');
    return state.model;
  },
};

// TEMP DEBUG
window.__A = { state, garmentGroup, avatarGroup };
