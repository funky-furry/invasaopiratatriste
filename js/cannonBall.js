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
}