const exams = [
{id:"p6",title:"السادس الابتدائي",curriculum:"Français pour vous",questions:[
["« الدباسة »",["la colle","l'agrafeuse","le correcteur"],1],["« الصمغ »",["la gomme","la règle","la colle"],2],["« قلم الرصاص »",["le stylo","le crayon","le feutre"],1],["Elle dessine avec …",["la colle","un feutre","l'agrafeuse"],1],["… feutre est rouge.",["Cette","Ce","Cet"],1],["Je lis … livre.",["ces","cet","ce"],2],["Nous … au marché.",["allons","vont","allez"],0],["Tu … content.",["suis","es","est"],1],["Nous … une colle.",["ont","avez","avons"],2],["Ils … à la piscine.",["vont","va","allons"],0],["Je … un feutre.",["choisis","choisit","choisissons"],0],["Nous … le travail.",["finis","finissons","finissez"],1],["Elles … les feuilles.",["colle","collons","collent"],2],["Il … un arbre.",["dessine","dessines","dessinent"],0],["Tu … les mots.",["souligne","soulignes","soulignez"],1],["Demain, je … jouer.",["vais","vas","vont"],0],["Elle va … une pomme.",["manger","mange","manges"],0],["Ils … chanter bientôt.",["va","vont","allez"],1],["Vous … danser.",["allez","allons","vas"],0],["Il … boit pas de lait.",["ne","n'","pas"],0],["Nous … achetons pas de pain.",["ne","n'","pas"],1],["Elle n'a pas … ordinateur.",["un","de","d'"],2],["Elle ne va pas … la leçon.",["écrit","écrire","écris"],1],
["Cette crayon est long.",["Cet","Ce","Ces"],1],["Ce agrafeuse est neuve.",["Cette","Cet","Ces"],0],["Ces cahier est propre.",["Cet","Cette","Ce"],2],["Nous allez manger.",["allons","vont","va"],0],["Ils va jouer demain.",["vais","vont","allons"],1],["Je vais choisis un livre.",["choisit","choisissons","choisir"],2],["Elle ne boit pas de la limonade.",["du","des","de"],2],["Nous n'avons pas des livres.",["un","de","du"],1],["Vous choisons un livre.",["choisis","choisissons","choisissez"],2],
["Demain, nous … jouer.",["allons","vont","va"],0],["Il va … le livre.",["lire","lit","lis"],0],["Elles … arriver bientôt.",["va","vont","allez"],1],["Tu … être content.",["vas","va","vais"],0],["Je ne vais pas … ce stylo.",["acheter","achète","achetons"],0]
]},
{id:"p4",title:"الرابع الابتدائي",curriculum:"Français pour vous",questions:[
["4:00",["Il est quatre heures et demie.","Il est quatre heure.","Il est quatre heures."],2],
["8:15",["Il est huit heures et quart.","Il est huit heures et demie.","Il est neuf heures moins le quart."],0],
["10:30",["Il est dix heures et quart.","Il est onze heures moins le quart.","Il est dix heures et demie."],2],
["9:45",["Il est neuf heures et quart.","Il est dix heures moins le quart.","Il est neuf heures moins le quart."],1],
["« minuit »",["12:00 ظهراً","12:00 منتصف الليل","1:00"],1],
["« et demie »",["15 minutes","45 minutes","30 minutes"],2],
["Pour demander l'heure, on dit :",["Il est midi.","Quelle heure est-il ?","Il est une heure."],1],
["Il est midi …",["et demi","et demie","moins le quart"],0],
["Quel nombre vient après douze ?",["onze","quatorze","treize"],2],
["Quel nombre vient avant vingt ?",["trente","dix-neuf","dix-huit"],1],
["16 =",["seize","six","treize"],0],
["« quatorze » =",["4","40","14"],2],
["Quel est le plus grand nombre ?",["sept","quinze","trois","douze"],1],
["Choisis le mot différent :",["six","onze","bouche","quinze"],2],
["« الذقن » =",["le front","le menton","le nez"],1],
["« الحواجب » =",["les cils","les cheveux","les sourcils"],2],
["« الأسنان » =",["les yeux","les dents","les oreilles"],1],
["Quel mot est au pluriel ?",["les yeux","la tête","le front"],0],
["Nancy a … cheveux.",["un","des","une"],1],
["… tête.",["Le","La","Les"],1],
["… oreilles.",["Le","L'","Les"],2],
["… école.",["La","L'","Le"],1],
["… nez.",["Le","La","Les"],0],
["… heure.",["Le","La","L'"],2],
["J'ai … tête.",["un","une","des"],1],
["J'ai … dents.",["un","une","des"],2],
["C'est … front.",["un","une","des"],0],
["C'est … tête.",["mon","mes","ma"],2],
["Ce sont … cheveux.",["mes","ma","mon"],0],
["C'est … oreille.",["ma","mon","mes"],1],
["Tu as … nez.",["ta","tes","ton"],2],
["Elle a … bouche.",["sa","son","ses"],0],
["Il a … dents.",["son","ses","sa"],1],
["Il est trois heures … demie.",["le","moins","et"],2],
["Il est deux heures … quart.",["et","moins","demie"],0],
["Il est neuf …",["heures","heure","minuit"],0],
["Il est cinq heure.",["heures","heurs","l'heure"],0],
["Il est huit heures et demi.",["demis","demie","demies"],1],
["8:45 =",["Il est neuf heures moins le quart.","Il est huit heures et quart.","Il est neuf heures et demie."],0],
["J'ai deux oreille.",["l'oreille","oreilles","une oreille"],1],
["… dents.",["Les","La","L'"],0],
["… tête.",["Les","La","L'"],1],
["… bouche.",["mes","mon","ma"],2],
["… oreille.",["mon","mes","ta"],0],
["Il a … menton.",["sa","son","ses"],1],
["J'ai … dents.",["des","une","le"],0],
["Tu as … nez.",["tes","ton","mon"],1]
]},
{id:"p5",title:"الخامس الابتدائي",curriculum:"Français pour vous",questions:[
["7:00",["Il est sept heures et demie.","Il est sept heure.","Il est sept heures."],2],["3:15",["Il est trois heures et quart.","Il est quatre heures moins le quart.","Il est trois heures et demie."],0],["5:30",["Il est cinq heures et quart.","Il est cinq heures et demie.","Il est six heures moins le quart."],1],["7:45",["Il est sept heures et quart.","Il est huit heures moins le quart.","Il est sept heures moins le quart."],1],["« midi »",["12:00 ظهراً","12:00 منتصف الليل","1:00"],0],["Il est onze …",["heure","heures","minuit"],1],["« الشتاء »",["l'hiver","l'été","l'automne"],0],["« الخريف »",["le printemps","l'automne","l'été"],1],["En été, le soleil …",["tombe","souffle","brille"],2],["Les vents …",["soufflent","tombent","brillent"],0],["La neige …",["tombe","brille","souffle"],0],["En automne, les feuilles sont …",["vertes","bleues","jaunes"],2],["Au printemps, le ciel est …",["gris","jaune","bleu"],2],["« الفم »",["la bouche","le nez","le menton"],0],["« الجبهة »",["les cils","le front","les dents"],1],["« العينان »",["les yeux","les oreilles","les cheveux"],0],["Nous … le ciel.",["regardons","regardez","regardent"],0],["Il … une chanson.",["chantes","chante","chantent"],1],["Elles … la voiture.",["lavent","laves","lavons"],0],["Tu … dans le jardin.",["marche","marches","marchez"],1],["Je … la maîtresse.",["écoutes","écoute","écoutent"],1],["Vous … au ballon.",["jouez","jouons","jouent"],0],["Il … à sa mère.",["parlent","parle","parles"],1],["Nous … la musique.",["aime","aimez","aimons"],2],["Il est sept heures … le quart. (6:45)",["moins","et","demie"],0],["Il est midi … (12:30)",["et demie","et demi","moins demi"],1],["8:30 → Il est huit heures …",["et demie","et demi","moins le quart"],0],["Il est six …",["heure","heures","minuit"],1],
["Il est huit heure.",["l'heure","heures","heurs"],1],["Il est neuf heures et demi.",["quart","demis","demie"],2],["Pour dire 4 h 45, on dit :",["Il est cinq heures et demie.","Il est cinq heures moins le quart.","Il est quatre heures et quart."],1],["En printemps, il fait beau.",["Du","Au","Aux"],1],["Au hiver, il fait froid.",["En","Aux","Du"],0],["Nous marchez dans le jardin.",["marche","marchent","marchons"],2],["Elles aime le printemps.",["aimes","aiment","aimons"],1],["Je regardes le ciel.",["regarde","regardons","regardent"],0],["Le neige tombe.",["Les","La","L'"],1],["La hiver.",["L'","Le","Les"],0],
["En hiver, la neige tombe.",["Vrai","Faux"],0],["En été, le ciel est gris.",["Vrai","Faux"],1],["Au printemps, il y a des fleurs.",["Vrai","Faux"],0],["Les feuilles sont jaunes en automne.",["Vrai","Faux"],0],["En hiver, le soleil brille et il fait chaud.",["Vrai","Faux"],1]
]},
{id:"g7",title:"الأول الإعدادي",curriculum:"Français Simple 1",questions:[
["« ممحاة »",["une règle","une gomme","une trousse"],1],["« فصل »",["une photo","une lettre","une classe"],2],["« زميل »",["un camarade","un frère","un garçon"],0],["Quel mot est féminin ?",["un âge","un objet","un tableau","une fenêtre"],3],["Choisis le mot différent :",["il","cahier","elle","ils"],1],["Pour demander l'âge d'une fille, tu dis :",["Qu'est-ce que c'est ?","Elle a quel âge ?","Qu'est-ce qu'il y a ?"],1],["Réponds à « Qu'est-ce que c'est ? » :",["J'ai douze ans.","Il y a une photo.","C'est une photo."],2],["Réponds à « Quel âge as-tu ? » :",["C'est un frère.","J'ai neuf ans.","Il y a neuf ans."],1],["Qu'est-ce qu'il y a dans la classe ?",["Il y a des chaises et un tableau.","C'est une classe.","J'ai douze ans."],0],["Dans le sac à dos, il y a…",["un sac à dos","Il a douze ans.","un crayon et un cahier"],2],
["Sami a …",["un frère","deux sœurs","une sœur"],2],
["Hana a …",["douze ans","dix ans","neuf ans"],1],
["Dans le sac à dos de Hana, il y a …",["une règle et deux stylos","un cahier et un livre","une gomme"],1],
["Dans la trousse, il y a …",["un livre","un cahier","une règle et deux stylos"],2],["Elles … une trousse.",["a","as","ont"],2],["Nous … huit ans.",["avons","avez","ont"],0],["J'… un crayon.",["as","a","ai"],2],["Karim … une sœur.",["ont","a","avez"],1],["Vous … des cahiers.",["avons","as","avez"],2],["Ils … froid.",["a","ont","as"],1],["Vous … soif.",["avez","avons","ont"],0],["Sara a … photo.",["un","une","des"],1],["Ce sont … chaises.",["une","un","des"],2],["Il y a … fenêtre dans la classe.",["des","une","un"],1],["Omar a … frère.",["un","une","des"],0],["Dans la classe, il y a … tables.",["une","des","un"],1],["Hana et Sara ont dix ans. → … ont dix ans.",["Ils","Elles","Elle"],1],["Omar et Youssef ont neuf ans. → …",["Ils","Elles","Il"],0],["Sara a six ans. → …",["Elle","Ils","Elles"],0],["J'… à Ismaïlia.",["habites","habite","habitons"],1],["Vous … au restaurant.",["mangez","mange","mangeons"],0],["Ils … la musique.",["aime","aimons","aiment"],2],["Ils … à l'école.",["est","sont","êtes"],1],
["Rana est dix ans.",["a","ont","as"],0],["J'ai cinq an.",["ans","âge","année"],0],["Elle a quelle âge ?",["quels","quel","quelles"],1],["J'ai un lettre.",["des","une","le"],1],["Ce sont des cahier.",["cahiers","cahiere","cahieux"],0],["Tu ont une règle.",["a","avons","as"],2],["Elles a huit ans.",["ont","as","avons"],0],["Vous as un livre.",["avez","avons","ont"],0],["Nous habitent à Ismaïlia.",["habite","habitons","habitez"],1],["Elle m'appelle Marie.",["s'appelle","t'appelles","s'appellent"],0],["C'est un porte.",["une","des","le"],0]
]},
{id:"g8",title:"الثاني الإعدادي",curriculum:"Français Simple 2",questions:[
["« ستارة »",["un tapis","un miroir","un rideau"],2],["« نجفة »",["un réveil","un coussin","un lustre"],2],["« منبه »",["une horloge","un réveil","un matelas"],1],["Chasse l'intrus :",["le lit","la baignoire","le matelas","l'oreiller"],1],["Chasse l'intrus :",["le médecin","l'avocat","le pilote","le tapis"],3],["Chasse l'intrus :",["le réfrigérateur","le lavabo","la douche","le miroir"],0],["Chasse l'intrus :",["l'école","le club","le canapé","le musée"],2],["Le féminin de « un coiffeur » est :",["une coiffeur","une coiffeure","une coiffeuse"],2],["Le féminin de « un mécanicien » est :",["une mécanicienne","une mécaniciene","une mécanicien"],0],["Ma tante est …",["un bon avocat","une bon avocate","une bonne avocate"],2],["Qu'est-ce qu'il y a dans la cuisine ?",["une douche et un lavabo","un évier et une cuisinière","un lit et un tapis"],1],["Karim a …",["douze ans","treize ans","quatorze ans"],0],["Dans la maison, il y a … chambres.",["deux","quatre","trois"],2],["Que fait la mère de Karim ?",["pharmacienne","professeure","avocate"],1],["Où est le garage ?",["dans la cuisine","devant la maison","derrière la maison"],1],["Nous … douze ans.",["sommes","avez","avons"],2],["Les élèves … dans la cour.",["est","sont","ont"],1],["Mes cousines … un exercice.",["font","fait","faisons"],0],["Vous … à la maison ?",["sont","sommes","êtes"],2],["Elle … un chat.",["ont","a","avons"],1],["Nous … le football.",["aime","aimons","aimez"],1],["Elle … les devoirs.",["détestent","détestes","déteste"],2],["… des tapis dans la chambre.",["C'est","Ce sont","Il y a"],2],["… des rideaux.",["Il y a","C'est","Ce sont"],2],["« … ? — Ce sont mes amis. »",["Qu'est-ce que c'est ?","Qui est-ce ?","Quel âge as-tu ?"],1],["« … ? — C'est un tapis. »",["Qu'est-ce que c'est ?","Qui est-ce ?","Où est le tapis ?"],0],["Le parc est … le musée et la gare.",["entre","sur","sous"],0],["La cuisine est à côté … salon.",["du","de la","des"],0],["Le cinéma est loin … école.",["du","de la","de l'"],2],["« à droite de » ≠ …",["devant","entre","à gauche de"],2],
["Ma mère sont professeure.",["a","ont","est"],2],["Mes amis est au stade.",["sont","ont","suis"],0],["Tu ai douze ans.",["a","as","avez"],1],["Les élèves fait un exercice.",["faisons","font","faites"],1],["Mon frère est treize ans.",["ai","a","sont"],1],["Le musée est à gauche du école.",["de l'","de la","des"],0],["On mangent dans la salle à manger.",["manges","mange","mangeons"],1],["« Un matelas » =",["مرتبة","مخدة","سرير"],0],["« Un coussin » =",["ستارة","وسادة","مرآة"],1],["« Une horloge » =",["ساعة حائط","منبه","نجفة"],0],["Ma sœur … treize ans.",["est","a","sont"],1],["Le contraire de « devant » est :",["sur","derrière","entre"],1],["Nous nous … dans la salle de bains.",["douchez","douchons","douche"],1]
]}
];
const $=id=>document.getElementById(id);let selected=null,index=0,answers=[],name="";
function show(id){["home","intro","quiz","result"].forEach(x=>$(x).classList.toggle("hidden",x!==id));}
const pageParams=new URLSearchParams(location.search);
const studentMode=pageParams.get("student")==="1"||location.pathname.endsWith("/student.html");
const reviewGradeByLesson={"november-review-grade4":4,"november-review-grade6":6,"november-review-grade7":7,"november-review-grade8":8};
const routeLesson=pageParams.get("lesson")||pageParams.get("id")||"";
const studentGrade=Number(pageParams.get("grade")||0);
const expectedStudentGrade=reviewGradeByLesson[routeLesson]||0;
const studentExamId=studentMode&&studentGrade===expectedStudentGrade?({4:"p4",6:"p6",7:"g7",8:"g8"})[studentGrade]||"":"";
function renderGrades(){
 const available=studentMode?exams.filter(e=>e.id===studentExamId):exams.filter(e=>e.id!=="p4");
 $("grades").innerHTML=available.map(e=>{const i=exams.indexOf(e);return '<button class="grade" data-i="'+i+'"><strong>'+e.title+'</strong><small>'+e.curriculum+' · مراجعة شهر نوفمبر</small><span class="badge">'+e.questions.length+' سؤالاً تدريبياً</span></button>';}).join("");
 document.querySelectorAll(".grade").forEach(b=>b.onclick=()=>selectExam(+b.dataset.i));
 if(studentMode){
   const studentNameInput=$("studentName");
   studentNameInput.value=localStorage.getItem("hm_student_name")||"";
   studentNameInput.readOnly=true;
   const label=document.querySelector('label[for="studentName"]');
   if(label)label.textContent="اسم الطالب";
   if(available.length)selectExam(exams.indexOf(available[0]));
   else $("examInfo").textContent="لا توجد مراجعة مطابقة لهذا الصف.";
 }
}
function selectExam(i){selected=exams[i];$("examTitle").textContent=selected.title+" — مراجعة نوفمبر";$("examInfo").textContent=selected.curriculum+" · "+selected.questions.length+" سؤالاً. اختر الإجابة الأنسب لكل سؤال.";show("intro");}
$("backHome").onclick=()=>show("home");$("start").onclick=()=>{name=$("studentName").value.trim();answers=Array(selected.questions.length).fill(null);index=0;renderQuestion();show("quiz");};
function renderQuestion(){let q=selected.questions[index];$("quizTitle").textContent=selected.title;$("counter").textContent="السؤال "+(index+1)+" من "+selected.questions.length;$("bar").style.width=((index+1)/selected.questions.length*100)+"%";const questionDir=/[\u0600-\u06FF]/.test(q[0])?"rtl":"ltr";const readingContext=(selected.id==="g7"&&index>=10&&index<=13)?'<div class="reading-context" dir="ltr"><strong>Lis le texte, puis réponds :</strong><br>Sami est un garçon. Il a douze ans. Il a une sœur, Hana. Hana a dix ans. Dans le sac à dos de Hana, il y a un cahier et un livre. Dans la trousse, il y a une règle et deux stylos.</div>':(selected.id==="g8"&&index>=11&&index<=14)?'<div class="reading-context" dir="ltr"><strong>Lis le document :</strong><br>Je m\'appelle Karim. J\'ai douze ans. J\'habite dans une grande maison. Dans la maison, il y a trois chambres, un salon et une cuisine. Mon père est médecin. Ma mère est professeure. Le garage est devant la maison.</div>':"";$("questions").innerHTML='<article class="q">'+readingContext+'<h3 class="question-text '+questionDir+'" dir="'+questionDir+'"><bdi dir="'+questionDir+'">'+(index+1)+'. '+q[0]+'</bdi></h3><div class="opts">'+q[1].map((o,j)=>'<label class="opt"><input type="radio" name="answer" value="'+j+'" '+(answers[index]===j?"checked":"")+'> <span dir="auto">'+String.fromCharCode(65+j)+') '+o+'</span></label>').join("")+'</div></article>';$("prev").classList.toggle("hidden",index===0);$("next").classList.toggle("hidden",index===selected.questions.length-1);$("finish").classList.toggle("hidden",index!==selected.questions.length-1);document.querySelectorAll('input[name="answer"]').forEach(x=>x.onchange=()=>answers[index]=+x.value);}
$("prev").onclick=()=>{index--;renderQuestion();};$("next").onclick=()=>{index++;renderQuestion();};
$("finish").onclick=()=>{let score=0;selected.questions.forEach((q,i)=>{if(answers[i]===q[2])score++;});$("score").textContent=score+" / "+selected.questions.length;$("resultText").textContent=(name?name+"، ":"")+"أجبت إجابة صحيحة عن "+score+" سؤالاً من "+selected.questions.length+" ("+Math.round(score/selected.questions.length*100)+"%).";$("review").innerHTML="<h3>مراجعة الإجابات</h3>"+selected.questions.map((q,i)=>'<p><bdi class="q-number" dir="ltr">'+(i+1)+'.</bdi> <strong class="review-question" dir="auto">'+q[0]+'</strong><br><span class="'+(answers[i]===q[2]?"correct":"wrong")+'">'+(answers[i]===q[2]?"إجابة صحيحة":"إجابتك: "+(answers[i]===null?"لم تجب":q[1][answers[i]]))+'</span> · الإجابة الصحيحة: <strong dir="auto">'+q[1][q[2]]+"</strong></p>").join("");show("result");window.scrollTo({top:0,behavior:"smooth"});};
$("retry").onclick=()=>{answers=Array(selected.questions.length).fill(null);index=0;renderQuestion();show("quiz");window.scrollTo(0,0);};$("chooseAgain").onclick=()=>{show("home");window.scrollTo(0,0);};renderGrades();