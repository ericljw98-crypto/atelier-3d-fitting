import { buildRealDB } from './realDB.js';
import { DG_CATALOG } from './dgCatalog.js';
import { EXTRA_CATALOG } from './extraCatalog.js';

/* ============================================================
   ATELIER · 杜嘉班纳（Dolce & Gabbana）女装参数数据库
   ------------------------------------------------------------
   数据说明：
   - measurements 为成衣尺寸，单位 cm，基准尺码 IT 42（DG 官方 M 码）。
   - ease 为对应部位的放松量（成衣尺寸 − 人体净体尺寸），单位 cm。
   - silhouette 决定程序化 3D 版型构建方式。
   - 款号为演示编码，非官方商品编号；本库为可扩充的教学演示数据。
   ============================================================ */

export const DB_META = {
  brand: 'Dolce & Gabbana',
  brandZh: '杜嘉班纳',
  version: '1.2.0',
  basisSize: 'IT 42',
  unit: 'cm',
  note: '尺码数值采用 Dolce & Gabbana 官方 IT 女装表（IT 38–50 / XS–3XL）；Balmain 按官方 FR↔IT 对照显示法码。款号为演示编码。',
};

/* 女装尺码表 —— 数值逐字照抄 DOLCE & GABBANA 官方 Women's Clothing Size (IT)
   来源：sendegaro.com / sizechart.uk 收录的 DG 官方尺码指南。
   DG 用意大利码 IT；Balmain 用法国码 FR，两者的数字不能直接混用。
   本表内部用统一档位键 IT 38…50，UI 按当前品牌显示各自的官方码名。
   bust/waist/hip 为官方人体净体尺寸（cm），未做任何推算或平移。 */
export const SIZE_CHART = {
  'IT 38': { bust: 83,  waist: 65,  hip: 91,  height: [158, 172], label: 'XS'  },
  'IT 40': { bust: 86,  waist: 68,  hip: 94,  height: [158, 172], label: 'S'   },
  'IT 42': { bust: 90,  waist: 72,  hip: 98,  height: [160, 174], label: 'M'   },
  'IT 44': { bust: 94,  waist: 76,  hip: 102, height: [160, 174], label: 'L'   },
  'IT 46': { bust: 98,  waist: 80,  hip: 106, height: [162, 176], label: 'XL'  },
  'IT 48': { bust: 102, waist: 84,  hip: 110, height: [162, 176], label: 'XXL' },
  'IT 50': { bust: 106, waist: 88,  hip: 114, height: [162, 176], label: '3XL' },
};
export const SIZES = Object.keys(SIZE_CHART);

/* ---------------- 尺码的两种写法 ----------------
   DG 女装以意大利码 IT 标注，并与国际字母码 XS–3XL 一一对应；
   官方表里的 XXS 与 4XL 及以上已移除：本应用只面向固定档案的成年模特，
   那些档位不会有合身结果，留着只会让推荐区间失真。
   Balmain 用法国码 FR，两者按官方对照表换算，不是同一套数字。
   必须按表查，不能按序号推。

   用户输入需要容错：'42' / 'it42' / 'IT 42' / 'M' / 'm' / '3XL' / 'XXXL'
   都应被识别；数字落在两档之间时（如 39）就近取档并回告。
   带数字的字母码（3XL…）不能把数字抹掉，否则会和小码 XL 冲突。 */
const LABEL_TO_SIZE = (() => {
  const m = {}, alias = {};
  SIZES.forEach(k => {
    const lab = String(SIZE_CHART[k].label || '').toUpperCase();
    const plain = lab.replace(/[^A-Z]/g, '');          // '3XL' -> 'XL'（别名用）
    if (lab) m[lab] = k;                               // '3XL' 主键
    if (plain && plain !== lab) alias[plain] = k;      // 'XL' 仅在没有正牌 XL 时兜底
    const digit = lab.match(/^(\d+)X+L$/);
    // '3XL' 的等价写法就是 'XXXL'（数字即 X 的个数）
    if (digit) m['X'.repeat(Number(digit[1])) + 'L'] = k;
    const flat = k.replace(/\s+/g, '');
    m[flat] = k;                       // 'IT42'
    m[flat.replace(/^IT/, '')] = k;    // '42'
  });
  // 只有 SIZE_CHART 里确实没有某个纯字母码时，才用去数字别名兜底
  Object.keys(alias).forEach(a => { if (!m[a]) m[a] = alias[a]; });
  return m;
})();

/** 标准尺码键 -> 字母码（IT 42 -> M） */
export function sizeLetter(size) {
  const row = SIZE_CHART[size];
  return row ? row.label : '';
}

/** 标准尺码键 -> 数字（IT 42 -> 42） */
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

  // 数字码：允许 '42' / 'IT42' / '42.0'
  const num = s.replace(/^IT/, '').replace(/^EU/, '');
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

  // 字母码：先原样查（'3XL'），再去分隔符与数字别名（'XXXL' / 'XL'）
  if (LABEL_TO_SIZE[s]) {
    return { size: LABEL_TO_SIZE[s], snapped: false, raw: String(raw) };
  }
  const key = s.replace(/[^A-Z0-9]/g, '');
  if (LABEL_TO_SIZE[key]) {
    return { size: LABEL_TO_SIZE[key], snapped: false, raw: String(raw) };
  }
  const lettersOnly = s.replace(/[^A-Z]/g, '');
  if (LABEL_TO_SIZE[lettersOnly]) {
    return { size: LABEL_TO_SIZE[lettersOnly], snapped: false, raw: String(raw) };
  }
  // 常见简写：ML 之外再兜一层 M-L、Medium 之类
  if (key === 'MEDIUM') return { size: 'IT 42', snapped: false, raw: String(raw) };
  if (key === 'SMALL') return { size: 'IT 40', snapped: false, raw: String(raw) };
  if (key === 'LARGE') return { size: 'IT 44', snapped: false, raw: String(raw) };
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
];

/* 往季款（vintage）：官网当前目录已下架、但仍可购买的旧季单品。
   单独做成一个品牌页，不新增试衣槽位——这些款的 category 仍是
   dresses/tops/bottoms/outer 之一，合身诊断与 2D 合成照常工作。
   vintage: true 的款在当前品牌页不显示，只在「往季」页出现。 */
export const VINTAGE_BRAND = {
  id: 'VT', name: '往季精选', en: 'Vintage', short: 'VINTAGE',
  isVintage: true,
};

/* 非服装类商品（包袋、香水、眼镜、鞋履等）不可上身试穿，
   混在成衣列表里只会给出错误的合身诊断，一律不入库。
   判定看英文名里的核心名词，避免把 "belted trench" 一类误杀。 */
const NON_APPAREL = /\b(handbag|bag|tote|clutch|pouch|backpack|wallet|card holder|belt bag|perfume|parfum|eau de|fragrance|candle|sunglasses|eyewear|eyeglasses|sneakers?|sandals?|boots?|loafers?|pumps?|heels?|necklace|earrings?|bracelet|ring|watch|scarf|shawl|gloves?|tights|socks?)\b/i;

const isWearable = it =>
  ['dresses', 'tops', 'bottoms', 'outer'].includes(it.category) &&
  !NON_APPAREL.test(it.nameEn || '') &&
  !NON_APPAREL.test(it.name || '');

/** 全量数据库：只保留官方在售款。
    · CC0 非卖展示款、历史停产档案款均已移除：档案款没有官方商品图，
      2D 无法合成、价格也是估算，混进列表只会给出错误的参考。
    · 无图片的商品一律不入库（2D 主视图依赖商品图，纯色兜底已禁止）。 */
/* 款式（style）：官网官方品类的中文子类，供筛选下拉使用。
   DG 目录抓取时已带官方品类；Balmain 早期条目没有，按名称归一补齐，
   保证两个品牌的下拉筛选口径一致。 */
const STYLE_FROM_NAME = [
  [/连衣裙|长袍/, '连衣裙'],
  [/晚礼服|礼服/, '晚礼服'],
  [/半裙|短裙/, '半身裙'],
  [/长裤|阔腿|紧身裤/, '长裤'],
  [/短裤/, '短裤'],
  [/牛仔/, '牛仔'],
  [/大衣|风衣/, '大衣'],
  [/夹克|外套|西装/, '夹克'],
  [/斗篷/, '斗篷'],
  [/衬衫/, '衬衫'],
  [/开衫/, '开衫'],
  [/针织衫|套头|毛衣/, '针织衫'],
  [/T恤|Polo/, 'T恤'],
  [/背心|马甲/, '背心'],
  [/吊带|抹胸/, '吊带'],
  [/泳/, '泳装'],
  [/内衣|文胸/, '内衣'],
];
function inferStyle(it) {
  if (it.style) return it.style;
  const n = `${it.name || ''} ${it.nameEn || ''}`;
  for (const [re, s] of STYLE_FROM_NAME) if (re.test(n)) return s;
  return null;
}

const mergeById = (...lists) => {
  const m = new Map();
  lists.forEach(l => l.forEach(it => { if (!m.has(it.id)) m.set(it.id, it); }));
  return [...m.values()];
};

export const DB = mergeById(
  buildRealDB(PALETTE, ALL),
  DG_CATALOG.map(it => ({
    ...it,
    nameEn: it.nameEn || it.name,
    colors: [{ name: it.colorName, hex: it.colorHex }],
    sizes: ALL,
  })),
  EXTRA_CATALOG.map(it => ({
    ...it,
    nameEn: it.nameEn || it.name,
    colors: [{ name: it.colorName, hex: it.colorHex }],
    sizes: ALL,
  })),
)
  .filter(isWearable)
  .filter(it => !!(it.image && it.image.trim()))
  .map(it => ({ ...it, style: inferStyle(it) }));

export const DB_BY_ID = {};
DB.forEach(g => { DB_BY_ID[g.id] = g; });

/* 根据版型推断所属槽位：连衣裙/上装/下装/外套 */
export function slotOf(item) {
  return item.category; // dresses / tops / bottoms / outer 直接对应槽位
}
