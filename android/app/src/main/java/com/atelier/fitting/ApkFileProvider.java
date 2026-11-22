package com.atelier.fitting;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.database.Cursor;
import android.net.Uri;
import android.os.ParcelFileDescriptor;

import java.io.File;
import java.io.FileNotFoundException;

/**
 * 轻量 FileProvider：零第三方依赖，仅用于在 Android 7+ 安装下载好的 APK 时
 * 把私有目录里的文件以 content:// URI 临时授权给系统安装器。
 */
public class ApkFileProvider extends ContentProvider {
    public static final String AUTHORITY = "com.atelier.fitting.fileprovider";

    @Override public boolean onCreate() { return true; }

    @Override
    public ParcelFileDescriptor openFile(Uri uri, String mode) throws FileNotFoundException {
        String name = uri.getLastPathSegment();
        if (name == null || name.isEmpty() || name.contains("/") || name.contains("..")) {
            throw new FileNotFoundException("invalid apk name");
        }
        File dir = getContext().getExternalFilesDir(android.os.Environment.DIRECTORY_DOWNLOADS);
        File file = new File(dir, name);
        return ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY);
    }

    @Override public Cursor query(Uri uri, String[] p, String s, String[] a, String o) { return null; }
    @Override public String getType(Uri uri) { return "application/vnd.android.package-archive"; }
    @Override public Uri insert(Uri uri, ContentValues values) { return null; }
    @Override public int delete(Uri uri, String s, String[] a) { return 0; }
    @Override public int update(Uri uri, ContentValues v, String s, String[] a) { return 0; }
}
