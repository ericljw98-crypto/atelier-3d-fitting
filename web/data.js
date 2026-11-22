import { buildRealDB } from './realDB.js';

/* ============================================================
   ATELIER · 杜嘉班纳（Dolce & Gabbana）女装参数数据库
   ------------------------------------------------------------
   数据说明：
   - measurements 为成衣平铺尺寸，单位 cm，基准尺码 IT 40。
   - ease 为对应部位的放松量（成衣尺寸 − 人体净体尺寸），单位 cm。
   - silhouette 决定程序化 3D 版型构建方式。
   - 款号为演示编码，非官方商品编号；本库为可扩充的教学演示数据。
   ============================================================ */

export const DB_META = {
  brand: 'Dolce & Gabbana',
  brandZh: '杜嘉班纳',
  version: '1.2.0',
  basisSize: 'IT 40',
  unit: 'cm',
  note: '成衣尺寸以 IT 40 为基准；款号为演示编码，用于虚拟试衣参数教学。',
};

/* 尺码表：各尺码对应的人体净体尺寸区间（cm） */
export const SIZE_CHART = {
  'IT 34': { bust: 78, waist: 58, hip: 84, label: 'XS' },
  'IT 36': { bust: 82, waist: 62, hip: 88, label: 'S' },
  'IT 38': { bust: 86, waist: 66, hip: 92, label: 'S/M' },
  'IT 40': { bust: 90, waist: 70, hip: 96, label: 'M' },
  'IT 42': { bust: 94, waist: 74, hip: 100, label: 'L' },
  'IT 44': { bust: 98, waist: 78, hip: 104, label: 'XL' },
  'IT 46': { bust: 102, waist: 82, hip: 108, label: 'XXL' },
};
export const SIZES = Object.keys(SIZE_CHART);

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
  { id: 'BL', name: '巴尔曼',   en: 'BALMAIN',        short: 'BL' },
];

/** 全量数据库：来自官网公开商品页的真实款式、款号、价格与商品图 */
export const DB = buildRealDB(PALETTE, ALL);

export const DB_BY_ID = {};
DB.forEach(g => { DB_BY_ID[g.id] = g; });

/* 根据版型推断所属槽位：连衣裙/上装/下装/外套 */
export function slotOf(item) {
  return item.category; // dresses / tops / bottoms / outer 直接对应槽位
}
