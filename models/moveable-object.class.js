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

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    drawFrame(ctx){
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle= 'blue';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.stroke();
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
        
        
    }

    moveLeft(){
        this.x -= this.speed;
        
    }

    jump(){
        this.speedY = 50;
    }
        
    
}