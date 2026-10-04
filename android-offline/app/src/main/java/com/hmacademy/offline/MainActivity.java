package com.hmacademy.offline;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
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
  private WebView web; private LocalServer server; private Uri treeUri;
  @Override public void onCreate(Bundle b){super.onCreate(b);String s=getSharedPreferences(PREFS,MODE_PRIVATE).getString(TREE,null);treeUri=s==null?null:Uri.parse(s);if(treeUri==null)pickFolder();else startOffline();}
  private void pickFolder(){Intent i=new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION|Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION|Intent.FLAG_GRANT_PREFIX_URI_PERMISSION);startActivityForResult(i,PICK_TREE);}
  @Override protected void onActivityResult(int r,int c,Intent d){super.onActivityResult(r,c,d);if(r==PICK_TREE&&c==RESULT_OK&&d!=null&&d.getData()!=null){treeUri=d.getData();try{getContentResolver().takePersistableUriPermission(treeUri,d.getFlags()&(Intent.FLAG_GRANT_READ_URI_PERMISSION|Intent.FLAG_GRANT_WRITE_URI_PERMISSION));}catch(Exception ignored){}getSharedPreferences(PREFS,MODE_PRIVATE).edit().putString(TREE,treeUri.toString()).apply();startOffline();}}
  private void startOffline(){try{DocumentFile root=DocumentFile.fromTreeUri(this,treeUri);if(root==null||!root.isDirectory()){pickFolder();return;}server=new LocalServer(root);server.start();web=new WebView(this);setContentView(web);web.getSettings().setJavaScriptEnabled(true);web.getSettings().setDomStorageEnabled(true);web.getSettings().setAllowFileAccess(false);web.getSettings().setAllowContentAccess(false);web.getSettings().setMediaPlaybackRequiresUserGesture(false);web.getSettings().setCacheMode(android.webkit.WebSettings.LOAD_NO_CACHE);
    web.setWebViewClient(new WebViewClient(){
      @Override public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest req){Uri u=req.getUrl();if("hm-french-academy.github.io".equalsIgnoreCase(u.getHost())){v.loadUrl("http://127.0.0.1:"+server.port()+u.getPath()+(u.getQuery()==null?"":"?"+u.getQuery()));return true;}if("127.0.0.1".equalsIgnoreCase(u.getHost())||"localhost".equalsIgnoreCase(u.getHost()))return false;Toast.makeText(MainActivity.this,"هذا الرابط غير متاح بدون إنترنت.",Toast.LENGTH_SHORT).show();return true;}
      @SuppressWarnings("deprecation") @Override public boolean shouldOverrideUrlLoading(WebView v,String url){return shouldOverrideUrlLoading(v,new WebResourceRequest(){public Uri getUrl(){return Uri.parse(url);}public boolean isForMainFrame(){return true;}public boolean isRedirect(){return false;}public String getMethod(){return "GET";}public Map<String,String> getRequestHeaders(){return Collections.emptyMap();}});}
      @Override public WebResourceResponse shouldInterceptRequest(WebView v,WebResourceRequest req){try{return server.response(req.getUrl().getPath(),req.getMethod(),req.getRequestHeaders().get("Range"));}catch(Exception e){return null;}}
      @SuppressWarnings("deprecation") @Override public WebResourceResponse shouldInterceptRequest(WebView v,String url){try{return server.response(Uri.parse(url).getPath(),"GET",null);}catch(Exception e){return null;}}
    });web.loadUrl("http://127.0.0.1:"+server.port()+"/offline/index.html");
  }catch(Exception e){Toast.makeText(this,"تعذر تشغيل نسخة HM Academy من الفلاشة. اختر مجلد HM-Academy الصحيح.",Toast.LENGTH_LONG).show();pickFolder();}}
  @Override public void onBackPressed(){if(web!=null&&web.canGoBack())web.goBack();else super.onBackPressed();}
  @Override protected void onDestroy(){if(server!=null)server.stop();if(web!=null){((ViewGroup)web.getParent()).removeView(web);web.destroy();}super.onDestroy();}
  static class LocalServer{
    final DocumentFile root;ServerSocket socket;Thread thread;int port;LocalServer(DocumentFile r){root=r;}
    void start()throws IOException{socket=new ServerSocket(0,50,InetAddress.getByName("127.0.0.1"));port=socket.getLocalPort();thread=new Thread(()->{while(!socket.isClosed()){try{Socket s=socket.accept();new Thread(()->handle(s)).start();}catch(Exception ignored){}}});thread.start();}
    int port(){return port;}void stop(){try{socket.close();}catch(Exception ignored){}}
    void handle(Socket s){try(s){BufferedReader br=new BufferedReader(new InputStreamReader(s.getInputStream(),StandardCharsets.ISO_8859_1));String first=br.readLine();if(first==null)return;String[] p=first.split(" ");String method=p.length>0?p[0]:"GET";String path=p.length>1?p[1]:"/";String range=null;String line;while((line=br.readLine())!=null&&!line.isEmpty()){int k=line.indexOf(':');if(k>0&&line.substring(0,k).equalsIgnoreCase("Range"))range=line.substring(k+1).trim();}s.getOutputStream().write(build(path,method,range));s.getOutputStream().flush();}catch(Exception ignored){}}
    byte[] build(String raw,String method,String range)throws Exception{String path=URLDecoder.decode(raw.split("\\?",2)[0],"UTF-8");if(path.equals("/"))path="/offline/index.html";if(path.contains(".."))return error(400,"Bad Request");DocumentFile f=root;for(String x:path.substring(1).split("/")){if(x.isEmpty())continue;f=f.findFile(x);if(f==null)break;}if(f==null||!f.isFile())return error(404,"Not Found");long len=f.length(),start=0,end=Math.max(0,len-1);int status=200;if(range!=null&&range.startsWith("bytes=")){String[] a=range.substring(6).split(",")[0].split("-");try{start=Long.parseLong(a[0]);if(a.length>1&&!a[1].isEmpty())end=Long.parseLong(a[1]);else end=len-1;if(start<0||start>=len||end<start)throw new Exception();if(end>=len)end=len-1;status=206;}catch(Exception e){return error(416,"Range Not Satisfiable");}}String h="HTTP/1.1 "+status+" "+(status==200?"OK":"Partial Content")+"\r\nContent-Type: "+mime(f.getName())+"\r\nAccept-Ranges: bytes\r\nAccess-Control-Allow-Origin: *\r\nCache-Control: no-store\r\n";if(status==206)h+="Content-Range: bytes "+start+"-"+end+"/"+len+"\r\n";long outLen=end-start+1;h+="Content-Length: "+outLen+"\r\nConnection: close\r\n\r\n";ByteArrayOutputStream out=new ByteArrayOutputStream();out.write(h.getBytes(StandardCharsets.ISO_8859_1));if(!method.equalsIgnoreCase("HEAD")){try(InputStream in=getContentResolver().openInputStream(f.getUri())){long skip=start;while(skip>0){long z=in.skip(skip);if(z<=0)break;skip-=z;}byte[] buf=new byte[65536];long left=outLen;while(left>0){int n=in.read(buf,0,(int)Math.min(buf.length,left));if(n<0)break;out.write(buf,0,n);left-=n;}}}return out.toByteArray();}
    byte[] error(int c,String m){return headers(c,m,"text/plain",m.getBytes(StandardCharsets.UTF_8));}
    byte[] headers(int c,String m,String mime,byte[] b){String h="HTTP/1.1 "+c+" "+m+"\r\nContent-Type: "+mime+"; charset=utf-8\r\nContent-Length: "+b.length+"\r\nConnection: close\r\n\r\n";try{ByteArrayOutputStream o=new ByteArrayOutputStream();o.write(h.getBytes(StandardCharsets.ISO_8859_1));o.write(b);return o.toByteArray();}catch(Exception e){return b;}}
    String mime(String n){String x=n.toLowerCase(Locale.US);if(x.endsWith(".html"))return"text/html";if(x.endsWith(".js"))return"application/javascript";if(x.endsWith(".css"))return"text/css";if(x.endsWith(".json"))return"application/json";if(x.endsWith(".svg"))return"image/svg+xml";if(x.endsWith(".png"))return"image/png";if(x.endsWith(".jpg")||x.endsWith(".jpeg"))return"image/jpeg";if(x.endsWith(".webp"))return"image/webp";if(x.endsWith(".mp3"))return"audio/mpeg";if(x.endsWith(".wav"))return"audio/wav";if(x.endsWith(".mp4"))return"video/mp4";if(x.endsWith(".webm"))return"video/webm";if(x.endsWith(".pdf"))return"application/pdf";return"application/octet-stream";}
  }
}