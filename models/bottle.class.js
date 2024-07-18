class Bottle extends MoveableObject {
    time;

    constructor(){
        super();
        if (Math.random() < 0.5) {
            super.loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        } else {
            super.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        }
        this.x = 100 + MoveableObject.lastBottleX; // Use the static property for x coordinate
        MoveableObject.lastBottleX  += (100+ Math.random()*400);
       
        
        this.y = 340+ Math.random()*10;
        this.height= 80;
        this.width= 80;
        
    
    }






}