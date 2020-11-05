var PLAY = 1;
var END = 0;
var gameState = PLAY;

var restart,restartI;
var gameover,gameoverI;
var monkey , monkey_run;
var banana ,bananaI, obstacle, obstacleI;
var FoodG, obstacleG;
var score = 0;
var ground,groundI;
var jumpsound,diesound;
var inviground;
var bscore = 0;

function preload(){
  
    
  monkey_run =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaI = loadImage("banana.png");
  obstaceI = loadImage("obstacle.png");
  gameoverI = loadImage("71M3glE5W8L._SL1500_.jpg");
  restartI = loadImage("res.png");
  jumpsound = loadSound("salamisound-6941726-sfx-jump-9-game-computer.mp3");
  diesound = loadSound("die.mp3");
  groundI = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(600,500);
  
  ground = createSprite(0,280);
  ground.addImage("ground",groundI);
  ground.scale = 1;
  ground.velocityX = -2;
  
  monkey = createSprite(100,430);
  monkey.addAnimation("monkey",monkey_run);
  monkey.scale = 0.1;
 
  inviground = createSprite(300,462,600,7);
  inviground.visible = false;
  
  
  
  gameover = createSprite(300,250);
  gameover.addImage("gameover",gameoverI);
  gameover.scale = 0.55;
 
  restart = createSprite(300,450);
  restart.addImage("restart",restartI);
  restart.scale = 0.05;
  restart.visible = false;
  
  obstacleG = new Group();
  bananaG = new Group();
}


function draw() {
  background("white");

  if(gameState === PLAY){
    
    ground.velocityX = -2;
    if(ground.x < 200){
    ground.x = ground.width / 2;
    }
    
    
    
    gameover.visible = false;
    restart.visible = false;
    
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space") && monkey.y >= 410){
      monkey.velocityY = -12;
      jumpsound.play();
    }

    monkey.velocityY = monkey.velocityY + 0.2;  
  
  
    monkey.collide(inviground);
  
    obs();
    bananas();
    
    if(bananaG.isTouching(monkey)){
      bananaG.destroyEach();  
      bscore = bscore + 2;
    }
    
    if(obstacleG.isTouching(monkey)){
        gameState = END;
        diesound.play();
    }
     
  }  else if(gameState === END){
        obstacleG.destroyEach();
        bananaG.destroyEach();
        obstacleG.setVelocityX = 0;
        bananaG.setVelocityX = 0;
        
    
        gameover.visible = true;
        restart.visible = true;
        if(mousePressedOver(restart)){
          reset();
          
        ground.velocityX = 0;
        monkey.velocityX = 0;  
        }
  }
        

  drawSprites();
  textSize(17);
  fill("red");
  stroke("red");
  text("SURVIVAL TIME : " + score,10,30);
  text("BANANA ATE : " + bscore,450,30);
}


function reset(){
  
  gameState = PLAY;
  score = 0;
  obstacleG.destroyEach();
  bananaG.destroyEach();
  monkey.addAnimation("monkey",monkey_run);
  ground.velocityX = -2;
  
}


function obs(){
  if(frameCount % 200 === 0){
    obstacle = createSprite(610,431);
    obstacle.addImage("obs",obstaceI);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 150;
    obstacleG.add(obstacle);
  }
}

function bananas(){
  if(frameCount % 100 === 0){
    banana =  createSprite(610,Math.round(random(100,350)));
    banana.addImage("banana",bananaI);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 150;
    bananaG.add(banana);
  }
}

