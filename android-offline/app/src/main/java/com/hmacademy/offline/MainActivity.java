package com.hmacademy.offline;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.net.Uri;
import android.view.ViewGroup;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.documentfile.provider.DocumentFile;
import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class MainActivity extends Activity {
    private static final int PICK_TREE=1001;
    private static final String PREFS="hm_offline", TREE="tree_uri";
    private WebView web;
    private LocalServer server;
    private Uri treeUri;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        String saved=getSharedPreferences(PREFS,MODE_PRIVATE).getString(TREE,null);
        treeUri=saved==null?null:Uri.parse(saved);
        if(treeUri==null) pickFolder(); else startOffline();
    }

    private void pickFolder() {
        Intent i=new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION|Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION|Intent.FLAG_GRANT_PREFIX_URI_PERMISSION);
        startActivityForResult(i,PICK_TREE);
    }

    @Override protected void onActivityResult(int r,int c,Intent d) {
        super.onActivityResult(r,c,d);
        if(r==PICK_TREE&&c==RESULT_OK&&d!=null&&d.getData()!=null) {
            treeUri=d.getData();
            try {
                getContentResolver().takePersistableUriPermission(treeUri,d.getFlags()&(Intent.FLAG_GRANT_READ_URI_PERMISSION|Intent.FLAG_GRANT_WRITE_URI_PERMISSION));
            } catch(Exception ignored) {}
            getSharedPreferences(PREFS,MODE_PRIVATE).edit().putString(TREE,treeUri.toString()).apply();
            startOffline();
        }
    }

    private void startOffline() {
        try {
            DocumentFile root=DocumentFile.fromTreeUri(this,treeUri);
            if(root==null||!root.isDirectory()){pickFolder();return;}
            server=new LocalServer(root);
            server.start();

            web=new WebView(this);
            setContentView(web);
            web.getSettings().setJavaScriptEnabled(true);
            web.getSettings().setDomStorageEnabled(true);
            web.getSettings().setAllowFileAccess(false);
            web.getSettings().setAllowContentAccess(false);
            web.getSettings().setMediaPlaybackRequiresUserGesture(false);
            web.getSettings().setCacheMode(android.webkit.WebSettings.LOAD_NO_CACHE);

            web.setWebViewClient(new WebViewClient(){
                @Override public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest req){
                    Uri u=req.getUrl();
                    return routeUrl(v,u);
                }
                @SuppressWarnings("deprecation")
                @Override public boolean shouldOverrideUrlLoading(WebView v,String url){
                    return routeUrl(v,Uri.parse(url));
                }
                private boolean routeUrl(WebView v,Uri u){
                    String host=u.getHost();
                    if("hm-french-academy.github.io".equalsIgnoreCase(host)){
                        String target="http://127.0.0.1:"+server.port()+u.getPath()+(u.getQuery()==null?"":"?"+u.getQuery());
                        v.loadUrl(target);
                        return true;
                    }
                    if("127.0.0.1".equalsIgnoreCase(host)||"localhost".equalsIgnoreCase(host)) return false;
                    Toast.makeText(MainActivity.this,"هذا الرابط غير متاح بدون إنترنت.",Toast.LENGTH_SHORT).show();
                    return true;
                }
                @Override public WebResourceResponse shouldInterceptRequest(WebView v,WebResourceRequest req){
                    try{return server.webResponse(req.getUrl().getPath(),req.getMethod(),req.getRequestHeaders().get("Range"));}catch(Exception e){return null;}
                }
                @SuppressWarnings("deprecation")
                @Override public WebResourceResponse shouldInterceptRequest(WebView v,String url){
                    try{return server.webResponse(Uri.parse(url).getPath(),"GET",null);}catch(Exception e){return null;}
                }
            });

            web.loadUrl("http://127.0.0.1:"+server.port()+"/offline/index.html");
        } catch(Exception e) {
            Toast.makeText(this,"تعذر تشغيل نسخة HM Academy من الفلاشة. اختر مجلد HM-Academy الصحيح.",Toast.LENGTH_LONG).show();
            pickFolder();
        }
    }

    private boolean isSafePath(String path){
        return path!=null&&!path.contains("..");
    }

    @Override public void onBackPressed(){
        if(web!=null&&web.canGoBack()) web.goBack(); else super.onBackPressed();
    }

    @Override protected void onDestroy(){
        if(server!=null) server.stop();
        if(web!=null){
            ViewGroup parent=(ViewGroup)web.getParent();
            if(parent!=null) parent.removeView(web);
            web.destroy();
        }
        super.onDestroy();
    }

    class LocalServer {
        private final DocumentFile root;
        private ServerSocket socket;
        private int port;

        LocalServer(DocumentFile r){root=r;}

        void start() throws IOException{
            socket=new ServerSocket(0,50,InetAddress.getByName("127.0.0.1"));
            port=socket.getLocalPort();
            new Thread(new Runnable(){
                @Override public void run(){
                    while(!socket.isClosed()){
                        try{
                            final Socket s=socket.accept();
                            new Thread(new Runnable(){@Override public void run(){handle(s);}}).start();
                        }catch(Exception ignored){}
                    }
                }
            }).start();
        }

        int port(){return port;}
        void stop(){try{socket.close();}catch(Exception ignored){}}

        private void handle(Socket s){
            try{
                BufferedReader br=new BufferedReader(new InputStreamReader(s.getInputStream(),StandardCharsets.ISO_8859_1));
                String first=br.readLine();
                if(first==null)return;
                String[] p=first.split(" ");
                String method=p.length>0?p[0]:"GET";
                String path=p.length>1?p[1]:"/";
                String range=null;
                String line;
                while((line=br.readLine())!=null&&!line.isEmpty()){
                    int k=line.indexOf(':');
                    if(k>0&&line.substring(0,k).equalsIgnoreCase("Range")) range=line.substring(k+1).trim();
                }
                s.getOutputStream().write(build(path,method,range));
                s.getOutputStream().flush();
            }catch(Exception ignored){
            }finally{
                try{s.close();}catch(Exception ignored){}
            }
        }

        private WebResourceResponse webResponse(String raw,String method,String range) throws Exception{
            String path=URLDecoder.decode((raw==null?"/":raw).split("\\?",2)[0],"UTF-8");
            if("/".equals(path)) path="/offline/index.html";
            if(!isSafePath(path)) return new WebResourceResponse("text/plain","utf-8",null);
            DocumentFile f=root;
            String rel=path.startsWith("/")?path.substring(1):path;
            for(String part:rel.split("/")){
                if(part.isEmpty()) continue;
                f=f.findFile(part);
                if(f==null) break;
            }
            if(f==null||!f.isFile()) return new WebResourceResponse("text/plain","utf-8",null);
            InputStream in=getContentResolver().openInputStream(f.getUri());
            if(in==null) return new WebResourceResponse("text/plain","utf-8",null);
            Map<String,String> headers=new HashMap<>();
            headers.put("Cache-Control","no-store");
            headers.put("Accept-Ranges","bytes");
            long len=f.length();
            int status=200;
            String reason="OK";
            if(range!=null&&range.startsWith("bytes=")){
                String[] a=range.substring(6).split(",",2)[0].split("-",2);
                long start=0,end=Math.max(0,len-1);
                try{
                    start=Long.parseLong(a[0]);
                    if(a.length>1&&!a[1].isEmpty()) end=Long.parseLong(a[1]);
                    if(start<0||start>=len||end<start) throw new Exception();
                    if(end>=len) end=len-1;
                    long skip=start;
                    while(skip>0){
                        long z=in.skip(skip);
                        if(z<=0) throw new IOException("skip");
                        skip-=z;
                    }
                    long outLen=end-start+1;
                    in=new LimitedInputStream(in,outLen);
                    status=206; reason="Partial Content";
                    headers.put("Content-Range","bytes "+start+"-"+end+"/"+len);
                    headers.put("Content-Length",String.valueOf(outLen));
                }catch(Exception e){ try{in.close();}catch(Exception ignored){}; return new WebResourceResponse("text/plain","utf-8",null); }
            } else {
                headers.put("Content-Length",String.valueOf(len));
            }
            return new WebResourceResponse(mime(f.getName()),null,status,reason,headers,in);
        }

        class LimitedInputStream extends FilterInputStream {
            private long left;
            LimitedInputStream(InputStream in,long length){super(in);left=length;}
            @Override public int read() throws IOException {
                if(left<=0) return -1;
                int r=super.read(); if(r>=0) left--; return r;
            }
            @Override public int read(byte[] b,int off,int len) throws IOException {
                if(left<=0) return -1;
                int n=super.read(b,off,(int)Math.min(len,left));
                if(n>0) left-=n;
                return n;
            }
        }

        private byte[] build(String raw,String method,String range) throws Exception{
            String path=URLDecoder.decode(raw.split("\\?",2)[0],"UTF-8");
            if("/".equals(path))path="/offline/index.html";
            if(!isSafePath(path))return error(400,"Bad Request");

            DocumentFile f=root;
            String rel=path.startsWith("/")?path.substring(1):path;
            for(String part:rel.split("/")){
                if(part.isEmpty())continue;
                f=f.findFile(part);
                if(f==null)break;
            }
            if(f==null||!f.isFile())return error(404,"Not Found");

            long len=f.length(),start=0,end=Math.max(0,len-1);
            int status=200;
            if(range!=null&&range.startsWith("bytes=")){
                String[] a=range.substring(6).split(",",2)[0].split("-",2);
                try{
                    start=Long.parseLong(a[0]);
                    if(a.length>1&&!a[1].isEmpty())end=Long.parseLong(a[1]);
                    if(start<0||start>=len||end<start)throw new Exception();
                    if(end>=len)end=len-1;
                    status=206;
                }catch(Exception e){return error(416,"Range Not Satisfiable");}
            }

            String h="HTTP/1.1 "+status+" "+(status==200?"OK":"Partial Content")+"\r\n"
                    +"Content-Type: "+mime(f.getName())+"\r\n"
                    +"Accept-Ranges: bytes\r\n"
                    +"Access-Control-Allow-Origin: *\r\n"
                    +"Cache-Control: no-store\r\n";
            if(status==206)h+="Content-Range: bytes "+start+"-"+end+"/"+len+"\r\n";
            long outLen=end-start+1;
            h+="Content-Length: "+outLen+"\r\nConnection: close\r\n\r\n";

            ByteArrayOutputStream out=new ByteArrayOutputStream();
            out.write(h.getBytes(StandardCharsets.ISO_8859_1));
            if(!"HEAD".equalsIgnoreCase(method)){
                InputStream in=null;
                try{
                    in=getContentResolver().openInputStream(f.getUri());
                    if(in==null)return error(500,"Cannot Open File");
                    long skip=start;
                    while(skip>0){
                        long z=in.skip(skip);
                        if(z<=0)break;
                        skip-=z;
                    }
                    byte[] buf=new byte[65536];
                    long left=outLen;
                    while(left>0){
                        int n=in.read(buf,0,(int)Math.min(buf.length,left));
                        if(n<0)break;
                        out.write(buf,0,n);
                        left-=n;
                    }
                }finally{
                    if(in!=null)try{in.close();}catch(Exception ignored){}
                }
            }
            return out.toByteArray();
        }

        private byte[] error(int code,String msg){
            byte[] b=msg.getBytes(StandardCharsets.UTF_8);
            String h="HTTP/1.1 "+code+" "+msg+"\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Length: "+b.length+"\r\nConnection: close\r\n\r\n";
            try{
                ByteArrayOutputStream o=new ByteArrayOutputStream();
                o.write(h.getBytes(StandardCharsets.ISO_8859_1));o.write(b);return o.toByteArray();
            }catch(Exception e){return b;}
        }

        private String mime(String n){
            String x=n==null?"":n.toLowerCase(Locale.US);
            if(x.endsWith(".html"))return"text/html";
            if(x.endsWith(".js"))return"application/javascript";
            if(x.endsWith(".css"))return"text/css";
            if(x.endsWith(".json"))return"application/json";
            if(x.endsWith(".svg"))return"image/svg+xml";
            if(x.endsWith(".png"))return"image/png";
            if(x.endsWith(".jpg")||x.endsWith(".jpeg"))return"image/jpeg";
            if(x.endsWith(".webp"))return"image/webp";
            if(x.endsWith(".gif"))return"image/gif";
            if(x.endsWith(".mp3"))return"audio/mpeg";
            if(x.endsWith(".wav"))return"audio/wav";
            if(x.endsWith(".m4a"))return"audio/mp4";
            if(x.endsWith(".mp4"))return"video/mp4";
            if(x.endsWith(".webm"))return"video/webm";
            if(x.endsWith(".pdf"))return"application/pdf";
            return"application/octet-stream";
        }
    }
}