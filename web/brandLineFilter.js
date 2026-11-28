/* Polo Ralph Lauren 产品线规则：只保留 Collection 与 Purple Label（紫标）。
   平台不会单独标注产品线时才按名称/系列字段判断；未明确属于这两条线的
   Polo Ralph Lauren 商品一律删除，不进入试穿库、折扣页或盯价清单。 */
const PRL = /polo[\s-]*ralph[\s-]*lauren|ralph[\s-]*lauren|\bPRL\b/i;
const PRL_PREMIUM = /purple[\s-]*label|紫标|collection|колекці|коллекц/i;

export function isAllowedLine(it) {
  if (!it) return true;
  const text = [it.brand, it.brandLabel, it.name, it.nameEn, it.url, it.collection,
    it.categoryRaw, it.style, it.kind].filter(Boolean).join(' ');
  return !PRL.test(text) || PRL_PREMIUM.test(text);
}
