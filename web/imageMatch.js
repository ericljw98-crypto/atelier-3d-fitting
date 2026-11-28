/* 以图搜图：把上传图片与库内商品图做视觉指纹比对。
   指纹口径与 build_image_index.py 严格一致，索引由该脚本生成。 */
import { IMAGE_INDEX } from './imageIndex.js';

const COS = new Float64Array(8 * 32);
for (let u = 0; u < 8; u++) {
  for (let x = 0; x < 32; x++) COS[u * 32 + x] = Math.cos((2 * x + 1) * u * Math.PI / 64);
}
const HEX = new Map();
for (let i = 0; i < 16; i++) HEX.set(i.toString(16), [(i >> 3) & 1, (i >> 2) & 1, (i >> 1) & 1, i & 1]);
function bitsOf(hex) {
  const out = [];
  for (const ch of hex) for (const b of HEX.get(ch) || [0, 0, 0, 0]) out.push(b);
  return out;
}
function bytesOf(b64) {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

/* 索引只解码一次，后续每次上传只算上传图自己的指纹。 */
const INDEX = Object.entries(IMAGE_INDEX).map(([id, fp]) => ({
  id, img: fp.img, r: fp.r,
  p: bitsOf(fp.p).slice(0, 63),    // 离线已去 DC，这里只取有效的 63 bit
  d: bitsOf(fp.d),                 // dHash 64 bit（末位补零，比对时长度一致）
  c: bytesOf(fp.c),
  g: bytesOf(fp.g),
}));

function drawTo(img, w, h) {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(img, 0, 0, w, h);
  return ctx;
}

/* 提取上传图指纹；口径对齐 Python：32x32 灰度、8x8 DCT、9x8 差分、64x64 HSV。 */
export function fingerprintOf(img) {
  const ctx32 = drawTo(img, 32, 32);
  const d32 = ctx32.getImageData(0, 0, 32, 32).data;
  const gray32 = new Float64Array(1024);
  for (let i = 0; i < 1024; i++) {
    const k = i * 4;
    gray32[i] = 0.299 * d32[k] + 0.587 * d32[k + 1] + 0.114 * d32[k + 2];
  }

  // 8x8 DCT：先按行做 cos 投影，再按列做
  const dct = new Float64Array(64);
  const tmp = new Float64Array(8 * 32);
  /* numpy 的 basis.T @ g32 @ basis 中，u 是行频率、v 是列频率；
     这里第一步必须按行 x 投影，否则 pHash 会整体转置。 */
  for (let u = 0; u < 8; u++) {
    for (let y = 0; y < 32; y++) {
      let s = 0;
      for (let x = 0; x < 32; x++) s += gray32[x * 32 + y] * COS[u * 32 + x];
      tmp[u * 32 + y] = s;
    }
  }
  for (let u = 0; u < 8; u++) {
    for (let v = 0; v < 8; v++) {
      let s = 0;
      for (let y = 0; y < 32; y++) s += tmp[u * 32 + y] * COS[v * 32 + y];
      dct[u * 8 + v] = s;
    }
  }
  const vals = Array.from(dct).slice(1);
  const sorted = vals.slice().sort((a, b) => a - b);
  const med = sorted[Math.floor(sorted.length / 2)];
  const p = vals.map(v => (v > med ? 1 : 0));

  // dHash：直接从同一份 32x32 灰度按固定坐标取样，避免浏览器与 PIL 的插值口径差异
  const d = [];
  for (let y = 0; y < 8; y++) {
    const sy = Math.min(31, Math.floor(y * 32 / 8));
    for (let x = 0; x < 8; x++) {
      const sx1 = Math.min(31, Math.floor(x * 32 / 9));
      const sx2 = Math.min(31, Math.floor((x + 1) * 32 / 9));
      d.push(gray32[sy * 32 + sx1] > gray32[sy * 32 + sx2] ? 1 : 0);
    }
  }

  // 8x8 灰度缩略
  const g = new Uint8Array(64);
  for (let by = 0; by < 8; by++) for (let bx = 0; bx < 8; bx++) {
    let s = 0;
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) s += gray32[(by * 4 + y) * 32 + bx * 4 + x];
    g[by * 8 + bx] = Math.round(s / 16);
  }

  // 64x64 HSV 直方图 + 主色（排除白底）
  const d64 = drawTo(img, 64, 64).getImageData(0, 0, 64, 64).data;
  const c = new Uint16Array(108);
  const centers = new Float64Array(108 * 3);
  for (let i = 0; i < 4096; i++) {
    const k = i * 4;
    const r = d64[k] / 255, gg = d64[k + 1] / 255, b = d64[k + 2] / 255;
    const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), dd = mx - mn;
    const v = mx, s = mx > 0 ? dd / mx : 0;
    let h = 0;
    if (dd > 1e-8) {
      let hv = r === mx ? (gg - b) / dd : gg === mx ? (b - r) / dd + 2 : (r - gg) / dd + 4;
      h = (((hv % 6) + 6) % 6) / 6;
    }
    const hb = Math.min(11, Math.floor(h * 12));
    const sb = Math.min(2, Math.floor(s * 3));
    const vb = Math.min(2, Math.floor(v * 3));
    const bi = (hb * 3 + sb) * 3 + vb;
    c[bi]++;
    centers[bi * 3] += r; centers[bi * 3 + 1] += gg; centers[bi * 3 + 2] += b;
  }
  const hist = new Uint8Array(108);
  let bestBin = -1, bestN = -1;
  for (let i = 0; i < 108; i++) {
    hist[i] = Math.round(c[i] / 4096 * 255);
    const vbin = i % 3, sbin = Math.floor(i / 3) % 3;
    if (vbin === 2 && sbin === 0) continue;  // 白底
    if (c[i] > bestN) { bestN = c[i]; bestBin = i; }
  }
  let dominantHex = 0x808080;
  if (bestBin >= 0 && bestN > 0) {
    const n = c[bestBin];
    const r = Math.round(centers[bestBin * 3] / n * 255);
    const gg = Math.round(centers[bestBin * 3 + 1] / n * 255);
    const b = Math.round(centers[bestBin * 3 + 2] / n * 255);
    dominantHex = (r << 16) | (gg << 8) | b;
  }
  return { p, d, c: hist, g, r: img.naturalWidth / Math.max(1, img.naturalHeight), dominantHex };
}

function hamming(a, b) {
  let n = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) n++;
  return n / a.length;
}
function corr(a, b) {
  let sa = 0, sb = 0;
  for (let i = 0; i < a.length; i++) { sa += a[i]; sb += b[i]; }
  const ma = sa / a.length, mb = sb / b.length;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i] - ma, y = b[i] - mb;
    num += x * y; da += x * x; db += y * y;
  }
  return da && db ? Math.max(-1, Math.min(1, num / Math.sqrt(da * db))) : 0;
}

/* 综合相似度：感知哈希 45% + 结构 25% + 颜色 20% + 比例 10%。
   同一张图（缩放/压缩/截屏）应 >0.9；不同款通常 <0.75。 */
export function similarity(q, t) {
  /* dHash 对 1 级灰度差敏感，PIL 与 canvas 的灰度取整会有零星翻转；
     pHash 已能稳定区分同图，因此这里以 pHash 为主。 */
  const hashSim = 1 - (0.85 * hamming(q.p, t.p) + 0.15 * hamming(q.d, t.d));
  const structSim = (corr(q.g, t.g) + 1) / 2;
  let bhat = 0;
  for (let i = 0; i < 108; i++) bhat += Math.sqrt(q.c[i] * t.c[i]) / 255;
  const colorSim = Math.min(1, bhat);
  const ratioSim = 1 - Math.min(1, Math.abs(q.r - t.r) / Math.max(q.r, t.r, 0.001));
  return 0.45 * hashSim + 0.25 * structSim + 0.20 * colorSim + 0.10 * ratioSim;
}

export function matchImage(img, limit = 8) {
  const q = fingerprintOf(img);
  const scored = INDEX.map(t => ({ id: t.id, img: t.img, score: similarity(q, t) }));
  scored.sort((a, b) => b.score - a.score);
  return { dominantHex: q.dominantHex, matches: scored.slice(0, limit) };
}
