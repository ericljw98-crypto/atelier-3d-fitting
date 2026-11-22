package com.atelier.fitting;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * 应用内自动更新：版本检查 + APK 下载 + 安装。
 * 通过 JS Bridge 暴露给 H5 调用。
 */
public class UpdateManager {
    private static final String MANIFEST_PRIMARY =
            "https://cdn.jsdelivr.net/gh/ericljw98-crypto/atelier-3d-fitting@main/version.json";
    private static final String MANIFEST_FALLBACK =
            "https://raw.githubusercontent.com/ericljw98-crypto/atelier-3d-fitting/main/version.json";
    private static final String APK_NAME = "atelier-update.apk";

    private final MainActivity activity;
    private final WebView webView;
    private long downloadId = -1;
    private String pendingApkUrl = "";

    UpdateManager(MainActivity activity, WebView webView) {
        this.activity = activity;
        this.webView = webView;
        registerDownloadReceiver();
    }

    /* ---------- 供 H5 调用 ---------- */

    @JavascriptInterface
    public int getVersionCode() {
        try {
            PackageInfo pi = activity.getPackageManager().getPackageInfo(activity.getPackageName(), 0);
            return pi.versionCode;
        } catch (Exception e) { return 0; }
    }

    @JavascriptInterface
    public String getVersionName() {
        try {
            PackageInfo pi = activity.getPackageManager().getPackageInfo(activity.getPackageName(), 0);
            return pi.versionName;
        } catch (Exception e) { return ""; }
    }

    /** 异步检查版本，结果回调 H5 的 window.__onUpdateResult(jsonString|null) */
    @JavascriptInterface
    public void checkUpdate() {
        new Thread(() -> {
            String json = fetchManifest();
            final String safe = json == null ? "null" : JSONObject.quote(json);
            webView.post(() -> webView.evaluateJavascript(
                    "window.__onUpdateResult && window.__onUpdateResult(" + safe + ")", null));
        }).start();
    }

    /** 下载并安装 APK；url 为清单中的下载地址 */
    @JavascriptInterface
    public void downloadAndInstall(String url) {
        if (url == null || url.trim().isEmpty()) {
            webView.post(() -> Toast.makeText(activity, "下载地址无效", Toast.LENGTH_SHORT).show());
            return;
        }
        final String target = url.trim();
        activity.runOnUiThread(() -> startDownload(target));
    }

    /** Android 8+ 未知来源安装权限是否已授予 */
    @JavascriptInterface
    public boolean canInstallUnknownApps() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return true;
        return activity.getPackageManager().canRequestPackageInstalls();
    }

    /** 跳转「允许安装未知应用」设置页 */
    @JavascriptInterface
    public void openInstallPermissionSettings() {
        activity.runOnUiThread(() -> {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                try {
                    Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES);
                    intent.setData(Uri.parse("package:" + activity.getPackageName()));
                    activity.startActivity(intent);
                } catch (Exception e) {
                    Toast.makeText(activity, "请在系统设置中允许本应用安装未知应用", Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    /** 用外部浏览器打开下载页（下载失败时的兜底） */
    @JavascriptInterface
    public void openDownloadPage(String url) {
        activity.runOnUiThread(() -> {
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                activity.startActivity(intent);
            } catch (Exception e) {
                Toast.makeText(activity, "无法打开浏览器", Toast.LENGTH_SHORT).show();
            }
        });
    }

    /* ---------- 内部实现 ---------- */

    private String fetchManifest() {
        String[] urls = { MANIFEST_PRIMARY, MANIFEST_FALLBACK };
        for (String u : urls) {
            HttpURLConnection conn = null;
            try {
                conn = (HttpURLConnection) new URL(u).openConnection();
                conn.setConnectTimeout(6000);
                conn.setReadTimeout(6000);
                conn.setRequestProperty("User-Agent", "AtelierUpdater/1.1");
                if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    BufferedReader br = new BufferedReader(
                            new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) sb.append(line);
                    br.close();
                    new JSONObject(sb.toString()); // 校验 JSON 合法性
                    return sb.toString();
                }
            } catch (Exception ignored) {
                // 尝试下一个源
            } finally {
                if (conn != null) conn.disconnect();
            }
        }
        return null;
    }

    private void startDownload(String url) {
        pendingApkUrl = url;
        // 清理旧文件
        File dir = activity.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
        File old = new File(dir, APK_NAME);
        if (old.exists()) old.delete();

        DownloadManager dm = (DownloadManager) activity.getSystemService(Context.DOWNLOAD_SERVICE);
        if (dm == null) {
            Toast.makeText(activity, "下载服务不可用", Toast.LENGTH_SHORT).show();
            return;
        }
        try {
            DownloadManager.Request req = new DownloadManager.Request(Uri.parse(url));
            req.setTitle("ATELIER 3D试衣间 更新");
            req.setDescription("正在下载新版安装包…");
            req.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            req.setDestinationInExternalFilesDir(activity, Environment.DIRECTORY_DOWNLOADS, APK_NAME);
            req.setMimeType("application/vnd.android.package-archive");
            downloadId = dm.enqueue(req);
            webView.post(() -> webView.evaluateJavascript(
                    "window.__onDownloadStart && window.__onDownloadStart()", null));
        } catch (Exception e) {
            Toast.makeText(activity, "下载启动失败，请检查网络", Toast.LENGTH_SHORT).show();
        }
    }

    private void registerDownloadReceiver() {
        BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override public void onReceive(Context context, Intent intent) {
                long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                if (id != downloadId || downloadId < 0) return;
                webView.post(() -> webView.evaluateJavascript(
                        "window.__onDownloadComplete && window.__onDownloadComplete()", null));
                installApk();
            }
        };
        activity.registerReceiver(receiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
    }

    private void installApk() {
        File dir = activity.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
        File file = new File(dir, APK_NAME);
        if (!file.exists() || file.length() < 100000) {
            // 下载产物异常，兜底打开浏览器
            Toast.makeText(activity, "安装包下载异常，已转浏览器下载", Toast.LENGTH_LONG).show();
            if (!pendingApkUrl.isEmpty()) openDownloadPage(pendingApkUrl);
            return;
        }
        if (!canInstallUnknownApps()) {
            webView.post(() -> webView.evaluateJavascript(
                    "window.__needInstallPermission && window.__needInstallPermission()", null));
            Toast.makeText(activity, "请先允许本应用安装未知应用", Toast.LENGTH_LONG).show();
            return;
        }
        Uri apkUri;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            apkUri = Uri.parse("content://" + ApkFileProvider.AUTHORITY + "/" + APK_NAME);
        } else {
            apkUri = Uri.fromFile(file);
        }
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        try {
            activity.startActivity(intent);
        } catch (Exception e) {
            Toast.makeText(activity, "无法启动安装，请手动打开下载目录", Toast.LENGTH_LONG).show();
        }
    }
}
