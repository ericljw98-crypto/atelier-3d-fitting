/* ============================================================
   奢侈品牌「高分服饰」页 —— 品牌定义与合身测量基准
   ------------------------------------------------------------
   用户要求：把 LV、爱马仕、迪奥、Gucci、Prada、Burberry、Valentino、
   Versace、Givenchy、Saint Laurent，再加 Chanel、Fendi、Zegna、Loewe、
   Bottega Veneta 的女装列表全部筛一遍，把合身评分 80 分以上的收进来，
   单独放一个「高分服饰」页。

   尺码口径：这些品牌全部落在欧码体系（IT/FR/数字码），人体围度
   与 DG 官方 IT 表同一套欧码基准，因此本模块统一用 IT 轴存数据，
   显示时按各品牌官方码名换算（FR38=IT42 是法国码通行对照）。
   版型基准：measurements 为「按品牌官方尺码表 + 版型推算的成衣基准」，
   与 DG / Balmain 库同一口径（非官方平铺尺寸），文件里逐条注明。

   为什么高分款集中在直筒剪裁：这个身形胸腰差 9.5cm，
   而收腰剪裁的成衣胸腰差普遍 18–22cm，两者永远对不上；
   直筒/箱型/针织垂坠的成衣胸腰差只有 4–10cm，才是真正合身的款。
   ============================================================ */

/* 品牌 → 官方码名体系 */
import { DOMINO_BRANDS } from './dominoBrands.js';

export const PREMIUM_BRANDS = [
  { id: 'CH', name: '香奈儿',   en: 'Chanel',          short: 'CH', scheme: 'fr' },
  { id: 'DI', name: '迪奥',     en: 'Dior',            short: 'DI', scheme: 'fr' },
  { id: 'GI', name: '纪梵希',   en: 'Givenchy',        short: 'GI', scheme: 'fr' },
  { id: 'YS', name: '圣罗兰',   en: 'Saint Laurent',   short: 'YS', scheme: 'fr' },
  { id: 'GU', name: '古驰',     en: 'Gucci',           short: 'GU', scheme: 'it' },
  { id: 'PR', name: '普拉达',   en: 'Prada',           short: 'PR', scheme: 'it' },
  { id: 'LV', name: '路易威登', en: 'Louis Vuitton',  short: 'LV', scheme: 'it' },
  { id: 'BU', name: '博柏利',   en: 'Burberry',        short: 'BU', scheme: 'it' },
  { id: 'VA', name: '华伦天奴', en: 'Valentino',       short: 'VA', scheme: 'it' },
  { id: 'VS', name: '范思哲',   en: 'Versace',         short: 'VS', scheme: 'it' },
  { id: 'FE', name: '芬迪',     en: 'Fendi',           short: 'FE', scheme: 'it' },
  { id: 'ZE', name: '杰尼亚',   en: 'Zegna',           short: 'ZE', scheme: 'it' },
  { id: 'MC', name: '盟可睐',   en: 'Moncler',         short: 'MC', scheme: 'it' },
  { id: 'AR', name: '阿玛尼',   en: 'Armani',          short: 'AR', scheme: 'it' },
  /* 意大利一奢/高奢/顶奢补充（Symbol 女装在售，2026 黑五扩充） */
  { id: 'BC', name: '布鲁内洛·库奇内利', en: 'Brunello Cucinelli', short: 'BC', scheme: 'it' },
  { id: 'LP', name: '诺悠翩雅',   en: 'Loro Piana',      short: 'LP', scheme: 'it' },
  { id: 'ES', name: '艾尔曼诺·谢尔维诺', en: 'Ermanno Scervino', short: 'ES', scheme: 'it' },
  { id: 'PE', name: '佩塞里科',   en: 'Peserico',        short: 'PE', scheme: 'it' },
  { id: 'ET', name: '艾特罗',     en: 'Etro',            short: 'ET', scheme: 'it' },
  { id: 'MI', name: '米索尼',     en: 'Missoni',         short: 'MI', scheme: 'it' },
  { id: 'JS', name: '吉尔·桑达',  en: 'Jil Sander',      short: 'JS', scheme: 'it' },
  { id: 'MM', name: '麦丝玛拉',   en: 'Max Mara',        short: 'MM', scheme: 'it' },
  { id: 'MO', name: 'Moorer',     en: 'Moorer',          short: 'MO', scheme: 'it' },
  { id: 'WO', name: '伍尔里奇',   en: 'Woolrich',        short: 'WO', scheme: 'it' },
  { id: 'TS', name: 'Twin Set',   en: 'Twin Set',        short: 'TS', scheme: 'it' },
  { id: 'DO', name: 'Dondup',     en: 'Dondup',          short: 'DO', scheme: 'it' },
  { id: 'GT', name: 'Giuliana Teso', en: 'Giuliana Teso', short: 'GT', scheme: 'it' },
  { id: 'RI', name: 'Rindi',       en: 'Rindi',           short: 'RI', scheme: 'it' },
  /* 二次盘点补入的意大利一奢/高奢/顶奢，Off-White 已按用户要求移除。 */
  { id: 'BF', name: 'Be Florence', en: 'Be Florence',   short: 'BF', scheme: 'it' },
  { id: 'CO', name: 'Colombo',     en: 'COLOMBO',       short: 'CO', scheme: 'it' },
  { id: 'DC', name: 'Del Core',    en: 'Del Core',      short: 'DC', scheme: 'it' },
  { id: 'EM', name: 'Enrico Mandelli', en: 'Enrico Mandelli', short: 'EM', scheme: 'it' },
  { id: 'FM', name: 'Florence Mode', en: 'Florence Mode', short: 'FM', scheme: 'it' },
  { id: 'GM', name: 'Giuseppe Di Morabito', en: 'Giuseppe Di Morabito Milano', short: 'GM', scheme: 'it' },
  { id: 'HN', name: 'Herno',       en: 'Herno',         short: 'HN', scheme: 'it' },
  { id: 'KT', name: 'Kiton',       en: 'Kiton',         short: 'KT', scheme: 'it' },
  { id: 'DJ', name: 'La DoubleJ',  en: 'La DoubleJ',    short: 'DJ', scheme: 'it' },
  { id: 'MN', name: 'Marni',       en: 'Marni',         short: 'MN', scheme: 'it' },
  { id: 'MS', name: 'Masnada',     en: 'Masnada',       short: 'MS', scheme: 'it' },
  { id: 'PL', name: 'Philosophy di Lorenzo Serafini', en: 'Philosophy di Lorenzo Serafini', short: 'PL', scheme: 'it' },
  { id: 'RC', name: 'Roberto Cavalli', en: 'Roberto Cavalli', short: 'RC', scheme: 'it' },
  { id: 'SR', name: 'Simonetta Ravizza', en: 'Simonetta Ravizza', short: 'SR', scheme: 'it' },
  { id: 'SX', name: 'Sportmax',    en: 'Max Mara Sportmax', short: 'SX', scheme: 'it' },
  { id: 'WM', name: 'Weekend Max Mara', en: 'Max Mara Weekend', short: 'WM', scheme: 'it' },
  { id: 'LO', name: '罗意威',   en: 'Loewe',           short: 'LO', scheme: 'it' },
  { id: 'BV', name: '葆蝶家',   en: 'Bottega Veneta',  short: 'BV', scheme: 'it' },
  { id: 'HE', name: '爱马仕',   en: 'Hermès',          short: 'HE', scheme: 'hermes' },
  ...DOMINO_BRANDS,
];

/* 两个高分页：
   HIGH EU —— 品牌官网直采的杜嘉班纳、巴尔曼，以及各奢侈品牌当季
              高分款（category 为 dresses/tops/bottoms/outer，非平台货）；
   HIGH UA —— symbol / domino / kameron / oneclub 四个乌克兰平台
              在售的女装高分款，逐款标注平台与品牌。
   两页共用同一套 fitEngine 评分，只是来源不同。 */
export const EU_TAB = {
  id: 'EU', name: '欧洲官网高分服饰', en: 'High Fit EU', short: 'HIGH EU', isEu: true,
};
export const PREMIUM_TAB = {
  id: 'HI', name: '乌克兰平台高分服饰', en: 'High Fit UA', short: 'HIGH UA', isPremium: true,
};

/* IT 轴 → 各品牌官方码名 */
const FR_OF_IT = { 38: 34, 40: 36, 42: 38, 44: 40, 46: 42, 48: 44, 50: 46, 52: 48, 54: 50 };
const HERMES_OF_IT = { 38: 34, 40: 35, 42: 36, 44: 37, 46: 38, 48: 39, 50: 40, 52: 42, 54: 44 };
export function premiumSizeLabel(brandId, itNum) {
  const b = PREMIUM_BRANDS.find(x => x.id === brandId);
  const scheme = b ? b.scheme : 'it';
  if (scheme === 'fr') return 'FR ' + (FR_OF_IT[itNum] || itNum);
  if (scheme === 'hermes') return String(HERMES_OF_IT[itNum] || itNum);
  return 'IT ' + itNum;
}

/* ============================================================
   成衣测量基准（IT 42 基准码上的平铺尺寸，cm）
   ------------------------------------------------------------
   按品牌常见剪裁给出成衣平铺围度：身体 IT42 = 胸 90 / 腰 72 / 臀 98。
   直筒、箱型、针织的成衣胸腰差小（4–10cm），收腰剪裁的大（18–22cm）。
   这些是「按版型推算的基准」，不是官方平铺尺寸，文件与注释里都写明。
   ============================================================ */
export const CUT_BASES = {
  // 上装类：bust / waist / shoulder
  shift_top:    { bust: 98, waist: 94, shoulder: 41 , cat: 'tops', hang: true},   // 直筒衬衫/罩衫
  boxy_top:     { bust: 106, waist: 102, shoulder: 44 , cat: 'tops', hang: true},  // 箱型廓形上衣
  knit_top:     { bust: 96, waist: 92, shoulder: 41 , cat: 'tops', hang: true},    // 针织衫/开衫
  fitted_top:   { bust: 90, waist: 72, shoulder: 38 , cat: 'tops'},    // 修身衬衫
  silk_top:     { bust: 92, waist: 88, shoulder: 39 , cat: 'tops', hang: true},    // 真丝缎面上衣
  // 连衣裙类：bust / waist / hip / shoulder
  shift_dress:  { bust: 98, waist: 94, hip: 102, shoulder: 41 , cat: 'dresses', hang: true},
  boxy_dress:   { bust: 106, waist: 102, hip: 110, shoulder: 44 , cat: 'dresses', hang: true},
  knit_dress:   { bust: 96, waist: 92, hip: 102, shoulder: 41 , cat: 'dresses', hang: true},
  aline_dress:  { bust: 92, waist: 86, hip: 106, shoulder: 40 , cat: 'dresses'},
  fitted_dress: { bust: 88, waist: 68, hip: 94, shoulder: 38 , cat: 'dresses'},
  silk_dress:   { bust: 92, waist: 86, hip: 100, shoulder: 39 , cat: 'dresses', hang: true},
  // 外套类：bust / waist / shoulder
  straight_coat:{ bust: 104, waist: 100, shoulder: 44 , cat: 'outer'},
  belted_coat:  { bust: 100, waist: 84, shoulder: 43 , cat: 'outer'},
  blazer:       { bust: 98, waist: 90, shoulder: 42 , cat: 'outer'},
  // 下装类：waist / hip
  straight_trouser: { waist: 76, hip: 100 , cat: 'bottoms'},
  wide_trouser:     { waist: 78, hip: 106 , cat: 'bottoms'},
  aline_skirt:      { waist: 74, hip: 104 , cat: 'bottoms'},
  pencil_skirt:     { waist: 72, hip: 94 , cat: 'bottoms'},
  denim:            { waist: 74, hip: 96 , cat: 'bottoms'},
};

/* 名称关键词 → 版型基准（英文名为主，中文名兜底） */
export function cutBaseFor(nameEn, name, category) {
  const t = ((nameEn || '') + ' ' + (name || '')).toLowerCase();
  const has = (...ws) => ws.some(w => t.includes(w));
  if (category === 'bottoms') {
    if (has('wide-leg', 'wide leg', 'palazzo', 'flare', 'flared')) return CUT_BASES.wide_trouser;
    if (has('skirt')) return has('pencil', 'straight') ? CUT_BASES.pencil_skirt : CUT_BASES.aline_skirt;
    if (has('jean', 'denim')) return CUT_BASES.denim;
    return CUT_BASES.straight_trouser;
  }
  if (category === 'outer') {
    if (has('trench')) return CUT_BASES.belted_coat;
    if (has('blazer', 'jacket', 'suit')) return CUT_BASES.blazer;
    return CUT_BASES.straight_coat;
  }
  if (category === 'tops') {
    if (has('knit', 'cardigan', 'jumper', 'sweater')) return CUT_BASES.knit_top;
    if (has('silk', 'satin', 'silk')) return CUT_BASES.silk_top;
    if (has('oversize', 'boxy', 'relaxed', 'loose')) return CUT_BASES.boxy_top;
    if (has('shirt', 'blouse', 'poplin', 'cotton', 't-shirt', 'tee')) return CUT_BASES.shift_top;
    return CUT_BASES.fitted_top;
  }
  // dresses
  if (has('knit', 'jumper', 'sweater')) return CUT_BASES.knit_dress;
  if (has('silk', 'satin', 'slip', 'bias')) return CUT_BASES.silk_dress;
  if (has('shift', 'straight', 'tunic', 'chemise')) return CUT_BASES.shift_dress;
  if (has('oversize', 'boxy', 'relaxed', 'loose')) return CUT_BASES.boxy_dress;
  if (has('a-line', 'aline', 'fit and flare')) return CUT_BASES.aline_dress;
  if (has('dress', 'gown')) return CUT_BASES.fitted_dress;
  return CUT_BASES.shift_dress;
}

/* 设计放松量（成衣 − 净体），用于合身基准线 */
export function premiumEase(base, category) {
  const body = { bust: 90, waist: 72, hip: 98 };   // IT42 人体净体
  const e = {};
  if (base.bust != null) e.bust = +(base.bust - body.bust).toFixed(1);
  if (base.waist != null) e.waist = +(base.waist - body.waist).toFixed(1);
  if (base.hip != null) e.hip = +(base.hip - body.hip).toFixed(1);
  if (base.shoulder != null) e.shoulder = 0;
  return e;
}
