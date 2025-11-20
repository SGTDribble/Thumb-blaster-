const canvas=document.getElementById('game');const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
let player={x:canvas.width/2,y:canvas.height-60,width:40,height:20};
let bullets=[];setInterval(()=>{bullets.push({x:player.x+17,y:player.y})},200);
let enemies=[];function spawn(){for(let i=0;i<6;i++)enemies.push({x:60+i*60,y:60,width:40,height:20});}spawn();
let touchX=null;canvas.addEventListener('touchmove',e=>{touchX=e.touches[0].clientX});
function update(){if(touchX!==null){player.x+=(touchX-player.x-player.width/2)*0.2;}
bullets.forEach(b=>b.y-=8);bullets=bullets.filter(b=>b.y>0);
enemies.forEach(e=>{e.y+=0.2;if(e.y>canvas.height-100){alert('GAME OVER');location.reload();}});
enemies.forEach((e,ei)=>{bullets.forEach((b,bi)=>{if(b.x<e.x+e.width&&b.x+4>e.x&&b.y<e.y+e.height&&b.y+10>e.y){
enemies.splice(ei,1);bullets.splice(bi,1);}})});
if(enemies.length===0)spawn();}
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle='white';ctx.fillRect(player.x,player.y,player.width,player.height);
bullets.forEach(b=>{ctx.fillStyle='yellow';ctx.fillRect(b.x,b.y,4,10);});
enemies.forEach(e=>{ctx.fillStyle='red';ctx.fillRect(e.x,e.y,e.width,e.height);});}
function loop(){update();draw();requestAnimationFrame(loop);}loop();