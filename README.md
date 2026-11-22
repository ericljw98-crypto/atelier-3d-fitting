# ATELIER · 杜嘉班纳 3D 试衣间

基于 Three.js 的 3D 试衣应用：先建档测量模特身体数据，再用写实 3D 人体模特试穿杜嘉班纳成衣；系统按成衣固定尺寸对比模特测量数据，给出合身诊断，并支持照片识别换衣。纯前端实现，附 Android APK。

## 功能

- **模特建档向导**：首次使用先填写 9 项身体测量参数——身高、体重、胸围、腰围、臀围、肩宽、臂长、腿长（内缝）、领围；实时显示体型摘要与推荐尺码，档案保存到本地可随时编辑
- **写实 3D 人体模特**：采用 Three.js 官方示例的写实女性人体（Mixamo 出品的 Xbot，Mixamo 授权），带完整骨骼与真实肌肉/关节线条。身高、胖瘦参数驱动模型整体与横向缩放，视觉真实
- **杜嘉班纳女装数据库**：48 款，覆盖连衣裙 14 / 上装 12 / 下装 12 / 外套 10；每款含款号、系列季节、面料、可选颜色、成衣平铺尺寸与放松量等完整参数
- **合身判断机制**：衣服是固定尺码的成衣，不随模特变形。系统按「成衣实测围度 − 模特身体围度 = 实际放松量」，对照该款式的设计放松量与品类容差，逐部位（胸/腰/臀或肩）判定合身、偏紧、偏松、过紧、过松，给出 0–100 评分、综合结论与推荐尺码。选错尺码时模型上会真实呈现紧绷或宽松效果
- **应用内自动更新**：App 启动后自动从 GitHub 版本清单检查新版本，发现更新弹窗提示并支持一键下载安装（Android 端通过 DownloadManager + FileProvider 实现）
- **照片识别换衣**：上传衣服照片，Canvas 提取主体主色（四角背景估计 + 中心加权 + 低饱和过滤），并按主体包围盒比例推测版型；匹配结果可在 48 款下拉框修正。已修复文件输入递归触发、APK 内 MIME 丢失、复杂背景干扰三个失效点
- **造型控制**：12 色换色、3 视角、重置、清空、保存造型图片；响应式界面

## 目录结构

```
web/       网页源码
  index.html / style.css
  app.js       主程序（场景、建档、UI、照片识别）
  data.js      杜嘉班纳女装数据库（48 款 + 尺码表 + 色板）
  body.js      参数化人体建模（回退用）
  realBody.js  写实人体加载与体型变形
  garment.js   成衣固定尺寸建模
  fitEngine.js 合身判断引擎
  update.js    应用内自动更新
  models/      写实人体 GLB 模型
  vendor/      本地 Three.js 依赖（含 GLTFLoader）
  apk-src/     APK 用的单文件打包版
apk/       Android 安装包 ATELIER-3D-Fitting.apk
android/   Android WebView 壳工程源码（Gradle）
```

## 网页运行

因使用 ES module，需通过 HTTP 服务打开，不能直接双击 HTML：

```bash
cd web
python -m http.server 8099
# 浏览器打开 http://127.0.0.1:8099/
```

Three.js 依赖已放在 `vendor/`，无需联网。

## APK 安装

将 `apk/ATELIER-3D-Fitting.apk` 传到安卓手机点击安装，如提示"禁止安装未知来源"请在设置中允许。该 APK 使用 debug 签名，可直接安装但不可上架应用商店。

## 从源码重新构建 APK

需 JDK 17 + Android SDK（platform 34、build-tools 34）+ Gradle 8.7：

```bash
# 1. 用 esbuild 把 Three.js + 全部 JS 模块打包成单文件（去 importmap）
cd web
esbuild app.js --bundle --format=iife --outfile=apk-src/assets/app.bundle.js \
  --alias:three=./vendor/three.module.js \
  --alias:three/addons/controls/OrbitControls.js=./vendor/addons/controls/OrbitControls.js

# 2. 复制样式并重新生成 APK 用 HTML（去 importmap，改单文件脚本引用）
cp style.css apk-src/assets/style.css

# 3. 在 android/ 下设置 local.properties 的 sdk.dir，然后构建
cd ../android
gradle assembleDebug
# 产物：app/build/outputs/apk/debug/app-debug.apk
```

## 技术说明

- 前端：Three.js r160，写实人体为本地 GLB 模型（无需联网加载），服装为程序化几何体按成衣固定尺寸生成
- 写实模特：Xbot 模型源自 Three.js 官方示例，Mixamo 授权可免费用于商业与非商业项目
- 数据库：48 款杜嘉班纳女装演示数据，款号为演示编码非官方商品编号；成衣尺寸以 IT 40 为基准，可按结构扩充
- 合身判断：放松量对照设计 ease ± 品类容差，逐部位评分后加权；款式为启发式判定，服装合身度为数据驱动的确定性计算
- 照片识别：纯前端 Canvas 主色提取 + 主体包围盒比例启发式；不依赖后端或 AI 模型。颜色识别为真实主色提取，款式为启发式推测（可手动修正）
- APK：Android WebView 壳加载本地 assets，实现 `onShowFileChooser` 支持相册选图并保留原始扩展名；minSdk 23 / targetSdk 34；已通过 v1+v2 签名验证
