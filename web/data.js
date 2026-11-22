import { buildBalmainDB } from './balmain.js';

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
const DG_DB = [
  /* ================= 连衣裙 Dresses ================= */
  {
    id: 'dg-dr-001', code: 'DG-SS25-DR-001', name: '西西里印花吊带长裙', nameEn: 'Sicilian Print Slip Dress',
    category: 'dresses', silhouette: 'slip', fit: '修身', season: 'SS 2025', collection: 'Sicilia',
    fabric: '真丝缎面', colors: [C.black, C.red, C.nude, C.emerald], sizes: ALL,
    measurements: { bust: 90, waist: 72, hip: 96, shoulder: 0, sleeve: 0, length: 112 },
    ease: { bust: 0, waist: 2, hip: 0 },
  },
  {
    id: 'dg-dr-002', code: 'DG-SS25-DR-002', name: '蕾丝拼接修身连衣裙', nameEn: 'Lace Panel Fitted Dress',
    category: 'dresses', silhouette: 'fitted', fit: '修身', season: 'SS 2025', collection: 'Lace',
    fabric: '弹力蕾丝 / 真丝里衬', colors: [C.black, C.ivory, C.wine, C.navy], sizes: ALL,
    measurements: { bust: 88, waist: 68, hip: 94, shoulder: 39, sleeve: 20, length: 100 },
    ease: { bust: -2, waist: -2, hip: -2 },
  },
  {
    id: 'dg-dr-003', code: 'DG-SS25-DR-003', name: '经典 A 字连衣裙', nameEn: 'Classic A-Line Dress',
    category: 'dresses', silhouette: 'aline', fit: '合体', season: 'SS 2025', collection: 'Tailoring',
    fabric: '羊毛混纺', colors: [C.black, C.red, C.camel, C.olive], sizes: ALL,
    measurements: { bust: 92, waist: 74, hip: 100, shoulder: 40, sleeve: 0, length: 96 },
    ease: { bust: 2, waist: 4, hip: 4 },
  },
  {
    id: 'dg-dr-004', code: 'DG-FW25-DR-004', name: '大摆礼服长裙', nameEn: 'Ball Gown Evening Dress',
    category: 'dresses', silhouette: 'flared', fit: '宽松', season: 'FW 2025', collection: 'Glamour',
    fabric: '塔夫绸 / 提花', colors: [C.black, C.gold, C.wine, C.emerald], sizes: ALL,
    measurements: { bust: 90, waist: 70, hip: 98, shoulder: 39, sleeve: 0, length: 140 },
    ease: { bust: 0, waist: 0, hip: 2 },
  },
  {
    id: 'dg-dr-005', code: 'DG-SS25-DR-005', name: '裹身式中长裙', nameEn: 'Wrap Midi Dress',
    category: 'dresses', silhouette: 'wrap', fit: '修身', season: 'SS 2025', collection: 'Sicilia',
    fabric: '真丝乔其纱', colors: [C.red, C.navy, C.leopard, C.powder], sizes: ALL,
    measurements: { bust: 90, waist: 71, hip: 97, shoulder: 39, sleeve: 58, length: 108 },
    ease: { bust: 0, waist: 1, hip: 1 },
  },
  {
    id: 'dg-dr-006', code: 'DG-SS25-DR-006', name: '荷叶腰短款连衣裙', nameEn: 'Peplum Mini Dress',
    category: 'dresses', silhouette: 'peplum', fit: '合体', season: 'SS 2025', collection: 'Tailoring',
    fabric: '棉质斜纹', colors: [C.ivory, C.black, C.sky, C.nude], sizes: ALL,
    measurements: { bust: 90, waist: 72, hip: 98, shoulder: 40, sleeve: 22, length: 88 },
    ease: { bust: 0, waist: 2, hip: 2 },
  },
  {
    id: 'dg-dr-007', code: 'DG-FW25-DR-007', name: '高领针织连衣裙', nameEn: 'Turtleneck Knit Dress',
    category: 'dresses', silhouette: 'fitted', fit: '修身', season: 'FW 2025', collection: 'Knitwear',
    fabric: '羊绒混纺', colors: [C.black, C.camel, C.olive, C.chocolate], sizes: ALL,
    measurements: { bust: 86, waist: 68, hip: 92, shoulder: 38, sleeve: 60, length: 104 },
    ease: { bust: -4, waist: -2, hip: -4 },
  },
  {
    id: 'dg-dr-008', code: 'DG-SS25-DR-008', name: '波点衬衫式连衣裙', nameEn: 'Polka Dot Shirt Dress',
    category: 'dresses', silhouette: 'blouse', fit: '合体', season: 'SS 2025', collection: 'Retro',
    fabric: '真丝双绉', colors: [C.ivory, C.black, C.red, C.sky], sizes: ALL,
    measurements: { bust: 94, waist: 76, hip: 102, shoulder: 41, sleeve: 56, length: 100 },
    ease: { bust: 4, waist: 6, hip: 6 },
  },
  {
    id: 'dg-dr-009', code: 'DG-FW25-DR-009', name: '天鹅绒晚礼服', nameEn: 'Velvet Evening Gown',
    category: 'dresses', silhouette: 'fitted', fit: '修身', season: 'FW 2025', collection: 'Glamour',
    fabric: '弹力天鹅绒', colors: [C.emerald, C.wine, C.black, C.navy], sizes: ALL,
    measurements: { bust: 88, waist: 68, hip: 94, shoulder: 39, sleeve: 0, length: 132 },
    ease: { bust: -2, waist: -2, hip: -2 },
  },
  {
    id: 'dg-dr-010', code: 'DG-SS25-DR-010', name: '皮革修身短裙', nameEn: 'Leather Mini Dress',
    category: 'dresses', silhouette: 'straight', fit: '修身', season: 'SS 2025', collection: 'Biker',
    fabric: '软羊皮', colors: [C.black, C.chocolate, C.red], sizes: ALL,
    measurements: { bust: 88, waist: 70, hip: 94, shoulder: 39, sleeve: 0, length: 82 },
    ease: { bust: -2, waist: 0, hip: -2 },
  },
  {
    id: 'dg-dr-011', code: 'DG-SS25-DR-011', name: '碎花度假长裙', nameEn: 'Floral Beach Maxi Dress',
    category: 'dresses', silhouette: 'flared', fit: '宽松', season: 'SS 2025', collection: 'Sicilia',
    fabric: '棉麻印花', colors: [C.ivory, C.sky, C.powder, C.olive], sizes: ALL,
    measurements: { bust: 94, waist: 76, hip: 104, shoulder: 40, sleeve: 0, length: 130 },
    ease: { bust: 4, waist: 6, hip: 8 },
  },
  {
    id: 'dg-dr-012', code: 'DG-FW25-DR-012', name: '缎面露肩礼服', nameEn: 'Satin Off-Shoulder Gown',
    category: 'dresses', silhouette: 'fitted', fit: '修身', season: 'FW 2025', collection: 'Glamour',
    fabric: '重磅真丝缎', colors: [C.gold, C.black, C.wine, C.emerald], sizes: ALL,
    measurements: { bust: 88, waist: 68, hip: 94, shoulder: 0, sleeve: 0, length: 136 },
    ease: { bust: -2, waist: -2, hip: -2 },
  },
  {
    id: 'dg-dr-013', code: 'DG-SS25-DR-013', name: '条纹水手连衣裙', nameEn: 'Breton Stripe Dress',
    category: 'dresses', silhouette: 'straight', fit: '合体', season: 'SS 2025', collection: 'Retro',
    fabric: '棉质针织', colors: [C.ivory, C.navy, C.red], sizes: ALL,
    measurements: { bust: 92, waist: 74, hip: 98, shoulder: 40, sleeve: 20, length: 94 },
    ease: { bust: 2, waist: 4, hip: 2 },
  },
  {
    id: 'dg-dr-014', code: 'DG-FW25-DR-014', name: '斗篷式晚装裙', nameEn: 'Cape Evening Dress',
    category: 'dresses', silhouette: 'cape', fit: '宽松', season: 'FW 2025', collection: 'Glamour',
    fabric: '羊毛绒 / 真丝', colors: [C.black, C.red, C.gold, C.navy], sizes: ALL,
    measurements: { bust: 92, waist: 72, hip: 98, shoulder: 40, sleeve: 0, length: 118 },
    ease: { bust: 2, waist: 2, hip: 2 },
  },

  /* ================= 上装 Tops ================= */
  {
    id: 'dg-tp-001', code: 'DG-SS25-TP-001', name: '圆领印花 T 恤', nameEn: 'Printed Crew Tee',
    category: 'tops', silhouette: 'fitted', fit: '合体', season: 'SS 2025', collection: 'Casual',
    fabric: '纯棉平纹', colors: [C.ivory, C.black, C.red, C.sky], sizes: ALL,
    measurements: { bust: 90, waist: 86, shoulder: 40, sleeve: 18, length: 62 },
    ease: { bust: 0, waist: 0 },
  },
  {
    id: 'dg-tp-002', code: 'DG-SS25-TP-002', name: '真丝修身衬衫', nameEn: 'Silk Fitted Shirt',
    category: 'tops', silhouette: 'blouse', fit: '修身', season: 'SS 2025', collection: 'Tailoring',
    fabric: '真丝双绉', colors: [C.ivory, C.black, C.wine, C.nude], sizes: ALL,
    measurements: { bust: 90, waist: 80, shoulder: 40, sleeve: 59, length: 66 },
    ease: { bust: 0, waist: -2 },
  },
  {
    id: 'dg-tp-003', code: 'DG-FW25-TP-003', name: '高领羊绒衫', nameEn: 'Cashmere Turtleneck',
    category: 'tops', silhouette: 'knit', fit: '修身', season: 'FW 2025', collection: 'Knitwear',
    fabric: '羊绒', colors: [C.black, C.camel, C.ivory, C.olive], sizes: ALL,
    measurements: { bust: 86, waist: 80, shoulder: 38, sleeve: 61, length: 60 },
    ease: { bust: -4, waist: 0 },
  },
  {
    id: 'dg-tp-004', code: 'DG-SS25-TP-004', name: '蕾丝吊带上衣', nameEn: 'Lace Camisole',
    category: 'tops', silhouette: 'slip', fit: '修身', season: 'SS 2025', collection: 'Lace',
    fabric: '弹力蕾丝', colors: [C.black, C.ivory, C.powder, C.red], sizes: ALL,
    measurements: { bust: 86, waist: 76, shoulder: 0, sleeve: 0, length: 50 },
    ease: { bust: -4, waist: -2 },
  },
  {
    id: 'dg-tp-005', code: 'DG-SS25-TP-005', name: '荷叶边罩衫', nameEn: 'Ruffle Blouse',
    category: 'tops', silhouette: 'blouse', fit: '宽松', season: 'SS 2025', collection: 'Romantic',
    fabric: '雪纺', colors: [C.ivory, C.powder, C.sky, C.lilac], sizes: ALL,
    measurements: { bust: 98, waist: 96, shoulder: 41, sleeve: 56, length: 64 },
    ease: { bust: 8, waist: 8 },
  },
  {
    id: 'dg-tp-006', code: 'DG-FW25-TP-006', name: '廓形针织开衫', nameEn: 'Oversize Knit Cardigan',
    category: 'tops', silhouette: 'oversize', fit: '宽松', season: 'FW 2025', collection: 'Knitwear',
    fabric: '粗纺羊毛', colors: [C.camel, C.chocolate, C.black, C.ivory], sizes: ALL,
    measurements: { bust: 110, waist: 108, shoulder: 46, sleeve: 60, length: 70 },
    ease: { bust: 20, waist: 20 },
  },
  {
    id: 'dg-tp-007', code: 'DG-SS25-TP-007', name: '抹胸式短上衣', nameEn: 'Bandeau Top',
    category: 'tops', silhouette: 'slip', fit: '修身', season: 'SS 2025', collection: 'Casual',
    fabric: '弹力针织', colors: [C.black, C.red, C.nude, C.leopard], sizes: ALL,
    measurements: { bust: 84, waist: 74, shoulder: 0, sleeve: 0, length: 34 },
    ease: { bust: -6, waist: -4 },
  },
  {
    id: 'dg-tp-008', code: 'DG-SS25-TP-008', name: '条纹 Polo 衫', nameEn: 'Striped Polo',
    category: 'tops', silhouette: 'fitted', fit: '合体', season: 'SS 2025', collection: 'Retro',
    fabric: '珠地棉', colors: [C.navy, C.ivory, C.red, C.olive], sizes: ALL,
    measurements: { bust: 92, waist: 88, shoulder: 41, sleeve: 20, length: 64 },
    ease: { bust: 2, waist: 2 },
  },
  {
    id: 'dg-tp-009', code: 'DG-FW25-TP-009', name: '缎面衬衫', nameEn: 'Satin Blouse',
    category: 'tops', silhouette: 'blouse', fit: '合体', season: 'FW 2025', collection: 'Glamour',
    fabric: '缎面', colors: [C.gold, C.black, C.wine, C.emerald], sizes: ALL,
    measurements: { bust: 94, waist: 88, shoulder: 41, sleeve: 59, length: 66 },
    ease: { bust: 4, waist: 2 },
  },
  {
    id: 'dg-tp-010', code: 'DG-SS25-TP-010', name: '镂空针织上衣', nameEn: 'Crochet Knit Top',
    category: 'tops', silhouette: 'knit', fit: '修身', season: 'SS 2025', collection: 'Knitwear',
    fabric: '棉线钩织', colors: [C.ivory, C.nude, C.sky, C.powder], sizes: ALL,
    measurements: { bust: 88, waist: 82, shoulder: 39, sleeve: 24, length: 56 },
    ease: { bust: -2, waist: 0 },
  },
  {
    id: 'dg-tp-011', code: 'DG-SS25-TP-011', name: '印花雪纺衬衫', nameEn: 'Printed Chiffon Shirt',
    category: 'tops', silhouette: 'blouse', fit: '宽松', season: 'SS 2025', collection: 'Sicilia',
    fabric: '真丝雪纺', colors: [C.leopard, C.red, C.ivory, C.navy], sizes: ALL,
    measurements: { bust: 100, waist: 98, shoulder: 42, sleeve: 57, length: 68 },
    ease: { bust: 10, waist: 10 },
  },
  {
    id: 'dg-tp-012', code: 'DG-FW25-TP-012', name: '罗纹修身背心', nameEn: 'Ribbed Fitted Vest',
    category: 'tops', silhouette: 'fitted', fit: '修身', season: 'FW 2025', collection: 'Knitwear',
    fabric: '罗纹弹力针织', colors: [C.black, C.ivory, C.olive, C.wine], sizes: ALL,
    measurements: { bust: 82, waist: 76, shoulder: 0, sleeve: 0, length: 58 },
    ease: { bust: -8, waist: -4 },
  },

  /* ================= 下装 Bottoms ================= */
  {
    id: 'dg-bt-001', code: 'DG-SS25-BT-001', name: '高腰直筒牛仔裤', nameEn: 'High-Rise Straight Jeans',
    category: 'bottoms', silhouette: 'straight', fit: '合体', season: 'SS 2025', collection: 'Denim',
    fabric: '弹力丹宁', colors: [C.navy, C.black, C.sky, C.ivory], sizes: ALL,
    measurements: { waist: 72, hip: 96, length: 104, opening: 40 },
    ease: { waist: 2, hip: 0 },
  },
  {
    id: 'dg-bt-002', code: 'DG-SS25-BT-002', name: '西式阔腿裤', nameEn: 'Tailored Wide-Leg Trousers',
    category: 'bottoms', silhouette: 'wide', fit: '宽松', season: 'SS 2025', collection: 'Tailoring',
    fabric: '羊毛混纺', colors: [C.black, C.camel, C.navy, C.ivory], sizes: ALL,
    measurements: { waist: 74, hip: 100, length: 108, opening: 56 },
    ease: { waist: 4, hip: 4 },
  },
  {
    id: 'dg-bt-003', code: 'DG-SS25-BT-003', name: 'A 字皮革短裙', nameEn: 'Leather A-Line Mini',
    category: 'bottoms', silhouette: 'aline', fit: '合体', season: 'SS 2025', collection: 'Biker',
    fabric: '软羊皮', colors: [C.black, C.chocolate, C.red], sizes: ALL,
    measurements: { waist: 72, hip: 96, length: 42, opening: 108 },
    ease: { waist: 2, hip: 0 },
  },
  {
    id: 'dg-bt-004', code: 'DG-FW25-BT-004', name: '铅笔中长裙', nameEn: 'Pencil Midi Skirt',
    category: 'bottoms', silhouette: 'pencil', fit: '修身', season: 'FW 2025', collection: 'Tailoring',
    fabric: '羊毛混纺', colors: [C.black, C.wine, C.navy, C.leopard], sizes: ALL,
    measurements: { waist: 70, hip: 94, length: 68, opening: 92 },
    ease: { waist: 0, hip: -2 },
  },
  {
    id: 'dg-bt-005', code: 'DG-SS25-BT-005', name: '紧身打底裤', nameEn: 'Skinny Leggings',
    category: 'bottoms', silhouette: 'skinny', fit: '修身', season: 'SS 2025', collection: 'Casual',
    fabric: '弹力棉', colors: [C.black, C.navy, C.olive, C.chocolate], sizes: ALL,
    measurements: { waist: 68, hip: 92, length: 100, opening: 26 },
    ease: { waist: -2, hip: -4 },
  },
  {
    id: 'dg-bt-006', code: 'DG-SS25-BT-006', name: '百褶中长裙', nameEn: 'Pleated Midi Skirt',
    category: 'bottoms', silhouette: 'flared', fit: '宽松', season: 'SS 2025', collection: 'Retro',
    fabric: '压褶雪纺', colors: [C.ivory, C.red, C.navy, C.lilac], sizes: ALL,
    measurements: { waist: 72, hip: 98, length: 76, opening: 160 },
    ease: { waist: 2, hip: 2 },
  },
  {
    id: 'dg-bt-007', code: 'DG-SS25-BT-007', name: '高腰短裤', nameEn: 'High-Rise Shorts',
    category: 'bottoms', silhouette: 'mini', fit: '合体', season: 'SS 2025', collection: 'Casual',
    fabric: '棉质斜纹', colors: [C.ivory, C.black, C.camel, C.sky], sizes: ALL,
    measurements: { waist: 72, hip: 96, length: 40, opening: 54 },
    ease: { waist: 2, hip: 0 },
  },
  {
    id: 'dg-bt-008', code: 'DG-FW25-BT-008', name: '印花阔腿长裤', nameEn: 'Printed Palazzo Pants',
    category: 'bottoms', silhouette: 'wide', fit: '宽松', season: 'FW 2025', collection: 'Sicilia',
    fabric: '真丝', colors: [C.leopard, C.black, C.wine, C.olive], sizes: ALL,
    measurements: { waist: 74, hip: 100, length: 110, opening: 62 },
    ease: { waist: 4, hip: 4 },
  },
  {
    id: 'dg-bt-009', code: 'DG-SS25-BT-009', name: '牛仔迷你裙', nameEn: 'Denim Mini Skirt',
    category: 'bottoms', silhouette: 'aline', fit: '合体', season: 'SS 2025', collection: 'Denim',
    fabric: '丹宁布', colors: [C.sky, C.navy, C.black, C.ivory], sizes: ALL,
    measurements: { waist: 72, hip: 96, length: 38, opening: 106 },
    ease: { waist: 2, hip: 0 },
  },
  {
    id: 'dg-bt-010', code: 'DG-FW25-BT-010', name: '羊毛锥形裤', nameEn: 'Wool Tapered Trousers',
    category: 'bottoms', silhouette: 'straight', fit: '合体', season: 'FW 2025', collection: 'Tailoring',
    fabric: '精纺羊毛', colors: [C.camel, C.black, C.navy, C.chocolate], sizes: ALL,
    measurements: { waist: 74, hip: 98, length: 102, opening: 36 },
    ease: { waist: 4, hip: 2 },
  },
  {
    id: 'dg-bt-011', code: 'DG-SS25-BT-011', name: '蕾丝铅笔裙', nameEn: 'Lace Pencil Skirt',
    category: 'bottoms', silhouette: 'pencil', fit: '修身', season: 'SS 2025', collection: 'Lace',
    fabric: '弹力蕾丝', colors: [C.black, C.ivory, C.wine, C.nude], sizes: ALL,
    measurements: { waist: 70, hip: 94, length: 62, opening: 92 },
    ease: { waist: 0, hip: -2 },
  },
  {
    id: 'dg-bt-012', code: 'DG-SS25-BT-012', name: '系带沙滩短裤', nameEn: 'Tie Beach Shorts',
    category: 'bottoms', silhouette: 'wide', fit: '宽松', season: 'SS 2025', collection: 'Sicilia',
    fabric: '棉麻', colors: [C.ivory, C.sky, C.nude, C.olive], sizes: ALL,
    measurements: { waist: 74, hip: 100, length: 46, opening: 58 },
    ease: { waist: 4, hip: 4 },
  },

  /* ================= 外套 Outerwear ================= */
  {
    id: 'dg-ot-001', code: 'DG-FW25-OT-001', name: '经典西装外套', nameEn: 'Classic Blazer',
    category: 'outer', silhouette: 'blazer', fit: '合体', season: 'FW 2025', collection: 'Tailoring',
    fabric: '精纺羊毛', colors: [C.black, C.navy, C.camel, C.ivory], sizes: ALL,
    measurements: { bust: 96, waist: 88, shoulder: 42, sleeve: 60, length: 70 },
    ease: { bust: 6, waist: 6 },
  },
  {
    id: 'dg-ot-002', code: 'DG-FW25-OT-002', name: '双排扣风衣', nameEn: 'Double-Breasted Trench',
    category: 'outer', silhouette: 'trench', fit: '合体', season: 'FW 2025', collection: 'Tailoring',
    fabric: '防雨棉华达呢', colors: [C.camel, C.black, C.olive, C.navy], sizes: ALL,
    measurements: { bust: 100, waist: 94, shoulder: 43, sleeve: 61, length: 112 },
    ease: { bust: 10, waist: 10 },
  },
  {
    id: 'dg-ot-003', code: 'DG-FW25-OT-003', name: '机车皮夹克', nameEn: 'Biker Leather Jacket',
    category: 'outer', silhouette: 'biker', fit: '修身', season: 'FW 2025', collection: 'Biker',
    fabric: '小牛皮', colors: [C.black, C.chocolate, C.red], sizes: ALL,
    measurements: { bust: 92, waist: 84, shoulder: 41, sleeve: 60, length: 56 },
    ease: { bust: 2, waist: 2 },
  },
  {
    id: 'dg-ot-004', code: 'DG-FW25-OT-004', name: '廓形羊毛大衣', nameEn: 'Oversize Wool Coat',
    category: 'outer', silhouette: 'oversize', fit: '宽松', season: 'FW 2025', collection: 'Tailoring',
    fabric: '羊毛双面呢', colors: [C.camel, C.black, C.chocolate, C.olive], sizes: ALL,
    measurements: { bust: 114, waist: 110, shoulder: 47, sleeve: 61, length: 118 },
    ease: { bust: 24, waist: 22 },
  },
  {
    id: 'dg-ot-005', code: 'DG-SS25-OT-005', name: '短款针织开衫', nameEn: 'Cropped Knit Cardigan',
    category: 'outer', silhouette: 'knit', fit: '合体', season: 'SS 2025', collection: 'Knitwear',
    fabric: '棉线针织', colors: [C.ivory, C.black, C.powder, C.sky], sizes: ALL,
    measurements: { bust: 94, waist: 88, shoulder: 40, sleeve: 58, length: 50 },
    ease: { bust: 4, waist: 2 },
  },
  {
    id: 'dg-ot-006', code: 'DG-FW25-OT-006', name: '斗篷式披肩', nameEn: 'Cape Coat',
    category: 'outer', silhouette: 'cape', fit: '宽松', season: 'FW 2025', collection: 'Glamour',
    fabric: '羊毛绒', colors: [C.black, C.red, C.camel, C.gold], sizes: ALL,
    measurements: { bust: 110, waist: 108, shoulder: 44, sleeve: 0, length: 92 },
    ease: { bust: 20, waist: 20 },
  },
  {
    id: 'dg-ot-007', code: 'DG-SS25-OT-007', name: '蕾丝短夹克', nameEn: 'Lace Bolero Jacket',
    category: 'outer', silhouette: 'blazer', fit: '修身', season: 'SS 2025', collection: 'Lace',
    fabric: '蕾丝', colors: [C.black, C.ivory, C.wine], sizes: ALL,
    measurements: { bust: 90, waist: 84, shoulder: 39, sleeve: 56, length: 48 },
    ease: { bust: 0, waist: 0 },
  },
  {
    id: 'dg-ot-008', code: 'DG-FW25-OT-008', name: '印花丝绒外套', nameEn: 'Printed Velvet Jacket',
    category: 'outer', silhouette: 'blazer', fit: '合体', season: 'FW 2025', collection: 'Sicilia',
    fabric: '印花丝绒', colors: [C.leopard, C.emerald, C.wine, C.black], sizes: ALL,
    measurements: { bust: 98, waist: 90, shoulder: 42, sleeve: 60, length: 68 },
    ease: { bust: 8, waist: 6 },
  },
  {
    id: 'dg-ot-009', code: 'DG-SS25-OT-009', name: '牛仔短夹克', nameEn: 'Denim Jacket',
    category: 'outer', silhouette: 'biker', fit: '合体', season: 'SS 2025', collection: 'Denim',
    fabric: '丹宁布', colors: [C.sky, C.navy, C.black, C.ivory], sizes: ALL,
    measurements: { bust: 100, waist: 94, shoulder: 43, sleeve: 59, length: 58 },
    ease: { bust: 10, waist: 8 },
  },
  {
    id: 'dg-ot-010', code: 'DG-FW25-OT-010', name: '皮草感长外套', nameEn: 'Faux Fur Long Coat',
    category: 'outer', silhouette: 'oversize', fit: '宽松', season: 'FW 2025', collection: 'Glamour',
    fabric: '环保皮草', colors: [C.leopard, C.chocolate, C.ivory, C.black], sizes: ALL,
    measurements: { bust: 116, waist: 112, shoulder: 48, sleeve: 61, length: 106 },
    ease: { bust: 26, waist: 24 },
  },
];

/* 品牌清单：切换后所有列表、照片识别与合身诊断均按当前品牌过滤 */
export const BRANDS = [
  { id: 'DG', name: '杜嘉班纳', en: 'Dolce & Gabbana', short: 'DG' },
  { id: 'BL', name: '巴尔曼',   en: 'BALMAIN',        short: 'BL' },
];

DG_DB.forEach(g => { g.brand = 'DG'; });
const BALMAIN_DB = buildBalmainDB(PALETTE, ALL);
BALMAIN_DB.forEach(g => { g.brand = 'BL'; });

/** 全量数据库（按品牌切换使用） */
export const DB = [...DG_DB, ...BALMAIN_DB];

export const DB_BY_ID = {};
DB.forEach(g => { DB_BY_ID[g.id] = g; });

/* 根据版型推断所属槽位：连衣裙/上装/下装/外套 */
export function slotOf(item) {
  return item.category; // dresses / tops / bottoms / outer 直接对应槽位
}
