const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var ground, tower, cannon;
var backgroundImage, towerImage;
var angle = 20;
var ballGroup = [];
var boat;
var boatGroup = [];
var boatAnimation = [];
var boatSpriteSheet, boatMetadata;
var boatDeadSpriteSheet, boatDeadMetadata;
var boatDeadAnimation = [];
var backgroundSound, cannonExplode, pirateLaugh;
var isLaughing = false;
var ballshoot = false;

function preload() {
  backgroundImage = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatMetadata = loadJSON("./assets/boat/ship-sailing.json");
  boatSpriteSheet =  loadImage("./assets/boat/ship-sailing.png");
  boatDeadSpriteSheet = loadImage("./assets/boat/broken-ship-01.png");
  boatDeadMetadata = loadJSON("./assets/boat/broken-ship-01.json");
  backgroundSound = loadSound("./assets/background_music.mp3");
  cannonExplode = loadSound("./assets/cannon_explosion.mp3");
  pirateLaugh = loadSound("./assets/pirate_laugh.mp3");

}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  cannon = new Cannon(180,110,130,100,angle);

  options = { 
    isStatic: true,
  };
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);
  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  angleMode(DEGREES);

  var frames = boatMetadata.frames;
  for(var i = 0; i < frames.length; i++) {
    var pos = frames[i].frame;
    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  var frames2 = boatDeadMetadata.frames;
  for(var i = 0; i < frames2.length; i++){
    var pos = frames2[i].frame;
    var img = boatDeadSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatDeadAnimation.push(img);
  }
  

}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  if(!backgroundSound.isPlaying()){
    backgroundSound.play();
    backgroundSound.setVolume(0.5);
  }
 
  Engine.update(engine);

  cannon.display(); 
  showBoats();
  for(var i = 0; i < ballGroup.length; i++){
    showcannonballs(ballGroup[i],i);  
    collisionWithBoat(i);
    
  }


  rect(ground.position.x, ground.position.y, width*2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y,160, 310);
  pop();
}
function showcannonballs(ball,index){
  if(ball != undefined){
    ball.display();
    if(ball.body.position.x > width || ball.body.position.y > height - 50){
      ball.remove(index);
      ballshoot = false;
    }
  }
}
function keyReleased() {
  if (keyCode === 32 && !ballshoot) {
    ballGroup[ballGroup.length - 1].shoot(cannon.angle);
    cannonExplode.play();
    ballshoot = true;
  }
}

function collisionWithBoat(index){
    for(var i = 0; i < boatGroup.length; i ++){
      if(ballGroup[index] != undefined && boatGroup[i] != undefined){
        var collision = Matter.SAT.collides(ballGroup[index].body,boatGroup[i].body);
        console.log(collision);
        if(collision.collided){
          boatGroup[i].remove(i);
          ballGroup[index].remove(index);
          ballshoot = false;
        }
      }
    }
}

function keyPressed() {
  if (keyCode === 32) {
    var ball = new CannonBall(cannon.x, cannon.y);
    ballGroup.push(ball);
  }
}

function showBoats() {
  if (boatGroup.length > 0){
    if(boatGroup[boatGroup.length - 1] == undefined||boatGroup[boatGroup.length - 1].body.position.x < width - 300){
      var positions = [-40, -60, -70, -20];
      var posY = random(positions);
      boat = new Boat(width, height - 100, 170, 170, posY, boatAnimation);
      boatGroup.push(boat);
    }
    for(var i = 0; i < boatGroup.length; i ++){
      if(boatGroup[i]){
        boatGroup[i].display();
        boatGroup[i].animate();
        Matter.Body.setVelocity(boatGroup[i].body, {x:-0.9,y:0});
        var collision = Matter.SAT.collides(tower,boatGroup[i].body);
        if(collision.collided){
          gameOver();
          if(!isLaughing){
            isLaughing = true;
            pirateLaugh.play();
          }
        
        }
      }
    }
  }else{
    boat = new Boat(width, height - 100, 170, 170, -60, boatAnimation);
    boatGroup.push(boat);
  }
  
}

function gameOver() {
  swal({
    title: "Fim de Jogo!!!",
    text: "Obrigado Por Jogar",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    confirmButtonText: "Jogar Novamente",
    
  },function (isConfirm) {
    if(isConfirm) {
      location.reload();
    }
  });
}