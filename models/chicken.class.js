class Chicken extends MoveableObject{
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    currentImage = 0;
   

    constructor(){
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 550 + Math.random() * (300);
        this.y = 350;
        this.height=100;
        this.width=100;

        this.loadImages(this.IMAGES_WALKING);


        this.speed = 0.2 + (Math.random() * 2);

        this.animate();
    }


    animate(){
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path =  this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180 - (this.speed*40));
    
    }

    // moveLeft(){
    //     this.x -= 3 + this.speed;
    // }
   
}