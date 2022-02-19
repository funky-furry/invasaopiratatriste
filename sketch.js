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

function preload() {
  backgroundImage = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
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
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
 
  Engine.update(engine);

  cannon.display(); 
  showBoats();
  for(var i = 0; i < ballGroup.length; i++){
    ballGroup[i].display();
    collisionWithBoat(i);
  }

  
  rect(ground.position.x, ground.position.y, width*2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y,160, 310);
  pop();
}

function keyReleased() {
  if (keyCode === 32) {
    ballGroup[ballGroup.length - 1].shoot(cannon.angle);
  }
}

function collisionWithBoat(index){
    boats[i].remove(i);
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
      boat = new Boat(width, height - 100, 170, 170, posY);
      boatGroup.push(boat);
    }
    for(var i = 0; i < boatGroup.length; i ++){
      if(boatGroup[i]){
        boatGroup[i].display();
        Matter.Body.setVelocity(boatGroup[i].body, {x:-0.9,y:0});
      }
    }
  }else{
    boat = new Boat(width, height - 100, 170, 170, -60);
    boatGroup.push(boat);
  }
  
}