class ThrowableObject extends MoveableObject{
    speedY;
    speedX;
    width = 100;
    height= 100;


    constructor(x, y){
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.throw();
        
    }

    throw(){
        this.speedY = 40;
        this.applyGravity();
        setInterval(() => {
            this.x += 14;
        }, 25)

    }



}