/* 鞋履统一判定：男女鞋、靴、运动鞋、凉鞋、乐福鞋等一律不入库。
   平台有时把鞋放进「配件」或「男装」而非独立鞋履类，因此同时看
   中文品类、商品名和详情 URL；只匹配鞋类本身，避免误伤鞋带、鞋油等配件。 */
const SHOE_LATIN = /\b(shoes?|sneakers?|trainers?|sandals?|boots?|booties|loafers?|pumps?|heels?|slippers?|moccasins?|oxfords?|derbies|espadrilles?|wedges?|footwear)\b/i;
const SHOE_LOCAL = /鞋履|鞋子|运动鞋|皮鞋|乐福鞋|凉鞋|靴子|短靴|长靴|童鞋|кроссівк|кед(и|ів)|чобот|ботильйон|лофер|туфл|сандал|мокасин|взутт/i;

export function isShoe(it) {
  if (!it) return false;
  const fields = [it.name, it.nameEn, it.url, it.categoryRaw, it.style, it.kind, it.category];
  const text = fields.filter(Boolean).join(' ');
  return SHOE_LATIN.test(text) || SHOE_LOCAL.test(text);
}
