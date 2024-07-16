class Chicken extends MoveableObject{
    isAlive = true;

    

    offset = {
        top: 0,
        bottom: 0,
        left: -15,
        right: -15,
    }

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    currentImage = 0;
   

    constructor(){
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 750 + MoveableObject.lastChickenX + Math.random() * (2000);; 
        MoveableObject.lastChickenX += 500; 
        this.y = 350;
        this.height=80;
        this.width=80;

        this.loadImages(this.IMAGES_WALKING);


        this.speed = 0.2 + (Math.random() * 2);

        this.animate();
    }


    animate(){

        setInterval(() =>{
            if(this.isAlive){
                this.moveLeft();
            }
            else{
                this.speed = 0;
            }
        }, 1000/60);
        

        setInterval(() => {
            if(this.isAlive){
                this.playAnimation(this.IMAGES_WALKING);
            }
            else{
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            }
           
        }, 180 - (this.speed*40));
    
    }
}