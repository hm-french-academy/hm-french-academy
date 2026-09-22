# HM Academy — Universal Offline USB Edition

تم تجهيز طبقة Offline مستقلة عن صفحات HM Academy الأصلية.

## Windows
شغّل:
`offline/START-HM-ACADEMY-OFFLINE.bat`

هذا يبدأ خادمًا محليًا ويفتح HM Academy عبر localhost، مع تفعيل Service Worker للوضع Offline.

## Android / شاشات TNI بنظام Android
ملفات HTML يمكن فتحها من USB/التخزين المحلي، لكن Android لا يشغّل ملف BAT أو PowerShell. كما أن بعض صفحات الويب الحديثة تحتاج HTTP بدل file:// بسبب قيود المتصفح على JavaScript وfetch وService Worker.

لذلك لا تعتبر فتح `index.html` مباشرة على Android ضمانًا لتشغيل كل وظائف المنصة. لتشغيل النسخة كاملة على Android نحتاج حاوية WebView/تطبيق Android أو خادم HTTP محلي على الجهاز.

## المحتوى بدون إنترنت
- صفحات وملفات HM Academy المحلية: تعمل من الحزمة.
- YouTube الخارجي: لا يعمل بدون الإنترنت.
- Supabase/الحسابات والبيانات السحابية: ليست قاعدة بيانات محلية كاملة.
- Google Fonts وCDN الخارجي: يتم التعامل معها في وضع Offline دون الاعتماد عليها.

## مهم
لم يتم تعديل تصميم أو محتوى دروس HM Academy الأصلية. كل طبقة Offline موجودة داخل `offline/`.
