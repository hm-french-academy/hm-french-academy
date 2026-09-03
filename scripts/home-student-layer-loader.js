/* Loader kept separate so existing index.html markup remains untouched. */
(function(){
  function add(tag, attrs){
    const el=document.createElement(tag);
    Object.keys(attrs).forEach(k=>el.setAttribute(k,attrs[k]));
    document.head.appendChild(el); return el;
  }
  add('link',{rel:'stylesheet',href:'scripts/home-student-layer.css?v=20260903'});
  add('script',{src:'scripts/supabase-client.js?v=20260903'}).addEventListener('load',function(){
    add('script',{src:'scripts/home-student-layer.js?v=20260903'});
  });
})();
