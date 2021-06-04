var path,cyclist;
var pathImg,cyclistImage1,cyclistImage2;
var pinkOpponent,pinkOpponentGroup,pinkOpponentImage,
    pinkOpponentImage2;
var yellowOpponent,yellowOpponentImage,yellowOpponentGroup,
yellowOpponentImage2;
var redOpponent,redOpponentImage,redOpponentImage2,redOpponentGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var bellSound;
var gameOver,gameOverImage;

function preload(){
  pathImg = loadImage("images/Road.png");
  cyclistImage1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  cyclistImage2= loadAnimation("images/mainPlayer3.png");
  
  pinkOpponentImage = loadAnimation("opponent1.png", "opponent2.png");
  pinkOpponentImage2 = loadAnimation("opponent3.png");
  
  yellowOpponentImage = loadAnimation("opponent4.png","opponent5.png");
  yellowOpponentImage2 = loadAnimation("opponent6.png");
  redOpponentImage = loadAnimation("opponent7.png","opponent8.png");
  redOpponentImage2 = loadAnimation("opponent9.png");
  bellSound = loadSound("sound/bell.mp3");
  gameOver= loadImage("gameover.png");
  }

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX=-7
path.x=path.width /2;


//creating boy running
cyclist  = createSprite(70,150);
cyclist.addAnimation("running",cyclistImage1);
cyclist.scale=0.07;

  
  pinkOpponentGroup = new Group();
  yellowOpponentGroup = new Group();
  redOpponentGroup = new Group();
  
  gameOver=createSprite(300,200);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.6;
  gameOver.visible=false;
  
  
}

function draw() {
  background(0);
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   path.velocityX = -(5+2*distance/100);
  
  edges= createEdgeSprites();
  cyclist.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  if (keyDown("up")) {
    cyclist.y=cyclist.y-10; 
  }
  
  if (keyDown("down")) {
    cyclist.y=cyclist.y+10; 
  }
  if(keyDown("space")){
      bellSound.play();
    }
    
    
    pinkCyclist();
    yellowCyclist();
    redCyclist();
    
    var select_opponent=Math.round(random(1,3));
  
    if(frameCount%100===0){
    if(select_opponent===1){
       pinkCyclist();
    } else if (select_opponent===2){
       yellowCyclist();
    }else{
       redCyclist();
    }
    }
            
    distance = distance+Math.round(getFrameRate()/50);
        
  
    
  
  if(pinkOpponentGroup.isTouching(cyclist)){
    
  gameState=END;
  pinkOpponent.addAnimation("pink",pinkOpponentImage2);
  pinkOpponent.velocityY=0;
  }
  
  if(yellowOpponentGroup.isTouching(cyclist)){
    
  gameState=END;
  yellowOpponent.addAnimation("yellow",yellowOpponentImage2);
  yellowOpponent.velocityY=0;
  
  }
  
  if(redOpponentGroup.isTouching(cyclist)){
  gameState=END;
  redOpponent.addAnimation("red",redOppoentImage2);
  redOpponent.velocityY=0;
  }
  }
  else if(gameState === END){
  fill("black");
  textSize(20);
  text("Press UP Arrow to restart the Game",100,250);
    
  cyclist.changeAnimation("fall",cyclistImage2);
  cyclist.velocityY=0;
    
  path.velocityX=0;
    
  gameOver.visible=true;
      
  if(keyDown("UP_ARROW")){
  reset();
  }  
    
  pinkOpponentGroup.setLifetimeEach(-1);
  yellowOpponentGroup.setLifetimeEach(-1);
  redOpponentGroup.setLifetimeEach(-1);

  pinkOpponentGroup.setVelocityXEach(0);
  yellowOpponentGroup.setVelocityXEach(0);
  redOpponentGroup.setVelocityXEach(0);
  }
  drawSprites();
  
  
  
  
}

function pinkCyclist(){
 pinkOpponent = createSprite(600,Math.round(random(50,250),10,10));
 pinkOpponent.addAnimation("pink",pinkOpponentImage);
 pinkOpponent.velocityX = -6;
 pinkOpponent.setlifetime = 150;
 pinkOpponent.scale = 0.07;
 pinkOpponentGroup.add(pinkOpponent);

}

function yellowCyclist(){
   yellowOpponent = createSprite(600,Math.round(random(50,250),10,10));
   yellowOpponent.addAnimation("yellow",yellowOpponentImage);
   yellowOpponent.velocityX = -6;
   yellowOpponent.setlifetime = 150;
   yellowOpponent.scale = 0.07;
   yellowOpponentGroup.add(yellowOpponent);
  
}

function redCyclist(){
redOpponent = createSprite(600,Math.round(random(50,250),10,10));
redOpponent.addAnimation("red",redOpponentImage);
redOpponent.velocityX = -6;
redOpponent.setlifetime = 150;
redOpponent.scale = 0.07;
redOpponentGroup.add(redOpponent);

}

function reset(){
  gameState=PLAY;

  cyclist.addAnimation("running",cyclistImage1);
  
  gameOver.visible=false;
  
  pinkOpponentGroup.destroyEach();
  yellowOppoentGroup.destroyEach();
  redOppoentGroup.destroyEach();
  
  distance = 0;
}