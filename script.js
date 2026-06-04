const screens = {
welcome: document.getElementById("welcome"),
scratch: document.getElementById("scratch"),
curtain: document.getElementById("curtainScreen"),
invite: document.getElementById("invitation"),
countdown:
document.getElementById("countdown"),

haldi:
document.getElementById("haldi"),

wedding:
document.getElementById("wedding"),

venue:
document.getElementById("venue"),
thankyou: document.getElementById("thankyou"),
};

function showScreen(screen){

document
.querySelectorAll(".screen")
.forEach(s => s.classList.remove("active"));

screen.classList.add("active");
}

document
.getElementById("openBtn")
.addEventListener("click", () => {

showScreen(screens.scratch);

initScratch();
});

let completed = 0;
let initialized = false;

function initScratch(){

if(initialized) return;
initialized = true;

document
.querySelectorAll("canvas")
.forEach(canvas => {

const ctx = canvas.getContext("2d");

canvas.width = 100;
canvas.height = 100;

ctx.fillStyle = "#C6A664";

ctx.beginPath();
ctx.arc(50,50,50,0,Math.PI*2);
ctx.fill();

let revealed = false;

function revealCircle(){

if(revealed) return;

revealed = true;

canvas.style.transition =
"all .6s ease";

canvas.style.opacity = "0";

canvas.style.transform =
"scale(.8)";

setTimeout(()=>{
canvas.style.display = "none";
},600);

completed++;

if(completed === 3){

setTimeout(()=>{
document
.getElementById("bgMusic")
.play()
.catch(()=>{});
launchPetals();launchConfetti();setTimeout(()=>{openCurtains();},2500);


},1000);
document
.getElementById("continueBtn")
.addEventListener(
"click",
()=>{

showScreen(
screens.countdown
);

}
);


}
}

function checkReveal(){

const pixels =
ctx.getImageData(
0,
0,
canvas.width,
canvas.height
);

let transparent = 0;

for(
let i=3;
i<pixels.data.length;
i+=4
){

if(pixels.data[i]===0){
transparent++;
}

}

const percent =
transparent /
(canvas.width * canvas.height);

if(percent > 0.35){

revealCircle();

}
}

function scratch(x,y){

if(revealed) return;

ctx.globalCompositeOperation =
"destination-out";

ctx.beginPath();

ctx.arc(
x,
y,
30,
0,
Math.PI*2
);

ctx.fill();

checkReveal();
}

canvas.addEventListener(
"mousemove",
e=>{

if(e.buttons!==1) return;

const rect =
canvas.getBoundingClientRect();

scratch(
e.clientX-rect.left,
e.clientY-rect.top
);

}
);

canvas.addEventListener(
"touchmove",
e=>{

e.preventDefault();

const touch =
e.touches[0];

const rect =
canvas.getBoundingClientRect();

scratch(
touch.clientX-rect.left,
touch.clientY-rect.top
);

},
{passive:false}
);

});
}

function openCurtains(){

showScreen(screens.curtain);

const left =
document.querySelector(".left");

const right =
document.querySelector(".right");

left.animate(
[
{transform:"translateX(0)"},
{transform:"translateX(-100%)"}
],
{
duration:2200,
fill:"forwards",
easing:"ease-in-out"
}
);

right.animate(
[
{transform:"translateX(0)"},
{transform:"translateX(100%)"}
],
{
duration:2200,
fill:"forwards",
easing:"ease-in-out"
}
);

setTimeout(()=>{

showScreen(screens.invite);

},3200);
}
const weddingDate =
new Date(
"2026-06-19T12:28:00"
).getTime();

setInterval(()=>{

const now =
new Date().getTime();

const diff =
weddingDate - now;

document.getElementById("days").innerText =
Math.floor(diff/86400000);

document.getElementById("hours").innerText =
Math.floor(
(diff%86400000)/3600000
);

document.getElementById("minutes").innerText =
Math.floor(
(diff%3600000)/60000
);

document.getElementById("seconds").innerText =
Math.floor(
(diff%60000)/1000
);

},1000);


document
.getElementById("continueBtn")
.addEventListener(
"click",
()=>{
showScreen(screens.countdown);
}
);

document
.getElementById("countdownNext")
.addEventListener(
"click",
()=>{
showScreen(screens.haldi);
}
);

document
.getElementById("haldiNext")
.addEventListener(
"click",
()=>{
showScreen(screens.wedding);
}
);

document
.getElementById("weddingNext")
.addEventListener(
"click",
()=>{
showScreen(screens.venue);
}
);

function launchPetals(){
const container=document.getElementById('petalContainer');
for(let i=0;i<35;i++){
const petal=document.createElement('div');
petal.className='petal';
petal.style.left=Math.random()*100+'vw';
petal.style.animationDuration=(4+Math.random()*4)+'s';
container.appendChild(petal);
setTimeout(()=>petal.remove(),8000);
}
}

function launchConfetti(){
for(let i=0;i<80;i++){
const c=document.createElement('div');
c.style.position='fixed';
c.style.left=Math.random()*100+'vw';
c.style.top='0';
c.style.width='8px';
c.style.height='8px';
c.style.background=Math.random()>.5?'#C6A664':'#7A2330';
c.style.zIndex='9999';
document.body.appendChild(c);
c.animate([{transform:'translateY(0)'},{transform:'translateY(100vh)'}],{duration:2500+Math.random()*2000});
setTimeout(()=>c.remove(),5000);
}
}


const music = document.getElementById("bgMusic");  const musicBtn = document.getElementById("musicToggle");  musicBtn.addEventListener( "click", ()=>{  if(music.paused){  music.play();  musicBtn.innerHTML="🔊";  musicBtn.classList.add("playing");  }else{  music.pause();  musicBtn.innerHTML="🔇";  musicBtn.classList.remove("playing");  }  } );
document.getElementById("venueNext").addEventListener("click",()=>{showScreen(screens.thankyou);});
window.addEventListener('load',()=>{
 const ls=document.getElementById('loadingScreen');
 if(ls){setTimeout(()=>{ls.style.display='none';},1800);}
});
