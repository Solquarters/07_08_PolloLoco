class MoveableObject extends DrawableObject {
   
    static lastCoinX = 0; // Make lastCoinX a static property
    static lastCloudX = 0;
    static lastChickenX = 0;

    speed = 0.15;
    otherDirection = false;
    onCollisionCourse = true;
    speedY = 0;
    acceleration = 6;
    energy = 100;
    lastHit = 0;
    justDied=true;

    offset = {
        top: 0,
        left:0,
        right:0,
        bottom:0
    }

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
            return this.y < 170;
        }
    }


///colliding with offsets:
isColliding(moveableObject) {
    let thisLeft = this.x + this.offset.left;
    let thisRight = this.x + this.width - this.offset.right;
    let thisTop = this.y + this.offset.top;
    let thisBottom = this.y + this.height - this.offset.bottom;

    let moveableLeft = moveableObject.x + moveableObject.offset.left;
    let moveableRight = moveableObject.x + moveableObject.width - moveableObject.offset.right;
    let moveableTop = moveableObject.y + moveableObject.offset.top;
    let moveableBottom = moveableObject.y + moveableObject.height - moveableObject.offset.bottom;

    return (
        (moveableLeft <= thisLeft && thisLeft <= moveableRight) ||
        (moveableLeft <= thisRight && thisRight <= moveableRight) ||
        (thisLeft <= moveableLeft && moveableLeft <= thisRight)
    ) && (
        (moveableTop <= thisTop && thisTop <= moveableBottom) ||
        (moveableTop <= thisBottom && thisBottom <= moveableBottom) ||
        (thisTop <= moveableTop && moveableTop <= thisBottom)
    );
}

checkCollisionFromAbove(player, enemy) {
    let playerBottom = player.y + player.height - player.offset.bottom -player.offset.top;
    let playerNextBottom = playerBottom + player.speedY;
  
    let playerLeft = player.x + player.offset.left;
    let playerRight = player.x + player.width - player.offset.right;
  
    let enemyTop = enemy.y + enemy.offset.top;
    let enemyLeft = enemy.x + enemy.offset.left;
    let enemyRight = enemy.x + enemy.width - enemy.offset.right;
  
    if((enemyLeft < playerLeft && playerLeft < enemyRight) ||
        (enemyLeft < playerRight && playerRight < enemyRight) &&
      (playerBottom < enemyTop ) && (playerNextBottom > enemyTop)){

        if(player.isAboveGround() && player.speedY < 0 ){
            return true;
        }
    }
    return false;

  }


hit(){
    this.energy -= 5;
    document.getElementById('lifeDivId').style.width = `${this.energy}%`;
    lastInputTimer = new Date().getTime();

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
    // lastInputTimer = new Date().getTime();
    //difference in secs
    return timePassed < 400; //wehen last hit was not longer than 3 secs ago return true
}

isDead(){
    if(this.justDied){
        this.currentImage = 0; 
        this.justDied = false;
    }
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
    this.speedY = 47;
    }

}