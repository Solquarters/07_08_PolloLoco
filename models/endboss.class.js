class Endboss extends MoveableObject {
   
    x = 7800;
    
    isAlive = true;
   
    y = 50;
    height=420;
    width=280;
    isAlive = true;
    speed = 3;
    isTriggered = false;
    deadAnimationFrame = 0;

    lastJumpTimer = 0;
    newTimeAfterJump = 0;

    oldEnergy = 100;

    offset = {
        top: 120,
        bottom: 40,
        left: 80,
        right: 60,
    }

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACKING = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',

    ];

    currentImage = 0;
   
    constructor(){
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.applyGravity();
        this.animate();
       
    }

    jump(){
        this.speedY = 25 + Math.random() * (20); 
        this.x = this.x + (Math.random()* 70);
        }

     

    animate(){
        //added little delay before accessing character attributes to catch access error

        this.lastJumpTimer = new Date().getTime();

        setTimeout(() => {
        setStoppableInterval(() => {
            if(this.isDead()){
                if(this.deadAnimationFrame == 0){this.currentImage = 0;}
                if(this.deadAnimationFrame == this.IMAGES_DEAD.length-1)
                {this.y = 100; 
                setTimeout(() =>{stopGame()}, 400);
                return;
                }
                    
                this.deadAnimationFrame++;
                this.playAnimation(this.IMAGES_DEAD);
                document.getElementById('bossBarDivId').style.display = "none";
                return;
            }    
            if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
                return;
            }
            if(this.x - this.world.character.x <= 320 || this.energy < 100){
                this.isTriggered = true;
                document.getElementById('bossBarDivId').style.display = "block";
            }else{this.isTriggered = false;}

            if(!this.isTriggered){
                this.playAnimation(this.IMAGES_WALKING);
                }

            if(this.isTriggered && this.world.character.x < this.x){
                this.otherDirection = false;
                this.playAnimation(this.IMAGES_ATTACKING);
                // this.moveLeft();
            }

            if(this.isTriggered && this.world.character.x >= this.x){
                this.otherDirection = true;
                this.playAnimation(this.IMAGES_ATTACKING);
                this.moveRight();
            }
        }, 1000/8);
    }, 150);


        setTimeout(() => {
        setStoppableInterval(() => { 
            if(this.isTriggered && this.world.character.x <= this.x && !this.isDead()){
                this.moveLeft();
                
                this.newTimeAfterJump = new Date().getTime();

                if(this.newTimeAfterJump - this.lastJumpTimer > 1600){
                    this.jump();
                    this.newTimeAfterJump = new Date().getTime();
                    this.lastJumpTimer = new Date().getTime();
                }
            }
            if(this.isTriggered && this.world.character.x > this.x && !this.isDead()){
                this.moveRight();
                this.newTimeAfterJump = new Date().getTime();

                if(this.newTimeAfterJump - this.lastJumpTimer > 1600){
                    this.jump();
                    this.newTimeAfterJump = new Date().getTime();
                    this.lastJumpTimer = new Date().getTime();
                }
            }



        }, 1000/60);
    }, 150);
    }
}

