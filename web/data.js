import { buildRealDB } from './realDB.js';
import { REAL_GARMENTS } from './realGarments.js';
import { buildArchiveDB } from './archive.js';

/* ============================================================
   ATELIER · 杜嘉班纳（Dolce & Gabbana）女装参数数据库
   ------------------------------------------------------------
   数据说明：
   - measurements 为成衣尺寸，单位 cm，基准尺码 EU 38。
   - ease 为对应部位的放松量（成衣尺寸 − 人体净体尺寸），单位 cm。
   - silhouette 决定程序化 3D 版型构建方式。
   - 款号为演示编码，非官方商品编号；本库为可扩充的教学演示数据。
   ============================================================ */

export const DB_META = {
  brand: 'Dolce & Gabbana',
  brandZh: '杜嘉班纳',
  version: '1.2.0',
  basisSize: 'EU 38',
  unit: 'cm',
  note: '成衣尺寸以 EU 38 为基准，全站统一使用欧码（EU 34–46）；款号为演示编码。',
};

/* 欧码尺码表（EU，女装净体尺寸，cm）
   档差 4cm（胸/臀）、4cm（腰），与欧洲女装放码惯例一致。
   同时给出身高建议区间，用于同围度下的长短款选择。 */
export const SIZE_CHART = {
  'EU 34': { bust: 80, waist: 64, hip: 88,  height: [158, 172], label: 'XS' },
  'EU 36': { bust: 84, waist: 68, hip: 92,  height: [158, 172], label: 'S' },
  'EU 38': { bust: 88, waist: 72, hip: 96,  height: [160, 174], label: 'M' },
  'EU 40': { bust: 92, waist: 76, hip: 100, height: [160, 174], label: 'M/L' },
  'EU 42': { bust: 96, waist: 80, hip: 104, height: [162, 176], label: 'L' },
  'EU 44': { bust: 100, waist: 84, hip: 108, height: [162, 176], label: 'XL' },
  'EU 46': { bust: 104, waist: 88, hip: 112, height: [164, 178], label: 'XXL' },
};
export const SIZES = Object.keys(SIZE_CHART);

/* ---------------- 尺码的两种写法 ----------------
   欧洲女装同一件衣服上通常并列标两个码：数字码（34–46）与国际字母码
   （XS–XXL）。两者的对应不是均分，38 是 M、40 是 M/L、42 是 L，
   所以必须按表来，不能按序号推。

   用户输入需要容错：'38' / 'eu38' / 'EU 38' / 'M' / 'm' / 'M/L' / 'ML'
   都应被识别；数字落在两档之间时（如 39）就近取档并回告。 */
const LABEL_TO_SIZE = (() => {
  const m = {};
  SIZES.forEach(k => {
    const lab = String(SIZE_CHART[k].label || '').toUpperCase().replace(/[^A-Z]/g, '');
    if (lab) m[lab] = k;                       // 'M/L' -> 'ML'
    m[k.replace(/\s+/g, '').replace(/^EU/, '')] = k;   // '38'
  });
  return m;
})();

/** 标准尺码键 -> 字母码（EU 38 -> M） */
export function sizeLetter(size) {
  const row = SIZE_CHART[size];
  return row ? row.label : '';
}

/** 标准尺码键 -> 数字（EU 38 -> 38） */
export function sizeNumber(size) {
  const n = parseFloat(String(size).replace(/[^\d.]/g, ''));
  return isFinite(n) ? n : null;
}

/**
 * 把用户输入规范成标准尺码键。
 * @returns {{size:string, snapped:boolean, raw:string}|null} 无法识别返回 null
 */
export function normalizeSize(raw) {
  if (raw == null) return null;
  const s = String(raw).trim().toUpperCase().replace(/\s+/g, '');
  if (!s) return null;

  // 数字码：允许 '38' / 'EU38' / '38.0'
  const num = s.replace(/^EU/, '');
  if (/^\d{2}(\.\d+)?$/.test(num)) {
    const v = parseFloat(num);
    let best = null, bestD = Infinity;
    SIZES.forEach(k => {
      const kv = sizeNumber(k);
      const d = Math.abs(kv - v);
      if (d < bestD) { bestD = d; best = k; }
    });
    if (!best) return null;
    return { size: best, snapped: bestD > 0.01, raw: String(raw) };
  }

  // 字母码：去掉分隔符后查表（'M/L' -> 'ML'）
  const key = s.replace(/[^A-Z]/g, '');
  if (LABEL_TO_SIZE[key]) {
    return { size: LABEL_TO_SIZE[key], snapped: false, raw: String(raw) };
  }
  // 常见简写：ML 之外再兜一层 M-L、Medium 之类
  if (key === 'MEDIUM') return { size: 'EU 38', snapped: false, raw: String(raw) };
  if (key === 'SMALL') return { size: 'EU 36', snapped: false, raw: String(raw) };
  if (key === 'LARGE') return { size: 'EU 42', snapped: false, raw: String(raw) };
  return null;
}

/* 颜色预设（品牌常用色系） */
export const PALETTE = {
  black:       { name: '曜石黑',   hex: 0x16171b },
  ivory:       { name: '象牙白',   hex: 0xf0ece1 },
  red:         { name: '正红',     hex: 0xa51f2c },
  wine:        { name: '酒红',     hex: 0x6e1f2c },
  leopard:     { name: '豹纹棕',   hex: 0x9a6a37 },
  gold:        { name: '鎏金',     hex: 0xc9a35c },
  olive:       { name: '橄榄绿',   hex: 0x4b5340 },
  navy:        { name: '深海军蓝', hex: 0x22315a },
  nude:        { name: '裸粉',     hex: 0xd9a999 },
  emerald:     { name: '祖母绿',   hex: 0x1f5c4a },
  powder:      { name: '藕粉',     hex: 0xc98f9a },
  chocolate:   { name: '巧克力',   hex: 0x4a2f26 },
  camel:       { name: '驼色',     hex: 0xb08c5a },
  lilac:       { name: '淡紫',     hex: 0x9a86b0 },
  sky:         { name: '雾蓝',     hex: 0x8fa9bd },
};

/* 品类 */
export const DB_CATEGORIES = [
  { id: 'dresses', name: '连衣裙', en: 'Dresses' },
  { id: 'tops',    name: '上装',   en: 'Tops' },
  { id: 'bottoms', name: '下装',   en: 'Bottoms' },
  { id: 'outer',   name: '外套',   en: 'Outerwear' },
];

/* silhouette → 中文版型名 */
export const SILHOUETTE_NAMES = {
  fitted: '修身', aline: 'A 字', flared: '大摆', straight: '直筒',
  slip: '吊带', wrap: '裹身', peplum: '荷叶腰', blouse: '衬衫式',
  skinny: '紧身', wide: '阔腿', pencil: '铅笔', mini: '短款',
  oversize: '廓形', blazer: '西装', trench: '风衣', biker: '机车',
  knit: '针织', cape: '斗篷',
};

const C = PALETTE;
const ALL = SIZES;

/* ------------------------------------------------------------
   女装款式数据
   measurements 字段含义（按品类不同）：
     dresses: bust, waist, hip, shoulder, sleeve, length
     tops:    bust, waist, shoulder, sleeve, length
     bottoms: waist, hip, length, opening（脚口/下摆围）
     outer:   bust, waist, shoulder, sleeve, length
   ------------------------------------------------------------ */

/* 品牌清单：切换后所有列表、照片识别与合身诊断均按当前品牌过滤 */
export const BRANDS = [
  { id: 'DG', name: '杜嘉班纳', en: 'Dolce & Gabbana', short: 'DG' },
  { id: 'BL', name: '巴尔曼', en: 'Balmain',          short: 'BL' },
  { id: 'AR', name: '停产档案', en: 'ARCHIVE',        short: 'AR' },
];

/* 非服装类商品（包袋、香水、眼镜、鞋履等）不可上身试穿，
   混在成衣列表里只会给出错误的合身诊断，一律不入库。
   判定看英文名里的核心名词，避免把 "belted trench" 一类误杀。 */
const NON_APPAREL = /\b(handbag|bag|tote|clutch|pouch|backpack|wallet|card holder|belt bag|perfume|parfum|eau de|fragrance|candle|sunglasses|eyewear|eyeglasses|sneakers?|sandals?|boots?|loafers?|pumps?|heels?|necklace|earrings?|bracelet|ring|watch|scarf|shawl|gloves?|tights|socks?)\b/i;

const isWearable = it =>
  ['dresses', 'tops', 'bottoms', 'outer'].includes(it.category) &&
  !NON_APPAREL.test(it.nameEn || '') &&
  !NON_APPAREL.test(it.name || '');

/** 全量数据库：在售真实款式（官网公开数据）+ 历史停产版型（档案款） */
export const DB = [...REAL_GARMENTS, ...buildArchiveDB(PALETTE, ALL), ...buildRealDB(PALETTE, ALL)]
  .filter(isWearable);

export const DB_BY_ID = {};
DB.forEach(g => { DB_BY_ID[g.id] = g; });

/* 根据版型推断所属槽位：连衣裙/上装/下装/外套 */
export function slotOf(item) {
  return item.category; // dresses / tops / bottoms / outer 直接对应槽位
}
