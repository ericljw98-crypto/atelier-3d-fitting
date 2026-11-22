# ATELIER 3D 试衣间

基于 Three.js 的纯前端 3D 试衣应用，支持体型精细调节、照片识别换衣，并附带 Android APK。

## 功能

- **3D 人体试衣**：可旋转、缩放的 3D 模特，13 款程序化生成的服装（上装、下装、连衣裙、外套）
- **身材比例**：身高（85%–118%）与胖瘦（0.78–1.32）滑块，另附纤细/标准/健硕预设
- **照片识别换衣**：上传衣服照片，纯前端 Canvas 分析提取主体颜色并智能推断款式，自动匹配 3D 服装换装（颜色识别准确，款式为启发式推荐可在下拉框修正）
- **造型控制**：8 种颜色、3 个视角、重置、清空着装、保存造型图片
- **响应式界面**：适配桌面与窄屏

## 目录结构

```
web/       网页源码（index.html / style.css / app.js / vendor / apk-src）
apk/       Android 安装包 ATELIER-3D试衣间.apk
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
# 1. 用 esbuild 把 Three.js + app.js 打包成单文件（去 importmap）
cd web
esbuild app.js --bundle --format=iife --outfile=apk-src/assets/app.bundle.js \
  --alias:three=./vendor/three.module.js \
  --alias:three/addons/controls/OrbitControls.js=./vendor/addons/controls/OrbitControls.js

# 2. 复制样式到打包目录
cp style.css apk-src/assets/style.css

# 3. 在 android/ 下设置 local.properties 的 sdk.dir，然后构建
cd ../android
gradle assembleDebug
# 产物：app/build/outputs/apk/debug/app-debug.apk
```

## 技术说明

- 前端：Three.js r160，程序化几何体生成人体与服装，无外部模型依赖
- 照片识别：Canvas 颜色量化统计 + HSL 归一化 + 图片宽高比启发式推断，纯前端无需后端或 AI 模型
- APK：Android WebView 壳加载本地 assets，实现 `onShowFileChooser` 支持相册选图；minSdk 23 / targetSdk 34；已通过 v1+v2 签名验证
