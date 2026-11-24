/* ============================================================
   官方女装尺码表 —— 数值逐字照抄品牌公开尺码指南，不做推算或平移
   ------------------------------------------------------------
   DG 采用意大利码 IT，Balmain 采用法国码 FR。两套数字含义不同：
   同一个「38」，在 DG 是 IT38（胸 83cm），在 Balmain 是 FR38=M（对应 IT42）。
   因此不能混用一张表。

   数据来源：
   · Dolce & Gabbana Women's Clothing Size (IT)
     sendegaro.com / sizechart.uk 收录的 DG 官方尺码指南
   · Balmain Sizes 对照表（FR / IT / UK / DE / US / JP / KR）
     balmain.com/fr-fr 商品页 Size Guide（2026-11-24 核对）
     Balmain 官方尺码弹窗只给国际码对照，不公开任何一档的胸/腰/臀净体围度；
     因此本库不把 IT 围度冒充成 Balmain 官方实测，只在换算档位上沿用 IT 官方表
     作为等档参照，并在 UI/注释中明确标注。

   body 字段为该码对应的「人体净体尺寸」，单位 cm。
   ============================================================ */

/* DG 官方女装 IT 码 —— BUST / WAIST / HIP 为官方原值 */
export const DG_CHART = [
  { code: 'IT 38', num: 38, letter: 'XS',  bust: 83,  waist: 65,  hip: 91  },
  { code: 'IT 40', num: 40, letter: 'S',   bust: 86,  waist: 68,  hip: 94  },
  { code: 'IT 42', num: 42, letter: 'M',   bust: 90,  waist: 72,  hip: 98  },
  { code: 'IT 44', num: 44, letter: 'L',   bust: 94,  waist: 76,  hip: 102 },
  { code: 'IT 46', num: 46, letter: 'XL',  bust: 98,  waist: 80,  hip: 106 },
  { code: 'IT 48', num: 48, letter: 'XXL', bust: 102, waist: 84,  hip: 110 },
  { code: 'IT 50', num: 50, letter: '3XL', bust: 106, waist: 88,  hip: 114 },
  { code: 'IT 52', num: 52, letter: '4XL', bust: 111, waist: 94,  hip: 118 },
  { code: 'IT 54', num: 54, letter: '5XL', bust: 116, waist: 100, hip: 124 },
];

/* Balmain 官方字母码↔FR/IT 对照（官方原表，逐字照抄） */
export const BALMAIN_CONVERSION = [
  { letter: 'XS',  fr: 34, it: 38, uk: 6,  de: 32, us: 2,  jp: 7,  kr: 55 },
  { letter: 'S',   fr: 36, it: 40, uk: 8,  de: 34, us: 4,  jp: 9,  kr: 55 },
  { letter: 'M',   fr: 38, it: 42, uk: 10, de: 36, us: 6,  jp: 11, kr: 66 },
  { letter: 'L',   fr: 40, it: 44, uk: 12, de: 38, us: 8,  jp: 13, kr: 66 },
  { letter: 'XL',  fr: 42, it: 46, uk: 14, de: 40, us: 10, jp: 15, kr: 77 },
  { letter: '2XL', fr: 44, it: 48, uk: 16, de: 42, us: 12, jp: 17, kr: 77 },
  { letter: '3XL', fr: 46, it: 50, uk: 18, de: 44, us: 14, jp: 19, kr: 88 },
  { letter: '4XL', fr: 48, it: 52, uk: 20, de: 46, us: 16, jp: 21, kr: 88 },
  { letter: '5XL', fr: 50, it: 54, uk: 22, de: 48, us: 18, jp: 23, kr: 99 },
];

/* Balmain 净体围度：官方不公开，不能标成「官方实测」。
   这里只按官方 FR↔IT 对照取同档 IT 围度作为换算参照，供推码与诊断使用；
   每个档位都标记 official:false，避免把推算值当成品牌数据。 */
export const BALMAIN_CHART = BALMAIN_CONVERSION.map(row => {
  const it = DG_CHART.find(r => r.num === row.it) || DG_CHART[0];
  return {
    code: 'FR ' + row.fr,
    num: row.fr,
    letter: row.letter,
    it: row.it,
    bust: it.bust, waist: it.waist, hip: it.hip,
    official: false,
  };
});

export function chartForBrand(brandId) {
  return brandId === 'BL' ? BALMAIN_CHART : DG_CHART;
}
