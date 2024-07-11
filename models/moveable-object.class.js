class MoveableObject{
    x = 0;
    y = 200;
    img;
    height= 250;
    width= 130;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;

    speedY = 0;
    acceleration = 6;

    applyGravity(){
        setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < 180;
    }

    //loadImage('img/test.png')
    loadImage(path){
        this.img = new Image(); //wie HTML <img>
        this.img.src = path;
    }

    loadImages(arr){

        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path =  images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(){
        this.x += this.speed;
        this.otherDirection = false;
        
    }

    moveLeft(){
        this.x -= this.speed;
        this.otherDirection = true;
    }

    jump(){
        this.speedY = 50;
    }
        
    
}