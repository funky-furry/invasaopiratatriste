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

function preload() {
  backgroundImage = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatMetadata = loadJSON("./assets/boat/ship-sailing.json");
  boatSpriteSheet =  loadImage("./assets/boat/ship-sailing.png");
  boatDeadSpriteSheet = loadImage("./assets/boat/broken-ship-01.png");
  boatDeadMetadata = loadJSON("./assets/boat/broken-ship-01.json");
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
    }
  }
}
function keyReleased() {
  if (keyCode === 32) {
    ballGroup[ballGroup.length - 1].shoot(cannon.angle);
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
      }
    }
  }else{
    boat = new Boat(width, height - 100, 170, 170, -60, boatAnimation);
    boatGroup.push(boat);
  }
  
}