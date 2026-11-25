/* ============================================================
   高分服饰库 —— 奢侈品牌女装里合身评分 90 分以上的款
   ------------------------------------------------------------
   来源：symbol.ua / domino.ua 两个乌克兰多品牌奢侈品电商的女装专区。
   商品名、款号、平台价、尺码范围、商品图全部取自平台页面；
   乌克兰语商品名已逐词译成中文与英文，未做臆造。

   合身判据（platformFit.js）：用的是平台上**真实在售的尺码范围**，
   而不是反推的成衣尺寸。链条：
     ① 平台尺码栏 → 该款真正能买到的码（字母码按欧码字母序列落 IT 轴，
        该序列由 Balmain 官方 FR↔IT 对照表与 DG 官方 IT 表字母列共同印证）
     ② 该码官方净体围度 → DG 官方 IT 表原值
     ③ 模特围度 → 用户实测档案（胸 94.5 / 腰 85 / 臀 99）
   成衣围度 = 该码官方净体围度 + 该版型设计余量；
   偏差 = 该码官方净体围度 − 模特围度（尺码档误差，设计余量只放宽容差）。
   下装按臀围、外套按胸围定码；腰围在这套码表下与该身形无对应档位
   （胸臀落 IT42–44、腰要 IT50），只作文字提示，不计入分数。

   图片：白底商品图，已下载到本地（与页面同源，不污染画布，
   2D 抠底与合成可用）。symbol 的图为 288×356 缩略规格。
   ============================================================ */
export const PREMIUM_CATALOG = [
  {
    "id": "ua-GU-a-gucci-409370-krasnyj-y2qouh",
    "code": "z-selka-gucci-409370-krasnyj",
    "name": "半裙真丝",
    "nameEn": "skirt silk",
    "brand": "GU",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 682,
    "priceCNY": 5320,
    "priceNote": "平台价 33 079 грн（原价 66 156 грн，约 €682）",
    "image": "images/ua_GU_GU-a-gucci-409370-krasnyj-.jpg",
    "images": [
      "images/ua_GU_GU-a-gucci-409370-krasnyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/a7/2e/a72e1c063dc4e670ed6cb6bf100ab3f7/dbb98e77-29ec-42e1-83d8-54a01634abf5.jpg",
    "url": "https://symbol.ua/uk/store/ubka-iz-selka-gucci-409370-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-GU-sse-gucci-490353-sinij-15e93d",
    "code": "ka-plisse-gucci-490353-sinij",
    "name": "半裙百褶",
    "nameEn": "skirt pleated",
    "brand": "GU",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 739,
    "priceCNY": 5764,
    "priceNote": "平台价 35 856 грн（原价 71 710 грн，约 €739）",
    "image": "images/ua_GU_GU-sse-gucci-490353-sinij-.jpg",
    "images": [
      "images/ua_GU_GU-sse-gucci-490353-sinij-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/43/2d/432dfb66367cb8eea8f487fe1057c41d/783290c1-ea51-419b-9037-b1044c6dda32.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-ubka-plisse-gucci-490353-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-GU-bka-gucci-354354-belyj-jdx3r9",
    "code": "elaa-ubka-gucci-354354-belyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "GU",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 294,
    "priceCNY": 2293,
    "priceNote": "平台价 14 242 грн（原价 28 433 грн，约 €294）",
    "image": "images/ua_GU_GU-bka-gucci-354354-belyj-.jpg",
    "images": [
      "images/ua_GU_GU-bka-gucci-354354-belyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/56/6d/566d29dd51a15aca5f0bd273a1bf0bcb/d84c8127-4e88-42d7-8347-64b172a70d31.jpg",
    "url": "https://symbol.ua/uk/store/belaa-ubka-gucci-354354-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-GU-u-gucci-448852-zelenyj-10c7u7",
    "code": "s-brosu-gucci-448852-zelenyj",
    "name": "带胸针连衣裙亚麻",
    "nameEn": "with brooch dress linen",
    "brand": "GU",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "蕾丝 lace",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 1990,
    "priceCNY": 15522,
    "priceNote": "平台价 96 507 грн（原价 193 012 грн，约 €1990）",
    "image": "images/ua_GU_GU-u-gucci-448852-zelenyj-.jpg",
    "images": [
      "images/ua_GU_GU-u-gucci-448852-zelenyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/06/5b/065b316db6deff80f04df01f218dac1b/e8745d30-9a5d-4e42-8b50-22bb2712f533.jpg",
    "url": "https://symbol.ua/uk/store/zelenoe-plate-iz-kruzeva-s-brosu-gucci-448852-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-GU-ucci-264366-koricnevyj-2dpcbw",
    "code": "tona-gucci-264366-koricnevyj",
    "name": "鳄鱼皮长裤",
    "nameEn": "python leather trousers",
    "brand": "GU",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 1562,
    "priceCNY": 12184,
    "priceNote": "平台价 75 750 грн（原价 151 500 грн，约 €1562）",
    "image": "images/ua_GU_GU-ucci-264366-koricnevyj-.jpg",
    "images": [
      "images/ua_GU_GU-ucci-264366-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/41/98/4198acfc0d4ef4e52b467dc637857dfe/88b782dd-332f-42ae-9924-7381bb00692c.jpg",
    "url": "https://symbol.ua/uk/store/koricnevye-bruki-iz-kozi-pitona-gucci-264366-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-PR-om-prada-24g1vsh-sinij-1ouhbf",
    "code": "m-uzorom-prada-24g1vsh-sinij",
    "name": "针织衫蓝色",
    "nameEn": "knitwear blue",
    "brand": "PR",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1031,
    "priceCNY": 8042,
    "priceNote": "平台价 49 996 грн（原价 83 326 грн，约 €1031）",
    "image": "images/ua_PR_PR-om-prada-24g1vsh-sinij-.jpg",
    "images": [
      "images/ua_PR_PR-om-prada-24g1vsh-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/0d/b7/0db7aab216149cfb019ba46b0ee26ac4/8f582674-281d-4c6e-94a2-38e53e28f410.jpg",
    "url": "https://symbol.ua/uk/store/sinij-sviter-iz-sersti-i-kasemira-s-logotipom-uzorom-prada-24g1vsh-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-PR-1s21-svetlo-koricnevyj-bubnaa",
    "code": "p154oh1s21-svetlo-koricnevyj",
    "name": "带荷叶边裹身半裙",
    "nameEn": "with ruffle wrap skirt",
    "brand": "PR",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 352,
    "priceCNY": 2746,
    "priceNote": "平台价 17 070 грн（原价 56 814 грн，约 €352）",
    "image": "images/ua_PR_PR-1s21-svetlo-koricnevyj-.jpg",
    "images": [
      "images/ua_PR_PR-1s21-svetlo-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/e3/83/e3835ac82678b817eaac570bd06f1459/9553dc42-f73c-4c52-af09-783303529183.jpg",
    "url": "https://symbol.ua/uk/store/ubka-na-zapah-s-oborkoj-prada-p154oh1s21-svetlo-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-PR-prada-p168oh1tar-sinij-gwwgaq",
    "code": "-ubka-prada-p168oh1tar-sinij",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "PR",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 392,
    "priceCNY": 3058,
    "priceNote": "平台价 18 988 грн（原价 63 328 грн，约 €392）",
    "image": "images/ua_PR_PR-prada-p168oh1tar-sinij-.jpg",
    "images": [
      "images/ua_PR_PR-prada-p168oh1tar-sinij-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/ce/15/ce154b805ce4cbd20c5a220113c4fc63/268aa104-a9ed-460b-85bf-c355b7e38dfd.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-ubka-prada-p168oh1tar-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-PR-da-291699k1t2y-krasnyj-1m0bem",
    "code": "on-prada-291699k1t2y-krasnyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "PR",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 637,
    "priceCNY": 4969,
    "priceNote": "平台价 30 906 грн（原价 103 020 грн，约 €637）",
    "image": "images/ua_PR_PR-da-291699k1t2y-krasnyj-.jpg",
    "images": [
      "images/ua_PR_PR-da-291699k1t2y-krasnyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/ce/c9/cec90845b97e267110667133cdcace5d/789a9fac-3ad8-4563-b97b-9ee610c1eea9.jpg",
    "url": "https://symbol.ua/uk/store/krasnaa-stegannaa-kurtka-re-nylon-prada-291699k1t2y-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 112,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "合身",
        "role": "参考",
        "garment": 92,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-PR-eha-prada-169123-sinij-b3b5ao",
    "code": "t-iz-meha-prada-169123-sinij",
    "name": "马甲蓝色",
    "nameEn": "vest blue",
    "brand": "PR",
    "category": "outer",
    "style": "马甲",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "毛皮 fur",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 2052,
    "priceCNY": 16006,
    "priceNote": "平台价 99 537 грн（原价 199 072 грн，约 €2052）",
    "image": "images/ua_PR_PR-eha-prada-169123-sinij-.jpg",
    "images": [
      "images/ua_PR_PR-eha-prada-169123-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/b2/33/b233c6fdd9eff1a642752e0e6e6709cc/7dfbbee6-ea85-4103-8d16-44c7ea0893df.jpg",
    "url": "https://symbol.ua/uk/store/sinij-zilet-iz-meha-prada-169123-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 84,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VA-9b3kc75haf1-koricnevyj-15b45b",
    "code": "ntino-9b3kc75haf1-koricnevyj",
    "name": "棕色羊绒针织衫",
    "nameEn": "brown cashmere jumper",
    "brand": "VA",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 1342,
    "priceCNY": 10468,
    "priceNote": "平台价 65 096 грн（原价 92 972 грн，约 €1342）",
    "image": "images/ua_VA_VA-9b3kc75haf1-koricnevyj-.jpg",
    "images": [
      "images/ua_VA_VA-9b3kc75haf1-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/32/6d/326d4ec6ad02183f99fab716f4101ffe/55f57784-4d4a-4340-9978-032d31e53bfb.jpg",
    "url": "https://symbol.ua/uk/store/koricnevyj-dzemper-iz-kasemira-v-uzor-valentino-9b3kc75haf1-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-no-7b3kc65k9er-goluboj-okrunx",
    "code": "alentino-7b3kc65k9er-goluboj",
    "name": "羊绒天蓝针织衫",
    "nameEn": "cashmere light blue knitwear",
    "brand": "VA",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "天蓝",
    "colorHex": "#8fb0d0",
    "priceEUR": 932,
    "priceCNY": 7270,
    "priceNote": "平台价 45 199 грн（原价 90 346 грн，约 €932）",
    "image": "images/ua_VA_VA-no-7b3kc65k9er-goluboj-.jpg",
    "images": [
      "images/ua_VA_VA-no-7b3kc65k9er-goluboj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/51/0f/510f346ef722a4123f8cc3df7e164d31/1cee86a1-501c-43ce-ad2f-128c0dbb5b02.jpg",
    "url": "https://symbol.ua/uk/store/goluboj-sviter-iz-kasemira-valentino-7b3kc65k9er-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-no-9b3raf681mh-bezevyj-1wxpns",
    "code": "alentino-9b3raf681mh-bezevyj",
    "name": "半裙真丝",
    "nameEn": "skirt silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1266,
    "priceCNY": 9875,
    "priceNote": "平台价 61 408 грн（原价 87 720 грн，约 €1266）",
    "image": "images/ua_VA_VA-no-9b3raf681mh-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3raf681mh-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/df/7b/df7b2c7adc7214908abbc8f79e105283/592f51ac-26fd-4fcb-a848-64a1508cf69e.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-ubka-iz-selka-valentino-9b3raf681mh-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-no-9b3raf42a99-rozovyj-185yd4",
    "code": "alentino-9b3raf42a99-rozovyj",
    "name": "半裙迷你",
    "nameEn": "skirt mini",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 894,
    "priceCNY": 6973,
    "priceNote": "平台价 43 381 грн（原价 61 965 грн，约 €894）",
    "image": "images/ua_VA_VA-no-9b3raf42a99-rozovyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3raf42a99-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/3e/c4/3ec41a235416387f2baa1592f8d65c3d/810691c3-e92f-4629-9e51-fafa7d2f5211.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-tvidovaa-ubka-mini-valentino-9b3raf42a99-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-VA-no-8b3dd21c9yb-goluboj-zztzo2",
    "code": "alentino-8b3dd21c9yb-goluboj",
    "name": "半裙牛仔迷你",
    "nameEn": "skirt denim mini",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "天蓝",
    "colorHex": "#8fb0d0",
    "priceEUR": 639,
    "priceCNY": 4984,
    "priceNote": "平台价 31 008 грн（原价 77 468 грн，约 €639）",
    "image": "images/ua_VA_VA-no-8b3dd21c9yb-goluboj-.jpg",
    "images": [
      "images/ua_VA_VA-no-8b3dd21c9yb-goluboj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/e6/6b/e66be5465c4f2d8027760fb5c29a2bfb/f155a6b4-fa20-42e0-9048-d55c55d34dc2.jpg",
    "url": "https://symbol.ua/uk/store/golubaa-dzinsovaa-ubka-mini-s-patcem-logotipa-valentino-8b3dd21c9yb-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-ino-8b0ni08aa6q-cernyj-1eg5hp",
    "code": "valentino-8b0ni08aa6q-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "麂皮 suede",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1489,
    "priceCNY": 11614,
    "priceNote": "平台价 72 216 грн（原价 180 539 грн，约 €1489）",
    "image": "images/ua_VA_VA-ino-8b0ni08aa6q-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-8b0ni08aa6q-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/15/37/1537312bcf2f5a0897398b8c4b6ea66e/2117ee41-46f2-4844-85cf-c88061e3c5e0.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-zamsevaa-ubka-karandas-valentino-8b0ni08aa6q-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-8b3raep59ab-koricnevyj-pjkcjk",
    "code": "ntino-8b3raep59ab-koricnevyj",
    "name": "半裙真丝",
    "nameEn": "skirt silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 1235,
    "priceCNY": 9633,
    "priceNote": "平台价 59 894 грн（原价 149 682 грн，约 €1235）",
    "image": "images/ua_VA_VA-8b3raep59ab-koricnevyj-.jpg",
    "images": [
      "images/ua_VA_VA-8b3raep59ab-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/3a/45/3a45304dbf8e50c6e0c8c46f20f79685/4d484278-f169-4997-a351-0b76d2261514.jpg",
    "url": "https://symbol.ua/uk/store/koricnevaa-ubka-iz-selka-v-goroh-valentino-8b3raep59ab-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-no-8b0raf151mm-bezevyj-u86ifb",
    "code": "alentino-8b0raf151mm-bezevyj",
    "name": "半裙真丝",
    "nameEn": "skirt silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1489,
    "priceCNY": 11614,
    "priceNote": "平台价 72 216 грн（原价 180 539 грн，约 €1489）",
    "image": "images/ua_VA_VA-no-8b0raf151mm-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-8b0raf151mm-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d3/01/d30134b7ca8facbeae9d702662830d8a/362defd7-5549-4eff-9b3f-11b4b8ced006.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-ubka-iz-selka-valentino-8b0raf151mm-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-8b3rael59ab-cernyj-1qhxxt",
    "code": "valentino-8b3rael59ab-cernyj",
    "name": "半裙真丝",
    "nameEn": "skirt silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1150,
    "priceCNY": 8970,
    "priceNote": "平台价 55 752 грн（原价 139 331 грн，约 €1150）",
    "image": "images/ua_VA_VA-ino-8b3rael59ab-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-8b3rael59ab-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a6/d7/a6d79dab387f9c10b19f156597c5d90a/a19aa33b-42a7-4bad-b265-81755138ccab.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-iz-selka-v-gorohe-valentino-8b3rael59ab-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-no-7b3racm21cf-krasnyj-a2hi0x",
    "code": "alentino-7b3racm21cf-krasnyj",
    "name": "半裙真丝迷你",
    "nameEn": "skirt silk mini",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 852,
    "priceCNY": 6646,
    "priceNote": "平台价 41 310 грн（原价 82 569 грн，约 €852）",
    "image": "images/ua_VA_VA-no-7b3racm21cf-krasnyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-7b3racm21cf-krasnyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/e4/17/e417012707f6e939ef764c1a31fee668/63c667b1-e859-42af-9ef6-2916c914c2d3.jpg",
    "url": "https://symbol.ua/uk/store/krasnaa-ubka-mini-iz-sersti-i-selka-valentino-7b3racm21cf-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-VA-tino-7b3radm51cf-sinij-1sadfk",
    "code": "-valentino-7b3radm51cf-sinij",
    "name": "半裙真丝中长",
    "nameEn": "skirt silk midi",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1054,
    "priceCNY": 8221,
    "priceNote": "平台价 51 106 грн（原价 102 163 грн，约 €1054）",
    "image": "images/ua_VA_VA-tino-7b3radm51cf-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-7b3radm51cf-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/23/99/239909260ca57b779cca008b80c9726c/33018a22-ea6f-41e8-8780-3cc513f364e6.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-ubka-medi-iz-sersti-i-selka-valentino-7b3radm51cf-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-no-7b3radq79ek-rozovyj-1wronn",
    "code": "alentino-7b3radq79ek-rozovyj",
    "name": "半裙短裤",
    "nameEn": "skirt shorts",
    "brand": "VA",
    "category": "bottoms",
    "style": "短裤",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 905,
    "priceCNY": 7059,
    "priceNote": "平台价 43 886 грн（原价 87 720 грн，约 €905）",
    "image": "images/ua_VA_VA-no-7b3radq79ek-rozovyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-7b3radq79ek-rozovyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/96/1a/961a0c5d4f826d157f5630ebdd78a7af/63941399-d0ab-4a22-b24f-6917b2fc15dc.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-ubka-sorty-valentino-7b3radq79ek-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,L,XL",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 105,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 78,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 44",
      "IT 46"
    ],
    "availSizesText": "XS,L,XL"
  },
  {
    "id": "ua-VA-no-7b3radp59f9-bezevyj-wi7phl",
    "code": "alentino-7b3radp59f9-bezevyj",
    "name": "半裙印花真丝",
    "nameEn": "skirt print silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1054,
    "priceCNY": 8221,
    "priceNote": "平台价 51 106 грн（原价 102 163 грн，约 €1054）",
    "image": "images/ua_VA_VA-no-7b3radp59f9-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-7b3radp59f9-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/40/69/4069ce3d85119e9c4e646f884a92303f/1c1f24ee-d870-4b4d-9083-1c19f5fe4760.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-ubka-iz-sersti-i-selka-v-animalisticnyj-print-valentino-7b3radp59f9-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-no-7b3radj51cf-krasnyj-14vqry",
    "code": "alentino-7b3radj51cf-krasnyj",
    "name": "半裙真丝",
    "nameEn": "skirt silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 1331,
    "priceCNY": 10382,
    "priceNote": "平台价 64 540 грн（原价 129 078 грн，约 €1331）",
    "image": "images/ua_VA_VA-no-7b3radj51cf-krasnyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-7b3radj51cf-krasnyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/5d/0c/5d0c03015b847bc6a4c704effbbf70e0/23a94a04-8c5d-4541-8d5a-e1b9f551e135.jpg",
    "url": "https://symbol.ua/uk/store/krasnaa-ubka-iz-sersti-i-selka-s-volanami-valentino-7b3radj51cf-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-7b3radm51cf-cernyj-19y52u",
    "code": "valentino-7b3radm51cf-cernyj",
    "name": "半裙真丝",
    "nameEn": "skirt silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1054,
    "priceCNY": 8221,
    "priceNote": "平台价 51 106 грн（原价 102 163 грн，约 €1054）",
    "image": "images/ua_VA_VA-ino-7b3radm51cf-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-7b3radm51cf-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/a3/72/a3729f4eca0a8eacc7effa3dd626c719/a52e95e9-a6ed-4761-a935-c70478c99ff1.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-iz-sersti-i-selka-valentino-7b3radm51cf-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-no-6b0radf51cf-bezevyj-i86bmg",
    "code": "alentino-6b0radf51cf-bezevyj",
    "name": "半裙真丝迷你",
    "nameEn": "skirt silk mini",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 639,
    "priceCNY": 4984,
    "priceNote": "平台价 31 008 грн（原价 77 468 грн，约 €639）",
    "image": "images/ua_VA_VA-no-6b0radf51cf-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-6b0radf51cf-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/66/73/667314c7b13b0d9a51ace7b29e77ee21/23c68998-2cb0-49b1-9cc9-ff9838b98448.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-ubka-mini-iz-sersti-i-selka-valentino-6b0radf51cf-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-no-6b3racj690y-bezevyj-mr226t",
    "code": "alentino-6b3racj690y-bezevyj",
    "name": "半裙中长",
    "nameEn": "skirt midi",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 809,
    "priceCNY": 6310,
    "priceNote": "平台价 39 240 грн（原价 98 072 грн，约 €809）",
    "image": "images/ua_VA_VA-no-6b3racj690y-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-6b3racj690y-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/d0/53/d053a053d0c4d61cfe497ef183d2c626/e88e1e31-c693-45ae-98a7-fee5a1830834.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-tvidovaa-ubka-medi-iz-sersti-valentino-6b3racj690y-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-ino-6b0radf01cf-cernyj-1i9t3g",
    "code": "valentino-6b0radf01cf-cernyj",
    "name": "半裙真丝中长",
    "nameEn": "skirt silk midi",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1064,
    "priceCNY": 8299,
    "priceNote": "平台价 51 612 грн（原价 129 078 грн，约 €1064）",
    "image": "images/ua_VA_VA-ino-6b0radf01cf-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-6b0radf01cf-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/26/24/2624d9a770bbca97acb5315120fe92e5/e2a01f63-e32d-4b97-aa68-346683159844.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-medi-iz-sersti-i-selka-s-oborkami-valentino-6b0radf01cf-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-tino-6b3dd18z94u-sinij-18q0x3",
    "code": "-valentino-6b3dd18z94u-sinij",
    "name": "半裙牛仔中长",
    "nameEn": "skirt denim midi",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 681,
    "priceCNY": 5312,
    "priceNote": "平台价 33 028 грн（原价 82 569 грн，约 €681）",
    "image": "images/ua_VA_VA-tino-6b3dd18z94u-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-6b3dd18z94u-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/a2/8a/a28a6bfaced284e09c416f37e0d5439a/cdfbb37e-ba32-4d10-8b4a-258a0866859b.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-dzinsovaa-ubka-medi-s-effektom-potertosti-valentino-6b3dd18z94u-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-6b3racq090r-cernyj-16ttd1",
    "code": "valentino-6b3racq090r-cernyj",
    "name": "半裙印花真丝中长",
    "nameEn": "skirt print silk midi",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1064,
    "priceCNY": 8299,
    "priceNote": "平台价 51 612 грн（原价 129 078 грн，约 €1064）",
    "image": "images/ua_VA_VA-ino-6b3racq090r-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-6b3racq090r-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/2f/a4/2fa40375c221706e20e15740a8d76e1c/3e73a8f5-57e3-4c14-8981-c9daaa3b2fb0.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-midi-iz-selka-v-print-toute-la-v-valentino-6b3racq090r-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA--xb3ra8k36w1-oranzevyj-1b6fkr",
    "code": "entino-xb3ra8k36w1-oranzevyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1269,
    "priceCNY": 9898,
    "priceNote": "平台价 61 561 грн（原价 123 070 грн，约 €1269）",
    "image": "images/ua_VA_VA--xb3ra8k36w1-oranzevyj-.jpg",
    "images": [
      "images/ua_VA_VA--xb3ra8k36w1-oranzevyj-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/05/13/0513527771917939a1c1aa07897fbe65/3bcbfdc6-95c3-48f7-907c-a3802a8c6b8c.jpg",
    "url": "https://symbol.ua/uk/store/oranzevaa-ubka-s-perforaciej-valentino-xb3ra8k36w1-oranzevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-VA-no-qb3ra3w546b-rozovyj-m57rk",
    "code": "alentino-qb3ra3w546b-rozovyj",
    "name": "半裙真丝",
    "nameEn": "skirt silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 633,
    "priceCNY": 4937,
    "priceNote": "平台价 30 704 грн（原价 102 264 грн，约 €633）",
    "image": "images/ua_VA_VA-no-qb3ra3w546b-rozovyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-qb3ra3w546b-rozovyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/3e/bd/3ebdf5e3df47cfb7d50d17a85a0821b0/39b53ac1-e930-49a8-8ed6-bc8dc80a662e.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-ubka-iz-sersti-i-selka-valentino-qb3ra3w546b-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VA-ino-pb3ra3a03q1-cernyj-92dhp",
    "code": "valentino-pb3ra3a03q1-cernyj",
    "name": "半裙真丝",
    "nameEn": "skirt silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 620,
    "priceCNY": 4836,
    "priceNote": "平台价 30 049 грн（原价 100 143 грн，约 €620）",
    "image": "images/ua_VA_VA-ino-pb3ra3a03q1-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-pb3ra3a03q1-cernyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/89/ef/89eff020cf6282d82dba9d50f6b53c83/48509fe0-6800-4025-bd5d-1a1685d53a6d.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-iz-sersti-i-selka-valentino-pb3ra3a03q1-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VA-no-nb3ra2y53d5-rozovyj-103k5e",
    "code": "alentino-nb3ra2y53d5-rozovyj",
    "name": "半裙百褶",
    "nameEn": "skirt pleated",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 306,
    "priceCNY": 2387,
    "priceNote": "平台价 14 848 грн（原价 49 490 грн，约 €306）",
    "image": "images/ua_VA_VA-no-nb3ra2y53d5-rozovyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-nb3ra2y53d5-rozovyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/a7/59/a75923c4a684be3c117ae6a5e91ccc67/7d8b3d5e-36ca-4fea-882b-a674e80e2130.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-ubka-plisse-valentino-nb3ra2y53d5-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 44"
    ],
    "availSizesText": "XS,L"
  },
  {
    "id": "ua-VA-no-mb3ra295313-rozovyj-12uup1",
    "code": "alentino-mb3ra295313-rozovyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 684,
    "priceCNY": 5335,
    "priceNote": "平台价 33 180 грн（原价 110 596 грн，约 €684）",
    "image": "images/ua_VA_VA-no-mb3ra295313-rozovyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-mb3ra295313-rozovyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/61/0b/610bd1de40bad108c5f6e7251a03e04a/14488bbb-dcd4-47c1-a71c-e92977908cad.jpg",
    "url": "https://symbol.ua/uk/store/temno-rozovaa-ubka-valentino-mb3ra295313-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 42"
    ],
    "availSizesText": "XS,M"
  },
  {
    "id": "ua-VA-mb3ra295313-koricnevyj-19dh9w",
    "code": "ntino-mb3ra295313-koricnevyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 684,
    "priceCNY": 5335,
    "priceNote": "平台价 33 180 грн（原价 110 596 грн，约 €684）",
    "image": "images/ua_VA_VA-mb3ra295313-koricnevyj-.jpg",
    "images": [
      "images/ua_VA_VA-mb3ra295313-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/e8/7c/e87c66e5e3226a62ea6098e7db80ca97/74e0033a-2ac8-4c74-bfe8-627eff68c49f.jpg",
    "url": "https://symbol.ua/uk/store/koricnevaa-ubka-valentino-mb3ra295313-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VA-ino-lb0ra1v11cf-cernyj-60h86c",
    "code": "valentino-lb0ra1v11cf-cernyj",
    "name": "半裙百褶真丝",
    "nameEn": "skirt pleated silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 906,
    "priceCNY": 7067,
    "priceNote": "平台价 43 936 грн（原价 146 502 грн，约 €906）",
    "image": "images/ua_VA_VA-ino-lb0ra1v11cf-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-lb0ra1v11cf-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/7c/a6/7ca64b513ec9b33872a0017a22840efa/4784de57-95c2-4799-9b72-c09dc262327e.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-plisse-iz-sersti-i-selka-s-kristallami-valentino-lb0ra1v11cf-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-no-kb3ra135285-bezevyj-1jl3a9",
    "code": "alentino-kb3ra135285-bezevyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "VA",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "蕾丝 lace",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1064,
    "priceCNY": 8299,
    "priceNote": "平台价 51 612 грн（原价 171 954 грн，约 €1064）",
    "image": "images/ua_VA_VA-no-kb3ra135285-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-kb3ra135285-bezevyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/13/ba/13ba4f6ba3b50f0b8b7e20ad1341ddff/02e7fbde-f680-4d37-9548-50ab9dfe605c.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-ubka-valentino-kb3ra135285-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VA-no-9b3valf0abf-krasnyj-1d0060",
    "code": "alentino-9b3valf0abf-krasnyj",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 3500,
    "priceCNY": 27300,
    "priceNote": "平台价 169 732 грн（原价 242 502 грн，约 €3500）",
    "image": "images/ua_VA_VA-no-9b3valf0abf-krasnyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3valf0abf-krasnyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/2e/b7/2eb7be5ae94ab44891715def9936a822/c61e3a81-8421-4b32-902c-932aefc29c2e.jpg",
    "url": "https://symbol.ua/uk/store/krasnoe-plate-iz-selka-valentino-9b3valf0abf-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-tino-9b3vaky1acj-belyj-85oos4",
    "code": "-valentino-9b3vaky1acj-belyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 2011,
    "priceCNY": 15686,
    "priceNote": "平台价 97 517 грн（原价 139 331 грн，约 €2011）",
    "image": "images/ua_VA_VA-tino-9b3vaky1acj-belyj-.jpg",
    "images": [
      "images/ua_VA_VA-tino-9b3vaky1acj-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d5/14/d514f82a0287fa9aa9388651544410dd/f8cb0223-9510-4f74-b0c4-ec0c1f25ec4b.jpg",
    "url": "https://symbol.ua/uk/store/beloe-plate-v-goroh-valentino-9b3vaky1acj-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-no-9b3vakr5a9n-bezevyj-11zkt4",
    "code": "alentino-9b3vakr5a9n-bezevyj",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 2905,
    "priceCNY": 22659,
    "priceNote": "平台价 140 896 грн（原价 201 294 грн，约 €2905）",
    "image": "images/ua_VA_VA-no-9b3vakr5a9n-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3vakr5a9n-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/ac/51/ac51b40619942eb96726e962b33be8b5/efc6dc69-ea8c-4221-974e-c1384538ff55.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-plate-iz-selka-v-goroh-valentino-9b3vakr5a9n-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-9b3kd16bae6-cernyj-152lu6",
    "code": "valentino-9b3kd16bae6-cernyj",
    "name": "蕾丝连衣裙",
    "nameEn": "lace dress",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "蕾丝 lace",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1787,
    "priceCNY": 13939,
    "priceNote": "平台价 86 658 грн（原价 123 826 грн，约 €1787）",
    "image": "images/ua_VA_VA-ino-9b3kd16bae6-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-9b3kd16bae6-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/95/4a/954ad06db506f5ecdb4d83a1fb96f6bd/11594d20-83d3-4a5c-9c75-410f15dc627f.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-s-kruzevom-valentino-9b3kd16bae6-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-no-8b0vak571mm-krasnyj-b58bsv",
    "code": "alentino-8b0vak571mm-krasnyj",
    "name": "连衣裙真丝中长",
    "nameEn": "dress silk midi",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 1787,
    "priceCNY": 13939,
    "priceNote": "平台价 86 658 грн（原价 216 646 грн，约 €1787）",
    "image": "images/ua_VA_VA-no-8b0vak571mm-krasnyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-8b0vak571mm-krasnyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/00/e9/00e933dc8bd8bf9ca9e03a98e09d6300/202cf4d7-125a-4407-a701-6bd51bd2e90a.jpg",
    "url": "https://symbol.ua/uk/store/krasnoe-plate-medi-iz-selka-valentino-8b0vak571mm-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-ino-8b3vahx51cf-cernyj-149p11",
    "code": "valentino-8b3vahx51cf-cernyj",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1362,
    "priceCNY": 10624,
    "priceNote": "平台价 66 054 грн（原价 165 187 грн，约 €1362）",
    "image": "images/ua_VA_VA-ino-8b3vahx51cf-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-8b3vahx51cf-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8a/1b/8a1b926b9b498128f9c0f77213400cd5/30694fcf-645d-4ea4-a3e2-666386733c9d.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-na-odno-pleco-iz-sersti-i-selka-valentino-8b3vahx51cf-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-8b3vdml01ed-cernyj-1g914d",
    "code": "valentino-8b3vdml01ed-cernyj",
    "name": "连衣裙长款",
    "nameEn": "dress maxi",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 19144,
    "priceCNY": 149323,
    "priceNote": "平台价 928 494 грн（原价 1 547 520 грн，约 €19144）",
    "image": "images/ua_VA_VA-ino-8b3vdml01ed-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-8b3vdml01ed-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8e/1a/8e1a8bf77e17e148576ef45f187c4320/13e5db20-f28d-4263-8af5-0f1133dd3aec.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-maksi-s-applikaciej-i-perami-strausa-valentino-8b3vdml01ed-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-8b3vahg51cf-zeltyj-1brytq",
    "code": "valentino-8b3vahg51cf-zeltyj",
    "name": "连衣裙真丝迷你",
    "nameEn": "dress silk mini",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黄色",
    "colorHex": "#d9b23a",
    "priceEUR": 2000,
    "priceCNY": 15600,
    "priceNote": "平台价 97 012 грн（原价 242 502 грн，约 €2000）",
    "image": "images/ua_VA_VA-ino-8b3vahg51cf-zeltyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-8b3vahg51cf-zeltyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/eb/02/eb02bbf65f2abad0b59f7626729ab56d/fbc7bfc9-f50d-41bc-983d-ec0bb0550b33.jpg",
    "url": "https://symbol.ua/uk/store/zeltoe-plate-mini-iz-sersti-i-selka-s-kristallami-valentino-8b3vahg51cf-zeltyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-tino-8b3vaj809ww-belyj-16xf0v",
    "code": "-valentino-8b3vaj809ww-belyj",
    "name": "连衣裙印花真丝",
    "nameEn": "dress print silk",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1660,
    "priceCNY": 12948,
    "priceNote": "平台价 80 498 грн（原价 201 294 грн，约 €1660）",
    "image": "images/ua_VA_VA-tino-8b3vaj809ww-belyj-.jpg",
    "images": [
      "images/ua_VA_VA-tino-8b3vaj809ww-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/c8/bd/c8bd9fd108c59863592bc3098af5a812/a67ddb52-ef4d-4d37-826d-2fc1be64ef75.jpg",
    "url": "https://symbol.ua/uk/store/beloe-plate-iz-selka-v-cvetocnyj-print-valentino-8b3vaj809ww-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-VA-tino-8b3vajr59vn-belyj-dh0ar0",
    "code": "-valentino-8b3vajr59vn-belyj",
    "name": "连衣裙中长",
    "nameEn": "dress midi",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1235,
    "priceCNY": 9633,
    "priceNote": "平台价 59 894 грн（原价 149 682 грн，约 €1235）",
    "image": "images/ua_VA_VA-tino-8b3vajr59vn-belyj-.jpg",
    "images": [
      "images/ua_VA_VA-tino-8b3vajr59vn-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/55/cf/55cf8af3a502bc757bbc339130d8c6f7/c482170c-c8fc-48e8-b2a9-d50dd154b4e5.jpg",
    "url": "https://symbol.ua/uk/store/beloe-plate-medi-s-vysivkoj-risele-valentino-8b3vajr59vn-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-ino-8b3vajr01cf-cernyj-s5rreb",
    "code": "valentino-8b3vajr01cf-cernyj",
    "name": "连衣裙真丝中长",
    "nameEn": "dress silk midi",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 2085,
    "priceCNY": 16263,
    "priceNote": "平台价 101 102 грн（原价 252 754 грн，约 €2085）",
    "image": "images/ua_VA_VA-ino-8b3vajr01cf-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-8b3vajr01cf-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/02/9c/029c2591e4ea497a499a20a995a1fa10/9def04d6-56b2-4a6f-80f6-42b8af238364.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-medi-iz-sersti-i-selka-valentino-8b3vajr01cf-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-ino-8b3vahv79dw-cernyj-19evyy",
    "code": "valentino-8b3vahv79dw-cernyj",
    "name": "衬衫连衣裙",
    "nameEn": "shirt dress",
    "brand": "VA",
    "category": "dresses",
    "style": "衬衫",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1235,
    "priceCNY": 9633,
    "priceNote": "平台价 59 894 грн（原价 149 682 грн，约 €1235）",
    "image": "images/ua_VA_VA-ino-8b3vahv79dw-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-8b3vahv79dw-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/ab/2d/ab2d049f976ab9dbc7bd2e8914d022a4/371cb93f-7483-4acb-956f-1eae006529b1.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-rubaska-v-goroh-valentino-8b3vahv79dw-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-VA-tino-7b3vag101cf-sinij-1edosu",
    "code": "-valentino-7b3vag101cf-sinij",
    "name": "连衣裙真丝中长",
    "nameEn": "dress silk midi",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 2394,
    "priceCNY": 18673,
    "priceNote": "平台价 116 101 грн（原价 232 150 грн，约 €2394）",
    "image": "images/ua_VA_VA-tino-7b3vag101cf-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-7b3vag101cf-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/3c/78/3c7879c450ec00a2911435f8596093a3/c8190318-bb7e-4021-9630-60f7e98a3693.jpg",
    "url": "https://symbol.ua/uk/store/sinee-plate-medi-iz-sersti-i-selka-valentino-7b3vag101cf-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 44"
    ],
    "availSizesText": "S,L"
  },
  {
    "id": "ua-VA-tino-7b3vafh79e4-sinij-pt5tev",
    "code": "-valentino-7b3vafh79e4-sinij",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1703,
    "priceCNY": 13283,
    "priceNote": "平台价 82 618 грн（原价 165 187 грн，约 €1703）",
    "image": "images/ua_VA_VA-tino-7b3vafh79e4-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-7b3vafh79e4-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/20/89/20895a814f2b009fcebba5b8ddd98edd/c9d1f1d4-7854-4a9e-bbd9-dc7283fab3e7.jpg",
    "url": "https://symbol.ua/uk/store/sinee-tvidovoe-plate-s-serstu-v-kletocku-valentino-7b3vafh79e4-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-ino-7b0kd14l9sh-cernyj-1nh4uw",
    "code": "valentino-7b0kd14l9sh-cernyj",
    "name": "羊绒连衣裙中长",
    "nameEn": "cashmere dress midi",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1331,
    "priceCNY": 10382,
    "priceNote": "平台价 64 540 грн（原价 129 078 грн，约 €1331）",
    "image": "images/ua_VA_VA-ino-7b0kd14l9sh-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-7b0kd14l9sh-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/15/ea/15ea7b3f79d9d42afed6ba9d451f2aab/7c270e79-fde1-420f-b551-bd1f138fc76c.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-medi-iz-kasemira-valentino-7b0kd14l9sh-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-no-7b3vag301cf-bezevyj-169dvn",
    "code": "alentino-7b3vag301cf-bezevyj",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 2075,
    "priceCNY": 16185,
    "priceNote": "平台价 100 648 грн（原价 201 294 грн，约 €2075）",
    "image": "images/ua_VA_VA-no-7b3vag301cf-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-7b3vag301cf-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/02/57/02573936dc4ecc28e36c68aa3118ecb4/88caeb30-450b-41d0-b3be-1c49485b16d3.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-plate-iz-sersti-i-selka-valentino-7b3vag301cf-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-no-7b3vafn01cf-bezevyj-1dafo1",
    "code": "alentino-7b3vafn01cf-bezevyj",
    "name": "连衣裙真丝迷你",
    "nameEn": "dress silk mini",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1586,
    "priceCNY": 12371,
    "priceNote": "平台价 76 913 грн（原价 153 774 грн，约 €1586）",
    "image": "images/ua_VA_VA-no-7b3vafn01cf-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-7b3vafn01cf-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/2d/cf/2dcf6a2b3a0b2a3a7beb6edfa917e18c/c45e5766-f455-4cb4-aa52-cf5cad01ebfd.jpg",
    "url": "https://symbol.ua/uk/store/plate-7b3vafn01cf-valentino-7b3vafn01cf-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-7b3vafh51cf-cernyj-izi7dx",
    "code": "valentino-7b3vafh51cf-cernyj",
    "name": "连衣裙真丝迷你",
    "nameEn": "dress silk mini",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1586,
    "priceCNY": 12371,
    "priceNote": "平台价 76 913 грн（原价 153 774 грн，约 €1586）",
    "image": "images/ua_VA_VA-ino-7b3vafh51cf-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-7b3vafh51cf-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/78/08/7808ff49ac1bb478d1bed7b066ea889d/2c751c61-17c7-41b7-8620-1047f1c28711.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-mini-iz-sersti-i-selka-valentino-7b3vafh51cf-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-6b0vadl698s-cernyj-iwjy73",
    "code": "valentino-6b0vadl698s-cernyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1268,
    "priceCNY": 9890,
    "priceNote": "平台价 61 510 грн（原价 153 774 грн，约 €1268）",
    "image": "images/ua_VA_VA-ino-6b0vadl698s-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-6b0vadl698s-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/91/2d/912d8930f6f8d6326188293663905f1d/8899f67b-c37a-44e8-9c3d-a44f5155e38e.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-supergran-v-goroh-valentino-6b0vadl698s-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-6b3vaf011mh-cernyj-fffcym",
    "code": "valentino-6b3vaf011mh-cernyj",
    "name": "衬衫连衣裙真丝",
    "nameEn": "shirt dress silk",
    "brand": "VA",
    "category": "dresses",
    "style": "衬衫",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 2213,
    "priceCNY": 17261,
    "priceNote": "平台价 107 314 грн（原价 268 256 грн，约 €2213）",
    "image": "images/ua_VA_VA-ino-6b3vaf011mh-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-6b3vaf011mh-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/af/5e/af5e89616340b69192150e812d77f2fa/af05d196-355d-465d-ba34-32304d502e35.jpg",
    "url": "https://symbol.ua/uk/store/krasnoe-plate-rubaska-iz-selka-s-rusami-valentino-6b3vaf011mh-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-tino-5b3va9d12qb-sinij-105bzi",
    "code": "-valentino-5b3va9d12qb-sinij",
    "name": "带标识连衣裙",
    "nameEn": "with logo dress",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1021,
    "priceCNY": 7964,
    "priceNote": "平台价 49 542 грн（原价 165 187 грн，约 €1021）",
    "image": "images/ua_VA_VA-tino-5b3va9d12qb-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-5b3va9d12qb-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/a1/47/a14769a8e080961b9a6595482590f6bf/a521d9b7-75a6-44dd-a962-cc32fc7fd28d.jpg",
    "url": "https://symbol.ua/uk/store/sinee-plate-s-serstu-s-logotipom-vlogo-signature-valentino-5b3va9d12qb-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-no-qb2vait542l-bezevyj-1rbeiv",
    "code": "alentino-qb2vait542l-bezevyj",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 736,
    "priceCNY": 5741,
    "priceNote": "平台价 35 705 грн（原价 119 080 грн，约 €736）",
    "image": "images/ua_VA_VA-no-qb2vait542l-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-qb2vait542l-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/bd/04/bd04112a71a4eea7ff57295ab286ccb7/0064925f-bb3f-4dcf-bb93-3ad8244871c7.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-plate-iz-sersti-i-selka-v-polosku-valentino-qb2vait542l-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-3vahb13ah-raznocvetnyj-1o8xfv",
    "code": "ino-pb3vahb13ah-raznocvetnyj",
    "name": "蕾丝衬衫连衣裙",
    "nameEn": "lace shirt dress",
    "brand": "VA",
    "category": "dresses",
    "style": "衬衫",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "蕾丝 lace",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 662,
    "priceCNY": 5164,
    "priceNote": "平台价 32 118 грн（原价 107 112 грн，约 €662）",
    "image": "images/ua_VA_VA-3vahb13ah-raznocvetnyj-.jpg",
    "images": [
      "images/ua_VA_VA-3vahb13ah-raznocvetnyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/4e/c0/4ec08f89363bc246d8dd51083acb2a3c/e744fdf3-992c-4661-ad1f-5069c8c2c50b.jpg",
    "url": "https://symbol.ua/uk/store/plate-rubaska-dvojnoj-konstrukcii-s-kruzevom-valentino-pb3vahb13ah-raznocvetnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-tino-lb3va8x52ns-seryj-5urr3e",
    "code": "-valentino-lb3va8x52ns-seryj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 803,
    "priceCNY": 6263,
    "priceNote": "平台价 38 937 грн（原价 129 837 грн，约 €803）",
    "image": "images/ua_VA_VA-tino-lb3va8x52ns-seryj-.jpg",
    "images": [
      "images/ua_VA_VA-tino-lb3va8x52ns-seryj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/e9/40/e9409b7b1a59f110b3a8735aa2a6f381/8ec86307-03dc-4b57-9843-9bffe64ea8c0.jpg",
    "url": "https://symbol.ua/uk/store/seroe-plate-iz-sersti-s-zaklepkami-valentino-lb3va8x52ns-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-lentino-fb0vs7jf-seryj-17hkop",
    "code": "koj-valentino-fb0vs7jf-seryj",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "VA",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 1526,
    "priceCNY": 11903,
    "priceNote": "平台价 74 034 грн（原价 370 166 грн，约 €1526）",
    "image": "images/ua_VA_VA-lentino-fb0vs7jf-seryj-.jpg",
    "images": [
      "images/ua_VA_VA-lentino-fb0vs7jf-seryj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/e6/91/e6914ed5633fe1a71767b044a7ffee5f/62c21747-caf1-4ed2-b8a2-37a6cd6767c5.jpg",
    "url": "https://symbol.ua/uk/store/seroe-plate-iz-selka-s-vysivkoj-valentino-fb0vs7jf-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-9b3rb7579q9-cernyj-1sm0v3",
    "code": "valentino-9b3rb7579q9-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1118,
    "priceCNY": 8720,
    "priceNote": "平台价 54 238 грн（原价 77 468 грн，约 €1118）",
    "image": "images/ua_VA_VA-ino-9b3rb7579q9-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-9b3rb7579q9-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/4e/32/4e325b41f7d156ea7fdd702be65c1448/06ad84e3-d5e4-4bc2-b39b-45fc2e7a2097.jpg",
    "url": "https://symbol.ua/uk/store/cernye-velurovye-stany-valentino-9b3rb7579q9-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-VA-no-9b3rb7b51mm-bezevyj-13lkkq",
    "code": "alentino-9b3rb7b51mm-bezevyj",
    "name": "长裤真丝",
    "nameEn": "trousers silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1564,
    "priceCNY": 12199,
    "priceNote": "平台价 75 852 грн（原价 108 324 грн，约 €1564）",
    "image": "images/ua_VA_VA-no-9b3rb7b51mm-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3rb7b51mm-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/51/aa/51aa7f86dc042138f756aae3f2768b93/2d192fe2-e9fa-493c-afd4-2aa19b00b0ae.jpg",
    "url": "https://symbol.ua/uk/store/bezevye-bruki-iz-selka-valentino-9b3rb7b51mm-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-VA-9b3rb766a6d-koricnevyj-3r5t0b",
    "code": "ntino-9b3rb766a6d-koricnevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 1111,
    "priceCNY": 8666,
    "priceNote": "平台价 53 885 грн（原价 76 962 грн，约 €1111）",
    "image": "images/ua_VA_VA-9b3rb766a6d-koricnevyj-.jpg",
    "images": [
      "images/ua_VA_VA-9b3rb766a6d-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/72/37/7237c14abccf94eee104b35954bee8e4/1d7e5141-09b1-4a90-877c-921b9ed0fb2a.jpg",
    "url": "https://symbol.ua/uk/store/koricnevye-bruki-s-serstu-valentino-9b3rb766a6d-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-ino-8b0rb786a8h-zeltyj-fm0bzh",
    "code": "valentino-8b0rb786a8h-zeltyj",
    "name": "长裤真丝",
    "nameEn": "trousers silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黄色",
    "colorHex": "#d9b23a",
    "priceEUR": 852,
    "priceCNY": 6646,
    "priceNote": "平台价 41 310 грн（原价 103 222 грн，约 €852）",
    "image": "images/ua_VA_VA-ino-8b0rb786a8h-zeltyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-8b0rb786a8h-zeltyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/6d/26/6d268e7d18700e3b3ef7d8dad77fda4f/3cae1b2b-7bdb-4161-8030-f02680f79181.jpg",
    "url": "https://symbol.ua/uk/store/zeltye-bruki-iz-selka-valentino-8b0rb786a8h-zeltyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-8b3rb7209q0-cernyj-anurc3",
    "code": "valentino-8b3rb7209q0-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 596,
    "priceCNY": 4649,
    "priceNote": "平台价 28 886 грн（原价 72 216 грн，约 €596）",
    "image": "images/ua_VA_VA-ino-8b3rb7209q0-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-8b3rb7209q0-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/2f/4b/2f4bfae0664522085c368666c1617170/e65ad315-c174-4248-b017-c28e0b40b97e.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-valentino-8b3rb7209q0-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ino-8b3rb7451mm-cernyj-1m4pgk",
    "code": "valentino-8b3rb7451mm-cernyj",
    "name": "长裤真丝",
    "nameEn": "trousers silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 809,
    "priceCNY": 6310,
    "priceNote": "平台价 39 240 грн（原价 98 072 грн，约 €809）",
    "image": "images/ua_VA_VA-ino-8b3rb7451mm-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-8b3rb7451mm-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/c7/4a/c74a90ebcc35f373b83bba0ad8e8d525/3f79fd64-e82c-4a2e-b6f3-fb6ac2a2100f.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-selka-valentino-8b3rb7451mm-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-ino-6b0rb6f090g-cernyj-wivrjc",
    "code": "valentino-6b0rb6f090g-cernyj",
    "name": "长裤真丝",
    "nameEn": "trousers silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 809,
    "priceCNY": 6310,
    "priceNote": "平台价 39 240 грн（原价 98 072 грн，约 €809）",
    "image": "images/ua_VA_VA-ino-6b0rb6f090g-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-6b0rb6f090g-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/1d/75/1d759e0af10b0086c8b0aac1686ae177/fb2b389b-ad6a-49ec-8610-22e78e5d8e7a.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-selka-s-otvorotami-valentino-6b0rb6f090g-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-tino-6b3rb6551cf-sinij-1wya78",
    "code": "-valentino-6b3rb6551cf-sinij",
    "name": "长裤真丝",
    "nameEn": "trousers silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 724,
    "priceCNY": 5647,
    "priceNote": "平台价 35 099 грн（原价 87 720 грн，约 €724）",
    "image": "images/ua_VA_VA-tino-6b3rb6551cf-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-6b3rb6551cf-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/90/75/907513450701a6cd393889162d01cf57/8b7f2e26-fa59-4fb5-b2fc-7872670d231c.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-iz-sersti-i-selka-s-otvorotami-valentino-6b3rb6551cf-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-no-6b3rb6451cf-goluboj-1a5m6x",
    "code": "alentino-6b3rb6451cf-goluboj",
    "name": "长裤真丝",
    "nameEn": "trousers silk",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "天蓝",
    "colorHex": "#8fb0d0",
    "priceEUR": 554,
    "priceCNY": 4321,
    "priceNote": "平台价 26 866 грн（原价 67 116 грн，约 €554）",
    "image": "images/ua_VA_VA-no-6b3rb6451cf-goluboj-.jpg",
    "images": [
      "images/ua_VA_VA-no-6b3rb6451cf-goluboj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/07/5b/075bea57ee174b683bf530d8d024e61e/40076cbf-593b-41c8-9982-b10f93ea7e91.jpg",
    "url": "https://symbol.ua/uk/store/golubye-bruki-kles-iz-sersti-i-selka-s-otvorotami-valentino-6b3rb6451cf-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-tino-6b3dd19d94b-sinij-17zur9",
    "code": "-valentino-6b3dd19d94b-sinij",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 639,
    "priceCNY": 4984,
    "priceNote": "平台价 31 008 грн（原价 77 468 грн，约 €639）",
    "image": "images/ua_VA_VA-tino-6b3dd19d94b-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-6b3dd19d94b-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/1c/47/1c47f858aabf7c23b745d75708ef435a/9ffee3ab-c443-43ea-8225-699172762f24.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-s-otvorotami-valentino-6b3dd19d94b-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-tino-5b3rb5y074b-sinij-1s5ebz",
    "code": "-valentino-5b3rb5y074b-sinij",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 447,
    "priceCNY": 3487,
    "priceNote": "平台价 21 666 грн（原价 72 216 грн，约 €447）",
    "image": "images/ua_VA_VA-tino-5b3rb5y074b-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-5b3rb5y074b-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/b4/2f/b42fafe8d427889a27a06a15588c96a2/baa2d2dd-9cef-488e-b10b-0fff16d474e2.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-iz-sersti-s-vysokoj-posadkoj-valentino-5b3rb5y074b-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-tino-5b3rb5y07cu-seryj-1y08jk",
    "code": "-valentino-5b3rb5y07cu-seryj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 447,
    "priceCNY": 3487,
    "priceNote": "平台价 21 666 грн（原价 72 216 грн，约 €447）",
    "image": "images/ua_VA_VA-tino-5b3rb5y07cu-seryj-.jpg",
    "images": [
      "images/ua_VA_VA-tino-5b3rb5y07cu-seryj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/6e/a7/6ea79613e23b1f3338f5a08edd8bcee1/4e3a393a-41e9-4301-996d-ba062835643c.jpg",
    "url": "https://symbol.ua/uk/store/serye-bruki-iz-sersti-s-vysokoj-posadkoj-valentino-5b3rb5y07cu-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-no-3b0rb5201cf-krasnyj-1u1i9d",
    "code": "alentino-3b0rb5201cf-krasnyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 415,
    "priceCNY": 3237,
    "priceNote": "平台价 20 151 грн（原价 67 116 грн，约 €415）",
    "image": "images/ua_VA_VA-no-3b0rb5201cf-krasnyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-3b0rb5201cf-krasnyj-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/b4/e7/b4e72786a0d6850a9b8a25e19c84d50e/582823b0-86c1-4518-b465-5461c4ee5681.jpg",
    "url": "https://symbol.ua/uk/store/krasnye-bruki-kles-valentino-3b0rb5201cf-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-tino-3b3rb5g51cf-sinij-ci8bu1",
    "code": "-valentino-3b3rb5g51cf-sinij",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 383,
    "priceCNY": 2987,
    "priceNote": "平台价 18 584 грн（原价 61 965 грн，约 €383）",
    "image": "images/ua_VA_VA-tino-3b3rb5g51cf-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-3b3rb5g51cf-sinij-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/b8/f7/b8f7c0ee14a9828967cecc02093be617/050afb60-4707-4078-8754-83a1bc9cac43.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-kles-valentino-3b3rb5g51cf-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-ntino-4b3rb5p58bd-haki-7e9bcx",
    "code": "v-valentino-4b3rb5p58bd-haki",
    "name": "带标识长裤",
    "nameEn": "with logo trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 639,
    "priceCNY": 4984,
    "priceNote": "平台价 31 008 грн（原价 77 468 грн，约 €639）",
    "image": "images/ua_VA_VA-ntino-4b3rb5p58bd-haki-.jpg",
    "images": [
      "images/ua_VA_VA-ntino-4b3rb5p58bd-haki-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/62/26/6226a3e30d4b809e90dc85e0970d217d/71864007-00ec-4234-9d12-991e41a251a1.jpg",
    "url": "https://symbol.ua/uk/store/bruki-kargo-cveta-haki-s-logotipom-v-valentino-4b3rb5p58bd-haki",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-tino-4b3rb4m72qb-sinij-1kedw1",
    "code": "-valentino-4b3rb4m72qb-sinij",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 554,
    "priceCNY": 4321,
    "priceNote": "平台价 26 866 грн（原价 67 116 грн，约 €554）",
    "image": "images/ua_VA_VA-tino-4b3rb4m72qb-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-4b3rb4m72qb-sinij-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/f9/de/f9deaed2d09dfffad95591848fc2dd9f/14f22874-b2f1-4e83-bf1b-6d59e22f69e4.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-iz-sersti-valentino-4b3rb4m72qb-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VA-ino-qb2rb2h045v-cernyj-6cj9ii",
    "code": "valentino-qb2rb2h045v-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 230,
    "priceCNY": 1794,
    "priceNote": "平台价 11 162 грн（原价 37 270 грн，约 €230）",
    "image": "images/ua_VA_VA-ino-qb2rb2h045v-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-qb2rb2h045v-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/89/jn/89adaddc13dbeb6a89e398dec6c5415d/0b279f1c-549f-4478-9db3-a99e5de9540f.jpg",
    "url": "https://symbol.ua/uk/store/cernye-lakirovannye-bruki-valentino-qb2rb2h045v-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VA-ino-pb0rb2a53q3-cernyj-1iehf2",
    "code": "valentino-pb0rb2a53q3-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VA",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 369,
    "priceCNY": 2878,
    "priceNote": "平台价 17 878 грн（原价 59 541 грн，约 €369）",
    "image": "images/ua_VA_VA-ino-pb0rb2a53q3-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-pb0rb2a53q3-cernyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/e0/26/e026cdc57219b54b4d2dc6f979e95409/9f98c749-cb0b-41c7-a0d3-273d2678b35d.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-valentino-pb0rb2a53q3-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-VA-no-9b3cjh396ja-bezevyj-mh26vc",
    "code": "alentino-9b3cjh396ja-bezevyj",
    "name": "大衣",
    "nameEn": "coat",
    "brand": "VA",
    "category": "outer",
    "style": "大衣",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 2755,
    "priceCNY": 21489,
    "priceNote": "平台价 133 624 грн（原价 190 890 грн，约 €2755）",
    "image": "images/ua_VA_VA-no-9b3cjh396ja-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3cjh396ja-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/0f/cf/0fcfad795bb6a1dc71b9cbc5b0246df5/3933748a-d258-4775-a370-c0e3ee46d296.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-palto-iz-sersti-i-kasemira-valentino-9b3cjh396ja-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 112,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "合身",
        "role": "参考",
        "garment": 92,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "XS,S,M,L"
  },
  {
    "id": "ua-VA-tino-9b3dd22nach-sinij-5flplk",
    "code": "-valentino-9b3dd22nach-sinij",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "VA",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 820,
    "priceCNY": 6396,
    "priceNote": "平台价 39 794 грн（原价 56 864 грн，约 €820）",
    "image": "images/ua_VA_VA-tino-9b3dd22nach-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-9b3dd22nach-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/43/d0/43d063662d4a8b96afc25563dc074ab8/b666dea2-1c8d-464c-b183-ed17ba38fac4.jpg",
    "url": "https://symbol.ua/uk/store/sinie-dzinsy-s-effektom-potertosti-valentino-9b3dd22nach-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-tino-9b3mg26rafb-belyj-11ko12",
    "code": "-valentino-9b3mg26rafb-belyj",
    "name": "T恤",
    "nameEn": "T-shirt",
    "brand": "VA",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 441,
    "priceCNY": 3440,
    "priceNote": "平台价 21 412 грн（原价 30 604 грн，约 €441）",
    "image": "images/ua_VA_VA-tino-9b3mg26rafb-belyj-.jpg",
    "images": [
      "images/ua_VA_VA-tino-9b3mg26rafb-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/55/5f/555fe4482e0c1c774b47c92cb1b8b75a/b78c2c03-23e8-466c-a71d-d62fa73c2915.jpg",
    "url": "https://symbol.ua/uk/store/belaa-futbolka-s-emblemoj-valentino-9b3mg26rafb-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-VA-9b3ka16dab9-koricnevyj-1pcoe6",
    "code": "ntino-9b3ka16dab9-koricnevyj",
    "name": "棕色羊绒系带开衫",
    "nameEn": "brown cashmere with belt cardigan",
    "brand": "VA",
    "category": "tops",
    "style": "开衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 1787,
    "priceCNY": 13939,
    "priceNote": "平台价 86 658 грн（原价 123 826 грн，约 €1787）",
    "image": "images/ua_VA_VA-9b3ka16dab9-koricnevyj-.jpg",
    "images": [
      "images/ua_VA_VA-9b3ka16dab9-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/38/32/383298edd229347aa2dba4e3ca7971c2/961c79eb-93b2-46ba-8736-2af64a31a2d6.jpg",
    "url": "https://symbol.ua/uk/store/koricnevyj-kardigan-iz-kasemira-s-poasom-valentino-9b3ka16dab9-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-no-9b3aa0j2acd-rozovyj-1j044f",
    "code": "alentino-9b3aa0j2acd-rozovyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "VA",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 730,
    "priceCNY": 5694,
    "priceNote": "平台价 35 402 грн（原价 50 552 грн，约 €730）",
    "image": "images/ua_VA_VA-no-9b3aa0j2acd-rozovyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3aa0j2acd-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/55/66/5566b421f53302b2001243c5551e7b53/38f685eb-81a7-468d-b672-ddf1aca0e7b5.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-ukorocennaa-rubaska-v-kletku-valentino-9b3aa0j2acd-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS,XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XXS,XS,S,M"
  },
  {
    "id": "ua-VA-ino-9b3kc74yac1-cernyj-1tlmo4",
    "code": "valentino-9b3kc74yac1-cernyj",
    "name": "黑色",
    "nameEn": "black",
    "brand": "VA",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 730,
    "priceCNY": 5694,
    "priceNote": "平台价 35 402 грн（原价 50 552 грн，约 €730）",
    "image": "images/ua_VA_VA-ino-9b3kc74yac1-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-9b3kc74yac1-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/00/49/004902d2dd5f822cc1b027d4e9d6e768/6674acb4-131e-4f26-97a0-b1460f116f6f.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-top-iz-sersti-valentino-9b3kc74yac1-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-VA-ino-9b3dd21naed-cernyj-7idyu3",
    "code": "valentino-9b3dd21naed-cernyj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "VA",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 730,
    "priceCNY": 5694,
    "priceNote": "平台价 35 402 грн（原价 50 552 грн，约 €730）",
    "image": "images/ua_VA_VA-ino-9b3dd21naed-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-9b3dd21naed-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a1/a1/a1a1e0e3e1242f4cbf065801b14b6248/4aefca46-9408-4e55-a111-bb754c38ed6f.jpg",
    "url": "https://symbol.ua/uk/store/cernye-dzinsy-s-logotip-patc-valentino-9b3dd21naed-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-tino-9b3dd21naec-sinij-lhz11a",
    "code": "-valentino-9b3dd21naec-sinij",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "VA",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 730,
    "priceCNY": 5694,
    "priceNote": "平台价 35 402 грн（原价 50 552 грн，约 €730）",
    "image": "images/ua_VA_VA-tino-9b3dd21naec-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-9b3dd21naec-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/aa/25/aa251b69aa301eeacc870c0e35daf158/5a59e82d-a5a4-433a-b94e-aab97c84aa52.jpg",
    "url": "https://symbol.ua/uk/store/sinie-ukorocennye-dzinsy-s-patcem-logotipa-valentino-9b3dd21naec-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 105,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 78,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-VA-tino-9b3mg26maa8-belyj-bhirga",
    "code": "-valentino-9b3mg26maa8-belyj",
    "name": "T恤",
    "nameEn": "T-shirt",
    "brand": "VA",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 441,
    "priceCNY": 3440,
    "priceNote": "平台价 21 412 грн（原价 30 604 грн，约 €441）",
    "image": "images/ua_VA_VA-tino-9b3mg26maa8-belyj-.jpg",
    "images": [
      "images/ua_VA_VA-tino-9b3mg26maa8-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/be/d0/bed0bc616f1280fc47ca7bdeede751e2/61d4e3ac-1b1e-46f0-884f-412ff2188e9c.jpg",
    "url": "https://symbol.ua/uk/store/belaa-futbolka-valentino-9b3mg26maa8-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "XS,S,M,L"
  },
  {
    "id": "ua-VA-no-9b3ka16eabl-bezevyj-tk64ys",
    "code": "alentino-9b3ka16eabl-bezevyj",
    "name": "开衫米色",
    "nameEn": "cardigan beige",
    "brand": "VA",
    "category": "tops",
    "style": "开衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1639,
    "priceCNY": 12784,
    "priceNote": "平台价 79 488 грн（原价 113 576 грн，约 €1639）",
    "image": "images/ua_VA_VA-no-9b3ka16eabl-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3ka16eabl-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/16/08/1608fb5fd0b10c00e11f645ac2f43488/c6fd64e7-1a05-4e5a-89ef-93c68937b097.jpg",
    "url": "https://symbol.ua/uk/store/bezevyj-kardigan-valentino-9b3ka16eabl-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-no-9b3ab8j6acc-goluboj-qwopxr",
    "code": "alentino-9b3ab8j6acc-goluboj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "VA",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "天蓝",
    "colorHex": "#8fb0d0",
    "priceEUR": 894,
    "priceCNY": 6973,
    "priceNote": "平台价 43 381 грн（原价 61 965 грн，约 €894）",
    "image": "images/ua_VA_VA-no-9b3ab8j6acc-goluboj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3ab8j6acc-goluboj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/06/32/0632e2d1e688582e7396cc418f77f875/3c665c80-7aac-4d7d-899f-b1fb79882981.jpg",
    "url": "https://symbol.ua/uk/store/golubaa-rubaska-v-polosku-valentino-9b3ab8j6acc-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-VA-ino-9b3kc75jaf6-cernyj-1e4mat",
    "code": "valentino-9b3kc75jaf6-cernyj",
    "name": "黑色",
    "nameEn": "black",
    "brand": "VA",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 968,
    "priceCNY": 7550,
    "priceNote": "平台价 46 966 грн（原价 67 116 грн，约 €968）",
    "image": "images/ua_VA_VA-ino-9b3kc75jaf6-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-9b3kc75jaf6-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/31/50/3150de59b3a37066023709b718926b01/2ccdec15-30d0-4d00-86c3-1d67111170af.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-top-s-serstu-valentino-9b3kc75jaf6-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-ino-9b3kc75lade-cernyj-tb88lu",
    "code": "valentino-9b3kc75lade-cernyj",
    "name": "黑色",
    "nameEn": "black",
    "brand": "VA",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 730,
    "priceCNY": 5694,
    "priceNote": "平台价 35 402 грн（原价 50 552 грн，约 €730）",
    "image": "images/ua_VA_VA-ino-9b3kc75lade-cernyj-.jpg",
    "images": [
      "images/ua_VA_VA-ino-9b3kc75lade-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/4a/a1/4aa140ccc3539492167304a85348c684/4d226f79-e0cc-40c3-8a32-02903edcdba0.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-top-v-polosku-valentino-9b3kc75lade-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-VA-no-9b3kc74yac1-bezevyj-1fso8j",
    "code": "alentino-9b3kc74yac1-bezevyj",
    "name": "女装",
    "nameEn": "Топ з вовни кольору айворі",
    "brand": "VA",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 730,
    "priceCNY": 5694,
    "priceNote": "平台价 35 402 грн（原价 50 552 грн，约 €730）",
    "image": "images/ua_VA_VA-no-9b3kc74yac1-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3kc74yac1-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/f9/09/f909f0df75985343bbf9ebb548315952/644a7418-3dd8-4a26-84dd-11bae451b19c.jpg",
    "url": "https://symbol.ua/uk/store/top-iz-sersti-cveta-ajvori-valentino-9b3kc74yac1-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-VA-no-9b3ab8j7ac4-bezevyj-sby2hv",
    "code": "alentino-9b3ab8j7ac4-bezevyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "VA",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 968,
    "priceCNY": 7550,
    "priceNote": "平台价 46 966 грн（原价 67 116 грн，约 €968）",
    "image": "images/ua_VA_VA-no-9b3ab8j7ac4-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-9b3ab8j7ac4-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/9b/3a/9b3af412ab3097fe9b569afae2188f79/e0ed39b4-16c7-4efb-9273-ed4652a467eb.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-rubaska-v-polosku-valentino-9b3ab8j7ac4-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VA-tino-8b3dc6f09y8-sinij-1rb57y",
    "code": "-valentino-8b3dc6f09y8-sinij",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "VA",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1064,
    "priceCNY": 8299,
    "priceNote": "平台价 51 612 грн（原价 129 078 грн，约 €1064）",
    "image": "images/ua_VA_VA-tino-8b3dc6f09y8-sinij-.jpg",
    "images": [
      "images/ua_VA_VA-tino-8b3dc6f09y8-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/5b/07/5b07fb694f6a6bf9f8bf96d742cac1ab/43dc9e59-d493-4c54-9621-c7a250021552.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-dzinsovaa-kurtka-valentino-8b3dc6f09y8-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VA-no-8b0cj4529q0-bezevyj-dkoqu4",
    "code": "alentino-8b0cj4529q0-bezevyj",
    "name": "大衣",
    "nameEn": "coat",
    "brand": "VA",
    "category": "outer",
    "style": "大衣",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1660,
    "priceCNY": 12948,
    "priceNote": "平台价 80 498 грн（原价 201 294 грн，约 €1660）",
    "image": "images/ua_VA_VA-no-8b0cj4529q0-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-8b0cj4529q0-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/87/f5/87f51d5793c11fe1a24f5f1ca3c2af94/24ae4f83-0c56-4e41-95a5-aee6d550ff3d.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-palto-iz-sersti-s-applikaciej-valentino-8b0cj4529q0-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VA-no-8b3dd22x9y5-bezevyj-1pm8gs",
    "code": "alentino-8b3dd22x9y5-bezevyj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "VA",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 416,
    "priceCNY": 3245,
    "priceNote": "平台价 20 200 грн（原价 50 552 грн，约 €416）",
    "image": "images/ua_VA_VA-no-8b3dd22x9y5-bezevyj-.jpg",
    "images": [
      "images/ua_VA_VA-no-8b3dd22x9y5-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8e/97/8e97d34a400ae4873e0f31207ee9151f/45540dbf-cda1-406a-974a-f8dd3e4f4f0b.jpg",
    "url": "https://symbol.ua/uk/store/bezevye-dzinsy-s-logotipom-patca-valentino-8b3dd22x9y5-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BU--white-2fg00659t-sinij-1in5pg",
    "code": "ku-off-white-2fg00659t-sinij",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 648,
    "priceCNY": 5054,
    "priceNote": "平台价 31 412 грн（原价 44 844 грн，约 €648）",
    "image": "images/ua_BU_BU--white-2fg00659t-sinij-.jpg",
    "images": [
      "images/ua_BU_BU--white-2fg00659t-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/2b/3e/2b3ea1c161c8da6d2eee10aa79ebdffd/013f0bcc-32eb-43f5-b59f-b8d38caf3cff.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-kurtka-v-stile-rubaski-v-kletku-off-white-2fg00659t-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 112,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "合身",
        "role": "参考",
        "garment": 92,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BU-f9u88lhul2h-koricnevyj-11r4fw",
    "code": "bbana-f9u88lhul2h-koricnevyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 6443,
    "priceCNY": 50255,
    "priceNote": "平台价 312 494 грн（约 €6443）",
    "image": "images/ua_BU_BU-f9u88lhul2h-koricnevyj-.jpg",
    "images": [
      "images/ua_BU_BU-f9u88lhul2h-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/0f/6a/0f6a42734f94e92cbb55641ce117bc12/312b3a43-8b30-4dff-8802-b7efde62bc29.jpg",
    "url": "https://symbol.ua/uk/store/temno-koricnevaa-kozanaa-kurtka-dolcegabbana-f9u88lhul2h-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BU-co-a0347505219-bezevyj-1u05re",
    "code": "peserico-a0347505219-bezevyj",
    "name": "天鹅绒马甲",
    "nameEn": "velvet vest",
    "brand": "BU",
    "category": "outer",
    "style": "马甲",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "天鹅绒 velvet",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 735,
    "priceCNY": 5733,
    "priceNote": "平台价 35 654 грн（原价 50 904 грн，约 €735）",
    "image": "images/ua_BU_BU-co-a0347505219-bezevyj-.jpg",
    "images": [
      "images/ua_BU_BU-co-a0347505219-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/4a/a7/4aa74bae9fb630094e2883f1a6d7fa6e/b88d9384-4190-4c03-9bd5-c3c2a366fe8f.jpg",
    "url": "https://symbol.ua/uk/store/puhovyj-velvetovyj-zilet-cveta-ajvori-s-lureksom-peserico-a0347505219-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 112,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "合身",
        "role": "参考",
        "garment": 92,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "XS,S,M,L"
  },
  {
    "id": "ua-BU--paw705fax1667-bezevyj-mir71x",
    "code": "m-ford-paw705fax1667-bezevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BU",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1471,
    "priceCNY": 11474,
    "priceNote": "平台价 71 358 грн（原价 101 961 грн，约 €1471）",
    "image": "images/ua_BU_BU--paw705fax1667-bezevyj-.jpg",
    "images": [
      "images/ua_BU_BU--paw705fax1667-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/67/ba/67bafd6cccfd551e0b54a959408c5244/553aea08-39e7-4fff-9ae7-4451b6cbf7d9.jpg",
    "url": "https://symbol.ua/uk/store/bruki-iz-sersti-cveta-ajvori-tom-ford-paw705fax1667-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BU-ain-ou0000000047-sinij-8bbbcd",
    "code": "a-balmain-ou0000000047-sinij",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1995,
    "priceCNY": 15561,
    "priceNote": "平台价 96 758 грн（约 €1995）",
    "image": "images/ua_BU_BU-ain-ou0000000047-sinij-.jpg",
    "images": [
      "images/ua_BU_BU-ain-ou0000000047-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/48/e2/48e29c132f49e91cc1ce2ff9a9ccba79/668d9192-f65d-498c-86b9-5e2619829ca7.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-assimetricnaa-dzinsovaa-kurtka-balmain-ou0000000047-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BU-a-umanita-2-koricnevyj-1me1b2",
    "code": "ax-mara-umanita-2-koricnevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BU",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 217,
    "priceCNY": 1693,
    "priceNote": "平台价 10 504 грн（原价 13 130 грн，约 €217）",
    "image": "images/ua_BU_BU-a-umanita-2-koricnevyj-.jpg",
    "images": [
      "images/ua_BU_BU-a-umanita-2-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/fb/51/fb5139c6e1adb3aa9bf983f9c23076f2/fdbff9eb-aa11-43e7-b72f-1f6f489ed4e2.jpg",
    "url": "https://symbol.ua/uk/store/koricnevye-bruki-umanita-max-mara-umanita-2-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M,M,M/L,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S/M,M,M/L,L"
  },
  {
    "id": "ua-BU-ssi-ujk927wv0078-seryj-1twnd7",
    "code": "mattiussi-ujk927wv0078-seryj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 1383,
    "priceCNY": 10787,
    "priceNote": "平台价 67 064 грн（约 €1383）",
    "image": "images/ua_BU_BU-ssi-ujk927wv0078-seryj-.jpg",
    "images": [
      "images/ua_BU_BU-ssi-ujk927wv0078-seryj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/ea/69/ea692f9de900da2984add9b6db5c8fed/b5bd9163-cee6-40e4-b6d6-bbeefd750020.jpg",
    "url": "https://symbol.ua/uk/store/seraa-kurtka-iz-sersti-s-vorotnikom-ami-alexandre-mattiussi-ujk927wv0078-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BU-b0397fb0472-koricnevyj-1tz87b",
    "code": "-264wrb0397fb0472-koricnevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BU",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 540,
    "priceCNY": 4212,
    "priceNote": "平台价 26 211 грн（约 €540）",
    "image": "images/ua_BU_BU-b0397fb0472-koricnevyj-.jpg",
    "images": [
      "images/ua_BU_BU-b0397fb0472-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/cf/aa/cfaa58c40536344223678e899a8d26ea/4b8bd6a8-d0e9-457c-bef0-646545e62687.jpg",
    "url": "https://symbol.ua/uk/store/koricnevye-bruki-s-serstu-toteme-264wrb0397fb0472-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-BU-62an0202m30055-goluboj-inddco",
    "code": "-mm6-s62an0202m30055-goluboj",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "天蓝",
    "colorHex": "#8fb0d0",
    "priceEUR": 1274,
    "priceCNY": 9937,
    "priceNote": "平台价 61 812 грн（约 €1274）",
    "image": "images/ua_BU_BU-62an0202m30055-goluboj-.jpg",
    "images": [
      "images/ua_BU_BU-62an0202m30055-goluboj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/39/0f/390f01e3bfcd2b7853af37cca35aec93/0a968b3a-5aaf-404f-885c-6a28aa806ed3.jpg",
    "url": "https://symbol.ua/uk/store/golubaa-dzinsovaa-kurtka-s-vysivkoj-logotipa-maison-margiela-mm6-s62an0202m30055-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BU-58851a17669-koricnevyj-1kowz1",
    "code": "ce-10258851a17669-koricnevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BU",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 742,
    "priceCNY": 5788,
    "priceNote": "平台价 36 008 грн（原价 51 410 грн，约 €742）",
    "image": "images/ua_BU_BU-58851a17669-koricnevyj-.jpg",
    "images": [
      "images/ua_BU_BU-58851a17669-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/jn/6e/ad6e1fee1fe11caac3660a7ed4878e86/bcb44a76-8757-48b3-bbcb-9fadc627af24.jpg",
    "url": "https://symbol.ua/uk/store/koricnevye-bruki-iz-sersti-versace-10258851a17669-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-BU-ntellecardigan-rozovyj-w95d45",
    "code": "se-pointellecardigan-rozovyj",
    "name": "开衫粉色",
    "nameEn": "cardigan pink",
    "brand": "BU",
    "category": "tops",
    "style": "开衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 55,
    "priceCNY": 429,
    "priceNote": "平台价 2 678 грн（约 €55）",
    "image": "images/ua_BU_BU-ntellecardigan-rozovyj-.jpg",
    "images": [
      "images/ua_BU_BU-ntellecardigan-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8a/3b/8a3b4622cb4de6b9adb984e134b1ab14/dc4fa8a3-17b1-48d9-b67e-8609e145142d.jpg",
    "url": "https://symbol.ua/uk/store/rozovyj-kardigan-pointelle-dore-rose-pointellecardigan-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M,L,XL",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42",
      "IT 44",
      "IT 46"
    ],
    "availSizesText": "XS,S,M,L,XL"
  },
  {
    "id": "ua-BU-on-dj61402k0500l-sinij-wvhpzr",
    "code": "om-kiton-dj61402k0500l-sinij",
    "name": "系带夹克",
    "nameEn": "with belt jacket",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1163,
    "priceCNY": 9071,
    "priceNote": "平台价 56 410 грн（原价 80 598 грн，约 €1163）",
    "image": "images/ua_BU_BU-on-dj61402k0500l-sinij-.jpg",
    "images": [
      "images/ua_BU_BU-on-dj61402k0500l-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/jn/d2/add24be59fd2bd938a95bbd65e2d5235/946decc5-60d7-42c1-81eb-6ad29fff13b8.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-kurtka-s-poasom-kiton-dj61402k0500l-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BU--sk005810300wh50-belyj-tb4aq4",
    "code": "y-rich-sk005810300wh50-belyj",
    "name": "半裙短裤",
    "nameEn": "skirt shorts",
    "brand": "BU",
    "category": "bottoms",
    "style": "短裤",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 286,
    "priceCNY": 2231,
    "priceNote": "平台价 13 889 грн（约 €286）",
    "image": "images/ua_BU_BU--sk005810300wh50-belyj-.jpg",
    "images": [
      "images/ua_BU_BU--sk005810300wh50-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/81/c4/81c4c38af7505e5d7093cc4091f0b4d8/4cf8b69a-1899-432d-8d12-c8af212fbb33.jpg",
    "url": "https://symbol.ua/uk/store/belaa-ubka-sorty-s-plesenu-sporty-rich-sk005810300wh50-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BU-n-876455q5arx-bordovyj-cxxfg8",
    "code": "mcqueen-876455q5arx-bordovyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 3573,
    "priceCNY": 27869,
    "priceNote": "平台价 173 267 грн（原价 247 502 грн，约 €3573）",
    "image": "images/ua_BU_BU-n-876455q5arx-bordovyj-.jpg",
    "images": [
      "images/ua_BU_BU-n-876455q5arx-bordovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/3b/24/3b24a2cc3bcac1c3e3c7e685eb52d763/15cae919-0799-4e62-85de-5effc2837629.jpg",
    "url": "https://symbol.ua/uk/store/bordovaa-kozanaa-kurtka-alexander-mcqueen-876455q5arx-bordovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BU-a000045964b-koricnevyj-l50bsd",
    "code": "l20932a000045964b-koricnevyj",
    "name": "天鹅绒长裤",
    "nameEn": "velvet trousers",
    "brand": "BU",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "天鹅绒 velvet",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 620,
    "priceCNY": 4836,
    "priceNote": "平台价 30 049 грн（约 €620）",
    "image": "images/ua_BU_BU-a000045964b-koricnevyj-.jpg",
    "images": [
      "images/ua_BU_BU-a000045964b-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/69/e3/69e3f79a8564443e440fa693cec2cbca/cf250954-7b27-4dcd-96a2-fa8b935d8608.jpg",
    "url": "https://symbol.ua/uk/store/koricnevye-velvetovye-bruki-kles-moncler-l20932a000045964b-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS,XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XXS,XS,S"
  },
  {
    "id": "ua-BU-nts-mh27dj067bw-cernyj-1av6wh",
    "code": "vetements-mh27dj067bw-cernyj",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1347,
    "priceCNY": 10507,
    "priceNote": "平台价 65 348 грн（原价 93 324 грн，约 €1347）",
    "image": "images/ua_BU_BU-nts-mh27dj067bw-cernyj-.jpg",
    "images": [
      "images/ua_BU_BU-nts-mh27dj067bw-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/54/6e/546e705d4d2ee3c90a63f12a9ba33973/4b61cee4-5522-437b-bc54-28747e9ded24.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-dzinsovaa-kurtka-vetements-mh27dj067bw-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BU--co-mcosaggina-zelenyj-1r2stq",
    "code": "ti-max-co-mcosaggina-zelenyj",
    "name": "夹克亚麻",
    "nameEn": "jacket linen",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 441,
    "priceCNY": 3440,
    "priceNote": "平台价 21 412 грн（原价 26 766 грн，约 €441）",
    "image": "images/ua_BU_BU--co-mcosaggina-zelenyj-.jpg",
    "images": [
      "images/ua_BU_BU--co-mcosaggina-zelenyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8f/4c/8f4c6461993c7fde7393c83c1c1ca057/30b29ce9-60ca-4006-8f1f-e37bf93d3048.jpg",
    "url": "https://symbol.ua/uk/store/zelenaa-kurtka-saggina-iz-sersti-max-co-mcosaggina-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BU-enchy-bw00w5517b-sinij-s5ap9f",
    "code": "pa-givenchy-bw00w5517b-sinij",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 2055,
    "priceCNY": 16029,
    "priceNote": "平台价 99 688 грн（约 €2055）",
    "image": "images/ua_BU_BU-enchy-bw00w5517b-sinij-.jpg",
    "images": [
      "images/ua_BU_BU-enchy-bw00w5517b-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/ee/70/ee70530b9156feb526d8d73f59bbe6ad/cf1293a1-28c6-48ac-97fb-931aee14f8f2.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-dzinsovaa-kurtka-s-patcem-logotipa-givenchy-bw00w5517b-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS,XS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XXS,XS"
  },
  {
    "id": "ua-BU-iri-awbmpa1039-goluboj-rhbfrb",
    "code": "sti-amiri-awbmpa1039-goluboj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "BU",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "天蓝",
    "colorHex": "#8fb0d0",
    "priceEUR": 444,
    "priceCNY": 3463,
    "priceNote": "平台价 21 514 грн（原价 26 866 грн，约 €444）",
    "image": "images/ua_BU_BU-iri-awbmpa1039-goluboj-.jpg",
    "images": [
      "images/ua_BU_BU-iri-awbmpa1039-goluboj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/7b/32/7b323afbf457ca9d3c601c79142520f4/e0959367-7995-44ba-9b39-d0582ed3ee85.jpg",
    "url": "https://symbol.ua/uk/store/golubye-dzinsy-kles-s-effektom-potertosti-amiri-awbmpa1039-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BU-emais-7260p-koricnevyj-cuc8b3",
    "code": "lna-alemais-7260p-koricnevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BU",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 420,
    "priceCNY": 3276,
    "priceNote": "平台价 20 353 грн（约 €420）",
    "image": "images/ua_BU_BU-emais-7260p-koricnevyj-.jpg",
    "images": [
      "images/ua_BU_BU-emais-7260p-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/b6/76/b67682c9e8b401e37ba82757d0a7cf0b/f0cd5b9d-2357-41f8-8c2e-381ddfd806fc.jpg",
    "url": "https://symbol.ua/uk/store/koricnevye-bruki-otis-iz-lna-alemais-7260p-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M,L,XL",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42",
      "IT 44",
      "IT 46"
    ],
    "availSizesText": "XS,S,M,L,XL"
  },
  {
    "id": "ua-BU-uunj-jw6y5aw505-cernyj-3ntfch",
    "code": "rstu-juunj-jw6y5aw505-cernyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 766,
    "priceCNY": 5975,
    "priceNote": "平台价 37 168 грн（约 €766）",
    "image": "images/ua_BU_BU-uunj-jw6y5aw505-cernyj-.jpg",
    "images": [
      "images/ua_BU_BU-uunj-jw6y5aw505-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/e7/1d/e71d6b4515606dd83c2b7382d9a300ec/187c0253-7f25-4fa2-aa9e-42b44e0bc83c.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-sportivnaa-kurtka-s-serstu-juunj-jw6y5aw505-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 84,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-BU-i002309d12017z-zelenyj-12roso",
    "code": "erno-pi002309d12017z-zelenyj",
    "name": "夹克亚麻",
    "nameEn": "jacket linen",
    "brand": "BU",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "亚麻 linen",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 802,
    "priceCNY": 6256,
    "priceNote": "平台价 38 886 грн（约 €802）",
    "image": "images/ua_BU_BU-i002309d12017z-zelenyj-.jpg",
    "images": [
      "images/ua_BU_BU-i002309d12017z-zelenyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/1d/d6/1dd6a922542333776a93b55dd744011e/4d412ef2-2fd5-4a83-86a9-b108368592fd.jpg",
    "url": "https://symbol.ua/uk/store/zelenaa-puhovaa-kurtka-herno-pi002309d12017z-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 112,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "合身",
        "role": "参考",
        "garment": 92,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-BU-roh001799tes13-bezevyj-eve7mm",
    "code": "etro-wroh001799tes13-bezevyj",
    "name": "印花皮草",
    "nameEn": "print fur coat",
    "brand": "BU",
    "category": "outer",
    "style": "外套",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1804,
    "priceCNY": 14071,
    "priceNote": "平台价 87 518 грн（原价 125 038 грн，约 €1804）",
    "image": "images/ua_BU_BU-roh001799tes13-bezevyj-.jpg",
    "images": [
      "images/ua_BU_BU-roh001799tes13-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/58/58/5858c6228543c55a6c1afdae01ee7732/097b7f05-a7cb-46c7-9586-5e3a53f4d705.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-dvuhbortnaa-suba-s-leopardovym-printom-etro-wroh001799tes13-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 84,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-GI-nchy-bw90xb4zvt-cernyj-1l6u7y",
    "code": "j-givenchy-bw90xb4zvt-cernyj",
    "name": "黑色针织衫",
    "nameEn": "black knitwear",
    "brand": "GI",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1024,
    "priceCNY": 7987,
    "priceNote": "平台价 49 643 грн（原价 70 902 грн，约 €1024）",
    "image": "images/ua_GI_GI-nchy-bw90xb4zvt-cernyj-.jpg",
    "images": [
      "images/ua_GI_GI-nchy-bw90xb4zvt-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/9b/64/9b647a9ddc59645bd59eb769119ce9d2/95ac8550-5616-4d60-bdd4-3d5653638902.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-sviter-iz-sersti-s-drapirovkoj-givenchy-bw90xb4zvt-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-GI-nchy-bw61j04zta-cernyj-16olv9",
    "code": "o-givenchy-bw61j04zta-cernyj",
    "name": "黑色针织衫",
    "nameEn": "black knitwear",
    "brand": "GI",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1212,
    "priceCNY": 9454,
    "priceNote": "平台价 58 782 грн（原价 83 983 грн，约 €1212）",
    "image": "images/ua_GI_GI-nchy-bw61j04zta-cernyj-.jpg",
    "images": [
      "images/ua_GI_GI-nchy-bw61j04zta-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/c7/cb/c7cb1dc3c99f61df7f2e6b244dda202b/7102abe8-a837-4758-b913-4601b75e5e13.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-sviter-iz-sersti-i-kasemira-s-vorotnikom-polo-givenchy-bw61j04zta-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-GI-chy-bw412q1642-rozovyj-vdskbj",
    "code": "-givenchy-bw412q1642-rozovyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "GI",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 919,
    "priceCNY": 7168,
    "priceNote": "平台价 44 593 грн（原价 89 184 грн，约 €919）",
    "image": "images/ua_GI_GI-chy-bw412q1642-rozovyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bw412q1642-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/2f/fe/2ffe6d7f57a9673329d667babf4790a3/7fa69eb0-c85c-4bfd-9825-c8689a68e9ab.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-ubka-s-vysivkoj-logotipa-givenchy-bw412q1642-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-GI-nchy-bw411615ct-cernyj-ygkkla",
    "code": "i-givenchy-bw411615ct-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "GI",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 839,
    "priceCNY": 6544,
    "priceNote": "平台价 40 704 грн（原价 81 406 грн，约 €839）",
    "image": "images/ua_GI_GI-nchy-bw411615ct-cernyj-.jpg",
    "images": [
      "images/ua_GI_GI-nchy-bw411615ct-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/01/e8/01e8a0a818252b051364b14ba0cc808c/b94baf77-325b-481d-80af-1fa8e9db3480.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-iz-sersti-givenchy-bw411615ct-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-GI-nchy-bw40yp164k-cernyj-1jjr70",
    "code": "s-givenchy-bw40yp164k-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "GI",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1039,
    "priceCNY": 8104,
    "priceNote": "平台价 50 400 грн（原价 83 983 грн，约 €1039）",
    "image": "images/ua_GI_GI-nchy-bw40yp164k-cernyj-.jpg",
    "images": [
      "images/ua_GI_GI-nchy-bw40yp164k-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/2e/61/2e612ee6dc9885530963cf770c53a716/c723d12c-e340-4321-a05b-651cd3ba2b40.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-karandas-givenchy-bw40yp164k-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-GI-chy-bw40zw4zsm-rozovyj-1o4u4q",
    "code": "-givenchy-bw40zw4zsm-rozovyj",
    "name": "半裙中长",
    "nameEn": "skirt midi",
    "brand": "GI",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 909,
    "priceCNY": 7090,
    "priceNote": "平台价 44 088 грн（原价 73 479 грн，约 €909）",
    "image": "images/ua_GI_GI-chy-bw40zw4zsm-rozovyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bw40zw4zsm-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/cc/5c/cc5c9b83269a6c82c0d474a8c175a7ac/0c811d62-2dde-40de-873b-1fc8755e515e.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-ubka-medi-s-serstu-alpaki-givenchy-bw40zw4zsm-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-GI-enchy-bw40vn100h-sinij-9rof72",
    "code": "om-givenchy-bw40vn100h-sinij",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "GI",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 976,
    "priceCNY": 7613,
    "priceNote": "平台价 47 320 грн（原价 78 882 грн，约 €976）",
    "image": "images/ua_GI_GI-enchy-bw40vn100h-sinij-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bw40vn100h-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/76/e4/76e4914fd8d1bf29a218afe9b47beb5a/fb79c795-2e4e-496a-a24f-38ca00036184.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-ubka-iz-sersti-s-remeskom-givenchy-bw40vn100h-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 42"
    ],
    "availSizesText": "XS,M"
  },
  {
    "id": "ua-GI-enchy-bw22y64zuu-sinij-6r5jpx",
    "code": "om-givenchy-bw22y64zuu-sinij",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "GI",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1780,
    "priceCNY": 13884,
    "priceNote": "平台价 86 306 грн（原价 123 272 грн，约 €1780）",
    "image": "images/ua_GI_GI-enchy-bw22y64zuu-sinij-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bw22y64zuu-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/46/d0/46d0a8dba4829a042a48986a6258b254/ede11300-929b-4040-8f2f-1eee7545b019.jpg",
    "url": "https://symbol.ua/uk/store/sinee-plate-polo-s-selkom-givenchy-bw22y64zuu-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-GI-chy-bw22ur16qz-zelenyj-1bttkv",
    "code": "-givenchy-bw22ur16qz-zelenyj",
    "name": "连衣裙印花亚麻",
    "nameEn": "dress print linen",
    "brand": "GI",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "亚麻 linen",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 1271,
    "priceCNY": 9914,
    "priceNote": "平台价 61 662 грн（原价 123 272 грн，约 €1271）",
    "image": "images/ua_GI_GI-chy-bw22ur16qz-zelenyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bw22ur16qz-zelenyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/12/1b/121bf9cd13eabb7a8dfc86db0cedc9fe/7b2d8146-f17c-4b59-a10b-85a7b1e615e4.jpg",
    "url": "https://symbol.ua/uk/store/zelenoe-plate-v-print-givenchy-bw22ur16qz-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-GI-chy-bw22rd1634-zelenyj-1c80wt",
    "code": "-givenchy-bw22rd1634-zelenyj",
    "name": "衬衫连衣裙亚麻",
    "nameEn": "shirt dress linen",
    "brand": "GI",
    "category": "dresses",
    "style": "衬衫",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "亚麻 linen",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 1271,
    "priceCNY": 9914,
    "priceNote": "平台价 61 662 грн（原价 123 272 грн，约 €1271）",
    "image": "images/ua_GI_GI-chy-bw22rd1634-zelenyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bw22rd1634-zelenyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/1e/07/1e073f13ddda82cae9c1a3a546178e67/94fc24b3-8bd8-45dd-a1bb-eaeb095ae43a.jpg",
    "url": "https://symbol.ua/uk/store/zelenoe-plate-rubaska-givenchy-bw22rd1634-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-GI-nchy-bw51ah167d-cernyj-1rac5p",
    "code": "i-givenchy-bw51ah167d-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "GI",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1622,
    "priceCNY": 12652,
    "priceNote": "平台价 78 680 грн（约 €1622）",
    "image": "images/ua_GI_GI-nchy-bw51ah167d-cernyj-.jpg",
    "images": [
      "images/ua_GI_GI-nchy-bw51ah167d-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a4/79/a479315f2e68a5c9541f7b138da02b73/15325849-2e0e-4255-9b88-de0e94ff9500.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-givenchy-bw51ah167d-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 42"
    ],
    "availSizesText": "XS,M"
  },
  {
    "id": "ua-GI-nchy-bw51cj167d-cernyj-1luo90",
    "code": "i-givenchy-bw51cj167d-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "GI",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1732,
    "priceCNY": 13510,
    "priceNote": "平台价 83 983 грн（约 €1732）",
    "image": "images/ua_GI_GI-nchy-bw51cj167d-cernyj-.jpg",
    "images": [
      "images/ua_GI_GI-nchy-bw51cj167d-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/ee/27/ee2751809e62ce998782fac8537fbadc/4eac88c5-4cb8-491f-903d-a43bec4e9e88.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-givenchy-bw51cj167d-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-GI-hy-bw518p16q5-bordovyj-nmpkhc",
    "code": "givenchy-bw518p16q5-bordovyj",
    "name": "长裤真丝",
    "nameEn": "trousers silk",
    "brand": "GI",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1083,
    "priceCNY": 8447,
    "priceNote": "平台价 52 520 грн（原价 104 991 грн，约 €1083）",
    "image": "images/ua_GI_GI-hy-bw518p16q5-bordovyj-.jpg",
    "images": [
      "images/ua_GI_GI-hy-bw518p16q5-bordovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/af/fb/affb5d83aafb7ef137a40d20d63eb435/bd05bfaf-c0c8-474a-a83b-d015bb239eb7.jpg",
    "url": "https://symbol.ua/uk/store/bordovye-bruki-iz-selka-givenchy-bw518p16q5-bordovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-GI-chy-bw51ah10q0-bezevyj-e0lm1f",
    "code": "-givenchy-bw51ah10q0-bezevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "GI",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 866,
    "priceCNY": 6755,
    "priceNote": "平台价 42 016 грн（原价 83 983 грн，约 €866）",
    "image": "images/ua_GI_GI-chy-bw51ah10q0-bezevyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bw51ah10q0-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/18/12/18124ce1ae1dbde1c7f17bb357b344e8/7a92d30c-4bc4-4dbd-ae1c-88924248dee5.jpg",
    "url": "https://symbol.ua/uk/store/bruki-cveta-ajvori-iz-sersti-givenchy-bw51ah10q0-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-GI-enchy-bw516z14fu-seryj-p3xk31",
    "code": "ti-givenchy-bw516z14fu-seryj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "GI",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 974,
    "priceCNY": 7597,
    "priceNote": "平台价 47 219 грн（原价 78 680 грн，约 €974）",
    "image": "images/ua_GI_GI-enchy-bw516z14fu-seryj-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bw516z14fu-seryj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/da/98/da98ff9465d9db5c4ffeb165f8da5f81/6902aeb7-8e37-4bb1-9109-21a8b68d3c53.jpg",
    "url": "https://symbol.ua/uk/store/serye-bruki-iz-sersti-givenchy-bw516z14fu-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-GI-enchy-bw515715v5-sinij-zlpzgs",
    "code": "ti-givenchy-bw515715v5-sinij",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "GI",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 870,
    "priceCNY": 6786,
    "priceNote": "平台价 42 218 грн（原价 84 436 грн，约 €870）",
    "image": "images/ua_GI_GI-enchy-bw515715v5-sinij-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bw515715v5-sinij-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/62/ca/62ca99c955b4ebcbc9c5b0c58bd6d756/4313b138-4f7a-44bf-bda3-7963999f8349.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-iz-sersti-givenchy-bw515715v5-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-GI-chy-bw516415yr-bezevyj-osisru",
    "code": "-givenchy-bw516415yr-bezevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "GI",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1122,
    "priceCNY": 8752,
    "priceNote": "平台价 54 440 грн（原价 108 878 грн，约 €1122）",
    "image": "images/ua_GI_GI-chy-bw516415yr-bezevyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bw516415yr-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/07/35/0735fceca434fde5e406650cfde54865/6e91ce81-042b-4794-9df4-9fef7d96c3ec.jpg",
    "url": "https://symbol.ua/uk/store/bezevye-bruki-kles-iz-sersti-givenchy-bw516415yr-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-GI-enchy-bw514v14fu-seryj-1wojqj",
    "code": "ti-givenchy-bw514v14fu-seryj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "GI",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 1044,
    "priceCNY": 8143,
    "priceNote": "平台价 50 653 грн（原价 84 436 грн，约 €1044）",
    "image": "images/ua_GI_GI-enchy-bw514v14fu-seryj-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bw514v14fu-seryj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/ef/75/ef7568ac3c35af248daf5c1458dd875f/8fad1e46-272f-4ce4-8a50-94fd74a16587.jpg",
    "url": "https://symbol.ua/uk/store/serye-bruki-iz-sersti-givenchy-bw514v14fu-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-GI-0q613n5-svetlo-bezevyj-1a5wpb",
    "code": "hy-bw50q613n5-svetlo-bezevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "GI",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 382,
    "priceCNY": 2980,
    "priceNote": "平台价 18 535 грн（原价 46 360 грн，约 €382）",
    "image": "images/ua_GI_GI-0q613n5-svetlo-bezevyj-.jpg",
    "images": [
      "images/ua_GI_GI-0q613n5-svetlo-bezevyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/05/24/0524eaecc1aa7ba3f59a840a1fac10a0/31dbb4f7-9342-4b46-a64f-bd5e838ed9f6.jpg",
    "url": "https://symbol.ua/uk/store/bruki-iz-sersti-givenchy-bw50q613n5-svetlo-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-GI-chy-bw50cn11vs-bezevyj-1ylpik",
    "code": "-givenchy-bw50cn11vs-bezevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "GI",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 431,
    "priceCNY": 3362,
    "priceNote": "平台价 20 908 грн（原价 52 318 грн，约 €431）",
    "image": "images/ua_GI_GI-chy-bw50cn11vs-bezevyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bw50cn11vs-bezevyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/de/5b/de5bf9f0573845729b42ec0c4758427a/47055264-17d7-413c-85e7-bf25ae9722e8.jpg",
    "url": "https://symbol.ua/uk/store/bezevye-bruki-givenchy-bw50cn11vs-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-GI-chy-bwc0ge31eg-bezevyj-l4540o",
    "code": "-givenchy-bwc0ge31eg-bezevyj",
    "name": "大衣印花",
    "nameEn": "coat print",
    "brand": "GI",
    "category": "outer",
    "style": "大衣",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 4217,
    "priceCNY": 32893,
    "priceNote": "平台价 204 526 грн（约 €4217）",
    "image": "images/ua_GI_GI-chy-bwc0ge31eg-bezevyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bwc0ge31eg-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/13/45/1345f3eeca664b5736d92633b7c8b1c4/43be89b2-22fa-435e-b622-86678c432e8e.jpg",
    "url": "https://symbol.ua/uk/store/palto-v-leopardovyj-print-givenchy-bwc0ge31eg-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XS"
  },
  {
    "id": "ua-GI-nchy-bw70fjp7a7-cernyj-o5ct0r",
    "code": "p-givenchy-bw70fjp7a7-cernyj",
    "name": "T恤印花",
    "nameEn": "T-shirt print",
    "brand": "GI",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 409,
    "priceCNY": 3190,
    "priceNote": "平台价 19 848 грн（原价 28 382 грн，约 €409）",
    "image": "images/ua_GI_GI-nchy-bw70fjp7a7-cernyj-.jpg",
    "images": [
      "images/ua_GI_GI-nchy-bw70fjp7a7-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/78/ec/78ec2197f8a9bde121f5fed4d4a62a02/3b4c0534-394d-412c-952b-4bfa2f58b07a.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-futbolka-s-printom-stamp-givenchy-bw70fjp7a7-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-GI--bw61ns4zvq-koricnevyj-7e3x89",
    "code": "venchy-bw61ns4zvq-koricnevyj",
    "name": "棕色印花",
    "nameEn": "brown print",
    "brand": "GI",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 1175,
    "priceCNY": 9165,
    "priceNote": "平台价 56 964 грн（原价 81 406 грн，约 €1175）",
    "image": "images/ua_GI_GI--bw61ns4zvq-koricnevyj-.jpg",
    "images": [
      "images/ua_GI_GI--bw61ns4zvq-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/53/c7/53c7f607d60a1ea6c3e0d2a2ab3abdb7/baa9d377-f248-405a-bab7-3d2e7449dd4f.jpg",
    "url": "https://symbol.ua/uk/store/koricnevyj-top-v-leopardovyj-print-givenchy-bw61ns4zvq-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-GI-enchy-bw00wj518w-sinij-k1mf44",
    "code": "om-givenchy-bw00wj518w-sinij",
    "name": "带毛皮夹克牛仔",
    "nameEn": "with fur jacket denim",
    "brand": "GI",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 2460,
    "priceCNY": 19188,
    "priceNote": "平台价 119 333 грн（原价 170 439 грн，约 €2460）",
    "image": "images/ua_GI_GI-enchy-bw00wj518w-sinij-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bw00wj518w-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/6a/e8/6ae81c409578294eea06c68e51da18d4/8e5704c2-e7db-416f-8727-6a6f6c99f37c.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-dzinsovaa-kurtka-s-mehom-givenchy-bw00wj518w-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-GI-chy-bwc0gx31eg-bezevyj-402n7g",
    "code": "-givenchy-bwc0gx31eg-bezevyj",
    "name": "大衣印花",
    "nameEn": "coat print",
    "brand": "GI",
    "category": "outer",
    "style": "大衣",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 2460,
    "priceCNY": 19188,
    "priceNote": "平台价 119 333 грн（原价 170 439 грн，约 €2460）",
    "image": "images/ua_GI_GI-chy-bwc0gx31eg-bezevyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bwc0gx31eg-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8f/e7/8fe777015d6a7aa2af5e4c3784d43f88/23b0c81f-b5e9-4b84-9d21-3c8c8ea6ac4f.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-palto-v-leopardovyj-print-givenchy-bwc0gx31eg-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XS"
  },
  {
    "id": "ua-GI-enchy-bwc0ga151k-seryj-1ld0i8",
    "code": "ra-givenchy-bwc0ga151k-seryj",
    "name": "大衣",
    "nameEn": "coat",
    "brand": "GI",
    "category": "outer",
    "style": "大衣",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 2952,
    "priceCNY": 23026,
    "priceNote": "平台价 143 169 грн（原价 204 526 грн，约 €2952）",
    "image": "images/ua_GI_GI-enchy-bwc0ga151k-seryj-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bwc0ga151k-seryj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/08/d4/08d4b0d7cb2da644b93916271f24bf36/d7abdc22-6ee6-4522-8fb0-4a17aec0705d.jpg",
    "url": "https://symbol.ua/uk/store/seroe-palto-iz-sersti-i-kasemira-givenchy-bwc0ga151k-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XS"
  },
  {
    "id": "ua-GI-enchy-bw70ge30zp-belyj-p17ojb",
    "code": "op-givenchy-bw70ge30zp-belyj",
    "name": "白色",
    "nameEn": "white",
    "brand": "GI",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 500,
    "priceCNY": 3900,
    "priceNote": "平台价 24 240 грн（原价 34 644 грн，约 €500）",
    "image": "images/ua_GI_GI-enchy-bw70ge30zp-belyj-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bw70ge30zp-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/88/2b/882bd5105b002dd53c5cfebf311e2003/09a4c6e1-731d-4f04-8e76-9b17d08f0634.jpg",
    "url": "https://symbol.ua/uk/store/belyj-top-givenchy-bw70ge30zp-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-GI-chy-bw70ge30zp-rozovyj-ccqxil",
    "code": "-givenchy-bw70ge30zp-rozovyj",
    "name": "粉色",
    "nameEn": "pink",
    "brand": "GI",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 500,
    "priceCNY": 3900,
    "priceNote": "平台价 24 240 грн（原价 34 644 грн，约 €500）",
    "image": "images/ua_GI_GI-chy-bw70ge30zp-rozovyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bw70ge30zp-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/cd/64/cd648a60d9e3765639d00a525bbd8d52/ec4195c6-233d-4e53-9257-52ba1fb8350d.jpg",
    "url": "https://symbol.ua/uk/store/rozovyj-top-givenchy-bw70ge30zp-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-GI-enchy-bw5190517b-sinij-1pcage",
    "code": "tc-givenchy-bw5190517b-sinij",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "GI",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 541,
    "priceCNY": 4220,
    "priceNote": "平台价 26 260 грн（原价 52 520 грн，约 €541）",
    "image": "images/ua_GI_GI-enchy-bw5190517b-sinij-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bw5190517b-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/e7/fe/e7fed6328e2721b93e4a6deee50fcdf3/fabbacb7-8b87-4fef-9ef8-b81ea03390fb.jpg",
    "url": "https://symbol.ua/uk/store/sinie-dzinsy-s-logotip-patc-givenchy-bw5190517b-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-GI-enchy-bw51b9516t-belyj-1afsrm",
    "code": "mi-givenchy-bw51b9516t-belyj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "GI",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 758,
    "priceCNY": 5912,
    "priceNote": "平台价 36 764 грн（原价 73 479 грн，约 €758）",
    "image": "images/ua_GI_GI-enchy-bw51b9516t-belyj-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bw51b9516t-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8e/f7/8ef79a11894af05c90b5975c9db1ecf4/b2c0cc0c-190e-4d39-8905-1dc4e7373ea6.jpg",
    "url": "https://symbol.ua/uk/store/belye-dzinsy-s-otvorotami-givenchy-bw51b9516t-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-GI-enchy-bw70fmp7a3-belyj-336nmk",
    "code": "om-givenchy-bw70fmp7a3-belyj",
    "name": "T恤印花",
    "nameEn": "T-shirt print",
    "brand": "GI",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 357,
    "priceCNY": 2785,
    "priceNote": "平台价 17 323 грн（原价 34 644 грн，约 €357）",
    "image": "images/ua_GI_GI-enchy-bw70fmp7a3-belyj-.jpg",
    "images": [
      "images/ua_GI_GI-enchy-bw70fmp7a3-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a3/03/a3038eb40cf339a9e467eacd6a550611/c11bca7f-9208-4bed-95ff-1976e6d2fa57.jpg",
    "url": "https://symbol.ua/uk/store/belaa-futbolka-s-printom-givenchy-bw70fmp7a3-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-GI-chy-bw61k21642-rozovyj-3r27jd",
    "code": "-givenchy-bw61k21642-rozovyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "GI",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 785,
    "priceCNY": 6123,
    "priceNote": "平台价 38 078 грн（原价 76 105 грн，约 €785）",
    "image": "images/ua_GI_GI-chy-bw61k21642-rozovyj-.jpg",
    "images": [
      "images/ua_GI_GI-chy-bw61k21642-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/97/53/97534233af4c5459750bb879af4c4e35/e5c9eb74-79a0-4935-85a7-b707c50461ef.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-rubaska-givenchy-bw61k21642-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-YS-ent-871009y77lf-cernyj-lds5cy",
    "code": "t-laurent-871009y77lf-cernyj",
    "name": "羊绒黑色针织衫",
    "nameEn": "cashmere black knitwear",
    "brand": "YS",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1574,
    "priceCNY": 12277,
    "priceNote": "平台价 76 356 грн（约 €1574）",
    "image": "images/ua_YS_YS-ent-871009y77lf-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-871009y77lf-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/43/47/4347411b0cec617f0197bb75be83b426/bd7110a2-aef0-4c61-bfe5-03052894261c.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-sviter-iz-kasemira-saint-laurent-871009y77lf-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-YS-863811ycvd2-koricnevyj-3gpj20",
    "code": "urent-863811ycvd2-koricnevyj",
    "name": "系带半裙",
    "nameEn": "with belt skirt",
    "brand": "YS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 3563,
    "priceCNY": 27791,
    "priceNote": "平台价 172 812 грн（原价 288 052 грн，约 €3563）",
    "image": "images/ua_YS_YS-863811ycvd2-koricnevyj-.jpg",
    "images": [
      "images/ua_YS_YS-863811ycvd2-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/12/3a/123a67f07baf3b94504061650700ba01/1feee0c4-147a-4387-923d-f5843fd8c3e5.jpg",
    "url": "https://symbol.ua/uk/store/koricnevaa-kozanaa-ubka-s-poasom-saint-laurent-863811ycvd2-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-YS-ent-863981y1k44-cernyj-b2vtd8",
    "code": "t-laurent-863981y1k44-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "YS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1865,
    "priceCNY": 14547,
    "priceNote": "平台价 90 447 грн（原价 129 231 грн，约 €1865）",
    "image": "images/ua_YS_YS-ent-863981y1k44-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-863981y1k44-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/ff/1e/ff1eee5ffab1b05a6522f53881a4ff10/b35da107-4e21-4ea9-861f-5a60d440f263.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-karandas-cassandre-saint-laurent-863981y1k44-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-YS-865021ycvd2-koricnevyj-yl9xd",
    "code": "urent-865021ycvd2-koricnevyj",
    "name": "系带半裙",
    "nameEn": "with belt skirt",
    "brand": "YS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 3563,
    "priceCNY": 27791,
    "priceNote": "平台价 172 812 грн（原价 288 052 грн，约 €3563）",
    "image": "images/ua_YS_YS-865021ycvd2-koricnevyj-.jpg",
    "images": [
      "images/ua_YS_YS-865021ycvd2-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/40/2d/402dca4f009eba6f2780a55ed019188e/c19fd7ad-b433-40ef-bceb-bebd63a272d5.jpg",
    "url": "https://symbol.ua/uk/store/koricnevaa-kozanaa-ubka-karandas-s-poasom-saint-laurent-865021ycvd2-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-YS-ent-858255y720w-cernyj-gtqe5x",
    "code": "t-laurent-858255y720w-cernyj",
    "name": "裹身半裙真丝",
    "nameEn": "wrap skirt silk",
    "brand": "YS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 2832,
    "priceCNY": 22090,
    "priceNote": "平台价 137 360 грн（原价 228 918 грн，约 €2832）",
    "image": "images/ua_YS_YS-ent-858255y720w-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-858255y720w-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/b7/77/b777dad97275c7575096f78eedd611fd/b8376829-cd9d-455c-93d2-dee5e4b78d81.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-na-zapah-iz-selka-saint-laurent-858255y720w-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-YS-ent-856886y7j24-zeltyj-15weo4",
    "code": "t-laurent-856886y7j24-zeltyj",
    "name": "蕾丝半裙真丝",
    "nameEn": "lace skirt silk",
    "brand": "YS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黄色",
    "colorHex": "#d9b23a",
    "priceEUR": 1380,
    "priceCNY": 10764,
    "priceNote": "平台价 66 914 грн（原价 111 556 грн，约 €1380）",
    "image": "images/ua_YS_YS-ent-856886y7j24-zeltyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-856886y7j24-zeltyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/9d/bb/9dbb42060ae663bcd7d99098510a4515/55d351ec-deb4-4c66-adb1-dc42a14126e4.jpg",
    "url": "https://symbol.ua/uk/store/zeltaa-ubka-s-selkom-s-kruzevom-saint-laurent-856886y7j24-zeltyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-YS--laurent-492055-cernyj-umq4rx",
    "code": "-saint-laurent-492055-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "YS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 930,
    "priceCNY": 7254,
    "priceNote": "平台价 45 098 грн（原价 112 716 грн，约 €930）",
    "image": "images/ua_YS_YS--laurent-492055-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS--laurent-492055-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/49/fc/49fcc93e6df23ccd5fa12db3b8c7a7d0/8e044175-5a68-41c5-9fd9-bc2a45163e7a.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-iz-sersti-s-kristallami-saint-laurent-492055-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-YS-nt-a003jey1k80-bezevyj-15548c",
    "code": "-laurent-a003jey1k80-bezevyj",
    "name": "带标识提花连衣裙",
    "nameEn": "with logo jacquard dress",
    "brand": "YS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "蕾丝 lace",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 3513,
    "priceCNY": 27401,
    "priceNote": "平台价 170 388 грн（约 €3513）",
    "image": "images/ua_YS_YS-nt-a003jey1k80-bezevyj-.jpg",
    "images": [
      "images/ua_YS_YS-nt-a003jey1k80-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/dc/5f/dc5f868e5616f268f425229c25a02898/1a43c4d2-320a-46f1-b3a1-ba644f730fba.jpg",
    "url": "https://symbol.ua/uk/store/plate-iz-kruzeva-s-uzorom-logotipa-saint-laurent-a003jey1k80-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-YS-t-870951y6k08-bordovyj-o3n59y",
    "code": "laurent-870951y6k08-bordovyj",
    "name": "衬衫连衣裙印花真丝",
    "nameEn": "shirt dress print silk",
    "brand": "YS",
    "category": "dresses",
    "style": "衬衫",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 3304,
    "priceCNY": 25771,
    "priceNote": "平台价 160 238 грн（原价 228 918 грн，约 €3304）",
    "image": "images/ua_YS_YS-t-870951y6k08-bordovyj-.jpg",
    "images": [
      "images/ua_YS_YS-t-870951y6k08-bordovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/b6/08/b60850ab06043ec75cfdebabf3d07026/bfe213e9-55d5-46c4-bb7d-2d7c5e73fc66.jpg",
    "url": "https://symbol.ua/uk/store/bordovoe-plate-rubaska-iz-selka-v-geometriceskom-printe-saint-laurent-870951y6k08-bordovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-YS-ent-868281y38ds-cernyj-19pojo",
    "code": "t-laurent-868281y38ds-cernyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "YS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1583,
    "priceCNY": 12347,
    "priceNote": "平台价 76 760 грн（约 €1583）",
    "image": "images/ua_YS_YS-ent-868281y38ds-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-868281y38ds-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/85/c5/85c5506d9150184c9d80380bdf34f981/af86dbd6-c0a8-43b0-b3b2-712c327e93d7.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-s-otkrytoj-spinoj-saint-laurent-868281y38ds-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-YS-ent-819619y012w-cernyj-b4tslc",
    "code": "t-laurent-819619y012w-cernyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "YS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1688,
    "priceCNY": 13166,
    "priceNote": "平台价 81 862 грн（原价 136 402 грн，约 €1688）",
    "image": "images/ua_YS_YS-ent-819619y012w-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-819619y012w-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/c7/fb/c7fb48b8547e4d38361d0b02b5e8c193/f3a317c3-8fff-4009-97ef-6c59a6833923.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-mini-s-otkrytoj-spinoj-saint-laurent-819619y012w-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-YS-851136y6j43-koricnevyj-8k5ege",
    "code": "urent-851136y6j43-koricnevyj",
    "name": "连衣裙印花真丝迷你",
    "nameEn": "dress print silk mini",
    "brand": "YS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 2460,
    "priceCNY": 19188,
    "priceNote": "平台价 119 333 грн（原价 198 921 грн，约 €2460）",
    "image": "images/ua_YS_YS-851136y6j43-koricnevyj-.jpg",
    "images": [
      "images/ua_YS_YS-851136y6j43-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/b8/1b/b81bfaff6cf69b80b56b5484ff0448c9/4629913f-d22b-40e3-b2bf-2494db5ed15b.jpg",
    "url": "https://symbol.ua/uk/store/plate-mini-iz-selka-v-animalisticnyj-print-saint-laurent-851136y6j43-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-YS-y3d23-temno-koricnevyj-p5omxk",
    "code": "670903y3d23-temno-koricnevyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "YS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 954,
    "priceCNY": 7441,
    "priceNote": "平台价 46 258 грн（原价 115 646 грн，约 €954）",
    "image": "images/ua_YS_YS-y3d23-temno-koricnevyj-.jpg",
    "images": [
      "images/ua_YS_YS-y3d23-temno-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/2a/bc/2abca1b0542d69366b7176d535e800d7/7e93e29d-d73c-446b-be8d-cf4d320e32f0.jpg",
    "url": "https://symbol.ua/uk/store/temno-koricnevoe-velurovoe-plate-v-uzor-saint-laurent-670903y3d23-temno-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XL",
    "fitScore": 100,
    "fitSize": "IT 46",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": 3.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 46"
    ],
    "availSizesText": "XL"
  },
  {
    "id": "ua-YS-ent-592241y3a70-cernyj-16i3jk",
    "code": "t-laurent-592241y3a70-cernyj",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "YS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 698,
    "priceCNY": 5444,
    "priceNote": "平台价 33 836 грн（原价 112 716 грн，约 €698）",
    "image": "images/ua_YS_YS-ent-592241y3a70-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-592241y3a70-cernyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/52/e9/52e93de6ff1df3c0f684e8857df31013/c2c61907-6d60-467c-b589-0c6bfc4bc3c2.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-iz-selka-saint-laurent-592241y3a70-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L,XXL",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 44",
      "IT 48"
    ],
    "availSizesText": "L,XXL"
  },
  {
    "id": "ua-YS-urent-545320-oranzevyj-14ythz",
    "code": "int-laurent-545320-oranzevyj",
    "name": "连衣裙印花",
    "nameEn": "dress print",
    "brand": "YS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黄色",
    "colorHex": "#d9b23a",
    "priceEUR": 852,
    "priceCNY": 6646,
    "priceNote": "平台价 41 310 грн（原价 103 222 грн，约 €852）",
    "image": "images/ua_YS_YS-urent-545320-oranzevyj-.jpg",
    "images": [
      "images/ua_YS_YS-urent-545320-oranzevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/ba/81/ba814dd2ad2e2f25f70356875abbf3ef/4bc6e3d3-76a9-42a1-b1bf-9d1f80899231.jpg",
    "url": "https://symbol.ua/uk/store/oranzevoe-plate-na-pleco-v-animalisticnyj-print-saint-laurent-545320-oranzevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 44"
    ],
    "availSizesText": "S,L"
  },
  {
    "id": "ua-YS-a00463y3l22-koricnevyj-hxk9ws",
    "code": "urent-a00463y3l22-koricnevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "YS",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1816,
    "priceCNY": 14165,
    "priceNote": "平台价 88 072 грн（约 €1816）",
    "image": "images/ua_YS_YS-a00463y3l22-koricnevyj-.jpg",
    "images": [
      "images/ua_YS_YS-a00463y3l22-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/19/2d/192d4fc84c4a15fa886b70c9a1c8ba22/17f32d4a-c3eb-4e37-852b-0f80a5a7ba29.jpg",
    "url": "https://symbol.ua/uk/store/bruki-s-serstu-v-uzor-saint-laurent-a00463y3l22-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-YS-873630y19pa-koricnevyj-1homgs",
    "code": "urent-873630y19pa-koricnevyj",
    "name": "天鹅绒长裤",
    "nameEn": "velvet trousers",
    "brand": "YS",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "天鹅绒 velvet",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 1257,
    "priceCNY": 9805,
    "priceNote": "平台价 60 955 грн（约 €1257）",
    "image": "images/ua_YS_YS-873630y19pa-koricnevyj-.jpg",
    "images": [
      "images/ua_YS_YS-873630y19pa-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/01/1d/011d0b744ccc6ed92960a2d242f1d816/c2ca4884-e11d-415e-a6ef-d6882ee93426.jpg",
    "url": "https://symbol.ua/uk/store/koricnevye-velvetovye-bruki-kles-saint-laurent-873630y19pa-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-YS-t-870159y6k08-bordovyj-7adehr",
    "code": "laurent-870159y6k08-bordovyj",
    "name": "长裤印花真丝",
    "nameEn": "trousers print silk",
    "brand": "YS",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1610,
    "priceCNY": 12558,
    "priceNote": "平台价 78 074 грн（原价 111 556 грн，约 €1610）",
    "image": "images/ua_YS_YS-t-870159y6k08-bordovyj-.jpg",
    "images": [
      "images/ua_YS_YS-t-870159y6k08-bordovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/35/04/3504ac6e7ebc09140634821c2ef92ebe/718d6f79-cae8-4a8b-9bc0-6195284c168b.jpg",
    "url": "https://symbol.ua/uk/store/bordovye-bruki-iz-selka-v-geometriceskom-printe-saint-laurent-870159y6k08-bordovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-YS-ent-611057y1a90-cernyj-4jsfn2",
    "code": "t-laurent-611057y1a90-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "YS",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 223,
    "priceCNY": 1739,
    "priceNote": "平台价 10 808 грн（原价 35 956 грн，约 €223）",
    "image": "images/ua_YS_YS-ent-611057y1a90-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-611057y1a90-cernyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/jn/57/ad575c217432f9806f3fd46b0eed8b06/80ea8d08-bf31-4304-a229-fd3bf30eba9c.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-saint-laurent-611057y1a90-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-YS-rent-502533y083s-seryj-16pasd",
    "code": "nt-laurent-502533y083s-seryj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "YS",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 259,
    "priceCNY": 2020,
    "priceNote": "平台价 12 576 грн（原价 41 967 грн，约 €259）",
    "image": "images/ua_YS_YS-rent-502533y083s-seryj-.jpg",
    "images": [
      "images/ua_YS_YS-rent-502533y083s-seryj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/57/3a/573aa17f1e691212a43e535e3f4a491d/c2dd0b09-f6d2-4eaa-9354-3ccd18d12087.jpg",
    "url": "https://symbol.ua/uk/store/serye-bruki-iz-sersti-i-mohera-saint-laurent-502533y083s-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-YS-rent-a0001ry6j98-sinij-kjxao7",
    "code": "nt-laurent-a0001ry6j98-sinij",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "YS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 3513,
    "priceCNY": 27401,
    "priceNote": "平台价 170 388 грн（约 €3513）",
    "image": "images/ua_YS_YS-rent-a0001ry6j98-sinij-.jpg",
    "images": [
      "images/ua_YS_YS-rent-a0001ry6j98-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/71/94/7194fe99ef1fe24082d8919416105a0d/da9e6143-2fac-4b1c-84fd-3c52679eb110.jpg",
    "url": "https://symbol.ua/uk/store/dvuhstoronnaa-kurtka-s-vysivkoj-monogrammy-saint-laurent-a0001ry6j98-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-YS-798780yc2ay-koricnevyj-160thf",
    "code": "urent-798780yc2ay-koricnevyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "YS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "麂皮 suede",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 8181,
    "priceCNY": 63812,
    "priceNote": "平台价 396 780 грн（约 €8181）",
    "image": "images/ua_YS_YS-798780yc2ay-koricnevyj-.jpg",
    "images": [
      "images/ua_YS_YS-798780yc2ay-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/b1/e9/b1e90d74b7fbf8fc07e0ec7f2d8bebee/0acf653b-6ea2-4aaf-aeef-2d559cca901a.jpg",
    "url": "https://symbol.ua/uk/store/koricnevaa-zamsevaa-kurtka-saint-laurent-798780yc2ay-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-YS-rent-874269y18ha-sinij-iookhc",
    "code": "nt-laurent-874269y18ha-sinij",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "YS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1785,
    "priceCNY": 13923,
    "priceNote": "平台价 86 558 грн（约 €1785）",
    "image": "images/ua_YS_YS-rent-874269y18ha-sinij-.jpg",
    "images": [
      "images/ua_YS_YS-rent-874269y18ha-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/f6/2e/f62e50b4f6ae718c89173bb30e72618a/03ded757-fabc-4c3f-b39f-bf6382fc27c3.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-kurtka-dzinsovaa-s-patcem-logotipa-saint-laurent-874269y18ha-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-YS-nt-873662y863o-goluboj-ljd3wi",
    "code": "-laurent-873662y863o-goluboj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "YS",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "天蓝",
    "colorHex": "#8fb0d0",
    "priceEUR": 1309,
    "priceCNY": 10210,
    "priceNote": "平台价 63 480 грн（约 €1309）",
    "image": "images/ua_YS_YS-nt-873662y863o-goluboj-.jpg",
    "images": [
      "images/ua_YS_YS-nt-873662y863o-goluboj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/02/1b/021bea8d8e001bbfb6f194d317f2d345/a7ff57b9-d2af-4e8a-a693-42d86003540a.jpg",
    "url": "https://symbol.ua/uk/store/golubye-dzinsy-s-effektom-potertosti-saint-laurent-873662y863o-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-YS-ent-869630y38bd-cernyj-k70zb3",
    "code": "t-laurent-869630y38bd-cernyj",
    "name": "T恤",
    "nameEn": "T-shirt",
    "brand": "YS",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 729,
    "priceCNY": 5686,
    "priceNote": "平台价 35 350 грн（约 €729）",
    "image": "images/ua_YS_YS-ent-869630y38bd-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-869630y38bd-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/b1/c2/b1c2eeaad883a4531a9157a4b15f7ec6/f6a006b5-ff68-4cf5-85c1-dff99e4afbae.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-futbolka-s-vysivkoj-monogrammy-saint-laurent-869630y38bd-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 44"
    ],
    "availSizesText": "S,L"
  },
  {
    "id": "ua-YS-rent-a0044zy76tr-sinij-15psgm",
    "code": "nt-laurent-a0044zy76tr-sinij",
    "name": "开衫蓝色",
    "nameEn": "cardigan blue",
    "brand": "YS",
    "category": "tops",
    "style": "开衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 2300,
    "priceCNY": 17940,
    "priceNote": "平台价 111 556 грн（约 €2300）",
    "image": "images/ua_YS_YS-rent-a0044zy76tr-sinij-.jpg",
    "images": [
      "images/ua_YS_YS-rent-a0044zy76tr-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/b5/83/b58305649f33163a2b89358aa52d84aa/4ffeaaaf-951a-4fc1-8db7-b79bbabc8fb6.jpg",
    "url": "https://symbol.ua/uk/store/sinij-kardigan-iz-sersti-saint-laurent-a0044zy76tr-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-YS-rent-864599y9j21-belyj-1xcxbt",
    "code": "nt-laurent-864599y9j21-belyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "YS",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1152,
    "priceCNY": 8986,
    "priceNote": "平台价 55 854 грн（约 €1152）",
    "image": "images/ua_YS_YS-rent-864599y9j21-belyj-.jpg",
    "images": [
      "images/ua_YS_YS-rent-864599y9j21-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/9e/da/9eda44f89d3162c8145586984d5c1df7/88a8fd5b-eb52-4f85-a4a8-77b8b559fa6b.jpg",
    "url": "https://symbol.ua/uk/store/belaa-rubaska-s-vysivkoj-cassandre-saint-laurent-864599y9j21-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-YS-ent-876892ycqt2-cernyj-14noe0",
    "code": "t-laurent-876892ycqt2-cernyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "YS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 9498,
    "priceCNY": 74084,
    "priceNote": "平台价 460 662 грн（约 €9498）",
    "image": "images/ua_YS_YS-ent-876892ycqt2-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-876892ycqt2-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d4/92/d49203a31bb8b311491fc55bee0be5a4/c78d6d94-c7f3-4d0a-ab0c-8f3f5f616ac8.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-kozanaa-dvubortnaa-kurtka-saint-laurent-876892ycqt2-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-YS-ent-827965y29wb-cernyj-1sz2z7",
    "code": "t-laurent-827965y29wb-cernyj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "YS",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1178,
    "priceCNY": 9188,
    "priceNote": "平台价 57 117 грн（约 €1178）",
    "image": "images/ua_YS_YS-ent-827965y29wb-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-827965y29wb-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/0b/cc/0bccb74806be313fff9739b0c4e21f6d/9c735d3f-3664-47cb-9abe-7150a480495d.jpg",
    "url": "https://symbol.ua/uk/store/cernye-dzinsy-s-logotip-patc-saint-laurent-827965y29wb-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-YS-785562yc2ay-koricnevyj-1fwgzx",
    "code": "urent-785562yc2ay-koricnevyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "YS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "麂皮 suede",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 7653,
    "priceCNY": 59693,
    "priceNote": "平台价 371 176 грн（约 €7653）",
    "image": "images/ua_YS_YS-785562yc2ay-koricnevyj-.jpg",
    "images": [
      "images/ua_YS_YS-785562yc2ay-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a5/d0/a5d0d09b38821a7fe00e84feb2c148f0/6406b118-879a-4d7c-be1d-88ad7020e735.jpg",
    "url": "https://symbol.ua/uk/store/zamsevaa-kurtka-koricnevogo-cveta-saint-laurent-785562yc2ay-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 84,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-YS-rent-866496y2n27-belyj-1cx3mg",
    "code": "nt-laurent-866496y2n27-belyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "YS",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1152,
    "priceCNY": 8986,
    "priceNote": "平台价 55 854 грн（约 €1152）",
    "image": "images/ua_YS_YS-rent-866496y2n27-belyj-.jpg",
    "images": [
      "images/ua_YS_YS-rent-866496y2n27-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/b4/8b/b48bd67649309061cabb1cf36a63e58b/01a3e9db-9de8-4198-89d1-75c078e1128c.jpg",
    "url": "https://symbol.ua/uk/store/rubaska-v-polosku-s-vysivkoj-logotipa-monogrammy-saint-laurent-866496y2n27-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-YS-871430yc2nz-koricnevyj-150was",
    "code": "urent-871430yc2nz-koricnevyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "YS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "麂皮 suede",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 4512,
    "priceCNY": 35194,
    "priceNote": "平台价 218 818 грн（原价 364 662 грн，约 €4512）",
    "image": "images/ua_YS_YS-871430yc2nz-koricnevyj-.jpg",
    "images": [
      "images/ua_YS_YS-871430yc2nz-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/7d/58/7d58e7c636ae8a8bc9381bee8a805953/11af1797-f2c0-44d6-8f62-252cabd5eb42.jpg",
    "url": "https://symbol.ua/uk/store/koricnevaa-zamsevaa-kurtka-saint-laurent-871430yc2nz-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-YS-nt-834135y33wd-bezevyj-owrsw0",
    "code": "-laurent-834135y33wd-bezevyj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "YS",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 880,
    "priceCNY": 6864,
    "priceNote": "平台价 42 674 грн（原价 60 955 грн，约 €880）",
    "image": "images/ua_YS_YS-nt-834135y33wd-bezevyj-.jpg",
    "images": [
      "images/ua_YS_YS-nt-834135y33wd-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/0d/ab/0dab975574eba62c28edb3262a9e2cc0/522d1b07-5458-48df-bf7b-88e448e5bdec.jpg",
    "url": "https://symbol.ua/uk/store/bezevye-dzinsy-s-patcem-saint-laurent-834135y33wd-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-YS-nt-813269y35aq-goluboj-1bjnfv",
    "code": "-laurent-813269y35aq-goluboj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "YS",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "天蓝",
    "colorHex": "#8fb0d0",
    "priceEUR": 788,
    "priceCNY": 6146,
    "priceNote": "平台价 38 230 грн（原价 54 592 грн，约 €788）",
    "image": "images/ua_YS_YS-nt-813269y35aq-goluboj-.jpg",
    "images": [
      "images/ua_YS_YS-nt-813269y35aq-goluboj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/af/28/af28cb492521b283176ffb8bd3386576/c57be74d-aa37-4e5b-81f5-778e42fdcd8a.jpg",
    "url": "https://symbol.ua/uk/store/golubye-dzinsy-s-effektom-potertosti-saint-laurent-813269y35aq-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-YS-rent-870726y1h48-belyj-6qdy3",
    "code": "nt-laurent-870726y1h48-belyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "YS",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1380,
    "priceCNY": 10764,
    "priceNote": "平台价 66 914 грн（原价 111 556 грн，约 €1380）",
    "image": "images/ua_YS_YS-rent-870726y1h48-belyj-.jpg",
    "images": [
      "images/ua_YS_YS-rent-870726y1h48-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a0/6c/a06c8fe16ed9efa9645a26180fa60614/b07d0055-d0b3-40bd-a1aa-4875be09e11b.jpg",
    "url": "https://symbol.ua/uk/store/belaa-rubaska-s-akcentnym-vorotnikom-saint-laurent-870726y1h48-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-YS-ent-863984y1k44-cernyj-1j3y2n",
    "code": "t-laurent-863984y1k44-cernyj",
    "name": "黑色",
    "nameEn": "black",
    "brand": "YS",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1163,
    "priceCNY": 9071,
    "priceNote": "平台价 56 410 грн（原价 94 032 грн，约 €1163）",
    "image": "images/ua_YS_YS-ent-863984y1k44-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-863984y1k44-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/16/61/16613ac40e08866f324789939b39fa35/772c6d83-2960-4120-bd88-f07df7742277.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-top-saint-laurent-863984y1k44-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-YS-rent-865302y1h48-belyj-7j32ux",
    "code": "nt-laurent-865302y1h48-belyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "YS",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1308,
    "priceCNY": 10202,
    "priceNote": "平台价 63 428 грн（原价 105 748 грн，约 €1308）",
    "image": "images/ua_YS_YS-rent-865302y1h48-belyj-.jpg",
    "images": [
      "images/ua_YS_YS-rent-865302y1h48-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/6f/f0/6ff00e62a565e753135e58b946035439/e5648226-fe8f-4b62-ab26-f2071417873c.jpg",
    "url": "https://symbol.ua/uk/store/belaa-rubaska-s-vorotnikom-askotom-saint-laurent-865302y1h48-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-YS-ent-862601y37ze-cernyj-ht1b3p",
    "code": "t-laurent-862601y37ze-cernyj",
    "name": "黑色",
    "nameEn": "black",
    "brand": "YS",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 548,
    "priceCNY": 4274,
    "priceNote": "平台价 26 564 грн（原价 44 238 грн，约 €548）",
    "image": "images/ua_YS_YS-ent-862601y37ze-cernyj-.jpg",
    "images": [
      "images/ua_YS_YS-ent-862601y37ze-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a3/a5/a3a520039a645449c442e6658b8c45f2/3f2b7c40-05e0-437a-8b12-f9c7f6b793d1.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-top-s-vorotnikom-polo-saint-laurent-862601y37ze-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-YS-nt-823603y37ec-bezevyj-1len0s",
    "code": "-laurent-823603y37ec-bezevyj",
    "name": "女装",
    "nameEn": "Бежева майка в рубчик",
    "brand": "YS",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 729,
    "priceCNY": 5686,
    "priceNote": "平台价 35 350 грн（约 €729）",
    "image": "images/ua_YS_YS-nt-823603y37ec-bezevyj-.jpg",
    "images": [
      "images/ua_YS_YS-nt-823603y37ec-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/06/3e/063e8a6c7d1e477836816296cfadffc9/e09bb1fe-183d-40e2-87cb-42c9977de8c2.jpg",
    "url": "https://symbol.ua/uk/store/bezevyj-top-v-rubcik-saint-laurent-823603y37ec-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS-10209231a14757-bezevyj-1k8k1h",
    "code": "rsace-10209231a14757-bezevyj",
    "name": "带标识提花米色针织衫",
    "nameEn": "with logo jacquard beige knitwear",
    "brand": "VS",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 611,
    "priceCNY": 4766,
    "priceNote": "平台价 29 645 грн（原价 59 238 грн，约 €611）",
    "image": "images/ua_VS_VS-10209231a14757-bezevyj-.jpg",
    "images": [
      "images/ua_VS_VS-10209231a14757-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/f8/26/f826ee482d25bef8e4574a2adcc784e2/5f004d58-8e0b-463c-8404-0333929304bd.jpg",
    "url": "https://symbol.ua/uk/store/bezevyj-sviter-s-uzorom-logotipa-versace-10209231a14757-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VS--10258811a17669-cernyj-fygvor",
    "code": "ersace-10258811a17669-cernyj",
    "name": "半裙百褶",
    "nameEn": "skirt pleated",
    "brand": "VS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 742,
    "priceCNY": 5788,
    "priceNote": "平台价 36 008 грн（原价 51 410 грн，约 €742）",
    "image": "images/ua_VS_VS--10258811a17669-cernyj-.jpg",
    "images": [
      "images/ua_VS_VS--10258811a17669-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d0/cc/d0cc19d766203ebc31bb24a9524f45bc/e3806961-4faf-4a3c-a243-1f161bb08b21.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-plisse-iz-sersti-versace-10258811a17669-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VS--10257741a18357-cernyj-1kkjb1",
    "code": "ersace-10257741a18357-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "VS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 577,
    "priceCNY": 4501,
    "priceNote": "平台价 27 978 грн（原价 39 947 грн，约 €577）",
    "image": "images/ua_VS_VS--10257741a18357-cernyj-.jpg",
    "images": [
      "images/ua_VS_VS--10257741a18357-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/b8/f0/b8f0bf96137629d7d9b202ebbae6d537/de055a82-1471-46b0-8af5-7a87aa904bee.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-s-vysivkoj-logotipa-versace-10257741a18357-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-VS-46901a17952-koricnevyj-1fexr6",
    "code": "ce-10246901a17952-koricnevyj",
    "name": "半裙印花真丝",
    "nameEn": "skirt print silk",
    "brand": "VS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 584,
    "priceCNY": 4555,
    "priceNote": "平台价 28 332 грн（原价 56 612 грн，约 €584）",
    "image": "images/ua_VS_VS-46901a17952-koricnevyj-.jpg",
    "images": [
      "images/ua_VS_VS-46901a17952-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/e7/4c/e74c8f50f49911c76404138e3013bdef/b90bc9ba-0f12-482f-b5b9-304d7105274f.jpg",
    "url": "https://symbol.ua/uk/store/koricnevaa-ubka-iz-selka-v-print-versace-10246901a17952-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS-10223971a10444-rozovyj-1kl0v2",
    "code": "rsace-10223971a10444-rozovyj",
    "name": "半裙迷你",
    "nameEn": "skirt mini",
    "brand": "VS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 650,
    "priceCNY": 5070,
    "priceNote": "平台价 31 512 грн（原价 62 975 грн，约 €650）",
    "image": "images/ua_VS_VS-10223971a10444-rozovyj-.jpg",
    "images": [
      "images/ua_VS_VS-10223971a10444-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a6/d8/a6d8c65715cbfbbb72972eff717ecabb/ee579918-d56d-4063-ad12-d50485543896.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-ubka-mini-v-kletku-s-serstu-versace-10223971a10444-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VS--10219891a14475-cernyj-y46chp",
    "code": "ersace-10219891a14475-cernyj",
    "name": "裹身半裙中长",
    "nameEn": "wrap skirt midi",
    "brand": "VS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 798,
    "priceCNY": 6224,
    "priceNote": "平台价 38 684 грн（原价 77 366 грн，约 €798）",
    "image": "images/ua_VS_VS--10219891a14475-cernyj-.jpg",
    "images": [
      "images/ua_VS_VS--10219891a14475-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/66/35/6635cb4ca92635053465fb4df8b2524d/21e0e977-2035-4228-ae68-3fb3a55be69b.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-medi-na-zapah-versace-10219891a14475-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VS-10157151a11546-rozovyj-1n89fc",
    "code": "rsace-10157151a11546-rozovyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "VS",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 404,
    "priceCNY": 3151,
    "priceNote": "平台价 19 594 грн（原价 65 348 грн，约 €404）",
    "image": "images/ua_VS_VS-10157151a11546-rozovyj-.jpg",
    "images": [
      "images/ua_VS_VS-10157151a11546-rozovyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/ec/a7/eca7baa9502c9f6808d380c5c19067df/aa939b07-dd12-4c8f-ad80-1648126567d1.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-tvidovaa-ubka-s-metalliceskoj-emblemoj-medusa-versace-10157151a11546-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VS-10254951a18636-krasnyj-1ws14e",
    "code": "rsace-10254951a18636-krasnyj",
    "name": "衬衫连衣裙印花真丝",
    "nameEn": "shirt dress print silk",
    "brand": "VS",
    "category": "dresses",
    "style": "衬衫",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1649,
    "priceCNY": 12862,
    "priceNote": "平台价 79 992 грн（原价 114 283 грн，约 €1649）",
    "image": "images/ua_VS_VS-10254951a18636-krasnyj-.jpg",
    "images": [
      "images/ua_VS_VS-10254951a18636-krasnyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/06/04/0604abbd48e5d3bcbdaea1a1ca3fd202/ff08621e-a6af-4c01-8df8-3ff5ba0e3dcc.jpg",
    "url": "https://symbol.ua/uk/store/plate-rubaska-iz-selka-v-print-versace-10254951a18636-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-VS-e-10256571a18640-sinij-tz4dn",
    "code": "versace-10256571a18640-sinij",
    "name": "系带牛仔连衣裙",
    "nameEn": "with belt denim dress",
    "brand": "VS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1251,
    "priceCNY": 9758,
    "priceNote": "平台价 60 652 грн（原价 86 609 грн，约 €1251）",
    "image": "images/ua_VS_VS-e-10256571a18640-sinij-.jpg",
    "images": [
      "images/ua_VS_VS-e-10256571a18640-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/05/66/05669346000457ae66d1d71f24efe23d/2a871ee2-0c4b-4c25-b1ba-4667ef0cb240.jpg",
    "url": "https://symbol.ua/uk/store/sinee-dzinsovoe-plate-s-poasom-versace-10256571a18640-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-VS-10254981a18643-bezevyj-h3hhep",
    "code": "rsace-10254981a18643-bezevyj",
    "name": "衬衫连衣裙印花真丝",
    "nameEn": "shirt dress print silk",
    "brand": "VS",
    "category": "dresses",
    "style": "衬衫",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1415,
    "priceCNY": 11037,
    "priceNote": "平台价 68 631 грн（原价 98 022 грн，约 €1415）",
    "image": "images/ua_VS_VS-10254981a18643-bezevyj-.jpg",
    "images": [
      "images/ua_VS_VS-10254981a18643-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/2d/c4/2dc4a358eb21b0f51eb42d300bc66c4d/073c28fd-2539-4769-9a72-9eff44a61297.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-plate-rubaska-iz-selka-v-brendovyj-print-versace-10254981a18643-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-VS-10259841a18712-krasnyj-a9qiet",
    "code": "rsace-10259841a18712-krasnyj",
    "name": "带提花连衣裙",
    "nameEn": "with pattern dress",
    "brand": "VS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 817,
    "priceCNY": 6373,
    "priceNote": "平台价 39 644 грн（原价 56 612 грн，约 €817）",
    "image": "images/ua_VS_VS-10259841a18712-krasnyj-.jpg",
    "images": [
      "images/ua_VS_VS-10259841a18712-krasnyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/04/23/04234aac0629a03561cb22da372cfde5/8e260b1a-a8d6-40a9-a15b-bd1c1fa9c76c.jpg",
    "url": "https://symbol.ua/uk/store/krasnoe-plate-s-uzorom-versace-10259841a18712-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-VS-e-10259641a18688-sinij-1injza",
    "code": "versace-10259641a18688-sinij",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "VS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 742,
    "priceCNY": 5788,
    "priceNote": "平台价 36 008 грн（原价 51 410 грн，约 €742）",
    "image": "images/ua_VS_VS-e-10259641a18688-sinij-.jpg",
    "images": [
      "images/ua_VS_VS-e-10259641a18688-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/c0/97/c0976dd95fad406d0e67573b23346b90/6e7c9462-240e-465e-b068-839a30d9a99d.jpg",
    "url": "https://symbol.ua/uk/store/sinee-plate-polo-s-vysivkoj-logotipa-versace-10259641a18688-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VS-46591a17952-koricnevyj-qlxziz",
    "code": "ce-10246591a17952-koricnevyj",
    "name": "连衣裙印花真丝",
    "nameEn": "dress print silk",
    "brand": "VS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 893,
    "priceCNY": 6965,
    "priceNote": "平台价 43 330 грн（原价 86 609 грн，约 €893）",
    "image": "images/ua_VS_VS-46591a17952-koricnevyj-.jpg",
    "images": [
      "images/ua_VS_VS-46591a17952-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d8/63/d863ac804ae8463449d9ab188e87c26a/603620d4-9a3e-4361-9c4c-3fadfd0eb2f2.jpg",
    "url": "https://symbol.ua/uk/store/koricnevoe-plate-iz-selka-v-print-versace-10246591a17952-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-VS-48531a12497-koricnevyj-1jzmjn",
    "code": "ce-10248531a12497-koricnevyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "VS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 1903,
    "priceCNY": 14843,
    "priceNote": "平台价 92 314 грн（原价 184 628 грн，约 €1903）",
    "image": "images/ua_VS_VS-48531a12497-koricnevyj-.jpg",
    "images": [
      "images/ua_VS_VS-48531a12497-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/27/97/279741c67750b3b5e3b968e817691f04/566cda34-8722-49f0-b0f1-9ae2bc23a362.jpg",
    "url": "https://symbol.ua/uk/store/koricnevoe-plate-versace-10248531a12497-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS-e-10226201a13878-belyj-1lyn2e",
    "code": "versace-10226201a13878-belyj",
    "name": "蕾丝衬衫连衣裙",
    "nameEn": "lace shirt dress",
    "brand": "VS",
    "category": "dresses",
    "style": "衬衫",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "蕾丝 lace",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1125,
    "priceCNY": 8775,
    "priceNote": "平台价 54 540 грн（原价 109 080 грн，约 €1125）",
    "image": "images/ua_VS_VS-e-10226201a13878-belyj-.jpg",
    "images": [
      "images/ua_VS_VS-e-10226201a13878-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/f3/fc/f3fcf362768b0835889d6059d78f4f8d/3e883368-57c1-4008-9d28-0f2880a375af.jpg",
    "url": "https://symbol.ua/uk/store/beloe-plate-rubaska-s-kruzevom-versace-10226201a13878-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-VS--10246921a12497-cernyj-13bcfj",
    "code": "ersace-10246921a12497-cernyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "VS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1774,
    "priceCNY": 13837,
    "priceNote": "平台价 86 052 грн（原价 172 055 грн，约 €1774）",
    "image": "images/ua_VS_VS--10246921a12497-cernyj-.jpg",
    "images": [
      "images/ua_VS_VS--10246921a12497-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/50/79/507966920ebb84dea18b9e4e9b97e8e8/2d404343-a7e3-4878-a0fc-2ac15eded96f.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-s-drapirovkoj-versace-10246921a12497-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS-10226181a16514-bezevyj-1jcuh2",
    "code": "rsace-10226181a16514-bezevyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "VS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1160,
    "priceCNY": 9048,
    "priceNote": "平台价 56 258 грн（原价 112 514 грн，约 €1160）",
    "image": "images/ua_VS_VS-10226181a16514-bezevyj-.jpg",
    "images": [
      "images/ua_VS_VS-10226181a16514-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/30/c6/30c6a1298e5ebd364f8c2c722c618ebc/aa9a8a64-ec39-43b0-a6a3-697842451101.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-tvidovoe-plate-v-kletku-versace-10226181a16514-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS-10186221a13636-bezevyj-1c4gwr",
    "code": "rsace-10186221a13636-bezevyj",
    "name": "衬衫连衣裙真丝",
    "nameEn": "shirt dress silk",
    "brand": "VS",
    "category": "dresses",
    "style": "衬衫",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1449,
    "priceCNY": 11302,
    "priceNote": "平台价 70 296 грн（原价 140 543 грн，约 €1449）",
    "image": "images/ua_VS_VS-10186221a13636-bezevyj-.jpg",
    "images": [
      "images/ua_VS_VS-10186221a13636-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/1c/df/1cdf3c520d1c9646b4124bf5f08b9fc9/50fc5eb1-9e79-471f-967e-e6010b3eb07c.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-plate-rubaska-chain-stripes-iz-selka-versace-10186221a13636-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XL,XXL",
    "fitScore": 100,
    "fitSize": "IT 46",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": 3.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 46",
      "IT 48"
    ],
    "availSizesText": "XL,XXL"
  },
  {
    "id": "ua-VS-e-10199521a14437-seryj-djmv74",
    "code": "versace-10199521a14437-seryj",
    "name": "衬衫连衣裙印花真丝",
    "nameEn": "shirt dress print silk",
    "brand": "VS",
    "category": "dresses",
    "style": "衬衫",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 1229,
    "priceCNY": 9586,
    "priceNote": "平台价 59 590 грн（原价 119 180 грн，约 €1229）",
    "image": "images/ua_VS_VS-e-10199521a14437-seryj-.jpg",
    "images": [
      "images/ua_VS_VS-e-10199521a14437-seryj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/15/1f/151feb0b0686e131733dea696a4e8bd2/f0d09195-994f-44f3-b327-5e6d0f14d04f.jpg",
    "url": "https://symbol.ua/uk/store/seroe-plate-rubaska-iz-selka-v-print-versace-10199521a14437-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VS-321a13465-raznocvetnyj-9zluuo",
    "code": "-10189321a13465-raznocvetnyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "VS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1141,
    "priceCNY": 8900,
    "priceNote": "平台价 55 348 грн（原价 110 696 грн，约 €1141）",
    "image": "images/ua_VS_VS-321a13465-raznocvetnyj-.jpg",
    "images": [
      "images/ua_VS_VS-321a13465-raznocvetnyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/41/d0/41d0a04ff021303b73210097c589936b/ebc1e0b9-041a-4062-a51f-3c9a2297c557.jpg",
    "url": "https://symbol.ua/uk/store/tvidovoe-plate-mini-s-lureksom-versace-10189321a13465-raznocvetnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS--10186231a12369-cernyj-1wwsr7",
    "code": "ersace-10186231a12369-cernyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "VS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 981,
    "priceCNY": 7652,
    "priceNote": "平台价 47 572 грн（原价 95 142 грн，约 €981）",
    "image": "images/ua_VS_VS--10186231a12369-cernyj-.jpg",
    "images": [
      "images/ua_VS_VS--10186231a12369-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/4b/25/4b25958c1c52077f5d5c75e399a08db5/fe1980fd-59ca-48df-90db-bbb42887204c.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-mini-so-spilkoj-versace-10186231a12369-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VS-10189331a13638-bezevyj-g9en9c",
    "code": "rsace-10189331a13638-bezevyj",
    "name": "衬衫连衣裙印花真丝",
    "nameEn": "shirt dress print silk",
    "brand": "VS",
    "category": "dresses",
    "style": "衬衫",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1327,
    "priceCNY": 10351,
    "priceNote": "平台价 64 338 грн（原价 128 674 грн，约 €1327）",
    "image": "images/ua_VS_VS-10189331a13638-bezevyj-.jpg",
    "images": [
      "images/ua_VS_VS-10189331a13638-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/2c/24/2c24a2c047d6483fff3427400b9a225a/5da7df6f-e0c5-4087-b28a-0997b2300186.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-plate-rubaska-iz-selka-v-print-versace-10189331a13638-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-VS--10177731a12700-cernyj-1ffhov",
    "code": "ersace-10177731a12700-cernyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "VS",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 895,
    "priceCNY": 6981,
    "priceNote": "平台价 43 430 грн（原价 86 811 грн，约 €895）",
    "image": "images/ua_VS_VS--10177731a12700-cernyj-.jpg",
    "images": [
      "images/ua_VS_VS--10177731a12700-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/ee/c3/eec35f57b634faf67f5d73ef22789b71/e4608561-11f6-4071-8175-28fcaf0aca5f.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-mini-s-serstu-s-brendovymi-spilkami-versace-10177731a12700-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS-0258841a19180-bordovyj-1axr2f",
    "code": "sace-10258841a19180-bordovyj",
    "name": "天鹅绒长裤",
    "nameEn": "velvet trousers",
    "brand": "VS",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "天鹅绒 velvet",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1546,
    "priceCNY": 12059,
    "priceNote": "平台价 74 994 грн（约 €1546）",
    "image": "images/ua_VS_VS-0258841a19180-bordovyj-.jpg",
    "images": [
      "images/ua_VS_VS-0258841a19180-bordovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/36/27/36271a24f4aa20a206e031cfa3379665/ea1ddf27-d46b-4809-9ebf-1caccb954b73.jpg",
    "url": "https://symbol.ua/uk/store/bordovye-velvetovye-stany-versace-10258841a19180-bordovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS-e-10237921a17669-seryj-unnc9k",
    "code": "versace-10237921a17669-seryj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VS",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 584,
    "priceCNY": 4555,
    "priceNote": "平台价 28 332 грн（原价 56 612 грн，约 €584）",
    "image": "images/ua_VS_VS-e-10237921a17669-seryj-.jpg",
    "images": [
      "images/ua_VS_VS-e-10237921a17669-seryj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d8/bb/d8bb89fa464e0c1957ae97fc698a8ffe/2c539009-0182-4fdb-a933-fa42988b90a8.jpg",
    "url": "https://symbol.ua/uk/store/serye-bruki-iz-sersti-i-mohera-versace-10237921a17669-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS--10201281a14794-cernyj-1mhtdk",
    "code": "ersace-10201281a14794-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VS",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 550,
    "priceCNY": 4290,
    "priceNote": "平台价 26 664 грн（原价 53 328 грн，约 €550）",
    "image": "images/ua_VS_VS--10201281a14794-cernyj-.jpg",
    "images": [
      "images/ua_VS_VS--10201281a14794-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/88/1a/881a8f43843255d51d416c27304585f1/ccc055f9-432a-44df-8cff-5273456fd3cf.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-s-emblemoj-medusa-versace-10201281a14794-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-VS-e-10204641a14817-seryj-zm85jj",
    "code": "versace-10204641a14817-seryj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VS",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 611,
    "priceCNY": 4766,
    "priceNote": "平台价 29 645 грн（原价 59 238 грн，约 €611）",
    "image": "images/ua_VS_VS-e-10204641a14817-seryj-.jpg",
    "images": [
      "images/ua_VS_VS-e-10204641a14817-seryj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/c2/12/c212fac912b570fb63a1917781e32b6a/f088e68a-c7ed-41c3-8470-1fd2b139aa21.jpg",
    "url": "https://symbol.ua/uk/store/serye-melanzevye-sportivnye-stany-s-kasemirom-versace-10204641a14817-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XXS,S,M"
  },
  {
    "id": "ua-VS--10201291a14592-cernyj-14359y",
    "code": "ersace-10201291a14592-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "VS",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 735,
    "priceCNY": 5733,
    "priceNote": "平台价 35 654 грн（原价 71 257 грн，约 €735）",
    "image": "images/ua_VS_VS--10201291a14592-cernyj-.jpg",
    "images": [
      "images/ua_VS_VS--10201291a14592-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/4b/90/4b90412dd3499b282002a8b8725723d0/c6c2166a-b5e8-4f2f-a6df-4b08997c29e5.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-versace-10201291a14592-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS-10270091a18782-bezevyj-1u9oxh",
    "code": "rsace-10270091a18782-bezevyj",
    "name": "系带夹克",
    "nameEn": "with belt jacket",
    "brand": "VS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 2406,
    "priceCNY": 18767,
    "priceNote": "平台价 116 707 грн（原价 166 752 грн，约 €2406）",
    "image": "images/ua_VS_VS-10270091a18782-bezevyj-.jpg",
    "images": [
      "images/ua_VS_VS-10270091a18782-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/57/ff/57ff38d740839d16b9b41e910f6e470d/be10debb-edea-49c9-aed8-ac295dc6d9d4.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-kurtka-s-poasom-versace-10270091a18782-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XS"
  },
  {
    "id": "ua-VS-57041a18380-koricnevyj-1t0c1u",
    "code": "ce-10257041a18380-koricnevyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "VS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "麂皮 suede",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 2917,
    "priceCNY": 22753,
    "priceNote": "平台价 141 452 грн（原价 202 052 грн，约 €2917）",
    "image": "images/ua_VS_VS-57041a18380-koricnevyj-.jpg",
    "images": [
      "images/ua_VS_VS-57041a18380-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/42/3d/423dcab42e89b027322f2c49d64611ab/18b1bbaa-462b-4330-aaea-c04d092258df.jpg",
    "url": "https://symbol.ua/uk/store/koricnevaa-zamsevaa-kurtka-medusa-versace-10257041a18380-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS-e-10256581a18404-sinij-6zsu1k",
    "code": "versace-10256581a18404-sinij",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "VS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1499,
    "priceCNY": 11692,
    "priceNote": "平台价 72 720 грн（原价 103 880 грн，约 €1499）",
    "image": "images/ua_VS_VS-e-10256581a18404-sinij-.jpg",
    "images": [
      "images/ua_VS_VS-e-10256581a18404-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/6c/09/6c09530bc4d287678a877a5f469db4f7/4e8a8d6a-2b4d-4e25-a4c0-164a388ba318.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-dzinsovaa-kurtka-versace-10256581a18404-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 84,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-VS-e-10251021a19189-sinij-13fjcc",
    "code": "versace-10251021a19189-sinij",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "VS",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 708,
    "priceCNY": 5522,
    "priceNote": "平台价 34 340 грн（原价 49 086 грн，约 €708）",
    "image": "images/ua_VS_VS-e-10251021a19189-sinij-.jpg",
    "images": [
      "images/ua_VS_VS-e-10251021a19189-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/27/92/2792f031e321eb4b0a2ee45a869bbe71/6a160dda-f595-486a-9b03-2cf3b629a2e4.jpg",
    "url": "https://symbol.ua/uk/store/sinie-dzinsy-s-effektom-potertosti-versace-10251021a19189-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-VS-10257221a17823-goluboj-1dvkk0",
    "code": "rsace-10257221a17823-goluboj",
    "name": "T恤",
    "nameEn": "T-shirt",
    "brand": "VS",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "天蓝",
    "colorHex": "#8fb0d0",
    "priceEUR": 742,
    "priceCNY": 5788,
    "priceNote": "平台价 36 008 грн（原价 51 410 грн，约 €742）",
    "image": "images/ua_VS_VS-10257221a17823-goluboj-.jpg",
    "images": [
      "images/ua_VS_VS-10257221a17823-goluboj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/47/07/4707f5bc74a1ab0a3299b561f8a0b2bd/8b1fcb22-2d6d-4ed5-a8f0-f330a1cdecf1.jpg",
    "url": "https://symbol.ua/uk/store/golubaa-futbolka-iz-sersti-s-vysivkoj-logotipa-versace-10257221a17823-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-VS--10253561a18357-cernyj-1l9lss",
    "code": "ersace-10253561a18357-cernyj",
    "name": "黑色",
    "nameEn": "black",
    "brand": "VS",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 493,
    "priceCNY": 3845,
    "priceNote": "平台价 23 888 грн（原价 34 089 грн，约 €493）",
    "image": "images/ua_VS_VS--10253561a18357-cernyj-.jpg",
    "images": [
      "images/ua_VS_VS--10253561a18357-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/cf/ab/cfabf4033907445c5563bca28637aad4/49132343-8297-43ca-ba1c-f49be07713d9.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-top-s-vysivkoj-logotipa-versace-10253561a18357-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-VS-e-10226941a16751-sinij-1n7bf1",
    "code": "versace-10226941a16751-sinij",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "VS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 863,
    "priceCNY": 6731,
    "priceNote": "平台价 41 866 грн（原价 83 730 грн，约 €863）",
    "image": "images/ua_VS_VS-e-10226941a16751-sinij-.jpg",
    "images": [
      "images/ua_VS_VS-e-10226941a16751-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d4/06/d406393e1dabcc317434f00d7acfc2be/e0304a24-0521-4190-9556-79336ea87990.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-dzinsovaa-kurtka-s-zamsevym-vorotnikom-versace-10226941a16751-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 84,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-VS-e-10226311a13878-belyj-12bv5h",
    "code": "versace-10226311a13878-belyj",
    "name": "蕾丝衬衫",
    "nameEn": "lace shirt",
    "brand": "VS",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "蕾丝 lace",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 589,
    "priceCNY": 4594,
    "priceNote": "平台价 28 584 грн（原价 57 117 грн，约 €589）",
    "image": "images/ua_VS_VS-e-10226311a13878-belyj-.jpg",
    "images": [
      "images/ua_VS_VS-e-10226311a13878-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d9/91/d991094a3db18c247fd0a95d823f1d9a/c56b8d8b-0103-4453-8c3a-26a672e95c29.jpg",
    "url": "https://symbol.ua/uk/store/bluza-10226311a13878-versace-10226311a13878-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-VS--10230671a16477-cernyj-108kg5",
    "code": "ersace-10230671a16477-cernyj",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "VS",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 887,
    "priceCNY": 6919,
    "priceNote": "平台价 43 026 грн（原价 86 052 грн，约 €887）",
    "image": "images/ua_VS_VS--10230671a16477-cernyj-.jpg",
    "images": [
      "images/ua_VS_VS--10230671a16477-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/7f/de/7fdefc61a558aa12e9ac7c548e945c5c/fac3de15-4771-45b8-a760-4925d44564c7.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-dzinsovaa-kurtka-s-kristallami-versace-10230671a16477-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-VS-e-10226561a16685-belyj-co3sn3",
    "code": "versace-10226561a16685-belyj",
    "name": "带标识T恤",
    "nameEn": "with logo T-shirt",
    "brand": "VS",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 209,
    "priceCNY": 1630,
    "priceNote": "平台价 10 152 грн（原价 20 302 грн，约 €209）",
    "image": "images/ua_VS_VS-e-10226561a16685-belyj-.jpg",
    "images": [
      "images/ua_VS_VS-e-10226561a16685-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8f/65/8f652c9160628b31f7e504afc8609eeb/8c434c36-6a87-465b-b3c5-66505ad69c2d.jpg",
    "url": "https://symbol.ua/uk/store/belaa-futbolka-s-logotipom-versace-10226561a16685-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-FE-fendi-fzxf54b1ib-seryj-yvg0l6",
    "code": "emira-fendi-fzxf54b1ib-seryj",
    "name": "羊绒针织衫灰色",
    "nameEn": "cashmere knitwear grey",
    "brand": "FE",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 2256,
    "priceCNY": 17597,
    "priceNote": "平台价 109 435 грн（约 €2256）",
    "image": "images/ua_FE_FE-fendi-fzxf54b1ib-seryj-.jpg",
    "images": [
      "images/ua_FE_FE-fendi-fzxf54b1ib-seryj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8f/e9/8fe99c307429bb635851ca29826c4dfd/fd7253f6-54bd-41da-8acb-44341ef67ac3.jpg",
    "url": "https://symbol.ua/uk/store/seryj-sviter-iz-kasemira-fendi-fzxf54b1ib-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M,M/L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S/M,M/L"
  },
  {
    "id": "ua-FE-ndi-fzx731aeei-bezevyj-12rnwn",
    "code": "ami-fendi-fzx731aeei-bezevyj",
    "name": "针织衫",
    "nameEn": "knitwear",
    "brand": "FE",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 783,
    "priceCNY": 6107,
    "priceNote": "平台价 37 976 грн（原价 63 328 грн，约 €783）",
    "image": "images/ua_FE_FE-ndi-fzx731aeei-bezevyj-.jpg",
    "images": [
      "images/ua_FE_FE-ndi-fzx731aeei-bezevyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/63/1f/631f4d22db662940210dd7be33eb7a4d/fede0bbe-7e82-4a33-b412-234df9f4600c.jpg",
    "url": "https://symbol.ua/uk/store/sviter-v-uzor-ff-s-razrezami-fendi-fzx731aeei-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-FE-endi-fq7767b1h8-cernyj-16qfkj",
    "code": "zami-fendi-fq7767b1h8-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "FE",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1901,
    "priceCNY": 14828,
    "priceNote": "平台价 92 214 грн（约 €1901）",
    "image": "images/ua_FE_FE-endi-fq7767b1h8-cernyj-.jpg",
    "images": [
      "images/ua_FE_FE-endi-fq7767b1h8-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/1a/0a/1a0a8a7f2690633e23885122c15dfa9a/b61caf70-580c-4a05-a306-5e24923c7a3b.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-iz-sersti-s-razrezami-fendi-fq7767b1h8-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M,M/L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S/M,M/L"
  },
  {
    "id": "ua-FE-endi-fq7759b1u1-cernyj-aa3005",
    "code": "rstu-fendi-fq7759b1u1-cernyj",
    "name": "半裙迷你",
    "nameEn": "skirt mini",
    "brand": "FE",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1093,
    "priceCNY": 8525,
    "priceNote": "平台价 53 026 грн（约 €1093）",
    "image": "images/ua_FE_FE-endi-fq7759b1u1-cernyj-.jpg",
    "images": [
      "images/ua_FE_FE-endi-fq7759b1u1-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/56/d2/56d2ea36f4cb9b34cc7bb3707a368ae6/05f32f2d-3a9b-4725-bfd4-758ee0f5d7f8.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-mini-s-serstu-fendi-fq7759b1u1-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS/S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS/S"
  },
  {
    "id": "ua-FE-endi-fq7762b1u2-cernyj-1yt79l",
    "code": "zeva-fendi-fq7762b1u2-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "FE",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "蕾丝 lace",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 3443,
    "priceCNY": 26855,
    "priceNote": "平台价 167 005 грн（约 €3443）",
    "image": "images/ua_FE_FE-endi-fq7762b1u2-cernyj-.jpg",
    "images": [
      "images/ua_FE_FE-endi-fq7762b1u2-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/c9/9a/c99a14c49ab0c5b99aa1a478e52eb28c/3c947cea-dabf-4868-8bdb-8f838d279519.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-iz-kruzeva-fendi-fq7762b1u2-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS/S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS/S"
  },
  {
    "id": "ua-FE-ndi-fq7723aw9b-rozovyj-cg99gb",
    "code": "edi-fendi-fq7723aw9b-rozovyj",
    "name": "半裙中长",
    "nameEn": "skirt midi",
    "brand": "FE",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 855,
    "priceCNY": 6669,
    "priceNote": "平台价 41 462 грн（原价 69 136 грн，约 €855）",
    "image": "images/ua_FE_FE-ndi-fq7723aw9b-rozovyj-.jpg",
    "images": [
      "images/ua_FE_FE-ndi-fq7723aw9b-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/jn/36/ad368d27bd516a2a2416aaac926f1f8c/46a19912-08c2-4e81-8548-0228c1548b1a.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-ubka-medi-fendi-fq7723aw9b-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS/XS,XS/S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XXS/XS,XS/S"
  },
  {
    "id": "ua-FE-ndi-fq7721aw9s-zelenyj-e68z3e",
    "code": "int-fendi-fq7721aw9s-zelenyj",
    "name": "半裙印花真丝亚麻",
    "nameEn": "skirt print silk linen",
    "brand": "FE",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 855,
    "priceCNY": 6669,
    "priceNote": "平台价 41 462 грн（原价 69 136 грн，约 €855）",
    "image": "images/ua_FE_FE-ndi-fq7721aw9s-zelenyj-.jpg",
    "images": [
      "images/ua_FE_FE-ndi-fq7721aw9s-zelenyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/1d/55/1d55914ea948498cce43553e6d2359c8/d1e33e85-8703-4638-81ba-3669a38e45c6.jpg",
    "url": "https://symbol.ua/uk/store/zelenaa-ubka-iz-selka-v-print-fendi-fq7721aw9s-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-FE-ndi-fzq650agir-bezevyj-rixcix",
    "code": "-ff-fendi-fzq650agir-bezevyj",
    "name": "半裙中长",
    "nameEn": "skirt midi",
    "brand": "FE",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 700,
    "priceCNY": 5460,
    "priceNote": "平台价 33 936 грн（原价 56 560 грн，约 €700）",
    "image": "images/ua_FE_FE-ndi-fzq650agir-bezevyj-.jpg",
    "images": [
      "images/ua_FE_FE-ndi-fzq650agir-bezevyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/10/1c/101c285fe0c6b4cde7b86e9a9cd9ba9f/f705e1c3-826a-4e47-876d-aa60c915eee2.jpg",
    "url": "https://symbol.ua/uk/store/ubka-midi-v-uzor-ff-fendi-fzq650agir-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-FE-ndi-fzq657ajfh-rozovyj-138kvb",
    "code": "ami-fendi-fzq657ajfh-rozovyj",
    "name": "半裙中长",
    "nameEn": "skirt midi",
    "brand": "FE",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 867,
    "priceCNY": 6763,
    "priceNote": "平台价 42 068 грн（原价 70 146 грн，约 €867）",
    "image": "images/ua_FE_FE-ndi-fzq657ajfh-rozovyj-.jpg",
    "images": [
      "images/ua_FE_FE-ndi-fzq657ajfh-rozovyj-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/6d/40/6d40b5df6767d6fdfe05ff0942b12e04/b9bd38d2-1a92-4343-8df2-ad0ce923dfbb.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-ubka-midi-s-poluprozracnymi-vstavkami-fendi-fzq657ajfh-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS/XS,XS/S,S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XXS/XS,XS/S,S/M"
  },
  {
    "id": "ua-FE-ndi-fdd591aw9h-bezevyj-1csr51",
    "code": "int-fendi-fdd591aw9h-bezevyj",
    "name": "衬衫连衣裙印花真丝",
    "nameEn": "shirt dress print silk",
    "brand": "FE",
    "category": "dresses",
    "style": "衬衫",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 2068,
    "priceCNY": 16130,
    "priceNote": "平台价 100 294 грн（原价 167 156 грн，约 €2068）",
    "image": "images/ua_FE_FE-ndi-fdd591aw9h-bezevyj-.jpg",
    "images": [
      "images/ua_FE_FE-ndi-fdd591aw9h-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/7e/45/7e458669cde7b84b05f0ba345ba87d59/0148cdee-8b0f-4c8a-acb3-d1268873fa75.jpg",
    "url": "https://symbol.ua/uk/store/plate-rubaska-cveta-ajvori-iz-selka-v-cvetocnyj-print-fendi-fdd591aw9h-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M,M/L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S/M,M/L"
  },
  {
    "id": "ua-FE-fendi-fdd554aw7v-belyj-12wgx9",
    "code": "lopka-fendi-fdd554aw7v-belyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "FE",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1569,
    "priceCNY": 12238,
    "priceNote": "平台价 76 105 грн（原价 126 856 грн，约 €1569）",
    "image": "images/ua_FE_FE-fendi-fdd554aw7v-belyj-.jpg",
    "images": [
      "images/ua_FE_FE-fendi-fdd554aw7v-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a0/93/a093087ccae85981b481951111b6059a/75ff2c43-ef24-4731-8c8d-afe0747cddd8.jpg",
    "url": "https://symbol.ua/uk/store/beloe-plate-iz-hlopka-fendi-fdd554aw7v-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-FE-agtq-svetlo-koricnevyj-4uxmpp",
    "code": "fdb659agtq-svetlo-koricnevyj",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "FE",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1711,
    "priceCNY": 13346,
    "priceNote": "平台价 82 973 грн（原价 138 270 грн，约 €1711）",
    "image": "images/ua_FE_FE-agtq-svetlo-koricnevyj-.jpg",
    "images": [
      "images/ua_FE_FE-agtq-svetlo-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/d5/42/d5423cbb97da2d62abd861c585dc3f10/3cb6e8af-a854-4d65-8cf6-b29823026192.jpg",
    "url": "https://symbol.ua/uk/store/selkovoe-plate-v-uzor-fendi-fdb659agtq-svetlo-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-FE-ndi-flp882aoht-bezevyj-1g9ozx",
    "code": "sku-fendi-flp882aoht-bezevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "FE",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 815,
    "priceCNY": 6357,
    "priceNote": "平台价 39 543 грн（原价 65 904 грн，约 €815）",
    "image": "images/ua_FE_FE-ndi-flp882aoht-bezevyj-.jpg",
    "images": [
      "images/ua_FE_FE-ndi-flp882aoht-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/1e/00/1e0042950eefed7383be10ab785c4ec2/4a858038-f08e-4f43-97b7-f27548dc493e.jpg",
    "url": "https://symbol.ua/uk/store/bezevye-bruki-v-polosku-fendi-flp882aoht-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS/S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS/S"
  },
  {
    "id": "ua-FE-fendi-fr6494aw9h-sinij-11dw7u",
    "code": "print-fendi-fr6494aw9h-sinij",
    "name": "长裤印花真丝",
    "nameEn": "trousers print silk",
    "brand": "FE",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 999,
    "priceCNY": 7792,
    "priceNote": "平台价 48 431 грн（原价 80 751 грн，约 €999）",
    "image": "images/ua_FE_FE-fendi-fr6494aw9h-sinij-.jpg",
    "images": [
      "images/ua_FE_FE-fendi-fr6494aw9h-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/02/f6/02f66e8067a2bb3e9fbecd22a7aabbf3/989a8c30-7161-453f-94f6-2396d45c3817.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-iz-selka-v-cvetocnyj-print-fendi-fr6494aw9h-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-FE-fr6275aj09-temno-sinij-1k9k11",
    "code": "fendi-fr6275aj09-temno-sinij",
    "name": "长裤印花真丝",
    "nameEn": "trousers print silk",
    "brand": "FE",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 783,
    "priceCNY": 6107,
    "priceNote": "平台价 37 976 грн（原价 63 328 грн，约 €783）",
    "image": "images/ua_FE_FE-fr6275aj09-temno-sinij-.jpg",
    "images": [
      "images/ua_FE_FE-fr6275aj09-temno-sinij-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/0a/aa/0aaaa816ff538f63f5092b39dbbae1bf/36f9c596-ccf9-47a1-934b-199d80f79cf2.jpg",
    "url": "https://symbol.ua/uk/store/selkovye-bruki-v-print-fendi-fr6275aj09-temno-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M/L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M/L"
  },
  {
    "id": "ua-FE-fendi-flf861aw8h-sinij-1g4r4g",
    "code": "otipa-fendi-flf861aw8h-sinij",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "FE",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1782,
    "priceCNY": 13900,
    "priceNote": "平台价 86 407 грн（约 €1782）",
    "image": "images/ua_FE_FE-fendi-flf861aw8h-sinij-.jpg",
    "images": [
      "images/ua_FE_FE-fendi-flf861aw8h-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/fb/ed/fbed6f806a10601a06261999f466affc/170ae1c0-102a-4401-8158-b2342344585e.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-dzinsovaa-kurtka-s-tisneniem-logotipa-fendi-flf861aw8h-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-FE-endi-ff6204b1hm-cernyj-krrp06",
    "code": "alto-fendi-ff6204b1hm-cernyj",
    "name": "大衣",
    "nameEn": "coat",
    "brand": "FE",
    "category": "outer",
    "style": "大衣",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 6178,
    "priceCNY": 48188,
    "priceNote": "平台价 299 618 грн（约 €6178）",
    "image": "images/ua_FE_FE-endi-ff6204b1hm-cernyj-.jpg",
    "images": [
      "images/ua_FE_FE-endi-ff6204b1hm-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/23/35/2335d2db3a9330fa8d93516ca396d211/890914e2-824a-4732-934b-0b4270195570.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-dvubortnoe-palto-fendi-ff6204b1hm-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS/S,S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS/S,S/M"
  },
  {
    "id": "ua-FE-endi-flp909b1ph-cernyj-1vvvra",
    "code": "insy-fendi-flp909b1ph-cernyj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "FE",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1163,
    "priceCNY": 9071,
    "priceNote": "平台价 56 410 грн（约 €1163）",
    "image": "images/ua_FE_FE-endi-flp909b1ph-cernyj-.jpg",
    "images": [
      "images/ua_FE_FE-endi-flp909b1ph-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/fd/33/fd331de2c38e097894d2768458191a3c/ec4fb288-aaf3-4899-a59b-cec8901a86c8.jpg",
    "url": "https://symbol.ua/uk/store/cernye-dzinsy-fendi-flp909b1ph-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-FE-endi-fs9805av06-cernyj-hu8kyn",
    "code": "-amo-fendi-fs9805av06-cernyj",
    "name": "T恤印花",
    "nameEn": "T-shirt print",
    "brand": "FE",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 773,
    "priceCNY": 6029,
    "priceNote": "平台价 37 472 грн（约 €773）",
    "image": "images/ua_FE_FE-endi-fs9805av06-cernyj-.jpg",
    "images": [
      "images/ua_FE_FE-endi-fs9805av06-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/4b/50/4b50ba4cb82f41eedca16c7738c8aeb3/3a9f1340-737f-4d5e-89dc-fb330e773947.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-futbolka-s-printom-ti-amo-fendi-fs9805av06-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-FE-fendi-fs8391amvl-belyj-ovaqz6",
    "code": "baska-fendi-fs8391amvl-belyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "FE",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1425,
    "priceCNY": 11115,
    "priceNote": "平台价 69 136 грн（约 €1425）",
    "image": "images/ua_FE_FE-fendi-fs8391amvl-belyj-.jpg",
    "images": [
      "images/ua_FE_FE-fendi-fs8391amvl-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/ca/90/ca9028cebdeaa764531095d0afb71e6e/a6876cbc-b685-421e-b982-8d30375095a2.jpg",
    "url": "https://symbol.ua/uk/store/belaa-rubaska-fendi-fs8391amvl-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS/S,S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS/S,S/M"
  },
  {
    "id": "ua-FE-fendi-flp909b1pl-sinij-1nhi1v",
    "code": "zinsy-fendi-flp909b1pl-sinij",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "FE",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1129,
    "priceCNY": 8806,
    "priceNote": "平台价 54 742 грн（约 €1129）",
    "image": "images/ua_FE_FE-fendi-flp909b1pl-sinij-.jpg",
    "images": [
      "images/ua_FE_FE-fendi-flp909b1pl-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/50/d5/50d5cbc5f85ada0123a19e5cfed3979d/04219c3d-3fd0-403f-a3be-1f82650ebeae.jpg",
    "url": "https://symbol.ua/uk/store/sinie-dzinsy-fendi-flp909b1pl-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-FE-ndi-fs8110aw88-bezevyj-ypq3gs",
    "code": "sku-fendi-fs8110aw88-bezevyj",
    "name": "T恤",
    "nameEn": "T-shirt",
    "brand": "FE",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 703,
    "priceCNY": 5483,
    "priceNote": "平台价 34 089 грн（约 €703）",
    "image": "images/ua_FE_FE-ndi-fs8110aw88-bezevyj-.jpg",
    "images": [
      "images/ua_FE_FE-ndi-fs8110aw88-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d5/9b/d59b27ee237dd7199ab9165a5db3bc00/7c8a6d63-3137-46af-951e-e24662b966be.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-ukorocennaa-futbolka-v-polosku-fendi-fs8110aw88-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-FE-fendi-fs8390amvl-belyj-1il5ni",
    "code": "baska-fendi-fs8390amvl-belyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "FE",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1306,
    "priceCNY": 10187,
    "priceNote": "平台价 63 328 грн（约 €1306）",
    "image": "images/ua_FE_FE-fendi-fs8390amvl-belyj-.jpg",
    "images": [
      "images/ua_FE_FE-fendi-fs8390amvl-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/2c/b6/2cb67b81c629f52e707d0ce5702ff507/b10cbed4-fe44-43de-b945-749055d2860a.jpg",
    "url": "https://symbol.ua/uk/store/belaa-rubaska-fendi-fs8390amvl-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS/XS,XS/S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XXS/XS,XS/S"
  },
  {
    "id": "ua-FE--fm5461aowd-koricnevyj-10uyeu",
    "code": "-fendi-fm5461aowd-koricnevyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "FE",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 8064,
    "priceCNY": 62899,
    "priceNote": "平台价 391 124 грн（约 €8064）",
    "image": "images/ua_FE_FE--fm5461aowd-koricnevyj-.jpg",
    "images": [
      "images/ua_FE_FE--fm5461aowd-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a5/8a/a58afe0601accdbe24beb061ea4f92f2/96c90f59-d8b7-47b4-b42b-26af4a535c00.jpg",
    "url": "https://symbol.ua/uk/store/koricnevaa-kombinirovannaa-perforirovannaa-kurtka-fendi-fm5461aowd-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS/S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 84,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS/S"
  },
  {
    "id": "ua-FE--fps916aw9y-koricnevyj-vj2ade",
    "code": "-fendi-fps916aw9y-koricnevyj",
    "name": "大衣亚麻",
    "nameEn": "coat linen",
    "brand": "FE",
    "category": "outer",
    "style": "大衣",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "亚麻 linen",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 7484,
    "priceCNY": 58375,
    "priceNote": "平台价 362 994 грн（原价 518 534 грн，约 €7484）",
    "image": "images/ua_FE_FE--fps916aw9y-koricnevyj-.jpg",
    "images": [
      "images/ua_FE_FE--fps916aw9y-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/30/12/3012a35361c7a2b8df7da96a7fa9495d/a8069b9a-45d5-4ce8-854d-7d2cfa0a0f4e.jpg",
    "url": "https://symbol.ua/uk/store/koricnevoe-palto-selleria-iz-kozi-olena-fendi-fps916aw9y-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-FE-fendi-flp882aohs-sinij-1trmb4",
    "code": "-patc-fendi-flp882aohs-sinij",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "FE",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 855,
    "priceCNY": 6669,
    "priceNote": "平台价 41 462 грн（原价 69 136 грн，约 €855）",
    "image": "images/ua_FE_FE-fendi-flp882aohs-sinij-.jpg",
    "images": [
      "images/ua_FE_FE-fendi-flp882aohs-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/93/73/9373fcaabd379c2c3bdcb8b19e42855d/6a256161-a9f6-41e5-ae13-74ce26ea7264.jpg",
    "url": "https://symbol.ua/uk/store/sinie-dzinsy-s-logotip-patc-fendi-flp882aohs-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS/S,M/L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 105,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 78,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "XS/S,M/L"
  },
  {
    "id": "ua-FE-fendi-fs9776aouh-belyj-mfnskl",
    "code": "skami-fendi-fs9776aouh-belyj",
    "name": "T恤",
    "nameEn": "T-shirt",
    "brand": "FE",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 656,
    "priceCNY": 5117,
    "priceNote": "平台价 31 816 грн（原价 53 026 грн，约 €656）",
    "image": "images/ua_FE_FE-fendi-fs9776aouh-belyj-.jpg",
    "images": [
      "images/ua_FE_FE-fendi-fs9776aouh-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/61/cb/61cbf54ae09505b47826b5906febf1ae/eb56f3ea-61f6-4d18-83d1-d60b5f0e8e63.jpg",
    "url": "https://symbol.ua/uk/store/belaa-futbolka-s-broskami-fendi-fs9776aouh-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-FE--fendi-fze574aw4v-haki-1qh68z",
    "code": "gotipa-fendi-fze574aw4v-haki",
    "name": "开衫",
    "nameEn": "cardigan",
    "brand": "FE",
    "category": "tops",
    "style": "开衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1069,
    "priceCNY": 8338,
    "priceNote": "平台价 51 865 грн（原价 86 407 грн，约 €1069）",
    "image": "images/ua_FE_FE--fendi-fze574aw4v-haki-.jpg",
    "images": [
      "images/ua_FE_FE--fendi-fze574aw4v-haki-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a6/47/a647b22e520edbf1673bbafed8306019/6975991a-a7ae-43e5-939e-9a0b9e7b74b3.jpg",
    "url": "https://symbol.ua/uk/store/kardigan-cveta-haki-s-vysivkoj-logotipa-fendi-fze574aw4v-haki",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-FE--fendi-fzxe84aw4v-haki-11vqac",
    "code": "gotipa-fendi-fzxe84aw4v-haki",
    "name": "女装",
    "nameEn": "Топ кольору хакі з вишивкою логотипа",
    "brand": "FE",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 700,
    "priceCNY": 5460,
    "priceNote": "平台价 33 936 грн（原价 56 560 грн，约 €700）",
    "image": "images/ua_FE_FE--fendi-fzxe84aw4v-haki-.jpg",
    "images": [
      "images/ua_FE_FE--fendi-fzxe84aw4v-haki-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/02/45/02453024989ec367f73ae16d81831b41/33c37474-50e6-4390-aad4-8ead634a1d9a.jpg",
    "url": "https://symbol.ua/uk/store/top-cveta-haki-s-vysivkoj-logotipa-fendi-fzxe84aw4v-haki",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-FE-ndi-flf856aoht-bezevyj-171frn",
    "code": "sku-fendi-flf856aoht-bezevyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "FE",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1261,
    "priceCNY": 9836,
    "priceNote": "平台价 61 157 грн（原价 101 961 грн，约 €1261）",
    "image": "images/ua_FE_FE-ndi-flf856aoht-bezevyj-.jpg",
    "images": [
      "images/ua_FE_FE-ndi-flf856aoht-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/6c/fa/6cfa3d5260b0314d6d5a92ae92ee6aa2/1c6465cf-645c-44b5-8fba-76076a7e2fbe.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-kurtka-v-polosku-fendi-flf856aoht-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS/S,S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS/S,S/M"
  },
  {
    "id": "ua-FE-ndi-fj7711aw9b-rozovyj-i23dd4",
    "code": "ami-fendi-fj7711aw9b-rozovyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "FE",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 1783,
    "priceCNY": 13907,
    "priceNote": "平台价 86 456 грн（原价 144 078 грн，约 €1783）",
    "image": "images/ua_FE_FE-ndi-fj7711aw9b-rozovyj-.jpg",
    "images": [
      "images/ua_FE_FE-ndi-fj7711aw9b-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/af/c2/afc2723dd96c864d0157ffe3d4a03ec6/773329a4-4f35-4da0-8045-6a27a02b3600.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-kurtka-s-rusami-fendi-fj7711aw9b-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS/XS,XS/S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 84,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XXS/XS,XS/S"
  },
  {
    "id": "ua-FE-endi-fze572aw4n-cernyj-15itee",
    "code": "vami-fendi-fze572aw4n-cernyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "FE",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1069,
    "priceCNY": 8338,
    "priceNote": "平台价 51 865 грн（原价 86 407 грн，约 €1069）",
    "image": "images/ua_FE_FE-endi-fze572aw4n-cernyj-.jpg",
    "images": [
      "images/ua_FE_FE-endi-fze572aw4n-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/58/e2/58e2c5c3b3271b370b04f3c90779d6bb/ae0551f7-0f46-4ca1-8d61-bbd0a2318e92.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-rubaska-s-korotkimi-rukavami-fendi-fze572aw4n-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S/M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S/M"
  },
  {
    "id": "ua-BV-a-725634v4e00-bordovyj-1uzrc2",
    "code": "-veneta-725634v4e00-bordovyj",
    "name": "针织衫",
    "nameEn": "knitwear",
    "brand": "BV",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1218,
    "priceCNY": 9500,
    "priceNote": "平台价 59 086 грн（约 €1218）",
    "image": "images/ua_BV_BV-a-725634v4e00-bordovyj-.jpg",
    "images": [
      "images/ua_BV_BV-a-725634v4e00-bordovyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/e3/0e/e30e7811fcea95f2cc6c03b543f60dec/44f38305-31da-4f40-a38f-585e4301617c.jpg",
    "url": "https://symbol.ua/uk/store/bordovyj-sviter-iz-sersti-bottega-veneta-725634v4e00-bordovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-BV-ta-761630v3ds0-bezevyj-1ihy8j",
    "code": "a-veneta-761630v3ds0-bezevyj",
    "name": "米色针织衫",
    "nameEn": "beige knitwear",
    "brand": "BV",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1218,
    "priceCNY": 9500,
    "priceNote": "平台价 59 086 грн（约 €1218）",
    "image": "images/ua_BV_BV-ta-761630v3ds0-bezevyj-.jpg",
    "images": [
      "images/ua_BV_BV-ta-761630v3ds0-bezevyj-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/94/4e/944ee62d6fa71b29bd8009bc64735d68/c59b74f7-a214-436c-b7ce-f2cd153af9ec.jpg",
    "url": "https://symbol.ua/uk/store/bezevyj-sviter-iz-sersti-bottega-veneta-761630v3ds0-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BV-neta-704595v24z0-belyj-jmsb05",
    "code": "ega-veneta-704595v24z0-belyj",
    "name": "针织衫白色",
    "nameEn": "knitwear white",
    "brand": "BV",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1384,
    "priceCNY": 10795,
    "priceNote": "平台价 67 116 грн（约 €1384）",
    "image": "images/ua_BV_BV-neta-704595v24z0-belyj-.jpg",
    "images": [
      "images/ua_BV_BV-neta-704595v24z0-belyj-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/58/db/58db9c3cd999f9a85245e11f663fadf9/75e00fef-b9f9-454f-b7c6-4f873b315412.jpg",
    "url": "https://symbol.ua/uk/store/belyj-sviter-v-uzor-bottega-veneta-704595v24z0-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BV-neta-769368v2m50-sinij-1kvav0",
    "code": "ega-veneta-769368v2m50-sinij",
    "name": "针织衫蓝色",
    "nameEn": "knitwear blue",
    "brand": "BV",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1218,
    "priceCNY": 9500,
    "priceNote": "平台价 59 086 грн（约 €1218）",
    "image": "images/ua_BV_BV-neta-769368v2m50-sinij-.jpg",
    "images": [
      "images/ua_BV_BV-neta-769368v2m50-sinij-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/81/67/816769f8fdf0633b3c68dc1257e95ac3/40a8d569-a23e-4840-9edb-a1b9fbe09248.jpg",
    "url": "https://symbol.ua/uk/store/sinij-sviter-iz-sersti-bottega-veneta-769368v2m50-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BV-ta-811228v4z81-bezevyj-1e0pr9",
    "code": "a-veneta-811228v4z81-bezevyj",
    "name": "裹身半裙中长",
    "nameEn": "wrap skirt midi",
    "brand": "BV",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1660,
    "priceCNY": 12948,
    "priceNote": "平台价 80 498 грн（约 €1660）",
    "image": "images/ua_BV_BV-ta-811228v4z81-bezevyj-.jpg",
    "images": [
      "images/ua_BV_BV-ta-811228v4z81-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/84/dd/84ddbfe0cf9e7d6703ca782fa089ed50/ce675476-7b80-41c0-946b-e1a1f641772b.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-ubka-midi-na-zapah-v-kletku-bottega-veneta-811228v4z81-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XXS,S"
  },
  {
    "id": "ua-BV-ta-786369va5y0-bezevyj-18hvz5",
    "code": "a-veneta-786369va5y0-bezevyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BV",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1218,
    "priceCNY": 9500,
    "priceNote": "平台价 59 086 грн（约 €1218）",
    "image": "images/ua_BV_BV-ta-786369va5y0-bezevyj-.jpg",
    "images": [
      "images/ua_BV_BV-ta-786369va5y0-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/5b/8a/5b8a7f8c465b16b2d0181cf02d9ae43c/49c45d47-4857-4e93-b547-382fb4e1b52c.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-ubka-s-drapirovkoj-bottega-veneta-786369va5y0-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XXS,S"
  },
  {
    "id": "ua-BV-ta-782282v3wm0-bezevyj-nhlf52",
    "code": "a-veneta-782282v3wm0-bezevyj",
    "name": "裹身半裙",
    "nameEn": "wrap skirt",
    "brand": "BV",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1218,
    "priceCNY": 9500,
    "priceNote": "平台价 59 086 грн（约 €1218）",
    "image": "images/ua_BV_BV-ta-782282v3wm0-bezevyj-.jpg",
    "images": [
      "images/ua_BV_BV-ta-782282v3wm0-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/ed/16/ed1649f2c04953e4fefc08a5d2894414/39470acf-8a01-44cd-9952-4e7c75d7c24d.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-azurnaa-ubka-medi-na-zapah-bottega-veneta-782282v3wm0-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-BV-ta-784970v3z60-bezevyj-snzsvk",
    "code": "a-veneta-784970v3z60-bezevyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BV",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 996,
    "priceCNY": 7769,
    "priceNote": "平台价 48 330 грн（约 €996）",
    "image": "images/ua_BV_BV-ta-784970v3z60-bezevyj-.jpg",
    "images": [
      "images/ua_BV_BV-ta-784970v3z60-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/de/bd/debd3e7136f382043a55a9e40ec98242/bab83cec-c6b8-4055-9dab-bbea41bdf948.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-ubka-v-rubcik-bottega-veneta-784970v3z60-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 42"
    ],
    "availSizesText": "XS,M"
  },
  {
    "id": "ua-BV-eta-773543v3o30-cernyj-785zy",
    "code": "ga-veneta-773543v3o30-cernyj",
    "name": "连衣裙中长",
    "nameEn": "dress midi",
    "brand": "BV",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 2433,
    "priceCNY": 18977,
    "priceNote": "平台价 118 020 грн（约 €2433）",
    "image": "images/ua_BV_BV-eta-773543v3o30-cernyj-.jpg",
    "images": [
      "images/ua_BV_BV-eta-773543v3o30-cernyj-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/ae/fa/aefa156310e14458b6a577cdbe162227/61ea3261-d582-4b2a-811e-47be6b21be5f.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-medi-s-cepockoj-bottega-veneta-773543v3o30-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BV-eta-628712vkwb0-cernyj-1r4u4l",
    "code": "ga-veneta-628712vkwb0-cernyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BV",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 800,
    "priceCNY": 6240,
    "priceNote": "平台价 38 784 грн（原价 96 960 грн，约 €800）",
    "image": "images/ua_BV_BV-eta-628712vkwb0-cernyj-.jpg",
    "images": [
      "images/ua_BV_BV-eta-628712vkwb0-cernyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/4a/9b/4a9b54cfc81864cded22b0c541808f45/6f2cce34-fe9e-46d5-94ae-fd8b20fd5e21.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-bottega-veneta-628712vkwb0-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BV-neta-a003xtv6y50-sinij-5khqpr",
    "code": "ega-veneta-a003xtv6y50-sinij",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1327,
    "priceCNY": 10351,
    "priceNote": "平台价 64 338 грн（约 €1327）",
    "image": "images/ua_BV_BV-neta-a003xtv6y50-sinij-.jpg",
    "images": [
      "images/ua_BV_BV-neta-a003xtv6y50-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/6f/f3/6ff300fff86546abbc4539c211f59314/fda97c0b-e41a-4311-94e1-55ef8b0db6f2.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-iz-sersti-bottega-veneta-a003xtv6y50-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BV-neta-857717v6dh0-sinij-75a676",
    "code": "ega-veneta-857717v6dh0-sinij",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 1218,
    "priceCNY": 9500,
    "priceNote": "平台价 59 086 грн（约 €1218）",
    "image": "images/ua_BV_BV-neta-857717v6dh0-sinij-.jpg",
    "images": [
      "images/ua_BV_BV-neta-857717v6dh0-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/e7/f6/e7f62b97db5abc753a334381d1f269b7/40e9f088-eb08-4bd3-aee7-9b5da85ab848.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-iz-sersti-bottega-veneta-857717v6dh0-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BV-ta-835267v3oo0-bezevyj-vtzghd",
    "code": "a-veneta-835267v3oo0-bezevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 2101,
    "priceCNY": 16388,
    "priceNote": "平台价 101 910 грн（约 €2101）",
    "image": "images/ua_BV_BV-ta-835267v3oo0-bezevyj-.jpg",
    "images": [
      "images/ua_BV_BV-ta-835267v3oo0-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/c1/41/c141ac441e6e4b0d5d639f207a1802f9/8f03b8a5-e208-429b-b533-7266b5616aeb.jpg",
    "url": "https://symbol.ua/uk/store/bezevye-bruki-iz-sersti-i-kasemira-bottega-veneta-835267v3oo0-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BV-eta-837502v5bv0-cernyj-2edlf2",
    "code": "ga-veneta-837502v5bv0-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 4091,
    "priceCNY": 31910,
    "priceNote": "平台价 198 416 грн（约 €4091）",
    "image": "images/ua_BV_BV-eta-837502v5bv0-cernyj-.jpg",
    "images": [
      "images/ua_BV_BV-eta-837502v5bv0-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/0b/78/0b784ef67524ed8e239ae2e9e205a5f8/48c0644c-9e7b-48ea-8895-d3a61cbcd5bb.jpg",
    "url": "https://symbol.ua/uk/store/cernye-kozanye-bruki-bottega-veneta-837502v5bv0-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BV-eta-835377v4c20-cernyj-7o8raz",
    "code": "ga-veneta-835377v4c20-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1327,
    "priceCNY": 10351,
    "priceNote": "平台价 64 338 грн（约 €1327）",
    "image": "images/ua_BV_BV-eta-835377v4c20-cernyj-.jpg",
    "images": [
      "images/ua_BV_BV-eta-835377v4c20-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/0e/39/0e3906d3abf6513d37594450101fbc46/5da123d6-46d5-4546-89da-b617571d2752.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-bottega-veneta-835377v4c20-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BV-ta-825519v0b30-bezevyj-7nfkik",
    "code": "a-veneta-825519v0b30-bezevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 1218,
    "priceCNY": 9500,
    "priceNote": "平台价 59 086 грн（约 €1218）",
    "image": "images/ua_BV_BV-ta-825519v0b30-bezevyj-.jpg",
    "images": [
      "images/ua_BV_BV-ta-825519v0b30-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/3e/4c/3e4c75a53860f3093d0ed7234114e028/698f85fb-3664-4a28-9cf7-84083bce3ea9.jpg",
    "url": "https://symbol.ua/uk/store/bezevye-bruki-iz-sersti-bottega-veneta-825519v0b30-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BV-eta-736493v3f90-cernyj-17e187",
    "code": "ga-veneta-736493v3f90-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1218,
    "priceCNY": 9500,
    "priceNote": "平台价 59 086 грн（约 €1218）",
    "image": "images/ua_BV_BV-eta-736493v3f90-cernyj-.jpg",
    "images": [
      "images/ua_BV_BV-eta-736493v3f90-cernyj-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/a4/10/a410b974f34949719563d94c0e0b81f3/f8e45f01-63e2-44af-a241-f86fd2a5e42b.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-so-stipkami-bottega-veneta-736493v3f90-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BV-743610v3pi0-koricnevyj-1o6x2h",
    "code": "eneta-743610v3pi0-koricnevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 1218,
    "priceCNY": 9500,
    "priceNote": "平台价 59 086 грн（约 €1218）",
    "image": "images/ua_BV_BV-743610v3pi0-koricnevyj-.jpg",
    "images": [
      "images/ua_BV_BV-743610v3pi0-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/7c/3a/7c3ab02256042208bd05546fad2e490e/1afb16c0-3707-4b70-9dc1-91c66204337f.jpg",
    "url": "https://symbol.ua/uk/store/koricnevye-bruki-iz-sersti-bottega-veneta-743610v3pi0-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 42"
    ],
    "availSizesText": "XS,M"
  },
  {
    "id": "ua-BV-779519v2t10-koricnevyj-1hvfda",
    "code": "eneta-779519v2t10-koricnevyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 831,
    "priceCNY": 6482,
    "priceNote": "平台价 40 300 грн（约 €831）",
    "image": "images/ua_BV_BV-779519v2t10-koricnevyj-.jpg",
    "images": [
      "images/ua_BV_BV-779519v2t10-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/88/6a/886ab88dad1c887fe099e603d42053ce/345df420-27b0-473b-82f5-952662d52567.jpg",
    "url": "https://symbol.ua/uk/store/koricnevye-bruki-bottega-veneta-779519v2t10-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BV-eta-793118v3ys0-zeltyj-7hi9n6",
    "code": "ga-veneta-793118v3ys0-zeltyj",
    "name": "长裤真丝",
    "nameEn": "trousers silk",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黄色",
    "colorHex": "#d9b23a",
    "priceEUR": 996,
    "priceCNY": 7769,
    "priceNote": "平台价 48 330 грн（约 €996）",
    "image": "images/ua_BV_BV-eta-793118v3ys0-zeltyj-.jpg",
    "images": [
      "images/ua_BV_BV-eta-793118v3ys0-zeltyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/c9/75/c975468d6a45bb6bff1070027354b7f1/6c2f7bf1-de86-4b14-af69-e3b8ab04c1cb.jpg",
    "url": "https://symbol.ua/uk/store/zeltye-bruki-s-selkom-bottega-veneta-793118v3ys0-zeltyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 42"
    ],
    "availSizesText": "XS,M"
  },
  {
    "id": "ua-BV-eta-681895v0iv0-cernyj-4ekcu9",
    "code": "ga-veneta-681895v0iv0-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 552,
    "priceCNY": 4306,
    "priceNote": "平台价 26 766 грн（原价 66 914 грн，约 €552）",
    "image": "images/ua_BV_BV-eta-681895v0iv0-cernyj-.jpg",
    "images": [
      "images/ua_BV_BV-eta-681895v0iv0-cernyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/e1/cc/e1cc0b04bd2cb8e5ed9da56b48124ed5/5b067c64-211a-435e-8288-e41896b48243.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-bottega-veneta-681895v0iv0-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BV-657740v0bt0-persikovyj-1qpswp",
    "code": "eneta-657740v0bt0-persikovyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 266,
    "priceCNY": 2075,
    "priceNote": "平台价 12 879 грн（原价 32 220 грн，约 €266）",
    "image": "images/ua_BV_BV-657740v0bt0-persikovyj-.jpg",
    "images": [
      "images/ua_BV_BV-657740v0bt0-persikovyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/0c/68/0c68336a698b6a35c7b0481edaf9c583/fe5a0a02-b5c7-498b-b641-4c36ad7a20a7.jpg",
    "url": "https://symbol.ua/uk/store/persikovye-bruki-bottega-veneta-657740v0bt0-persikovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-BV-ta-657740v0bt0-zelenyj-qbcl69",
    "code": "a-veneta-657740v0bt0-zelenyj",
    "name": "长裤亚麻",
    "nameEn": "trousers linen",
    "brand": "BV",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "亚麻 linen",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 266,
    "priceCNY": 2075,
    "priceNote": "平台价 12 879 грн（原价 32 220 грн，约 €266）",
    "image": "images/ua_BV_BV-ta-657740v0bt0-zelenyj-.jpg",
    "images": [
      "images/ua_BV_BV-ta-657740v0bt0-zelenyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/88/88/88880299c44c4842d6f4ee8c70e97e90/838b546c-3265-450c-b30f-a0172b8b695b.jpg",
    "url": "https://symbol.ua/uk/store/svetlo-zelenye-bruki-bottega-veneta-657740v0bt0-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BV-neta-869436v6ko0-belyj-79bc78",
    "code": "ega-veneta-869436v6ko0-belyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BV",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 3208,
    "priceCNY": 25022,
    "priceNote": "平台价 155 592 грн（约 €3208）",
    "image": "images/ua_BV_BV-neta-869436v6ko0-belyj-.jpg",
    "images": [
      "images/ua_BV_BV-neta-869436v6ko0-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/17/94/1794a08070c86175858714312fb6f7ed/df230b41-8194-47c9-8343-9ae11cb2a41e.jpg",
    "url": "https://symbol.ua/uk/store/belaa-kurtka-s-kozanym-vorotnikom-bottega-veneta-869436v6ko0-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXXS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XXXS"
  },
  {
    "id": "ua-BV-eneta-874736v61d0-haki-nm3yxw",
    "code": "tega-veneta-874736v61d0-haki",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BV",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 6854,
    "priceCNY": 53461,
    "priceNote": "平台价 332 443 грн（约 €6854）",
    "image": "images/ua_BV_BV-eneta-874736v61d0-haki-.jpg",
    "images": [
      "images/ua_BV_BV-eneta-874736v61d0-haki-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/15/04/15042dcaf7f68372b8cfb4f17350d379/19e37652-3756-4311-b62e-d976c15ab294.jpg",
    "url": "https://symbol.ua/uk/store/kozanaa-kurtka-cveta-haki-bottega-veneta-874736v61d0-haki",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXXS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XXXS"
  },
  {
    "id": "ua-BV-eta-857932v61d0-cernyj-1yznl8",
    "code": "ga-veneta-857932v61d0-cernyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BV",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 7188,
    "priceCNY": 56066,
    "priceNote": "平台价 348 603 грн（约 €7188）",
    "image": "images/ua_BV_BV-eta-857932v61d0-cernyj-.jpg",
    "images": [
      "images/ua_BV_BV-eta-857932v61d0-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/0d/a6/0da624011712599a4950402c1562e648/1e324b2d-f017-420c-a132-1f6c0415a6b4.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-kozanaa-kurtka-bottega-veneta-857932v61d0-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XXS"
  },
  {
    "id": "ua-BV-neta-863107v69p0-sinij-1nepxc",
    "code": "ega-veneta-863107v69p0-sinij",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "BV",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 2433,
    "priceCNY": 18977,
    "priceNote": "平台价 118 020 грн（约 €2433）",
    "image": "images/ua_BV_BV-neta-863107v69p0-sinij-.jpg",
    "images": [
      "images/ua_BV_BV-neta-863107v69p0-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/5f/ca/5fca4227b54ee59eef19580fb2baeb08/17b04b7a-cebf-4cee-911d-7359b049e989.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-dzinsovaa-kurtka-s-kozanym-vorotnikom-bottega-veneta-863107v69p0-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS,XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XXS,XS,S,M"
  },
  {
    "id": "ua-BV-ta-834986v3oo0-bezevyj-14w3yj",
    "code": "a-veneta-834986v3oo0-bezevyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BV",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 2765,
    "priceCNY": 21567,
    "priceNote": "平台价 134 079 грн（约 €2765）",
    "image": "images/ua_BV_BV-ta-834986v3oo0-bezevyj-.jpg",
    "images": [
      "images/ua_BV_BV-ta-834986v3oo0-bezevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/20/d8/20d81ef87415c2a507a5313a4e403465/302fd816-261e-409d-8e45-40c21f89bd20.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-kurtka-iz-sersti-i-kasemira-bottega-veneta-834986v3oo0-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XXS"
  },
  {
    "id": "ua-BV-neta-835337v5l70-belyj-b7xx8n",
    "code": "ega-veneta-835337v5l70-belyj",
    "name": "开衫白色",
    "nameEn": "cardigan white",
    "brand": "BV",
    "category": "tops",
    "style": "开衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 1548,
    "priceCNY": 12074,
    "priceNote": "平台价 75 095 грн（约 €1548）",
    "image": "images/ua_BV_BV-neta-835337v5l70-belyj-.jpg",
    "images": [
      "images/ua_BV_BV-neta-835337v5l70-belyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/d0/a1/d0a10cfd17c0972436b15215910041fb/b77195f8-8b23-478e-9c04-57e8d8342716.jpg",
    "url": "https://symbol.ua/uk/store/belyj-kardigan-iz-sersti-bottega-veneta-835337v5l70-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BV-792972v4cb0-koricnevyj-1yufr7",
    "code": "eneta-792972v4cb0-koricnevyj",
    "name": "大衣",
    "nameEn": "coat",
    "brand": "BV",
    "category": "outer",
    "style": "大衣",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 4201,
    "priceCNY": 32768,
    "priceNote": "平台价 203 769 грн（约 €4201）",
    "image": "images/ua_BV_BV-792972v4cb0-koricnevyj-.jpg",
    "images": [
      "images/ua_BV_BV-792972v4cb0-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/8a/5f/8a5fa8e6366c1dd8ed3e12d315613073/ae68f034-9349-4fa1-9720-0aaa027bd330.jpg",
    "url": "https://symbol.ua/uk/store/koricnevoe-dvubortnoe-palto-iz-sersti-bottega-veneta-792972v4cb0-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XXS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XXS"
  },
  {
    "id": "ua-BV-eta-804794v4pa0-cernyj-1d76tm",
    "code": "ga-veneta-804794v4pa0-cernyj",
    "name": "黑色马甲",
    "nameEn": "black vest",
    "brand": "BV",
    "category": "outer",
    "style": "马甲",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1218,
    "priceCNY": 9500,
    "priceNote": "平台价 59 086 грн（约 €1218）",
    "image": "images/ua_BV_BV-eta-804794v4pa0-cernyj-.jpg",
    "images": [
      "images/ua_BV_BV-eta-804794v4pa0-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/0a/16/0a163bd5c15a06bc044ddd594f02bcac/f6a2d081-3152-4c43-bf66-29f61a57ed20.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-zilet-iz-sersti-bottega-veneta-804794v4pa0-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BV-ta-704851v24m0-zelenyj-14kr1h",
    "code": "a-veneta-704851v24m0-zelenyj",
    "name": "羊绒开衫绿色",
    "nameEn": "cashmere cardigan green",
    "brand": "BV",
    "category": "tops",
    "style": "开衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "亚麻 linen",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 1660,
    "priceCNY": 12948,
    "priceNote": "平台价 80 498 грн（约 €1660）",
    "image": "images/ua_BV_BV-ta-704851v24m0-zelenyj-.jpg",
    "images": [
      "images/ua_BV_BV-ta-704851v24m0-zelenyj-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/08/55/0855b3ec92a9a3a2ea677837696ceb95/fa4b8ecd-afaf-49dc-b016-b4368b2a8ba4.jpg",
    "url": "https://symbol.ua/uk/store/zelenyj-kardigan-iz-kasemira-bottega-veneta-704851v24m0-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-in-pu0000000010-cernyj-195tl4",
    "code": "-balmain-pu0000000010-cernyj",
    "name": "黑色针织衫",
    "nameEn": "black knitwear",
    "brand": "BL",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1596,
    "priceCNY": 12449,
    "priceNote": "平台价 77 418 грн（原价 96 758 грн，约 €1596）",
    "image": "images/ua_BL_BL-in-pu0000000010-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-pu0000000010-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/03/1c/031c2f5368255488a034534fe511ce16/5ea6f1d5-9464-4687-845d-65365e226a97.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-sviter-iz-sersti-i-kasemira-balmain-pu0000000010-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-ka003ke94-raznocvetnyj-2ikzip",
    "code": "in-bf1ka003ke94-raznocvetnyj",
    "name": "针织衫",
    "nameEn": "knitwear",
    "brand": "BL",
    "category": "tops",
    "style": "针织衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 328,
    "priceCNY": 2558,
    "priceNote": "平台价 15 909 грн（原价 53 026 грн，约 €328）",
    "image": "images/ua_BL_BL-ka003ke94-raznocvetnyj-.jpg",
    "images": [
      "images/ua_BL_BL-ka003ke94-raznocvetnyj-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/18/89/1889ec734b67f8b84f6873d05d67f447/ffcf96fe-1fa4-4e3e-bfce-e3b742d1103e.jpg",
    "url": "https://symbol.ua/uk/store/sviter-iz-sersti-v-monogrammy-sablon-balmain-bf1ka003ke94-raznocvetnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-BL-in-hf1la680xm07-cernyj-1lckdv",
    "code": "-balmain-hf1la680xm07-cernyj",
    "name": "半裙迷你",
    "nameEn": "skirt mini",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1116,
    "priceCNY": 8705,
    "priceNote": "平台价 54 136 грн（原价 77 317 грн，约 €1116）",
    "image": "images/ua_BL_BL-in-hf1la680xm07-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1la680xm07-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/90/c4/90c49285a1bdc6e033f3346672d99cf6/b4a183a3-0fd9-465c-8d0f-7840f0d360e5.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-tvidovaa-ubka-mini-balmain-hf1la680xm07-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-in-sk0000000050-cernyj-188skp",
    "code": "-balmain-sk0000000050-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 2607,
    "priceCNY": 20335,
    "priceNote": "平台价 126 452 грн（约 €2607）",
    "image": "images/ua_BL_BL-in-sk0000000050-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-sk0000000050-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/88/70/8870f4e2a8902691e6092df3d8a185cb/c46d0408-1d4d-47f2-a2b7-94816f35cc88.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-v-cvetocnyj-uzor-balmain-sk0000000050-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-in-sk0000000006-cernyj-1i52ee",
    "code": "-balmain-sk0000000006-cernyj",
    "name": "半裙牛仔",
    "nameEn": "skirt denim",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 993,
    "priceCNY": 7745,
    "priceNote": "平台价 48 178 грн（约 €993）",
    "image": "images/ua_BL_BL-in-sk0000000006-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-sk0000000006-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/dc/b7/dcb71c1abf076ee6590fed633892a470/3673d1a8-7850-4b8c-892f-df86d9905020.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-dzinsovaa-ubka-na-molnii-balmain-sk0000000006-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 105,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 78,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-BL-in-hf1lcc22xm15-cernyj-ia97xf",
    "code": "-balmain-hf1lcc22xm15-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 976,
    "priceCNY": 7613,
    "priceNote": "平台价 47 320 грн（原价 67 621 грн，约 €976）",
    "image": "images/ua_BL_BL-in-hf1lcc22xm15-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1lcc22xm15-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d5/39/d539e95fd3b056bba2cf439d05094b37/ed890f7c-f51d-4530-8d9e-64ac9e9d409d.jpg",
    "url": "https://symbol.ua/uk/store/tvidovaa-ubka-karandas-s-serstu-balmain-hf1lcc22xm15-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 71,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BL-ain-hf1lbb53kk10-sinij-1phvgh",
    "code": "a-balmain-hf1lbb53kk10-sinij",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 906,
    "priceCNY": 7067,
    "priceNote": "平台价 43 936 грн（原价 62 773 грн，约 €906）",
    "image": "images/ua_BL_BL-ain-hf1lbb53kk10-sinij-.jpg",
    "images": [
      "images/ua_BL_BL-ain-hf1lbb53kk10-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/98/c8/98c829cb56de4b72b0838fb304cbf798/4db4e361-799c-429d-bdb0-02465cb353cf.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-ubka-s-tkanym-uzorom-poloska-balmain-hf1lbb53kk10-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 42"
    ],
    "availSizesText": "XS,M"
  },
  {
    "id": "ua-BL-in-sk0000000005-cernyj-cjeio7",
    "code": "-balmain-sk0000000005-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1765,
    "priceCNY": 13767,
    "priceNote": "平台价 85 599 грн（原价 107 011 грн，约 €1765）",
    "image": "images/ua_BL_BL-in-sk0000000005-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-sk0000000005-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/14/7d/147d799835684cae0232eb93142b9d5d/f65fb89b-1d3a-4931-bbec-069a959a324e.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-kozanaa-ubka-balmain-sk0000000005-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-main-sk0000000083-haki-3ajfh4",
    "code": "ik-balmain-sk0000000083-haki",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 794,
    "priceCNY": 6193,
    "priceNote": "平台价 38 533 грн（原价 48 178 грн，约 €794）",
    "image": "images/ua_BL_BL-main-sk0000000083-haki-.jpg",
    "images": [
      "images/ua_BL_BL-main-sk0000000083-haki-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/4d/73/4d73957640bfcbfde94d4d74f3b9eabe/311306da-7c39-4045-a8d2-dbb9f4e8d315.jpg",
    "url": "https://symbol.ua/uk/store/ubka-cveta-haki-v-rubcik-balmain-sk0000000083-haki",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-n-hf1la680xm17-rozovyj-1mrwe6",
    "code": "balmain-hf1la680xm17-rozovyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 1187,
    "priceCNY": 9259,
    "priceNote": "平台价 57 570 грн（原价 82 214 грн，约 €1187）",
    "image": "images/ua_BL_BL-n-hf1la680xm17-rozovyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-hf1la680xm17-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/7b/b0/7bb0c0269cebd9742ca9d159199e2238/bb087fcc-769a-4023-8142-2675a3234d8f.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-tvidovaa-ubka-balmain-hf1la680xm17-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-k0000000082-koricnevyj-1qpn8q",
    "code": "main-sk0000000082-koricnevyj",
    "name": "蕾丝半裙",
    "nameEn": "lace skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "蕾丝 lace",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 1195,
    "priceCNY": 9321,
    "priceNote": "平台价 57 974 грн（原价 72 469 грн，约 €1195）",
    "image": "images/ua_BL_BL-k0000000082-koricnevyj-.jpg",
    "images": [
      "images/ua_BL_BL-k0000000082-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/0c/c0/0cc0e691bae7265b5c2665f87926658e/a97d8c53-e39a-41ba-99ae-d83d0084da09.jpg",
    "url": "https://symbol.ua/uk/store/koricnevaa-ubka-s-kruzevom-balmain-sk0000000082-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-n-sk0000000039-bezevyj-1c9845",
    "code": "balmain-sk0000000039-bezevyj",
    "name": "半裙迷你",
    "nameEn": "skirt mini",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 794,
    "priceCNY": 6193,
    "priceNote": "平台价 38 533 грн（原价 48 178 грн，约 €794）",
    "image": "images/ua_BL_BL-n-sk0000000039-bezevyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-sk0000000039-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/cd/1f/cd1f01762acd73175387a7a1ba781578/b93b772e-f514-4440-8503-9b2d953e6ab4.jpg",
    "url": "https://symbol.ua/uk/store/bezevaa-tvidovaa-ubka-mini-s-lureksom-balmain-sk0000000039-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-n-hf1lc533kk12-bezevyj-1rtu91",
    "code": "balmain-hf1lc533kk12-bezevyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 976,
    "priceCNY": 7613,
    "priceNote": "平台价 47 320 грн（原价 67 621 грн，约 €976）",
    "image": "images/ua_BL_BL-n-hf1lc533kk12-bezevyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-hf1lc533kk12-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/91/27/912760d2a7902bc7a5f58ab65c275c80/d34191d8-90f0-4a8f-8526-3427f660ded5.jpg",
    "url": "https://symbol.ua/uk/store/tvidovaa-ubka-cveta-ajvori-s-serstu-balmain-hf1lc533kk12-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-in-hf1lbb22wc09-cernyj-1c85ks",
    "code": "-balmain-hf1lbb22wc09-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1046,
    "priceCNY": 8159,
    "priceNote": "平台价 50 754 грн（原价 72 469 грн，约 €1046）",
    "image": "images/ua_BL_BL-in-hf1lbb22wc09-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1lbb22wc09-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/83/84/8384ff9ce4cf630a97945bb23ff8863f/85cb02af-9707-4a6f-8ae5-1e68603ab27f.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-iz-sersti-balmain-hf1lbb22wc09-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-in-hf1la695kk34-cernyj-1aaxb3",
    "code": "-balmain-hf1la695kk34-cernyj",
    "name": "半裙迷你",
    "nameEn": "skirt mini",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1046,
    "priceCNY": 8159,
    "priceNote": "平台价 50 754 грн（原价 72 469 грн，约 €1046）",
    "image": "images/ua_BL_BL-in-hf1la695kk34-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1la695kk34-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/5e/10/5e1069e1cb6af04e5a1f1280877fdab2/e6d0fa20-3558-4c02-8daa-962a0db1b5f1.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-mini-balmain-hf1la695kk34-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-n-hf1la695kk01-rozovyj-alkjbj",
    "code": "balmain-hf1la695kk01-rozovyj",
    "name": "半裙迷你",
    "nameEn": "skirt mini",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 1046,
    "priceCNY": 8159,
    "priceNote": "平台价 50 754 грн（原价 72 469 грн，约 €1046）",
    "image": "images/ua_BL_BL-n-hf1la695kk01-rozovyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-hf1la695kk01-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/9a/70/9a7020823c8ab4f37f54fc0f5c2de007/a836f011-212e-4062-8f18-652c7b94b629.jpg",
    "url": "https://symbol.ua/uk/store/rozovaa-ubka-mini-balmain-hf1la695kk01-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 106,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 75,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-in-sk0000000029-cernyj-1d6vur",
    "code": "-balmain-sk0000000029-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 993,
    "priceCNY": 7745,
    "priceNote": "平台价 48 178 грн（约 €993）",
    "image": "images/ua_BL_BL-in-sk0000000029-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-sk0000000029-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8f/7b/8f7ba7dd87a23b4055833486b77ae032/5af98692-104f-4b57-b9d4-969904f24e9c.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-s-drapirovkoj-balmain-sk0000000029-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 44"
    ],
    "availSizesText": "S,L"
  },
  {
    "id": "ua-BL-in-sk0000000038-cernyj-1pi9ew",
    "code": "-balmain-sk0000000038-cernyj",
    "name": "半裙",
    "nameEn": "skirt",
    "brand": "BL",
    "category": "bottoms",
    "style": "半身裙",
    "cut": "aline_skirt",
    "silhouette": "aline",
    "fit": "A字",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1035,
    "priceCNY": 8073,
    "priceNote": "平台价 50 198 грн（原价 62 773 грн，约 €1035）",
    "image": "images/ua_BL_BL-in-sk0000000038-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-sk0000000038-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/fe/61/fe618b5225c3334d840c78c3d1f1ccb7/4a3293e4-6752-46bb-a98b-91bb0c6bf680.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ubka-s-drapirovkoj-balmain-sk0000000038-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 110,
        "ease": 8
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 79,
        "ease": 3
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-in-dr0000000151-cernyj-ctkxk1",
    "code": "-balmain-dr0000000151-cernyj",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 2907,
    "priceCNY": 22675,
    "priceNote": "平台价 140 996 грн（约 €2907）",
    "image": "images/ua_BL_BL-in-dr0000000151-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-dr0000000151-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/2e/76/2e7606ede1bf48d64cc868d401475367/d2220686-7dd6-47ef-9116-143bccff0f0a.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-iz-selka-balmain-dr0000000151-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,XL",
    "fitScore": 100,
    "fitSize": "IT 46",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": 3.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 46"
    ],
    "availSizesText": "S,M,XL"
  },
  {
    "id": "ua-BL-in-dr0000000092-cernyj-1ievc9",
    "code": "-balmain-dr0000000092-cernyj",
    "name": "连衣裙长款",
    "nameEn": "dress maxi",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 2697,
    "priceCNY": 21037,
    "priceNote": "平台价 130 796 грн（约 €2697）",
    "image": "images/ua_BL_BL-in-dr0000000092-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-dr0000000092-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/8a/30/8a30226efe96bc456600783e7e000956/50feadfa-db6c-4cc0-a681-bb9c0c06b307.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-maksi-balmain-dr0000000092-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-in-dr0000000140-cernyj-1xxln2",
    "code": "-balmain-dr0000000140-cernyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1845,
    "priceCNY": 14391,
    "priceNote": "平台价 89 486 грн（原价 111 859 грн，约 €1845）",
    "image": "images/ua_BL_BL-in-dr0000000140-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-dr0000000140-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/23/26/23266bc0032f07d5e12f8e15908bc299/f6864e13-ef82-44d4-bdba-ab75bf37e9fe.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-s-akcentnymi-plecami-balmain-dr0000000140-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-r0000000147-fioletovyj-1pcmb8",
    "code": "main-dr0000000147-fioletovyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "紫色",
    "colorHex": "#6b4a86",
    "priceEUR": 1845,
    "priceCNY": 14391,
    "priceNote": "平台价 89 486 грн（原价 111 859 грн，约 €1845）",
    "image": "images/ua_BL_BL-r0000000147-fioletovyj-.jpg",
    "images": [
      "images/ua_BL_BL-r0000000147-fioletovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/cc/8b/cc8b4902961d61621748b0346495052b/bcab2134-43b4-4808-964a-b8ec60426f3e.jpg",
    "url": "https://symbol.ua/uk/store/fioletovoe-plate-mini-balmain-dr0000000147-fioletovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-in-hf1r9461mi60-cernyj-tbxwec",
    "code": "-balmain-hf1r9461mi60-cernyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1396,
    "priceCNY": 10889,
    "priceNote": "平台价 67 722 грн（原价 96 758 грн，约 €1396）",
    "image": "images/ua_BL_BL-in-hf1r9461mi60-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1r9461mi60-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/82/96/8296f6bc79e3d9855b197f424278db8e/a880ab0c-a07e-43b3-aabd-be93c768e188.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-mini-balmain-hf1r9461mi60-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-in-hf1r5184me54-cernyj-1ruslu",
    "code": "-balmain-hf1r5184me54-cernyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1396,
    "priceCNY": 10889,
    "priceNote": "平台价 67 722 грн（原价 96 758 грн，约 €1396）",
    "image": "images/ua_BL_BL-in-hf1r5184me54-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1r5184me54-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/44/b9/44b9338d004f9a096102731a1720ba4f/304fede0-baa0-41bd-b8e3-b2d2045f1608.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-mini-iz-sersti-balmain-hf1r5184me54-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-n-dr0000000114-zelenyj-e0bk8s",
    "code": "balmain-dr0000000114-zelenyj",
    "name": "连衣裙长款真丝亚麻",
    "nameEn": "dress maxi silk linen",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 3127,
    "priceCNY": 24391,
    "priceNote": "平台价 151 653 грн（原价 189 578 грн，约 €3127）",
    "image": "images/ua_BL_BL-n-dr0000000114-zelenyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-dr0000000114-zelenyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/c7/eb/c7ebfdc2b90e244ea0516162bce91ae3/f1d96739-af91-481c-9535-86e3dad86ee1.jpg",
    "url": "https://symbol.ua/uk/store/zelenoe-plate-maksi-iz-selka-balmain-dr0000000114-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-in-hf1r9462wc09-cernyj-655ciq",
    "code": "-balmain-hf1r9462wc09-cernyj",
    "name": "系带连衣裙",
    "nameEn": "with belt dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1396,
    "priceCNY": 10889,
    "priceNote": "平台价 67 722 грн（原价 96 758 грн，约 €1396）",
    "image": "images/ua_BL_BL-in-hf1r9462wc09-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1r9462wc09-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a1/32/a13238dbe070a406e3ee8bf37158057b/6246e892-a498-4bbd-ad17-9803e77ef150.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-dvubortnoe-plate-zaket-iz-sersti-s-poasom-balmain-hf1r9462wc09-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-r0000000082-koricnevyj-1b377n",
    "code": "main-dr0000000082-koricnevyj",
    "name": "连衣裙长款",
    "nameEn": "dress maxi",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "棕色",
    "colorHex": "#7a5a44",
    "priceEUR": 2005,
    "priceCNY": 15639,
    "priceNote": "平台价 97 264 грн（原价 121 604 грн，约 €2005）",
    "image": "images/ua_BL_BL-r0000000082-koricnevyj-.jpg",
    "images": [
      "images/ua_BL_BL-r0000000082-koricnevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/40/67/406789f35301dde7b7d8fa5e36e73fc5/f4ae657f-288c-4c7d-b63f-eba5ea7f9bd8.jpg",
    "url": "https://symbol.ua/uk/store/koricnevoe-plate-maksi-s-drapirovkoj-balmain-dr0000000082-koricnevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-in-hf1rl245kk06-cernyj-nl6a2a",
    "code": "-balmain-hf1rl245kk06-cernyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1396,
    "priceCNY": 10889,
    "priceNote": "平台价 67 722 грн（原价 96 758 грн，约 €1396）",
    "image": "images/ua_BL_BL-in-hf1rl245kk06-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1rl245kk06-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/e5/a6/e5a6f165f43b9379b5de19a626ed3ed9/b6156528-4bcc-428e-b642-af6bfdaee66a.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-iz-sersti-v-rubcik-balmain-hf1rl245kk06-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XL",
    "fitScore": 100,
    "fitSize": "IT 46",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": 3.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 46"
    ],
    "availSizesText": "XL"
  },
  {
    "id": "ua-BL-in-hf1rl240me54-cernyj-7ajafe",
    "code": "-balmain-hf1rl240me54-cernyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 2098,
    "priceCNY": 16364,
    "priceNote": "平台价 101 759 грн（原价 145 340 грн，约 €2098）",
    "image": "images/ua_BL_BL-in-hf1rl240me54-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1rl240me54-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/61/0b/610b3f04c7041ec1f50da9a5838f3817/b82e3995-f654-41ab-a1e1-def4350213b8.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-zaket-iz-sersti-balmain-hf1rl240me54-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-main-dr0000000140-haki-15aq5e",
    "code": "mi-balmain-dr0000000140-haki",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1845,
    "priceCNY": 14391,
    "priceNote": "平台价 89 486 грн（原价 111 859 грн，约 €1845）",
    "image": "images/ua_BL_BL-main-dr0000000140-haki-.jpg",
    "images": [
      "images/ua_BL_BL-main-dr0000000140-haki-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/1d/2c/1d2c8d078a25484da3a9b3d244cd57f8/c635d3e5-518e-4ca0-b3bd-37c19fe0f751.jpg",
    "url": "https://symbol.ua/uk/store/plate-cveta-haki-s-akcentnymi-plecami-balmain-dr0000000140-haki",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-n-hf1r2302xm17-rozovyj-1l9hos",
    "code": "balmain-hf1r2302xm17-rozovyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 1756,
    "priceCNY": 13697,
    "priceNote": "平台价 85 144 грн（原价 121 604 грн，约 €1756）",
    "image": "images/ua_BL_BL-n-hf1r2302xm17-rozovyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-hf1r2302xm17-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/44/cf/44cf563f9b1ce66af991239b01201773/072acbb2-16a1-417d-afe9-ed778cc387df.jpg",
    "url": "https://symbol.ua/uk/store/rozovoe-tvidovoe-plate-mini-balmain-hf1r2302xm17-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-n-gf0r3385cg68-zelenyj-k8kgqz",
    "code": "balmain-gf0r3385cg68-zelenyj",
    "name": "连衣裙亚麻",
    "nameEn": "dress linen",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "亚麻 linen",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 999,
    "priceCNY": 7792,
    "priceNote": "平台价 48 431 грн（原价 121 050 грн，约 €999）",
    "image": "images/ua_BL_BL-n-gf0r3385cg68-zelenyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-gf0r3385cg68-zelenyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/e8/14/e814fe2cf11a2440adda0a7ac8760ba9/d640e043-51bb-4403-86a3-ddd8bbcb25ed.jpg",
    "url": "https://symbol.ua/uk/store/zelenoe-plate-s-drapirovkoj-balmain-gf0r3385cg68-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-n-gf0r5176kj63-bezevyj-2muunh",
    "code": "balmain-gf0r5176kj63-bezevyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 718,
    "priceCNY": 5600,
    "priceNote": "平台价 34 846 грн（原价 87 062 грн，约 €718）",
    "image": "images/ua_BL_BL-n-gf0r5176kj63-bezevyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-gf0r5176kj63-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/6d/bb/6dbb0c031d0ff9a1140ba2f09cfc870c/b3548250-426c-469b-8dc8-f37eaccf3bf8.jpg",
    "url": "https://symbol.ua/uk/store/plate-cveta-ajvori-s-bahromoj-balmain-gf0r5176kj63-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-n-gf1r8920kj48-rozovyj-zn0qls",
    "code": "balmain-gf1r8920kj48-rozovyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 883,
    "priceCNY": 6887,
    "priceNote": "平台价 42 824 грн（原价 107 011 грн，约 €883）",
    "image": "images/ua_BL_BL-n-gf1r8920kj48-rozovyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-gf1r8920kj48-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a5/1b/a51b38c492d71d9ff204af27682243cb/98084c30-26b8-48c0-abad-e1fbec4f2a4f.jpg",
    "url": "https://symbol.ua/uk/store/rozovoe-tvidovoe-plate-mini-balmain-gf1r8920kj48-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-n-gf0r2541wd60-rozovyj-1h7vu2",
    "code": "balmain-gf0r2541wd60-rozovyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 723,
    "priceCNY": 5639,
    "priceNote": "平台价 35 048 грн（原价 87 568 грн，约 €723）",
    "image": "images/ua_BL_BL-n-gf0r2541wd60-rozovyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-gf0r2541wd60-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/68/20/68206ef8e06465c7b74e884a77f8c551/a5afd09d-23fb-4b0c-b90c-49765709260d.jpg",
    "url": "https://symbol.ua/uk/store/rozovoe-tvidovoe-plate-futlar-s-serstu-balmain-gf0r2541wd60-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-BL-n-gf0r7485kj89-bezevyj-swl9e2",
    "code": "balmain-gf0r7485kj89-bezevyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 883,
    "priceCNY": 6887,
    "priceNote": "平台价 42 824 грн（原价 107 011 грн，约 €883）",
    "image": "images/ua_BL_BL-n-gf0r7485kj89-bezevyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-gf0r7485kj89-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/4d/d8/4dd8f7e37ab10870772bdd2875510e14/2a58fcd3-b3cb-40c3-b0ad-9f349ecfa1a1.jpg",
    "url": "https://symbol.ua/uk/store/tvidovoe-plate-cveta-ajvori-balmain-gf0r7485kj89-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-in-gf0r8955kj84-cernyj-1l3zkx",
    "code": "-balmain-gf0r8955kj84-cernyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 793,
    "priceCNY": 6185,
    "priceNote": "平台价 38 482 грн（原价 96 254 грн，约 €793）",
    "image": "images/ua_BL_BL-in-gf0r8955kj84-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-gf0r8955kj84-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/88/b9/88b95df97fc8f855eb3d976b971bcf0c/3d014f71-262a-4e86-b2ea-c5b5893f7da9.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-plate-mini-s-pajetkami-balmain-gf0r8955kj84-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-n-gf0r5172jj77-bezevyj-1qbans",
    "code": "balmain-gf0r5172jj77-bezevyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 398,
    "priceCNY": 3104,
    "priceNote": "平台价 19 292 грн（原价 48 178 грн，约 €398）",
    "image": "images/ua_BL_BL-n-gf0r5172jj77-bezevyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-gf0r5172jj77-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/e6/24/e6241e4876afb7646baf5b104b8e8538/b7bc6626-4807-4e25-8d15-0ca062f52c4a.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-plate-mini-na-odno-pleco-s-drapirovkoj-balmain-gf0r5172jj77-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-n-gf0r7485kj89-rozovyj-1bu4oh",
    "code": "balmain-gf0r7485kj89-rozovyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 883,
    "priceCNY": 6887,
    "priceNote": "平台价 42 824 грн（原价 107 011 грн，约 €883）",
    "image": "images/ua_BL_BL-n-gf0r7485kj89-rozovyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-gf0r7485kj89-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/98/09/980956e6a7c2ca79813cb590cfaedec2/11ee3925-e5fc-490d-9cfc-3a02998a82bc.jpg",
    "url": "https://symbol.ua/uk/store/rozovoe-tvidovoe-plate-balmain-gf0r7485kj89-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-f1ro190sf37-fioletovyj-imh4m5",
    "code": "main-gf1ro190sf37-fioletovyj",
    "name": "连衣裙真丝",
    "nameEn": "dress silk",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "silk_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "紫色",
    "colorHex": "#6b4a86",
    "priceEUR": 991,
    "priceCNY": 7730,
    "priceNote": "平台价 48 076 грн（原价 120 141 грн，约 €991）",
    "image": "images/ua_BL_BL-f1ro190sf37-fioletovyj-.jpg",
    "images": [
      "images/ua_BL_BL-f1ro190sf37-fioletovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/a4/33/a43351064ccab5f292bbe140e3e06c77/029e0523-110e-489f-8108-a66e70a697d8.jpg",
    "url": "https://symbol.ua/uk/store/fioletovoe-plate-iz-selka-s-otkrytoj-spinoj-balmain-gf1ro190sf37-fioletovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 96,
        "ease": 6
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-ain-gf0r5181cb09-belyj-1bp6p7",
    "code": "j-balmain-gf0r5181cb09-belyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 637,
    "priceCNY": 4969,
    "priceNote": "平台价 30 906 грн（原价 77 317 грн，约 €637）",
    "image": "images/ua_BL_BL-ain-gf0r5181cb09-belyj-.jpg",
    "images": [
      "images/ua_BL_BL-ain-gf0r5181cb09-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/85/17/8517184013f8e1a2ac447d05de171170/15cfc9f1-f776-47f5-b674-f23364a921ee.jpg",
    "url": "https://symbol.ua/uk/store/beloe-plate-s-drapirovkoj-balmain-gf0r5181cb09-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-n-gf0r7480cg65-bezevyj-1q4leb",
    "code": "balmain-gf0r7480cg65-bezevyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "米色",
    "colorHex": "#cbb79c",
    "priceEUR": 718,
    "priceCNY": 5600,
    "priceNote": "平台价 34 846 грн（原价 87 062 грн，约 €718）",
    "image": "images/ua_BL_BL-n-gf0r7480cg65-bezevyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-gf0r7480cg65-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/1f/6c/1f6cfd318a733d2a0ef540c0d7777b2a/b72c729d-4aee-40a7-b8bf-1349d2b310b6.jpg",
    "url": "https://symbol.ua/uk/store/bezevoe-plate-balmain-gf0r7480cg65-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-ain-ff1r5128cb09-belyj-yvmj4z",
    "code": "j-balmain-ff1r5128cb09-belyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 637,
    "priceCNY": 4969,
    "priceNote": "平台价 30 906 грн（原价 77 317 грн，约 €637）",
    "image": "images/ua_BL_BL-ain-ff1r5128cb09-belyj-.jpg",
    "images": [
      "images/ua_BL_BL-ain-ff1r5128cb09-belyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/b3/5a/b35a0efe382cbf35b19d8cec2dbdeab2/da4dfade-95b5-44fa-b6d8-d317f0bc443e.jpg",
    "url": "https://symbol.ua/uk/store/beloe-plate-s-otkrytoj-spinoj-balmain-ff1r5128cb09-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-ain-ff0r8895jl17-seryj-z8jbxj",
    "code": "u-balmain-ff0r8895jl17-seryj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "灰色",
    "colorHex": "#8c8c88",
    "priceEUR": 678,
    "priceCNY": 5288,
    "priceNote": "平台价 32 877 грн（原价 82 214 грн，约 €678）",
    "image": "images/ua_BL_BL-ain-ff0r8895jl17-seryj-.jpg",
    "images": [
      "images/ua_BL_BL-ain-ff0r8895jl17-seryj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/5b/b1/5bb1d61503178ac9ae5e587e9b37cf01/4b5fb116-23d5-45a5-8e58-9693a33d874d.jpg",
    "url": "https://symbol.ua/uk/store/seroe-melanzevoe-plate-mini-s-serstu-balmain-ff0r8895jl17-seryj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-n-ff0r8012kj03-krasnyj-102lw3",
    "code": "balmain-ff0r8012kj03-krasnyj",
    "name": "连衣裙迷你",
    "nameEn": "dress mini",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 958,
    "priceCNY": 7472,
    "priceNote": "平台价 46 460 грн（原价 116 202 грн，约 €958）",
    "image": "images/ua_BL_BL-n-ff0r8012kj03-krasnyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-ff0r8012kj03-krasnyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/87/46/87460581babf8219cdb478b4f060ac5b/2951c223-9fcc-4056-88d6-4a948426e48d.jpg",
    "url": "https://symbol.ua/uk/store/krasnoe-plate-mini-s-fakturnym-uzorom-balmain-ff0r8012kj03-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-BL-f0r8033kj15-fioletovyj-1j0qoc",
    "code": "main-ff0r8033kj15-fioletovyj",
    "name": "连衣裙",
    "nameEn": "dress",
    "brand": "BL",
    "category": "dresses",
    "style": "连衣裙",
    "cut": "shift_dress",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "紫色",
    "colorHex": "#6b4a86",
    "priceEUR": 798,
    "priceCNY": 6224,
    "priceNote": "平台价 38 684 грн（原价 96 758 грн，约 €798）",
    "image": "images/ua_BL_BL-f0r8033kj15-fioletovyj-.jpg",
    "images": [
      "images/ua_BL_BL-f0r8033kj15-fioletovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/b3/4b/b34bbbb8d245245f1b1bfecba26de99b/1e8715ae-76f8-4122-8640-cce62e4d131d.jpg",
    "url": "https://symbol.ua/uk/store/fioletovoe-plate-balmain-ff0r8033kj15-fioletovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-BL-in-pa0000000065-cernyj-1mi3c0",
    "code": "-balmain-pa0000000065-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1394,
    "priceCNY": 10873,
    "priceNote": "平台价 67 621 грн（约 €1394）",
    "image": "images/ua_BL_BL-in-pa0000000065-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-pa0000000065-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/49/33/493385bd10052cb21c2c42dea2f10b5d/e60cb454-d582-4781-84d8-721b5dc18308.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-balmain-pa0000000065-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,XL",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 46"
    ],
    "availSizesText": "S,M,XL"
  },
  {
    "id": "ua-BL-ain-hf1mi052dg08-sinij-1nu8jr",
    "code": "c-balmain-hf1mi052dg08-sinij",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "BL",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 555,
    "priceCNY": 4329,
    "priceNote": "平台价 26 918 грн（原价 38 482 грн，约 €555）",
    "image": "images/ua_BL_BL-ain-hf1mi052dg08-sinij-.jpg",
    "images": [
      "images/ua_BL_BL-ain-hf1mi052dg08-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/01/e5/01e5aada2ae314e08b640adc194de702/87e08833-b4ce-4907-8bfd-3f10249b3c50.jpg",
    "url": "https://symbol.ua/uk/store/sinie-dzinsy-s-logotip-patc-balmain-hf1mi052dg08-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 105,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 78,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-BL-in-gf1pn190wc09-cernyj-1o9rp0",
    "code": "-balmain-gf1pn190wc09-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 696,
    "priceCNY": 5429,
    "priceNote": "平台价 33 734 грн（原价 48 178 грн，约 €696）",
    "image": "images/ua_BL_BL-in-gf1pn190wc09-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-gf1pn190wc09-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/4f/2a/4f2a14c15ad47c28b9fc87aba6d471f1/991d887e-54d7-4717-b070-32fc01499238.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-s-vysokoj-posadkoj-balmain-gf1pn190wc09-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-BL-in-pa0000000052-cernyj-1a7gcd",
    "code": "-balmain-pa0000000052-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 956,
    "priceCNY": 7457,
    "priceNote": "平台价 46 360 грн（原价 57 925 грн，约 €956）",
    "image": "images/ua_BL_BL-in-pa0000000052-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-pa0000000052-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/22/aa/22aaf55f0426c00bad0152fe0fd725be/8a8842c6-474b-4030-a102-34d725b36e10.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-kles-iz-sersti-balmain-pa0000000052-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-in-pa0000000005-cernyj-1ijlwj",
    "code": "-balmain-pa0000000005-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 2005,
    "priceCNY": 15639,
    "priceNote": "平台价 97 264 грн（原价 121 604 грн，约 €2005）",
    "image": "images/ua_BL_BL-in-pa0000000005-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-pa0000000005-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/25/d3/25d3df8ba9360227d8a4aad08a2751f5/286010a3-e64a-4352-8768-094448753f8b.jpg",
    "url": "https://symbol.ua/uk/store/cernye-kozanye-bruki-so-stripkami-balmain-pa0000000005-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BL-in-gf1pl024jl05-cernyj-1rq5xl",
    "code": "-balmain-gf1pl024jl05-cernyj",
    "name": "系带长裤",
    "nameEn": "with belt trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 906,
    "priceCNY": 7067,
    "priceNote": "平台价 43 936 грн（原价 62 773 грн，约 €906）",
    "image": "images/ua_BL_BL-in-gf1pl024jl05-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-gf1pl024jl05-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/39/cf/39cfc37a4b6bc76599a64267ed7e64fe/76083266-af38-41ce-9685-7fea8044bd51.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-s-vysokoj-posadkoj-s-poasom-balmain-gf1pl024jl05-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-n-gf0pn215vi91-rozovyj-8pwhx2",
    "code": "balmain-gf0pn215vi91-rozovyj",
    "name": "长裤印花",
    "nameEn": "trousers print",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 518,
    "priceCNY": 4040,
    "priceNote": "平台价 25 100 грн（原价 62 773 грн，约 €518）",
    "image": "images/ua_BL_BL-n-gf0pn215vi91-rozovyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-gf0pn215vi91-rozovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/84/88/848844029c5f2e63b01427c6f3ace73d/0c2dbf1c-f3ab-4701-8753-9abdd54aaad2.jpg",
    "url": "https://symbol.ua/uk/store/rozovye-bruki-i-brendovyj-print-balmain-gf0pn215vi91-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,L,XL",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 44",
      "IT 46"
    ],
    "availSizesText": "S,L,XL"
  },
  {
    "id": "ua-BL-main-gf0pn190cg65-haki-1jiyrg",
    "code": "ki-balmain-gf0pn190cg65-haki",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 318,
    "priceCNY": 2480,
    "priceNote": "平台价 15 404 грн（原价 38 482 грн，约 €318）",
    "image": "images/ua_BL_BL-main-gf0pn190cg65-haki-.jpg",
    "images": [
      "images/ua_BL_BL-main-gf0pn190cg65-haki-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d7/97/d797b633eb326a26f84f9b1fa57b287f/82e3401a-3f7d-4069-857d-dbbed23ef10c.jpg",
    "url": "https://symbol.ua/uk/store/bruki-cveta-haki-balmain-gf0pn190cg65-haki",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-f1pn215sf37-fioletovyj-1jvso1",
    "code": "main-gf1pn215sf37-fioletovyj",
    "name": "长裤印花真丝",
    "nameEn": "trousers print silk",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "紫色",
    "colorHex": "#6b4a86",
    "priceEUR": 518,
    "priceCNY": 4040,
    "priceNote": "平台价 25 100 грн（原价 62 773 грн，约 €518）",
    "image": "images/ua_BL_BL-f1pn215sf37-fioletovyj-.jpg",
    "images": [
      "images/ua_BL_BL-f1pn215sf37-fioletovyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/25/55/255522b8971617441f94a67298f79924/f2db7caf-a52d-440b-82b3-678afbd29b43.jpg",
    "url": "https://symbol.ua/uk/store/fioletovye-bruki-iz-selka-v-cvetocnyj-print-balmain-gf1pn215sf37-fioletovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BL-in-ff1pq240sf12-cernyj-19tbmg",
    "code": "-balmain-ff1pq240sf12-cernyj",
    "name": "长裤印花真丝",
    "nameEn": "trousers print silk",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "真丝 silk",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 518,
    "priceCNY": 4040,
    "priceNote": "平台价 25 100 грн（原价 62 773 грн，约 €518）",
    "image": "images/ua_BL_BL-in-ff1pq240sf12-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-ff1pq240sf12-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/6c/5d/6c5d358453f61ddd9cc48f9884affd42/cc3591e9-b136-4403-bee7-4265f1407d09.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-selka-v-print-balmain-ff1pq240sf12-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BL-in-ff0pn190wc09-cernyj-begw34",
    "code": "-balmain-ff0pn190wc09-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 394,
    "priceCNY": 3073,
    "priceNote": "平台价 19 090 грн（原价 47 672 грн，约 €394）",
    "image": "images/ua_BL_BL-in-ff0pn190wc09-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-ff0pn190wc09-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/2b/77/2b778899d3092e043da0e5341f03b4f4/00f6fd98-d2a3-4563-b6ff-37c5818de255.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-balmain-ff0pn190wc09-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-in-ff0pn190xh82-cernyj-1cs35v",
    "code": "-balmain-ff0pn190xh82-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 478,
    "priceCNY": 3728,
    "priceNote": "平台价 23 181 грн（原价 57 925 грн，约 €478）",
    "image": "images/ua_BL_BL-in-ff0pn190xh82-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-ff0pn190xh82-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/44/51/445166b7f55ea2ef3fe238b5f384eecf/6b5847ec-ab43-4278-87e8-ebcdbb6e72ee.jpg",
    "url": "https://symbol.ua/uk/store/cernye-stany-balmain-ff0pn190xh82-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-in-ff1pn190wc09-cernyj-xs70j5",
    "code": "-balmain-ff1pn190wc09-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 394,
    "priceCNY": 3073,
    "priceNote": "平台价 19 090 грн（原价 47 672 грн，约 €394）",
    "image": "images/ua_BL_BL-in-ff1pn190wc09-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-ff1pn190wc09-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/dd/c8/ddc86e5dd45414b7907d417564709add/4c5b6436-3f30-44f6-a657-0ea95fa14afe.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-balmain-ff1pn190wc09-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-in-ef1po161me54-cernyj-1jwkvv",
    "code": "-balmain-ef1po161me54-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 678,
    "priceCNY": 5288,
    "priceNote": "平台价 32 877 грн（原价 82 214 грн，约 €678）",
    "image": "images/ua_BL_BL-in-ef1po161me54-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-ef1po161me54-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/ec/64/ec64a912e867be7e218e75fb3bb6d830/3aa00c80-ac0c-4341-bca8-b128e4ce92df.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-s-vysokoj-posadkoj-balmain-ef1po161me54-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-in-ef0pm045me54-cernyj-14u9yt",
    "code": "-balmain-ef0pm045me54-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 479,
    "priceCNY": 3736,
    "priceNote": "平台价 23 230 грн（原价 58 026 грн，约 €479）",
    "image": "images/ua_BL_BL-in-ef0pm045me54-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-ef0pm045me54-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/cd/15/cd158a45468a07bc800e564deaf128ce/47293404-b5a4-4173-9af0-197b69842ecb.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-balmain-ef0pm045me54-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-n-ef0po160vb00-krasnyj-1iibgq",
    "code": "balmain-ef0po160vb00-krasnyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 461,
    "priceCNY": 3596,
    "priceNote": "平台价 22 373 грн（原价 55 954 грн，约 €461）",
    "image": "images/ua_BL_BL-n-ef0po160vb00-krasnyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-ef0po160vb00-krasnyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/45/cb/45cbf69f5ef8b9a57f5a4d57a9aba2a9/7bc10c8b-36e2-4c0e-aed5-2a14daa753f9.jpg",
    "url": "https://symbol.ua/uk/store/krasnye-stany-balmain-ef0po160vb00-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-BL-in-ef0po160vb00-cernyj-7i9oqv",
    "code": "-balmain-ef0po160vb00-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 461,
    "priceCNY": 3596,
    "priceNote": "平台价 22 373 грн（原价 55 954 грн，约 €461）",
    "image": "images/ua_BL_BL-in-ef0po160vb00-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-ef0po160vb00-cernyj-.jpg"
    ],
    "remoteImg": "https://media3.symbol.ua/aio-images/fc/cd/fccd258629f534ddb9e685396252da2b/e8f0a449-0f6c-4e3f-b153-bb385ebeb77a.jpg",
    "url": "https://symbol.ua/uk/store/cernye-stany-balmain-ef0po160vb00-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-in-bf0pm010wb86-cernyj-1fa6aq",
    "code": "-balmain-bf0pm010wb86-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 388,
    "priceCNY": 3026,
    "priceNote": "平台价 18 838 грн（原价 62 773 грн，约 €388）",
    "image": "images/ua_BL_BL-in-bf0pm010wb86-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-bf0pm010wb86-cernyj-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/6d/aa/6daa175b0bf92e64e7cc2e0854eda6c3/71bbf97e-089f-43ff-b8af-795cf0074f80.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-balmain-bf0pm010wb86-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BL-ain-bf1pp112wb87-sinij-urlkna",
    "code": "i-balmain-bf1pp112wb87-sinij",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 508,
    "priceCNY": 3962,
    "priceNote": "平台价 24 644 грн（原价 82 214 грн，约 €508）",
    "image": "images/ua_BL_BL-ain-bf1pp112wb87-sinij-.jpg",
    "images": [
      "images/ua_BL_BL-ain-bf1pp112wb87-sinij-.jpg"
    ],
    "remoteImg": "https://media2.symbol.ua/aio-images/8f/f4/8ff4aeeaef948706ba0e7396cb51202d/a88dcd14-4312-4cd3-8c57-e7fcc003586d.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-kles-iz-sersti-balmain-bf1pp112wb87-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BL-0pq045j202-serebristyj-1csgln",
    "code": "ain-wf0pq045j202-serebristyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 508,
    "priceCNY": 3962,
    "priceNote": "平台价 24 644 грн（原价 82 214 грн，约 €508）",
    "image": "images/ua_BL_BL-0pq045j202-serebristyj-.jpg",
    "images": [
      "images/ua_BL_BL-0pq045j202-serebristyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/3d/5c/3d5ce17c5279a798f41b24af725394b3/03f3e4fc-fd16-4ee6-babb-4f5fe7144f87.jpg",
    "url": "https://symbol.ua/uk/store/serebristye-bruki-s-zasipami-i-lureksom-balmain-wf0pq045j202-serebristyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-ain-uf15172w085-cernyj-19m5kq",
    "code": "i-balmain-uf15172w085-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 303,
    "priceCNY": 2363,
    "priceNote": "平台价 14 697 грн（原价 48 986 грн，约 €303）",
    "image": "images/ua_BL_BL-ain-uf15172w085-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-ain-uf15172w085-cernyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/e5/0d/e50db2a2c9720543ff561c4b3f72b546/df4dd78a-8325-4ee2-8a98-242297722529.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-balmain-uf15172w085-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-main-sf15226k464-sinij-1jcco6",
    "code": "mi-balmain-sf15226k464-sinij",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 465,
    "priceCNY": 3627,
    "priceNote": "平台价 22 575 грн（原价 75 246 грн，约 €465）",
    "image": "images/ua_BL_BL-main-sf15226k464-sinij-.jpg",
    "images": [
      "images/ua_BL_BL-main-sf15226k464-sinij-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/97/f5/97f5a14dde3e570c0e8fd410072e6b08/ba4024f1-5768-4dfd-a3db-accd98137ea2.jpg",
    "url": "https://symbol.ua/uk/store/sinie-bruki-s-pajetkami-balmain-sf15226k464-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BL-in-sf25088v074-rozovyj-laypmb",
    "code": "-balmain-sf25088v074-rozovyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "粉色",
    "colorHex": "#dfa9b4",
    "priceEUR": 465,
    "priceCNY": 3627,
    "priceNote": "平台价 22 575 грн（原价 75 246 грн，约 €465）",
    "image": "images/ua_BL_BL-in-sf25088v074-rozovyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-sf25088v074-rozovyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/1d/9f/1d9fddbcdc9e0f33c5994091e62d1cf6/cf31d7c0-ebd9-4557-805b-423dc1dbadc3.jpg",
    "url": "https://symbol.ua/uk/store/svetlo-rozovye-bruki-balmain-sf25088v074-rozovyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BL-in-sf15088w034-krasnyj-upapfq",
    "code": "-balmain-sf15088w034-krasnyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "红色",
    "colorHex": "#b5302c",
    "priceEUR": 465,
    "priceCNY": 3627,
    "priceNote": "平台价 22 575 грн（原价 75 246 грн，约 €465）",
    "image": "images/ua_BL_BL-in-sf15088w034-krasnyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-sf15088w034-krasnyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/88/4e/884eaf6fe98d7a37382af8d51d1f55ee/bbea440d-a176-4b24-bb91-aa5cef480c90.jpg",
    "url": "https://symbol.ua/uk/store/krasnye-bruki-iz-sersti-balmain-sf15088w034-krasnyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 100,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 72,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BL-rf25397j078-serebranyj-1dmnif",
    "code": "lmain-rf25397j078-serebranyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1292,
    "priceCNY": 10078,
    "priceNote": "平台价 62 672 грн（原价 208 970 грн，约 €1292）",
    "image": "images/ua_BL_BL-rf25397j078-serebranyj-.jpg",
    "images": [
      "images/ua_BL_BL-rf25397j078-serebranyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/a7/fa/a7fa0c0ff45d72347a9d6caadcdab4b6/4ed8d1fe-0779-4e6c-8629-c8a07509fff1.jpg",
    "url": "https://symbol.ua/uk/store/serebristye-bruki-balmain-rf25397j078-serebranyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-f25140c084-temno-sinij-1yj9nl",
    "code": "main-rf25140c084-temno-sinij",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 515,
    "priceCNY": 4017,
    "priceNote": "平台价 24 999 грн（原价 83 276 грн，约 €515）",
    "image": "images/ua_BL_BL-f25140c084-temno-sinij-.jpg",
    "images": [
      "images/ua_BL_BL-f25140c084-temno-sinij-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/2b/de/2bdee9fcaa181f963c43c39ec3cf28e0/10e82d33-39a1-46b5-ad74-358e9098f7ee.jpg",
    "url": "https://symbol.ua/uk/store/temno-sinie-bruki-balmain-rf25140c084-temno-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-i-balmain-135107-belyj-1ovpf7",
    "code": "e-bruki-balmain-135107-belyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 483,
    "priceCNY": 3767,
    "priceNote": "平台价 23 432 грн（原价 78 074 грн，约 €483）",
    "image": "images/ua_BL_BL-i-balmain-135107-belyj-.jpg",
    "images": [
      "images/ua_BL_BL-i-balmain-135107-belyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/a2/bb/a2bb23af358f6d64dae191a57b91c0a2/b6ca4948-5275-43ca-b1f7-adfce7a4031f.jpg",
    "url": "https://symbol.ua/uk/store/belye-bruki-balmain-135107-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 44"
    ],
    "availSizesText": "S,L"
  },
  {
    "id": "ua-BL--balmain-135109-cernyj-157i74",
    "code": "-bruki-balmain-135109-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 483,
    "priceCNY": 3767,
    "priceNote": "平台价 23 432 грн（原价 78 074 грн，约 €483）",
    "image": "images/ua_BL_BL--balmain-135109-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL--balmain-135109-cernyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/e8/e5/e8e51202aa96715b1acfd8813d1c366b/dfb0781f-139e-4c8a-9992-f3c937b0daba.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-balmain-135109-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-lmain-5356347n-zelenyj-1nxqr0",
    "code": "uki-balmain-5356347n-zelenyj",
    "name": "长裤亚麻",
    "nameEn": "trousers linen",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "亚麻 linen",
    "colorName": "绿色",
    "colorHex": "#3d6b45",
    "priceEUR": 306,
    "priceCNY": 2387,
    "priceNote": "平台价 14 848 грн（原价 49 490 грн，约 €306）",
    "image": "images/ua_BL_BL-lmain-5356347n-zelenyj-.jpg",
    "images": [
      "images/ua_BL_BL-lmain-5356347n-zelenyj-.jpg"
    ],
    "remoteImg": "https://media.symbol.ua/aio-images/55/d2/55d2c673eb16521ab90b1e18540cf57f/b3f4f7ae-7b5f-45e2-861f-2bc68740dca1.jpg",
    "url": "https://symbol.ua/uk/store/zelenye-bruki-balmain-5356347n-zelenyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 80,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 44"
    ],
    "availSizesText": "L"
  },
  {
    "id": "ua-BL-in-pa0000000081-cernyj-e0s4ip",
    "code": "-balmain-pa0000000081-cernyj",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1294,
    "priceCNY": 10093,
    "priceNote": "平台价 62 773 грн（约 €1294）",
    "image": "images/ua_BL_BL-in-pa0000000081-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-pa0000000081-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/c1/d2/c1d256653a8f4ac57d19c804b48c7481/a3b6c47f-22d6-42a0-87e9-cb1037df0e99.jpg",
    "url": "https://symbol.ua/uk/store/cernye-bruki-iz-sersti-s-lampasami-balmain-pa0000000081-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-in-hf1tp140mi65-cernyj-g2yezj",
    "code": "-balmain-hf1tp140mi65-cernyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BL",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 2098,
    "priceCNY": 16364,
    "priceNote": "平台价 101 759 грн（原价 145 340 грн，约 €2098）",
    "image": "images/ua_BL_BL-in-hf1tp140mi65-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1tp140mi65-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/7a/33/7a3393f115ac66844cf72b24206d7bed/a152e808-abf8-42a4-bdcc-70efe2cd59f9.jpg",
    "url": "https://symbol.ua/uk/store/tvidovaa-kurtka-s-serstu-balmain-hf1tp140mi65-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS",
    "fitScore": 100,
    "fitSize": "IT 38",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -11.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -20,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 81,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38"
    ],
    "availSizesText": "XS"
  },
  {
    "id": "ua-BL-in-hf1sk691lc62-cernyj-17cxbf",
    "code": "-balmain-hf1sk691lc62-cernyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BL",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 2667,
    "priceCNY": 20803,
    "priceNote": "平台价 129 332 грн（原价 184 730 грн，约 €2667）",
    "image": "images/ua_BL_BL-in-hf1sk691lc62-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1sk691lc62-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/5d/57/5d573d59cac878015e8e7e0d172967ba/d5532cd9-2dde-4ebc-ae0b-f270cdcec547.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-kozanaa-kurtka-s-akcentnymi-plecami-balmain-hf1sk691lc62-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-in-hf1ua215wc70-cernyj-142g3m",
    "code": "-balmain-hf1ua215wc70-cernyj",
    "name": "裹身大衣",
    "nameEn": "wrap coat",
    "brand": "BL",
    "category": "outer",
    "style": "大衣",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1825,
    "priceCNY": 14235,
    "priceNote": "平台价 88 528 грн（原价 126 452 грн，约 €1825）",
    "image": "images/ua_BL_BL-in-hf1ua215wc70-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1ua215wc70-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/16/b7/16b706fe8052fcf9202e2c105a982e59/381778d1-2f9f-4fd4-9895-05c74a28ab4d.jpg",
    "url": "https://symbol.ua/uk/store/cernoe-palto-na-zapah-iz-sersti-balmain-hf1ua215wc70-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-ain-ou0000000023-sinij-m182dm",
    "code": "y-balmain-ou0000000023-sinij",
    "name": "皮草",
    "nameEn": "fur coat",
    "brand": "BL",
    "category": "outer",
    "style": "外套",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 5003,
    "priceCNY": 39023,
    "priceNote": "平台价 242 654 грн（约 €5003）",
    "image": "images/ua_BL_BL-ain-ou0000000023-sinij-.jpg",
    "images": [
      "images/ua_BL_BL-ain-ou0000000023-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/94/b3/94b3eef64a7c48d8624b41871e96dd5a/2f4cd6a5-5f3d-4e79-9e97-d3fecf342f43.jpg",
    "url": "https://symbol.ua/uk/store/sinaa-suba-iz-ovciny-balmain-ou0000000023-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-in-pa0000000003-cernyj-2ypuk4",
    "code": "-balmain-pa0000000003-cernyj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "BL",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 714,
    "priceCNY": 5569,
    "priceNote": "平台价 34 644 грн（原价 43 330 грн，约 €714）",
    "image": "images/ua_BL_BL-in-pa0000000003-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-pa0000000003-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/09/b7/09b7bf3c979aa087f836cb9ae4be2276/6aa4ec65-6f4c-4017-afe3-3540830f4665.jpg",
    "url": "https://symbol.ua/uk/store/cernye-dzinsy-s-logotip-patc-balmain-pa0000000003-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 105,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 78,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "XS,S,M,L"
  },
  {
    "id": "ua-BL-ain-hf1mf075dg08-sinij-k2vqle",
    "code": "c-balmain-hf1mf075dg08-sinij",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "BL",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "蓝色",
    "colorHex": "#2f4d7a",
    "priceEUR": 696,
    "priceCNY": 5429,
    "priceNote": "平台价 33 734 грн（原价 48 178 грн，约 €696）",
    "image": "images/ua_BL_BL-ain-hf1mf075dg08-sinij-.jpg",
    "images": [
      "images/ua_BL_BL-ain-hf1mf075dg08-sinij-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/e3/81/e38145c0523f31c951a68e63bef45cac/6b45ae16-6bef-4ac1-85e6-38f3bdb82cfd.jpg",
    "url": "https://symbol.ua/uk/store/sinie-dzinsy-skini-s-logotip-patc-balmain-hf1mf075dg08-sinij",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-n-pa0000000008-goluboj-w63hoy",
    "code": "balmain-pa0000000008-goluboj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "BL",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "天蓝",
    "colorHex": "#8fb0d0",
    "priceEUR": 635,
    "priceCNY": 4953,
    "priceNote": "平台价 30 806 грн（原价 38 482 грн，约 €635）",
    "image": "images/ua_BL_BL-n-pa0000000008-goluboj-.jpg",
    "images": [
      "images/ua_BL_BL-n-pa0000000008-goluboj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/0e/9d/0e9de9296fd173784b8f89baad708066/d0d1acb3-2d1a-49ab-bb45-a1852e971bd8.jpg",
    "url": "https://symbol.ua/uk/store/golubye-dzinsy-kles-s-patcem-logotipa-balmain-pa0000000008-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L,XL",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 105,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 78,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44",
      "IT 46"
    ],
    "availSizesText": "S,M,L,XL"
  },
  {
    "id": "ua-BL-ain-hf1ef000bd10-belyj-n6eabg",
    "code": "a-balmain-hf1ef000bd10-belyj",
    "name": "T恤",
    "nameEn": "T-shirt",
    "brand": "BL",
    "category": "tops",
    "style": "T恤",
    "cut": "tee",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 273,
    "priceCNY": 2129,
    "priceNote": "平台价 13 232 грн（原价 18 888 грн，约 €273）",
    "image": "images/ua_BL_BL-ain-hf1ef000bd10-belyj-.jpg",
    "images": [
      "images/ua_BL_BL-ain-hf1ef000bd10-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/c6/c2/c6c27071ff43bdf58f3850d4b79c3095/77d88b03-a919-45c7-a280-a6dc2f62feaf.jpg",
    "url": "https://symbol.ua/uk/store/belaa-futbolka-s-vysivkoj-logotipa-balmain-hf1ef000bd10-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 10
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "XS,S,M,L"
  },
  {
    "id": "ua-BL-in-hf1tfb20kk12-cernyj-rapqp5",
    "code": "-balmain-hf1tfb20kk12-cernyj",
    "name": "开衫黑色",
    "nameEn": "cardigan black",
    "brand": "BL",
    "category": "tops",
    "style": "开衫",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "羊毛 wool",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1747,
    "priceCNY": 13627,
    "priceNote": "平台价 84 740 грн（原价 121 050 грн，约 €1747）",
    "image": "images/ua_BL_BL-in-hf1tfb20kk12-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1tfb20kk12-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/f1/c3/f1c3c4de32a9a7608a014dd923ecb568/4738a272-8c24-4a81-af14-870b7975b27b.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-tvidovyj-kardigan-s-serstu-merinosa-balmain-hf1tfb20kk12-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-ain-hf1hr165cg72-belyj-kuyj41",
    "code": "j-balmain-hf1hr165cg72-belyj",
    "name": "衬衫",
    "nameEn": "shirt",
    "brand": "BL",
    "category": "tops",
    "style": "衬衫",
    "cut": "shirt",
    "silhouette": "straight",
    "fit": "落肩",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "白色",
    "colorHex": "#f2f2f0",
    "priceEUR": 696,
    "priceCNY": 5429,
    "priceNote": "平台价 33 734 грн（原价 48 178 грн，约 €696）",
    "image": "images/ua_BL_BL-ain-hf1hr165cg72-belyj-.jpg",
    "images": [
      "images/ua_BL_BL-ain-hf1hr165cg72-belyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/db/67/db675540424ddc4b0ab11cc80b912135/f0c961ee-8289-436d-acc3-5e6c33240a11.jpg",
    "url": "https://symbol.ua/uk/store/belaa-rubaska-s-brendovoj-furnituroj-balmain-hf1hr165cg72-belyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 98,
        "ease": 12
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40"
    ],
    "availSizesText": "XS,S"
  },
  {
    "id": "ua-BL-in-to0000000013-cernyj-1ac4x5",
    "code": "-balmain-to0000000013-cernyj",
    "name": "蕾丝黑色",
    "nameEn": "lace black",
    "brand": "BL",
    "category": "tops",
    "style": "上装",
    "cut": "knit",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "蕾丝 lace",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1035,
    "priceCNY": 8073,
    "priceNote": "平台价 50 198 грн（原价 62 773 грн，约 €1035）",
    "image": "images/ua_BL_BL-in-to0000000013-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-to0000000013-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/6d/da/6dda9c7511f0a905e26a173da43ed299/85ab255c-3dfc-4a89-9fe2-d13c9f4e8dd7.jpg",
    "url": "https://symbol.ua/uk/store/cernyj-top-s-kruzevom-balmain-to0000000013-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 102,
        "ease": 8
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "S,M,L"
  },
  {
    "id": "ua-BL-main-pa0000000035-haki-1vfe3j",
    "code": "my-balmain-pa0000000035-haki",
    "name": "长裤",
    "nameEn": "trousers",
    "brand": "BL",
    "category": "bottoms",
    "style": "长裤",
    "cut": "straight_trouser",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 693,
    "priceCNY": 5405,
    "priceNote": "平台价 33 634 грн（约 €693）",
    "image": "images/ua_BL_BL-main-pa0000000035-haki-.jpg",
    "images": [
      "images/ua_BL_BL-main-pa0000000035-haki-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/e7/ce/e7cefa869d324ce48ba28b031303583e/e4690f4b-66e3-48b0-9635-23ef6899c575.jpg",
    "url": "https://symbol.ua/uk/store/sportivnye-stany-haki-s-vysivkoj-monogrammy-balmain-pa0000000035-haki",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 6
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 76,
        "ease": 4
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "XS,S,M"
  },
  {
    "id": "ua-BL-in-hf1tq040xk09-cernyj-utp579",
    "code": "-balmain-hf1tq040xk09-cernyj",
    "name": "系带夹克",
    "nameEn": "with belt jacket",
    "brand": "BL",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1608,
    "priceCNY": 12542,
    "priceNote": "平台价 77 972 грн（原价 111 354 грн，约 €1608）",
    "image": "images/ua_BL_BL-in-hf1tq040xk09-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1tq040xk09-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/f1/ce/f1ce9cf20b445de0f0b819622f679642/02d21059-f4d7-4bc2-8705-c0114859b8f2.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-kurtka-s-poasom-balmain-hf1tq040xk09-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -0.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 112,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "合身",
        "role": "参考",
        "garment": 92,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "M,L"
  },
  {
    "id": "ua-BL-in-hf1tfa85le35-cernyj-1xhkld",
    "code": "-balmain-hf1tfa85le35-cernyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BL",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "皮革 leather",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 2801,
    "priceCNY": 21848,
    "priceNote": "平台价 135 846 грн（原价 194 073 грн，约 €2801）",
    "image": "images/ua_BL_BL-in-hf1tfa85le35-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1tfa85le35-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/1d/1f/1d1f204388553206ab693fce4be89323/2ee13316-2468-4623-ad04-c23d94c9208e.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-kozanaa-kurtka-balmain-hf1tfa85le35-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  },
  {
    "id": "ua-BL-n-hf1tc225dg14-bezevyj-1u8xp4",
    "code": "balmain-hf1tc225dg14-bezevyj",
    "name": "夹克牛仔",
    "nameEn": "jacket denim",
    "brand": "BL",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "官方配色",
    "colorHex": "#8b8b8b",
    "priceEUR": 1116,
    "priceCNY": 8705,
    "priceNote": "平台价 54 136 грн（原价 77 317 грн，约 €1116）",
    "image": "images/ua_BL_BL-n-hf1tc225dg14-bezevyj-.jpg",
    "images": [
      "images/ua_BL_BL-n-hf1tc225dg14-bezevyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/c3/48/c3487c361b7fca7c0794378d746a4c2a/f3012c2d-a100-4e85-9b8f-5b156f6b1c76.jpg",
    "url": "https://symbol.ua/uk/store/dzinsovaa-kurtka-cveta-ajvori-balmain-hf1tc225dg14-bezevyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S",
    "fitScore": 100,
    "fitSize": "IT 40",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -8.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 104,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -17,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 84,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40"
    ],
    "availSizesText": "S"
  },
  {
    "id": "ua-BL-in-hf1tp140xc67-cernyj-n5v0l",
    "code": "-balmain-hf1tp140xc67-cernyj",
    "name": "夹克",
    "nameEn": "jacket",
    "brand": "BL",
    "category": "outer",
    "style": "夹克",
    "cut": "coat",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 1958,
    "priceCNY": 15272,
    "priceNote": "平台价 94 940 грн（原价 135 644 грн，约 €1958）",
    "image": "images/ua_BL_BL-in-hf1tp140xc67-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1tp140xc67-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/d2/13/d2139e0ba3880f3d863794fea2fb93e1/023a4cfb-e773-43c5-9489-98777c2d1258.jpg",
    "url": "https://symbol.ua/uk/store/cernaa-ukorocennaa-tvidovaa-kurtka-balmain-hf1tp140xc67-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "S,M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "bust",
        "label": "胸围",
        "delta": -4.5,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 108,
        "ease": 18
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "偏紧",
        "role": "参考",
        "garment": 88,
        "ease": 16
      }
    ],
    "availSizes": [
      "IT 40",
      "IT 42"
    ],
    "availSizesText": "S,M"
  },
  {
    "id": "ua-BL-n-pa0000000025-goluboj-hxrvif",
    "code": "balmain-pa0000000025-goluboj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "BL",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 635,
    "priceCNY": 4953,
    "priceNote": "平台价 30 806 грн（原价 38 482 грн，约 €635）",
    "image": "images/ua_BL_BL-n-pa0000000025-goluboj-.jpg",
    "images": [
      "images/ua_BL_BL-n-pa0000000025-goluboj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/54/0e/540e394232b12cb9a85f20f790b01a54/e1563160-7003-4588-84bb-675d7687400f.jpg",
    "url": "https://symbol.ua/uk/store/cernye-dzinsy-s-logotip-patc-balmain-pa0000000025-goluboj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "XS,S,M,L",
    "fitScore": 100,
    "fitSize": "IT 44",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": 3,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 105,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -9,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 78,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 38",
      "IT 40",
      "IT 42",
      "IT 44"
    ],
    "availSizesText": "XS,S,M,L"
  },
  {
    "id": "ua-BL-in-hf1mi052dg13-cernyj-18octl",
    "code": "-balmain-hf1mi052dg13-cernyj",
    "name": "牛仔裤",
    "nameEn": "jeans",
    "brand": "BL",
    "category": "bottoms",
    "style": "牛仔",
    "cut": "denim",
    "silhouette": "straight",
    "fit": "直筒",
    "season": "Current",
    "collection": "Symbol（乌克兰多品牌奢侈品电商）",
    "fabric": "牛仔 denim",
    "colorName": "黑色",
    "colorHex": "#1c1c1c",
    "priceEUR": 906,
    "priceCNY": 7067,
    "priceNote": "平台价 43 936 грн（原价 62 773 грн，约 €906）",
    "image": "images/ua_BL_BL-in-hf1mi052dg13-cernyj-.jpg",
    "images": [
      "images/ua_BL_BL-in-hf1mi052dg13-cernyj-.jpg"
    ],
    "remoteImg": "https://media4.symbol.ua/aio-images/11/01/1101919d4aadbbf9797776438ced25f7/7effdf53-db8e-4952-9126-5330452af8c8.jpg",
    "url": "https://symbol.ua/uk/store/cernye-dzinsy-s-geometriceskoj-stezkoj-balmain-hf1mi052dg13-cernyj",
    "source": "Symbol（乌克兰多品牌奢侈品电商）",
    "premium": true,
    "photoCut": false,
    "composite": true,
    "sizesText": "M",
    "fitScore": 100,
    "fitSize": "IT 42",
    "fitParts": [
      {
        "part": "hip",
        "label": "臀围",
        "delta": -1,
        "statusLabel": "合身",
        "role": "主判据",
        "garment": 101,
        "ease": 3
      },
      {
        "part": "waist",
        "label": "腰围",
        "delta": -13,
        "statusLabel": "过紧",
        "role": "参考",
        "garment": 74,
        "ease": 2
      }
    ],
    "availSizes": [
      "IT 42"
    ],
    "availSizesText": "M"
  }
];
