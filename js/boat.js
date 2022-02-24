class Boat {
    constructor(posX, posY, width, height, boatPos, boatAnimation) {
        // propriedades  
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.boatPos = boatPos;
        this.body = Bodies.rectangle(this.posX, this.posY, this.width, this.height);
        World.add(world, this.body);
        this.image = loadImage("./assets/boat.png");
        this.boatAnimation = boatAnimation;
        this.velocity = 0.05;
    }  

    animate(){
        this.velocity += 0.05;
    }

    display() {
        var angle = this.body.angle;
        var position = this.body.position;
        var index = floor(this.velocity % this.boatAnimation.length);

        push();
        imageMode(CENTER);
        translate(position.x, position.y);
        rotate(angle);
        image(this.boatAnimation[index], 0, this.boatPos, this.width, this.height);
        pop();
    }

    remove(index){
        if(boatGroup[index]){
            this.boatAnimation = boatDeadAnimation;
            this.velocity = 0.05;
            this.width = 300;
            this.height = 300;
            World.remove(world, this.body);
            setTimeout(() => {
                delete boatGroup[index];
            }, 1000);
        }
    }
}