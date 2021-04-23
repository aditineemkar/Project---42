var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2,mainRacerImg3;
var pinkcyclist;
var yellowcyclist;
var redcyclist;
var playerFall;
var cyclistGroup;
var gameEnd_img , gameEnd;
var restart_img, restart;
var obstacle_image1;
var obstacle_image2;
var obstacle_image3;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){

  obstacle1_img = loadImage("images/obstacle1.png")
  obstacle2_img = loadImage("images/obstacle2.png")
  obstacle3_img = loadImage("images/obstacle3.png")

  pathImg = loadImage("images/Road.png");

  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadImage("images/mainPlayer3.png");

  sound = loadSound("sound/bell.mp3",false)

  pinkcyclist = loadAnimation("images/opponent1.png","images/opponent2.png");
  yellowcyclist = loadAnimation("images/opponent4.png","images/opponent5.png");
  redcyclist = loadAnimation("images/opponent7.png","images/opponent8.png");

  gameEnd_img = loadImage("images/gameOver.png");


}

function setup(){
  
createCanvas(900,300);

cyclistGroup = createGroup();
ObstaclesGroup = createGroup();
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(20 + 2*distance/150);

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
mainCyclist.setCollider("circle",0,40,460);
mainCyclist.debug = false;

gameEnd = createSprite(450,150);
gameEnd.addImage("over",gameEnd_img);
gameEnd.visible = false;

  
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){

    distance = distance + Math.round(getFrameRate() / 30);
  
    mainCyclist.y = World.mouseY;
    mainCyclist.x = World.mouseX;
  
    edges= createEdgeSprites();
    mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  if(keyDown("space")){
    sound.play();
  }
  if(mainCyclist.isTouching(cyclistGroup)){
    gameState = END;
  }
  spawnCyclists();
  spawnObstacles();
  if(gameState === END){
    text("PRESS r TO RESTART THE GAME ",450,150 )
    mainCyclist.changeImage("fall",mainRacerImg2)
    gameEnd.visible = true;
    path.velocityX=0;
    if(keyDown("r")){
      reset();
    }
  }  
 }
}

function spawnCyclists(){
  if (frameCount % 120 === 0){
    var Cyclist = createSprite(400,165,10,40);
    Cyclist.x= Math.round(random(600,850));
    Cyclist.y= Math.round(random(50,250));
    Cyclist.scale = 0.07
    Cyclist.velocityX = -(6 + 2*distance/150);
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: Cyclist.addAnimation("cycle",pinkcyclist);       
               break;
       case 2: Cyclist.addAnimation("cycles",yellowcyclist);
               break;
       case 3: Cyclist.addAnimation("cycless",redcyclist);
               break;
       default: break;
     }
     Cyclist.lifetime = 300;
    cyclistGroup.add(Cyclist);
  }
 }
function  spawnObstacles(){
  if (frameCount % 320 === 0){
    var Obstacles = createSprite(400,165,10,40);
    Obstacles.x= Math.round(random(50,60));
    Obstacles.y= Math.round(random(50,250));
    Obstacles.scale = 0.07
    Obstacles.velocityX = (6 + 2*distance/150);
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: Obstacles.addImage("cycle",obstacle1_img);       
               break;
       case 2: Obstacles.addImage("cycles",obstacle2_img);
               break;
       case 3: Obstacles.addImage("cycless",obstacle3_img);
               break;
       default: break;
     }
     Obstacles.lifetime = 300;
     ObstaclesGroup.add(Obstacles);
  }
 }

 function reset(){
  gameState = PLAY;
  gameEnd.visible = false;
  distance = 0;
  
}
