package com.atelier.fitting;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.OpenableColumns;
import android.view.KeyEvent;
import android.webkit.JsResult;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.FileOutputStream;
import java.util.UUID;

public class MainActivity extends Activity {

    private WebView webView;
    public static final int FILE_CHOOSER = 1001;
    private ValueCallback<Uri[]> filePathCallback;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);

        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback,
                                             FileChooserParams params) {
                if (filePathCallback != null) {
                    filePathCallback.onReceiveValue(null);
                }
                filePathCallback = callback;
                try {
                    Intent intent = params.createIntent();
                    intent.setType("image/*");
                    startActivityForResult(Intent.createChooser(intent, "选择衣服照片"), FILE_CHOOSER);
                } catch (Exception e) {
                    filePathCallback = null;
                    Toast.makeText(MainActivity.this, "无法打开文件选择器", Toast.LENGTH_SHORT).show();
                }
                return true;
            }

            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
                result.confirm();
                return true;
            }
        });

        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER) {
            if (filePathCallback == null) return;
            Uri[] results = null;
            if (resultCode == Activity.RESULT_OK && data != null) {
                Uri uri = data.getData();
                if (uri != null) {
                    results = new Uri[]{ copyToInternal(uri) };
                }
            }
            filePathCallback.onReceiveValue(results);
            filePathCallback = null;
        }
    }

    private Uri copyToInternal(Uri source) {
        try {
            // 保留原始图片扩展名，避免 WebView 端 MIME 判定丢失
            String ext = ".jpg";
            String mime = getContentResolver().getType(source);
            if (mime != null) {
                if (mime.contains("png")) ext = ".png";
                else if (mime.contains("webp")) ext = ".webp";
                else if (mime.contains("gif")) ext = ".gif";
            } else {
                String disp = source.getLastPathSegment();
                if (disp != null && disp.toLowerCase().matches(".*\\.(png|webp|gif|jpeg)")) {
                    ext = disp.substring(disp.lastIndexOf('.'));
                }
            }
            String name = UUID.randomUUID().toString() + ext;
            InputStream in = getContentResolver().openInputStream(source);
            OutputStream out = openFileOutput(name, MODE_PRIVATE);
            byte[] buf = new byte[8192];
            int len;
            while ((in != null) && (len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
            if (in != null) in.close();
            out.close();
            return Uri.fromFile(getFileStreamPath(name));
        } catch (IOException e) {
            return source;
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
