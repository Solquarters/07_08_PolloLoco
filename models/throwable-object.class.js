class ThrowableObject extends MoveableObject{
    speedY;
    speedX;
    width = 100;
    height= 100;
    isBroken = false;

    offset = {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15,
    }

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y){
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
        this.animate();
        
    }

    animate(){
        let counter = 0;
        setInterval(() =>{
           
                if(this.y < 360 && !this.isBroken){
                    this.playAnimation(this.IMAGES_ROTATION);
                }
                
            
                if(this.y >= 360 && counter < 5){
                    if(counter == 0){this.currentImage = 0;}
                    this.isBroken = true;
                    counter++;
                    this.playAnimation(this.IMAGES_SPLASH);
                    this.speedY = 0;
                    this.speed = 0;
                    this.acceleration = 0;
                    // Clear the throw interval when the condition is met
                    if (this.throwInterval !== null) {
                        clearInterval(this.throwInterval);
                        this.throwInterval = null; // Reset the reference
                    }
                }

               world.level.enemies.forEach((enemy) => {
                   
                if(this.isColliding(enemy) && counter < 5 && enemy.isAlive && !this.isBroken){
                    if(counter == 0){this.currentImage = 0;}
                    enemy.isAlive = false;
                    this.isBroken = true;
                    counter++;
                    this.playAnimation(this.IMAGES_SPLASH);
                    this.speedY = 0;
                    this.speed = 0;
                    this.acceleration = 0;
                    this.y += 100;

                    

                    // Clear the throw interval when the condition is met
                    if (this.throwInterval !== null) {
                        clearInterval(this.throwInterval);
                        this.throwInterval = null; // Reset the reference
                    }
                }
                    
                  });

                

            
        }, 1000/16)
    }



    throw(){
        this.speedY = 40;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.x += 14;
        }, 20);

    }



}