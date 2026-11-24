import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DB, DB_BY_ID, DB_CATEGORIES, DB_META, BRANDS, VINTAGE_BRAND, SIZE_CHART, SIZES, SILHOUETTE_NAMES, PALETTE, slotOf, normalizeSize, sizeLetter, sizeNumber } from './data.js';
import { DEFAULT_MODEL, FIELD_META, FOOT_Y, buildBody, modelSummary, bodyMetrics } from './body.js';
import { buildGarment, recommendSize, specText } from './garment.js';
import { buildSmoothBody, bodyReady } from './smoothBody.js';
import { evaluateFit, garmentMeasurements, fitSizeForModel } from './fitEngine.js';
import { initUpdate } from './update.js';

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
  brand: 'DG',                         // 当前品牌：DG 杜嘉班纳 / BL 巴尔曼
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

/* 抠底：只抹掉与画布四边连通的浅色区域，衣服自身的米白、蕾丝不会被误伤。
   uploaded=true 时额外做「人物照片→单件衣服」的清洗：去掉肤色（脸、脖子、
   手、手臂）和头部上方的深色头发，只留中间那件衣服。 */
function cutGarment(img, uploaded = false, item = null) {
  const w = img.naturalWidth, h = img.naturalHeight;
  if (!w || !h) return null;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(img, 0, 0);
  let data;
  try { data = x.getImageData(0, 0, w, h); } catch (e) { return null; }
  const p = data.data;
  const isBg = i => p[i] >= 200 && p[i + 1] >= 200 && p[i + 2] >= 200
    && Math.abs(p[i] - p[i + 2]) < 16;
  const seen = new Uint8Array(w * h);
  const stack = [];
  const seed = (px, py) => {
    const i = py * w + px;
    if (seen[i] || !isBg(i * 4)) return;
    seen[i] = 1; stack.push(i);
  };
  for (let px = 0; px < w; px++) { seed(px, 0); seed(px, h - 1); }
  for (let py = 0; py < h; py++) { seed(0, py); seed(w - 1, py); }
  while (stack.length) {
    const i = stack.pop(), px = i % w, py = (i / w) | 0;
    if (px > 0) seed(px - 1, py);
    if (px < w - 1) seed(px + 1, py);
    if (py > 0) seed(px, py - 1);
    if (py < h - 1) seed(px, py + 1);
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
    const headBottom = py0 + (py1 - py0) * 0.30;
    for (let py = py0; py <= py1; py++) {
      for (let px = 0; px < w; px++) {
        const i = py * w + px, j = i * 4;
        if (seen[i]) continue;
        const r = p[j], g = p[j + 1], b = p[j + 2];
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
        const skin = r > 95 && g > 40 && b > 20 && mx - mn > 15
          && Math.abs(r - g) > 15 && r > g && r > b && r / Math.max(g, 1) > 1.08;
        const hair = py < headBottom && r < 105 && g < 105 && b < 105;
        if (skin || hair) { seen[i] = 1; p[j + 3] = 0; }
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
        if (k.n > main.n * 0.05 && Math.abs(k.cx - main.cx) < w * 0.18) continue;
        for (let i = 0; i < w * h; i++) {
          if (lab[i] === k.id) { seen[i] = 1; p[i * 4 + 3] = 0; }
        }
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
      .then(img => cutGarment(img, item.id === '__upload__', item))
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

/* 单件商品图合成：把裁好的商品图按人体标定贴到画布上。
   只负责「画这一件」，不负责清屏——多件搭配（上衣+下装）由
   fitDrawOutfit 统一编排：先画模特，再按下装→上衣→外套的顺序叠。 */
function fitDrawGarment(item, ctx) {
  if (!fitReady || !item) return Promise.resolve(false);
  const job = cutFor(item);
  if (!job) return Promise.resolve(false);
  return job.then(cut => {
    if (!cut) return false;
    const cat = item.category;
    const lenCm = (item.measurements && item.measurements.length) || (cat === 'dresses' ? 100 : 62);
    /* 写实款（flat 图由网格离线烘出）自带肩部几何：肩线在哪一行、肩宽多少像素，
       是渲染时从顶点直接算的，比在图上做轮廓检测可靠——渲染图肩侧有袖山外扩，
       检测会把肩宽多算 10cm，衣服就被压得又宽又短。 */
    const fm = item.flatMeta;
    const sh = fm
      ? { y: fm.shoulderY, w: fm.shoulderW, lo: FIT.cx - fm.shoulderW / 2, hi: FIT.cx + fm.shoulderW / 2 }
      : cut.shoulder;
    /* 比例：① 衣肩 → 人体肩宽（343px）；② 衣长 → 衣长×8.606px。
       取小值，单用任一条都会被袖子或长摆骗偏。 */
    const kSh = cat === 'bottoms'
      ? (FIT.hipW * 1.02) / Math.max(cut.widthAt(0.35), 1)
      : (sh && sh.w > 6)
        ? (FIT.shoulderW * 0.99) / sh.w
        : FIT.shoulderW / Math.max(cut.widthAt(0.06), 1);
    const kLen = (lenCm * FIT.pxPerCm) / Math.max(cut.box.h, 1);
    let k = Math.min(kSh, kLen);
    k = Math.min(Math.max(k, 0.5), 3.5);
    /* 按当前尺码放码：印花图样与衣身一起缩放，宽度按围度档差（约 ±18%），
       长度按衣长档差（约 ±5%），两者一起变才看得出「这件是 EU44 的版」。 */
    const fitF = sizeFitFactors(item, state.size);
    const kw = Math.min(Math.max(k * fitF.w, 0.5), 3.6);
    const kh = Math.min(Math.max(k * fitF.h, 0.5), 3.6);

    /* 贴合：把手绘的「衣肩线」对到人体肩点所在的 y，横向按肩线中点对中线。
       这就是之前衣肩往下坠的原因——原来锚的是外框顶（领口最高点），
       高领、立领款一差就是 5–8cm。 */
    let anchorY, srcY, midX;
    if (cat === 'bottoms') {
      anchorY = FIT.waistY - 4; srcY = cut.box.y0;
      midX = cut.box.x0 + cut.box.w / 2;
    } else if (sh) {
      anchorY = FIT.shoulderY; srcY = sh.y;
      midX = (sh.lo + sh.hi + 1) / 2;
    } else {
      anchorY = FIT.shoulderY - 4; srcY = cut.box.y0;
      midX = cut.box.x0 + cut.box.w / 2;
    }
    const dx = FIT.cx - midX * kw;
    const dy = anchorY - srcY * kh;

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(cut.canvas, dx, dy, cut.canvas.width * kw, cut.canvas.height * kh);
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
  const group = buildGarment(itemId, state.size, state.model, color, true, fabricTexOf(itemId));
  if (!group) return;
  garmentGroup.add(group);
  state.outfit[slot] = { id: itemId, slot, group, color, colorName };
  state.activeSlot = slot;
  state.color = color; state.colorName = colorName;
  renderGarments(); renderSummary(); updateStatus(); renderColors(); renderFitReport();
  toast(`已试穿：${item.name}`);
}
function clearAll() {
  Object.keys(state.outfit).forEach(clearSlot);
  state.activeSlot = null;
  state.customPhoto = null;
  fitCache.cuts.delete('__upload__');
  renderGarments(); renderSummary(); updateStatus(); renderFitReport();
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
};

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

const SWATCHES = [
  PALETTE.black, PALETTE.ivory, PALETTE.red, PALETTE.wine,
  PALETTE.navy, PALETTE.emerald, PALETTE.camel, PALETTE.gold,
  PALETTE.powder, PALETTE.leopard, PALETTE.olive, PALETTE.chocolate,
];


/* ---------------- 面料贴图 ---------------- */
const _texCache = new Map();
function fabricTexOf(itemId) {
  if (_texCache.has(itemId)) return _texCache.get(itemId);
  // file:// 下外部图片上传 WebGL 会抛安全错误；内联 data URL 不受此限制
  if (location.protocol === 'file:' && !INLINE_IMAGES) { _texCache.set(itemId, null); return null; }
  const item = DB_BY_ID[itemId];
  const src = item && item.image;
  let tex = null;
  if (src) {
    const img = document.querySelector(`.garment-card[data-id="${itemId}"] .db-photo`);
    if (img && img.complete && img.naturalWidth > 0) {
      tex = new THREE.Texture(img);
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    }
  }
  _texCache.set(itemId, tex);
  return tex;
}

/* 当前品牌页的商品集。
   state.brand === 'VT' 是「往季精选」页：只收 vintage 款。
   DG / BL 是在售页：官网当前目录的款，vintage 款不在其中，
   否则用户会在两个地方看到同一件衣服。 */
function currentBrandItems() {
  if (state.brand === VINTAGE_BRAND.id) return DB.filter(g => g.vintage);
  return DB.filter(g => g.brand === state.brand && !g.vintage);
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
  if (els.filterColor) { els.filterColor.value = ''; els.filterColor.closest('.filter-sel')?.classList.remove('has-value'); }
  if (els.filterStyle) { els.filterStyle.value = ''; els.filterStyle.closest('.filter-sel')?.classList.remove('has-value'); }
}

/* 商品搜索：有关键词时跨品牌、跨品类全局检索；空关键词回到当前品牌+品类。
   匹配字段覆盖中文名、英文名、款号、面料、版型、季节、品牌名与品类名，
   并把多词用空格拆开做 AND，缩小范围更准（如「真丝 连衣裙」）。 */
function matchingItems() {
  const q = (state.query || '').trim().toLowerCase();
  const fc = state.filterColor || '';
  const fst = state.filterStyle || '';
  if (!q && !fc && !fst) return currentBrandItems().filter(g => g.category === state.category);
  const terms = q.split(/\s+/).filter(Boolean);
  const catName = Object.fromEntries(DB_CATEGORIES.map(c => [c.id, c.name + ' ' + c.en]));
  const brandName = Object.fromEntries([...BRANDS, VINTAGE_BRAND].map(b => [b.id, `${b.name} ${b.en} ${b.short}`]));
  return DB.filter(g => {
    if (fc && !(g.colors || []).some(c => c.name === fc)) return false;
    if (fst && g.style !== fst) return false;
    const hay = [
      g.name, g.nameEn, g.code, g.fabric, g.style,
      SILHOUETTE_NAMES[g.silhouette] || '', g.silhouette || '',
      g.season || '', g.collection || '',
      catName[g.category] || '', brandName[g.brand] || '',
      (g.colors || []).map(c => c && c.name).join(' '),
    ].join(' ').toLowerCase();
    return terms.every(t => hay.includes(t));
  });
}

/* 筛选项来源：始终用全库统计，用户能直接看到每个颜色/款式各有多少款，
   不会因为当前品牌或分类不同而看到忽多忽少的选项。 */
function filterOptions() {
  const colors = new Map(), styles = new Map();
  DB.forEach(g => {
    (g.colors || []).forEach(c => {
      if (!c || !c.name) return;
      colors.set(c.name, (colors.get(c.name) || 0) + 1);
    });
    if (g.style) styles.set(g.style, (styles.get(g.style) || 0) + 1);
  });
  const top = (m, n) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
  return { colors: top(colors, 26), styles: top(styles, 40) };
}

function renderBrands() {
  if (!els.brands) return;
  const all = [...BRANDS, VINTAGE_BRAND];
  els.brands.innerHTML = all.map(b =>
    `<button class="brand-tab ${b.id === state.brand ? 'active' : ''}${b.isVintage ? ' vintage' : ''}" data-brand="${b.id}">
       <b>${b.short}</b><span>${b.name}</span>
     </button>`
  ).join('');
  els.brands.querySelectorAll('.brand-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.brand = btn.dataset.brand;
      clearSearch(); clearFilters();
      const b = [...BRANDS, VINTAGE_BRAND].find(x => x.id === state.brand);
      els.wardrobeTitle.textContent = b.isVintage ? b.name : `${b.name}女装`;
      els.wardrobeSub.textContent = `${currentBrandItems().length} 款 · 点击试穿，数据驱动合身`;
      renderBrands(); renderCategories(); renderGarments();
      renderSizes(); syncSizeControls();   // 品牌换了，官方码名（IT/FR）随之切换
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

/** 价格区块：在售款给欧元与原价；停产档案款标当年零售价并注明不可购。 */
function priceMarkup(item) {
  if (item.discontinued) {
    return `<span class="price-eur">€${item.priceEUR.toLocaleString()}</span><span class="price-cny">${item.archiveYear || ''} 年零售价 · 已停产</span>`;
  }
  return `<span class="price-eur">€${item.priceEUR.toLocaleString()}</span><span class="price-cny">约 ¥${item.priceCNY.toLocaleString()}</span>`;
}

function renderGarments() {
  const searching = !!(state.query || '').trim();
  const filtering = !!(state.filterColor || state.filterStyle);
  const items = matchingItems();
  /* 副标题要说明当前看到的是「筛选后」还是「该品牌全部」，
     否则 1922 款和筛选出的 463 款看起来像数据对不上。 */
  const scope = () => {
    const parts = [];
    if (searching) parts.push(`搜索「${state.query.trim()}」`);
    if (state.filterColor) parts.push(`颜色 ${state.filterColor}`);
    if (state.filterStyle) parts.push(`款式 ${state.filterStyle}`);
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
    const brand = [...BRANDS, VINTAGE_BRAND].find(b => b.id === item.brand)
      || (item.vintage ? { short: 'VINTAGE', name: '往季' } : null);
    const cat = DB_CATEGORIES.find(c => c.id === item.category);
    return `<div class="garment-card db-card ${chosen ? 'selected' : ''}" data-id="${item.id}">
      <span class="garment-check"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <div class="db-thumb">
        ${item.image
          ? `<img class="db-photo" src="${assetURL(item.image)}" alt="${item.nameEn}" loading="lazy"${REMOTE_ASSET_BASE ? ' crossorigin="anonymous"' : ''} onerror="this.remove()"/>`
          : `<div class="db-thumb-fallback"><span>${item.archiveYear || 'ARCHIVE'}</span><b>${item.nameEn}</b><i>停产款 · 无官方图</i></div>`}
      </div>
      <div class="db-card-head">
        <span class="db-code">${item.code}</span>
        ${item.vintage ? `<span class="db-tag vintage">往季</span>` : ''}
        ${item.composite === false ? `<span class="db-tag nofit">仅浏览</span>` : ''}
        ${item.discontinued ? `<span class="db-tag archive">停产 ${item.archiveYear || ''}</span>` : ''}
        <span class="db-fit">${item.fit}</span>
      </div>
      <div class="garment-name">${item.name}</div>
      <div class="db-meta">${item.fabric}${(searching || filtering) ? ` · ${brand ? brand.short : item.brand} · ${cat ? cat.name : item.category}` : ''}</div>
      <div class="db-price">${priceMarkup(item)}</div>
      <div class="db-foot"><span class="db-spec">${specText(item, state.size)}</span></div>
    </div>`;
  }).join('');
  els.list.querySelectorAll('.garment-card').forEach(card => {
    card.addEventListener('click', () => selectGarment(card.dataset.id));
  });
  if (els.wardrobeSub) {
    els.wardrobeSub.textContent = (searching || filtering)
      ? `${scope()} · ${items.length} 款（全品牌全品类）`
      : `${currentBrandItems().length} 款 · 点击试穿，数据驱动合身`;
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
  if (state.brand === 'BL') {
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
  els.sizes.innerHTML = SIZES.map(s =>
    `<button class="${s === state.size ? 'active' : ''}" data-size="${s}" title="${SIZE_CHART[s].label}">${sizeText(s)}${s === rec ? '<i class="rec-dot"></i>' : ''}</button>`
  ).join('');
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
  els.sizeHint.textContent = `三围 ${m.bust ?? '—'} / ${m.waist ?? '—'} / ${m.hip ?? '—'}cm${bodyType ? ` · ${bodyType}身材` : ''}，按胸臀厘米对标推荐 ${sizeText(rec)}${bodyType === 'B型' || bodyType === 'C型' ? '（腰围偏大，已按胸臀放宽一档）' : ''}`;
}

/* 换尺码后，用新尺码重建已穿服装 */
function recomputeOutfitForSize() {
  Object.keys(state.outfit).forEach(slot => {
    const entry = state.outfit[slot];
    if (!entry) return;
    const color = entry.color;
    const group = buildGarment(entry.id, state.size, state.model, color, true);
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
function renderFitReport() {
  const worn = Object.values(state.outfit).filter(Boolean);
  if (!worn.length || !state.model) {
    els.fitVerdict.textContent = '未试穿';
    els.fitVerdict.className = 'fit-badge';
    els.fitReport.innerHTML = '<p class="fit-empty">试穿任意款式后，这里会给出各部位的合身判断</p>';
    return;
  }

  // 以当前选中服饰为判断对象；无选中则取第一件
  const entry = (state.activeSlot && state.outfit[state.activeSlot]) || worn[0];
  const result = evaluateFit(entry.id, state.size, state.model);
  if (!result) return;

  const levelClass = 'fit-' + result.level;
  els.fitVerdict.textContent = result.verdict;
  els.fitVerdict.className = 'fit-badge ' + levelClass;

  const partsHtml = result.parts.map(p => {
    const fill = Math.max(4, Math.min(100, p.score));
    return `<div class="fit-part">
      <div class="fit-part-head"><span>${p.label}</span><span class="fit-part-status ${p.status}">${p.statusLabel}</span></div>
      <div class="fit-part-bar"><i class="${p.status}" style="width:${fill}%"></i></div>
      <div class="fit-part-data">成衣 ${p.garment} · 合身基准 ${p.baseline} · 身体 ${p.body}<span>基准放松 ${p.designEase > 0 ? '+' : ''}${p.designEase} · 偏差 ${p.delta > 0 ? '+' : ''}${p.delta}cm</span></div>
    </div>`;
  }).join('');

  const recHtml = result.recommendation !== state.size
    ? `<div class="fit-recommend">系统推荐尺码 <b>${result.recommendation}</b>，当前 ${state.size} 可能不够合身</div>`
    : `<div class="fit-recommend ok">当前尺码 ${state.size} 与推荐一致</div>`;

  els.fitReport.innerHTML = `
    <div class="fit-score-row">
      <div class="fit-score ${levelClass}">${result.score}<small>分</small></div>
      <div class="fit-score-desc">${result.summary}</div>
    </div>
    ${partsHtml}
    ${recHtml}`;
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
let detected = null;
let detectedSize = null;

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
  detected = null; applyBtn.disabled = true;
  scanResult.hidden = true; dropZone.style.display = '';
  photoFile.value = ''; scanImg.removeAttribute('src');
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
    const color = extractDominantColor(img);
    const guess = guessGarment(img, color, color.subjectRatio);
    scanImg.src = url;
    const cssHex = '#' + color.hex.toString(16).padStart(6, '0');
    detectedSwatch.style.background = cssHex;
    detectedColorName.textContent = color.name;
    detectedTypeName.textContent = SILHOUETTE_NAMES[guess.silhouette] || guess.label;
    const reliable = guess.confidence >= 0.85;
    detectedSpec.textContent = reliable
      ? `${guess.item.name} · ${guess.item.code}`
      : '无法确认款号 · 将直接使用上传照片';
    const badge = document.getElementById('scan-badge');
    if (badge) badge.textContent = reliable ? '识别完成' : '未匹配到款号';
    const hint = document.getElementById('scan-fallback-hint');
    if (hint) hint.hidden = reliable;
    if (matchSelect) matchSelect.style.display = reliable ? '' : 'none';
    applyBtn.textContent = reliable ? '试穿到模特' : '直接贴到模特身上';

    // 下拉框：按品类分组，识别结果置顶选中
    matchSelect.innerHTML = '';
    DB_CATEGORIES.forEach(cat => {
      const og = document.createElement('optgroup');
      og.label = cat.name;
      currentBrandItems().filter(g => g.category === cat.id).forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.id; opt.textContent = g.name;
        if (g.id === guess.item.id) opt.selected = true;
        og.appendChild(opt);
      });
      matchSelect.appendChild(og);
    });
    detected = {
      hex: color.hex, colorName: color.name, garmentId: guess.item.id,
      reliable, url, category: guess.category,
    };
    detectedSize = recommendSize(state.model);
    renderScanSizes();
    dropZone.style.display = 'none';
    scanResult.hidden = false;
    applyBtn.disabled = false;
  };
  img.onerror = () => { toast('图片解码失败，请换一张试试'); URL.revokeObjectURL(url); };
  img.src = url;
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
  if (detected.reliable) {
    selectGarment(matchSelect.value || detected.garmentId);
    toast('照片识别换衣完成');
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
renderCategories();
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
