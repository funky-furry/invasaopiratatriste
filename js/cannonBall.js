class CannonBall {
    constructor(positionX, positionY){
        this.positionX = positionX;
        this.positionY = positionY;
        this.raio = 30;

        var options = {
            isStatic: true
        };
        this.body = Bodies.circle(this.positionX, this.positionY, this.raio, options);

        this.image = loadImage("assets/cannonball.png");
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;

        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.raio, this.raio);
        pop();
    }
    
    shoot(){
        console.log(cannon.angle);
        var newAngle = cannon.angle - 28;
        console.log(newAngle);
        newAngle = newAngle * (3.14/180);

        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);

        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body, {
            x:velocity.x * (180/ 3.14),
            y:velocity.y * (180/ 3.14),
        });
    }
}