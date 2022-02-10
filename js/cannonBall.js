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
        push();
        imageMode(CENTER);
        image(this.image,this.body.position.x,this.body.position.y,this.raio,this.raio);
        pop();
    }
}