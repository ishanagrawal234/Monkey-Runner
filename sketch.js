
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var ground, invisible_ground
var foodGroup, obstacleGroup
var score, gameState;
var PLAY = 1; END = 0;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(600,500);
  
  gameState = PLAY;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey = createSprite(70, 370, 50, 50);
  monkey.addAnimation("runningMonkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(250, 405, 1000, 10);
  ground.x = ground.width / 2;
  
  invisibleGround = createSprite(250, 410, 1000, 10);
  invisibleGround.x = ground.width / 2;
  
}

function draw() {

  background("lightblue");
  
  if (gameState === PLAY) {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

     if (keyDown("space") && monkey.isTouching(ground) ) {
       monkey.velocityY = -20;
     }  

     score = Math.round(frameCount / 3);

      if (monkey.isTouching(foodGroup)) {
        foodGroup.destroyEach();
      }

      food();
      obstacle();

      if(monkey.isTouching(obstacleGroup)){
      gameState = END;
      }
  } 
  
    if (gameState === END) {
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }

  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(invisibleGround);

  stroke("black");
  textSize(20);
  fill("black");
  text("Score:" + score, 500, 50);
  
  drawSprites();

}

function food() {

  if (frameCount % 80 === 0) {
    banana= createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    foodGroup.add(banana);
    foodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 400, 400);

  }

}

function obstacle() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(500, 365, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle", 0, 0, 200)
  }

}