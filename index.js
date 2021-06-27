const cvs=document.getElementById('canvas');
const ctx=cvs.getContext("2d");
// Constructor function
class snakePart{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}
const snakeParts=[];
// variables and constants
let speed=7;
let tileCount=24;
let tileSize=(cvs.width/tileCount)-2;
let headX=12;
let headY=12;
let xvelocity=0;
let yvelocity=0;
let appleX=5;
let appleY=5;
let tailLength=2;
let score=0;
// sounds
const food=new Audio("food.mp3");
const end=new Audio("gameover.mp3");
const all=new Audio("music.mp3");



// game Loop
function drawGame(){
  all.play();
    changeSnakePosition();
    let result=isgameOver();
     if(result==true)
     return;
      colorScreen();

  checkapplecollision();
  drawSnake();
  drawapple();
  drawscore();
  if (score > 5) {
    speed = 9;
  }
  if (score > 10) {
    speed = 11;
  }
  setTimeout(drawGame,1000/speed);
}

function colorScreen(){
  ctx.fillStyle="#ADFF2F";
  ctx.fillRect(0,0,cvs.width,cvs.height);
}
function drawapple(){
  ctx.fillStyle="red";
  ctx.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize);
}
function checkapplecollision(){
  if(appleX==headX && appleY==headY){
    appleX=Math.floor(Math.random()*tileCount);
    appleY=Math.floor(Math.random()*tileCount);
    tailLength++;
    score++;
    food.play();
  }
}
function drawSnake(){
  ctx.fillStyle="green";
  for(let i=0;i<snakeParts.length;i++)
  {
    let part=snakeParts[i];
    ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize);
  }
  snakeParts.push(new snakePart(headX,headY));
  while(snakeParts.length>tailLength){
    snakeParts.shift();
  }

  ctx.fillStyle="#3CB371";
  ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);
}
function changeSnakePosition(){
  headX=headX+xvelocity;
  headY=headY+yvelocity;
}
function drawscore(){
  ctx.fillStyle="black";
  ctx.font="12px Verdana";
  ctx.fillText("Score ="+score,cvs.width-75,25);
}
function isgameOver(){
  let gameOver=false;
  if (yvelocity === 0 && xvelocity === 0) {
   return false;
 }

 //walls
 if (headX < 0) {
   gameOver = true;
 } else if (headX === tileCount) {
   gameOver = true;
 } else if (headY < 0) {
   gameOver = true;
 } else if (headY === tileCount) {
   gameOver = true;
 }

 for (let i = 0; i < snakeParts.length; i++) {
   let part = snakeParts[i];
   if (part.x === headX && part.y === headY) {
     gameOver = true;
     break;
   }
 }



   if (gameOver) {
     ctx.fillStyle = "white";
     ctx.font = "50px Verdana";

     var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
     gradient.addColorStop("0", " magenta");
     gradient.addColorStop("0.5", "blue");
     gradient.addColorStop("1.0", "red");
     // Fill with gradient
     ctx.fillStyle = gradient;

     ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
     end.play();
     all.pause();
   }


 return gameOver;
}

document.addEventListener("keydown",KeyDown)
function KeyDown(event){
  if(event.keyCode==38){
    if(yvelocity==1)
    return;
    yvelocity=-1;
    xvelocity=0;
  }
  if(event.keyCode==40){
    if(yvelocity==-1)
    return;
    xvelocity=0;
    yvelocity=1;
  }
  if(event.keyCode==37){
    if(xvelocity==1)
    return;
    xvelocity=-1;
    yvelocity=0;
  }
  if(event.keyCode==39){
    if(xvelocity==-1)
    return;
    xvelocity=1;
    yvelocity=0;
  }
}

drawGame();
