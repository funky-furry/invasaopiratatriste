class CannonBall{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.raio = 30;
        var options = {
            isStatic: true,

        }
        this.body = Bodies.circle(x,y,this.raio,options);
        World.add(world,this.body);
        this.image = loadImage("./assets/cannonball.png");
        
    }
    display(){
        if(this.body.position.x > 200){
            push();
            imageMode(CENTER);
            image(this.image,this.body.position.x,this.body.position.y,this.raio,this.raio);
            pop();
        }
    }
    shoot(angle) {
        var newAngle = (angle - 30) * (3.14 / 180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.3);
        Matter.Body.setVelocity(this.body, { x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14)})
        Matter.Body.setStatic(this.body, false);
    }
    remove(i){
        if(ballGroup[i]){
            World.remove(world, this.body);
            delete ballGroup[i];
        }
}}