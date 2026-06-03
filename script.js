const screens = {
intro: document.getElementById('intro'),
scratch: document.getElementById('scratchSection'),
curtain: document.getElementById('curtainSection'),
countdown: document.getElementById('countdownSection')
};

function showScreen(screen){

document
.querySelectorAll('.screen')
.forEach(s=>s.classList.remove('active'));

screen.classList.add('active');
}

document
.getElementById('beginBtn')
.addEventListener('click',()=>{

showScreen(screens.scratch);

initScratch();
});

function initScratch(){

const canvas =
document.getElementById('scratchCanvas');

const ctx =
canvas.getContext('2d');

canvas.width = 320;
canvas.height = 220;

ctx.fillStyle = '#C6A664';
ctx.fillRect(0,0,canvas.width,canvas.height);

let scratched = 0;

function scratch(x,y){

ctx.globalCompositeOperation =
'destination-out';

ctx.beginPath();
ctx.arc(x,y,25,0,Math.PI*2);
ctx.fill();

scratched++;

if(scratched > 60){

triggerConfetti();

setTimeout(()=>{

showScreen(screens.curtain);

openCurtains();

},1500);
}
}

canvas.addEventListener('mousemove',e=>{
if(e.buttons===1){

const rect=
canvas.getBoundingClientRect();

scratch(
e.clientX-rect.left,
e.clientY-rect.top
);

}
});

canvas.addEventListener('touchmove',e=>{

const rect=
canvas.getBoundingClientRect();

const t=e.touches[0];

scratch(
t.clientX-rect.left,
t.clientY-rect.top
);

});
}

function triggerConfetti(){

confetti({
particleCount:200,
spread:120,
origin:{y:0.6}
});
}

function openCurtains(){

gsap.to('.left',{
x:'-100%',
duration:2
});

gsap.to('.right',{
x:'100%',
duration:2
});
}

document
.getElementById('countdownBtn')
.addEventListener('click',()=>{

showScreen(screens.countdown);

});

const weddingDate =
new Date(
'2026-06-19T12:28:00'
).getTime();

setInterval(()=>{

const now =
new Date().getTime();

const diff =
weddingDate - now;

document.getElementById('days').innerText =
Math.floor(diff/86400000);

document.getElementById('hours').innerText =
Math.floor(
(diff%86400000)/3600000
);

document.getElementById('minutes').innerText =
Math.floor(
(diff%3600000)/60000
);

document.getElementById('seconds').innerText =
Math.floor(
(diff%60000)/1000
);

},1000);