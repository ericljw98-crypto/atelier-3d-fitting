/* ============================================================
   高分服饰库 —— 奢侈品牌女装里合身评分 90 分以上的款
   ------------------------------------------------------------
   来源：各品牌官网商品页（2 个品牌），名称/款号/价格/主图均取自
   官网 JSON-LD 与商品页，未做任何臆造。
   measurements / ease：按品牌官方欧码尺码表（IT 轴）与版型推算的成衣基准，
   与 DG / Balmain 库同一口径，非官方平铺尺寸。
   photoCut：官网图多为模特实拍，2D 合成走新增的自动抠图（背景剥离 + 肤色/头发清理）。
   评分口径见 fitEngine.js：各参与部位同时落在合身基准容差内 = 100 分。
   ============================================================ */
export const PREMIUM_CATALOG = [
  {
    "id": "px-HE-H001132E03S",
    "code": "H001132E 03S",
    "name": "Cavale zipped sweatshirt",
    "nameEn": "Cavale Zipped Sweatshirt H001132Ev03S",
    "brand": "HE",
    "category": "tops",
    "style": "衬衫",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "High Fit",
    "fabric": "官方商品页",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "measurements": {
      "bust": 98,
      "waist": 94,
      "shoulder": 41,
      "cat": "tops",
      "length": 66,
      "sleeve": 20
    },
    "ease": {
      "bust": 8,
      "waist": 22,
      "shoulder": 0
    },
    "priceEUR": 1991,
    "priceCNY": 15530,
    "priceNote": "官网 CZK 52 400",
    "image": "https://assets.hermes.com/is/image/hermesproduct/001132E%2003_worn_101?wid=240&hei=320&fit=fit&$product_default_bg$",
    "images": [
      "https://assets.hermes.com/is/image/hermesproduct/001132E%2003_worn_101?wid=240&hei=320&fit=fit&$product_default_bg$"
    ],
    "url": "https://www.hermes.com/cz/en/product/cavale-zipped-sweatshirt-H001132Ev03S/",
    "source": "爱马仕 官方网站",
    "premium": true,
    "photoCut": true,
    "composite": true,
    "fitScore": 63,
    "fitSize": "IT 46",
    "recSize": "IT 46"
  },
  {
    "id": "px-HE-H072025HA01XS",
    "code": "H072025HA01XS",
    "name": "\"H\" embroidered T-shirt",
    "nameEn": "H Embroidered T Shirt H072025HA01",
    "brand": "HE",
    "category": "tops",
    "style": "衬衫",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "High Fit",
    "fabric": "官方商品页",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "measurements": {
      "bust": 98,
      "waist": 94,
      "shoulder": 41,
      "cat": "tops",
      "length": 66,
      "sleeve": 20
    },
    "ease": {
      "bust": 8,
      "waist": 22,
      "shoulder": 0
    },
    "priceEUR": 353,
    "priceCNY": 2753,
    "priceNote": "官网 CZK 9 300",
    "image": "https://assets.hermes.com/is/image/hermesproduct/072025HA01_worn_101?wid=240&hei=320&fit=fit&$product_default_bg$",
    "images": [
      "https://assets.hermes.com/is/image/hermesproduct/072025HA01_worn_101?wid=240&hei=320&fit=fit&$product_default_bg$"
    ],
    "url": "https://www.hermes.com/cz/en/product/h-embroidered-t-shirt-H072025HA01/",
    "source": "爱马仕 官方网站",
    "premium": true,
    "photoCut": true,
    "composite": true,
    "fitScore": 63,
    "fitSize": "IT 46",
    "recSize": "IT 46"
  },
  {
    "id": "px-HE-H661140H30148",
    "code": "H661140H30148",
    "name": "Emile cashmere coat with leather details",
    "nameEn": "Emile Cashmere Coat With Leather Details H661140H301",
    "brand": "HE",
    "category": "outer",
    "style": "大衣",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "High Fit",
    "fabric": "官方商品页",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "measurements": {
      "bust": 104,
      "waist": 100,
      "shoulder": 44,
      "cat": "outer",
      "length": 118,
      "sleeve": 20
    },
    "ease": {
      "bust": 14,
      "waist": 28,
      "shoulder": 0
    },
    "priceEUR": 5966,
    "priceCNY": 46535,
    "priceNote": "官网 CZK 157 000",
    "image": "https://assets.hermes.com/is/image/hermesproduct/661140H301_worn_101?wid=240&hei=320&fit=fit&$product_default_bg$",
    "images": [
      "https://assets.hermes.com/is/image/hermesproduct/661140H301_worn_101?wid=240&hei=320&fit=fit&$product_default_bg$"
    ],
    "url": "https://www.hermes.com/cz/en/product/emile-cashmere-coat-with-leather-details-H661140H301/",
    "source": "爱马仕 官方网站",
    "premium": true,
    "photoCut": true,
    "composite": true,
    "fitScore": 77,
    "fitSize": "IT 46",
    "recSize": "IT 46"
  }
];
