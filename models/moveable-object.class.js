class MoveableObject extends DrawableObject {
   
    
    speed = 0.15;
    otherDirection = false;
    onCollisionCourse = true;
    speedY = 0;
    acceleration = 6;
    energy = 100;
    lastHit = 0;
    

    applyGravity(){
        setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        if(this instanceof ThrowableObject){return true;}
        else{
            return this.y < 180;
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
    document.getElementById('lifeDivId').style.width = `${this.energy}%`

    if(this.energy < 0){
        this.energy = 0;
    }
    else{
        this.lastHit = new Date().getTime();
    }
}

isHurt(){
    //Difference in millisecs
    let timePassed = new Date().getTime() - this.lastHit;
    //difference in secs
    return timePassed < 300; //wehen last hit was not longer than 3 secs ago return true
}

isDead(){
    return this.energy == 0;
}


    playAnimation(images){
        let i = this.currentImage % images.length;
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