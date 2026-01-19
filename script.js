/* 🔥 Firebase (حط بياناتك) */
firebase.initializeApp({
  apiKey: "PUT_API_KEY",
  authDomain: "PUT_DOMAIN",
  projectId: "PUT_PROJECT_ID"
});
const db = firebase.firestore();

/* صوت جوجل */
function speak(t){
  let m=new SpeechSynthesisUtterance(t);
  m.lang="ar-EG";
  speechSynthesis.speak(m);
}

/* دخول */
function enterSite(){
  document.getElementById("welcomeScreen").style.display="none";
  speak("مرحباً بكم في بطولة بي ام جي سي");
}

/* اللاعبين (كلهم) */
const players=[
 {n:"عمر السيد محمد",id:"5535931335",c:"5682"},
 {n:"عمر الشافعي",id:"5780015747",c:"1683"},
 {n:"محمد أحمد",id:"5114404295",c:"0618"},
 {n:"زياد محمود",id:"5181732509",c:"4681"},
 {n:"فارس محسن",id:"52013524002",c:"8331"},
 {n:"يوسف عمرو",id:"5568744837",c:"1656"},
 {n:"معاذ محمود",id:"5888700371",c:"8989"},
 {n:"مهند محمود",id:"5789024569",c:"2326"},
 {n:"محمد سلامه",id:"5964471266",c:"1656"},
 {n:"منجا",id:"5233336518",c:"5115"},
 {n:"عمر",id:"5514938673",c:"8452"},
 {n:"طوخي",id:"51595481053",c:"8472"},
 {n:"معاذ",id:"51429738642",c:"2563"}
];

/* عرض اللاعبين */
const box=document.getElementById("players");
players.forEach(p=>{
 box.innerHTML+=`
 <div class="player-card">
   <h3>${p.n}</h3>
   <p>ID: ${p.id}</p>
   <p class="code">CODE: ${p.c}</p>
   <a class="whatsapp"
    href="https://wa.me/201211056530?text=تم%20قبولي%20في%20بطولة%20PMGC%20ID:${p.id}%20CODE:${p.c}"
    target="_blank">واتساب</a>
 </div>`;
});

/* تعليقات عالمية */
function addComment(){
 let u=username.value,t=commentText.value;
 if(!u||!t)return;
 db.collection("comments").add({u,t,l:0,time:Date.now()});
 commentText.value="";
}

db.collection("comments").orderBy("time","desc")
.onSnapshot(s=>{
 commentsList.innerHTML="";
 s.forEach(d=>{
  let c=d.data();
  commentsList.innerHTML+=`
   <div class="comment">
    <b>${c.u}</b><br>${c.t}
    <div class="like" onclick="like('${d.id}',${c.l})">👍 ${c.l}</div>
   </div>`;
 });
});

function like(id,l){
 db.collection("comments").doc(id).update({l:l+1});
}
