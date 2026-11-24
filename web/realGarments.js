/* ============================================================
   写实成衣 —— MakeHuman 官方 CC0 服装资产，拟合到 C 杯人体。
   这些是真实布料网格 + 官方贴图，有真实褶皱与上身效果，
   区别于程序化壳体服装。均为固定版型（基准 EU 38 / C 杯）。
   ============================================================ */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FOOT_Y } from './body.js';
import { inlineGlb } from './models_inline.js';

/* 全部尺码：与全站一致（写实款为固定版型，尺码用于合身诊断） */
const ALL = ['EU 34', 'EU 36', 'EU 38', 'EU 40', 'EU 42', 'EU 44', 'EU 46'];
const C = {
  black:    { name: '曜石黑', hex: 0x16171b },
  leopard:  { name: '豹纹棕', hex: 0x9a6a37 },
  zebra:    { name: '斑马灰', hex: 0x6b6f73 },
  lilac:    { name: '淡紫',   hex: 0x9a86b0 },
  wine:     { name: '酒红',   hex: 0x6e1f2c },
  ivory:    { name: '象牙白', hex: 0xf0ece1 },
  powder:   { name: '藕粉',   hex: 0xc98f9a },
  chocolate:{ name: '巧克力', hex: 0x4a2f26 },
};

const M_DRESS = { bust: 94, waist: 86, hip: 100, shoulder: 40, sleeve: 0, length: 96 };
const M_TOP   = { bust: 94, waist: 86, shoulder: 40, sleeve: 0, length: 55 };
const M_SKIRT = { waist: 76, hip: 99, length: 70, opening: 120 };

/* 7 款：连衣裙 4 + 上装 1 + 下装 2（均为验证无破洞的宽松款） */
export const REAL_GARMENTS = [
  { id: 'real-shift', code: 'CC-SHIFT', name: '写实·小黑裙', nameEn: 'Shift dress',
    brand: 'DG', category: 'dresses', silhouette: 'straight', fit: '直筒',
    season: 'ATELIER 写实', collection: 'CC0 高定写实', fabric: '棉混纺',
    colors: [C.black], sizes: ALL, measurements: { ...M_DRESS, length: 92 },
    ease: { bust: 0, waist: 2, hip: 2 },
    priceEUR: null, priceCNY: null, nonCommercial: true, image: 'images/real_shift.jpg', flat: 'images/real_shift_flat.jpg', flatMeta: { shoulderY: 117, shoulderW: 484 },
    model3d: 'models/cc_shift.glb', tex: 'models/cc_shift_tex.png', realistic: true },

  { id: 'real-cutout', code: 'CC-CUTOUT', name: '写实·豹纹连衣裙', nameEn: 'Cut-out dress',
    brand: 'DG', category: 'dresses', silhouette: 'fitted', fit: '修身',
    season: 'ATELIER 写实', collection: 'CC0 高定写实', fabric: '印花针织',
    colors: [C.leopard], sizes: ALL, measurements: { ...M_DRESS, bust: 92, hip: 98, length: 88 },
    ease: { bust: -1, waist: 0, hip: 0 },
    priceEUR: null, priceCNY: null, nonCommercial: true, image: 'images/real_cutout.jpg', flat: 'images/real_cutout_flat.jpg', flatMeta: { shoulderY: 116, shoulderW: 591 },
    model3d: 'models/cc_cutout.glb', tex: 'models/cc_cutout_tex.png', realistic: true },

  { id: 'real-keyhole', code: 'CC-KEYHOLE', name: '写实·斑马纹连衣裙', nameEn: 'Keyhole dress',
    brand: 'DG', category: 'dresses', silhouette: 'straight', fit: '直筒',
    season: 'ATELIER 写实', collection: 'CC0 高定写实', fabric: '印花梭织',
    colors: [C.zebra], sizes: ALL, measurements: { ...M_DRESS, length: 95 },
    ease: { bust: 0, waist: 2, hip: 2 },
    priceEUR: null, priceCNY: null, nonCommercial: true, image: 'images/real_keyhole.jpg', flat: 'images/real_keyhole_flat.jpg', flatMeta: { shoulderY: 108, shoulderW: 451 },
    model3d: 'models/cc_keyhole.glb', tex: 'models/cc_keyhole_tex.png', realistic: true },

  { id: 'real-camisole', code: 'CC-CAMISOLE', name: '写实·吊带长裙', nameEn: 'Camisole dress',
    brand: 'DG', category: 'dresses', silhouette: 'slip', fit: '吊带',
    season: 'ATELIER 写实', collection: 'CC0 高定写实', fabric: '雪纺',
    colors: [C.lilac], sizes: ALL, measurements: { ...M_DRESS, bust: 92, waist: 82, length: 112 },
    ease: { bust: 0, waist: -1, hip: 1 },
    priceEUR: null, priceCNY: null, nonCommercial: true, image: 'images/real_camisole.jpg', flat: 'images/real_camisole_flat.jpg', flatMeta: { shoulderY: 105, shoulderW: 413 },
    model3d: 'models/cc_camisole.glb', tex: 'models/cc_camisole_tex.png', realistic: true },

  { id: 'real-cami-top', code: 'CC-CAMITOP', name: '写实·吊带上衣', nameEn: 'Camisole top',
    brand: 'DG', category: 'tops', silhouette: 'slip', fit: '吊带',
    season: 'ATELIER 写实', collection: 'CC0 高定写实', fabric: '提花',
    colors: [C.lilac], sizes: ALL, measurements: { ...M_TOP },
    ease: { bust: 0, waist: 1 },
    priceEUR: null, priceCNY: null, nonCommercial: true, image: 'images/real_camitop.jpg', flat: 'images/real_camitop_flat.jpg', flatMeta: { shoulderY: 319, shoulderW: 709 },
    model3d: 'models/cc_camisole_top.glb', tex: 'models/cc_camisole_top_tex.png', realistic: true },

  { id: 'real-miniskirt', code: 'CC-MINISKIRT', name: '写实·格纹短裙', nameEn: 'Plaid mini skirt',
    brand: 'DG', category: 'bottoms', silhouette: 'mini', fit: '短款',
    season: 'ATELIER 写实', collection: 'CC0 高定写实', fabric: '羊毛格纹',
    colors: [C.wine], sizes: ALL, measurements: { ...M_SKIRT, length: 40 },
    ease: { waist: 0, hip: 1 },
    priceEUR: null, priceCNY: null, nonCommercial: true, image: 'images/real_miniskirt.jpg', flat: 'images/real_miniskirt_flat.jpg', flatMeta: { shoulderY: 601, shoulderW: 632 },
    model3d: 'models/cc_miniskirt.glb', tex: 'models/cc_miniskirt_tex.png', realistic: true },

  { id: 'real-longskirt', code: 'CC-LONGSKIRT', name: '写实·印花长裙', nameEn: 'Long full skirt',
    brand: 'DG', category: 'bottoms', silhouette: 'flared', fit: '大摆',
    season: 'ATELIER 写实', collection: 'CC0 高定写实', fabric: '印花雪纺',
    colors: [C.ivory], sizes: ALL, measurements: { ...M_SKIRT, length: 96 },
    ease: { waist: 0, hip: 2 },
    priceEUR: null, priceCNY: null, nonCommercial: true, image: 'images/real_longskirt.jpg', flat: 'images/real_longskirt_flat.jpg', flatMeta: { shoulderY: 136, shoulderW: 525 },
    model3d: 'models/cc_longskirt.glb', tex: 'models/cc_longskirt_tex.png', realistic: true },
];

/* GLB 与贴图缓存：加载一次，clone 给每次试穿 */
const gltfCache = {};
const texCache = {};

function loadGLTF(url) {
  if (!gltfCache[url]) {
    // 内联解析：GLTFLoader.load 内部走 fetch，file:// 下会被拒（APK 与本地双击都是这种场景）
    gltfCache[url] = new Promise((resolve, reject) => {
      inlineGlb(new GLTFLoader(), url, resolve,
        err => reject(new Error('服装加载失败：' + (err && err.message || err))));
    });
  }
  return gltfCache[url];
}
function loadTex(url) {
  if (!texCache[url]) {
    texCache[url] = new Promise(resolve => {
      new THREE.TextureLoader().load(url, t => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.flipY = false;
        resolve(t);
      }, undefined, () => resolve(null));
    });
  }
  return texCache[url];
}

/**
 * 异步构建写实成衣 group。
 * @param item  商品条目（含 model3d / tex）
 * @param H     人体场景缩放系数（= height(cm) * (1/50)）
 */
export async function buildRealGarment(item, H, colorHex = 0xffffff) {
  const [gltf, tex] = await Promise.all([
    loadGLTF(item.model3d),
    item.tex ? loadTex(item.tex) : Promise.resolve(null),
  ]);
  const g = gltf.scene.clone(true);
  const dyeMaterials = [];
  g.traverse(o => {
    if (!o.isMesh) return;
    // 独立几何体：clearSlot 会 dispose，避免影响缓存中的原件
    o.geometry = o.geometry.clone();
    if (!o.geometry.attributes.normal) o.geometry.computeVertexNormals();
    const m = new THREE.MeshStandardMaterial({
      map: tex || null,
      color: colorHex,
      roughness: 0.82,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
    o.material = m;
    dyeMaterials.push(m);
    o.castShadow = true;
    o.receiveShadow = true;
    o.frustumCulled = false;
  });
  g.userData.dyeMaterials = dyeMaterials;   // 供 setColor 复用换色逻辑
  g.userData.realistic = true;
  g.scale.setScalar(H);
  g.position.y = FOOT_Y;                    // 与人体相同的脚底基准，否则服装整体上移
  return g;
}
