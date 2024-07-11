class MoveableObject{
    x = 0;
    y = 200;
    img;
    height= 250;
    width= 130;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;
    onCollisionCourse = true;
    speedY = 0;
    acceleration = 6;
    energy = 100;

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
        if(this instanceof Character || this instanceof Chicken){
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle= 'blue';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.stroke();
        }
        
    }

//Collision detection
//character.isColliding(chicken)
// isColliding(obj){
//     return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
//             (this.y + this.offsety + this.height) >= obj.y &&
//             (this.y + this.offsetY) <= (obj.y + obj.height) &&
//             obj.onCollisionCourse; 
// }

// isColliding(moveableObject){
//     return (this.x + this.width > moveableObject.x &&
//             this.y + this.height > moveableObject.y &&
//             this.x < moveableObject.x &&
//             this.y < moveableObject.y + moveableObject.height);
// }

isColliding(moveableObject){
    return ( (this.x <= moveableObject.x && this.x+this.width > moveableObject.x)
        ||  (this.x < moveableObject.x+moveableObject.width && this.x+this.width > moveableObject.x+moveableObject.width)
        ||  (moveableObject.x < this.x && moveableObject.x+moveableObject.width > this.x)
    );
}

hit(){
    this.energy -= 5;
    if(this.energy < 0){
        this.energy = 0;
    }
}

isDead(){
    return this.energy == 0;
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