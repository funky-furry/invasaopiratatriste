class Boat {
    constructor(posX, posY, width, height, boatPos) {
        // propriedades  
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.boatPos = boatPos;
        this.body = Bodies.rectangle(this.posX, this.posY, this.width, this.height);
        World.add(world, this.body);
        this.image = loadImage("./assets/boat.png");
    }  

    display() {
        var angle = this.body.angle;
        var position = this.body.position;

        push();
        imageMode(CENTER);
        translate(position.x, position.y);
        rotate(angle);
        image(this.image, 0, this.boatPos, this.width, this.height);
        pop();
    }
}