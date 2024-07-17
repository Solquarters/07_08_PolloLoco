class Endboss extends MoveableObject {
    // x = 4600;
    x = 600;
    y = 50;
    height=420;
    width=280;
    isAlive = true;

    isTriggered = false;

    offset = {
        top: 170,
        bottom: 40,
        left: 80,
        right: 80,
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

    currentImage = 0;
   
    constructor(){
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.animate();
       
    }

    animate(){
        setInterval(() => {
            if(world.character.x > 350 || this.energy < 100){
                this.isTriggered = true;
            }else{this.isTriggered = false;}


            if(!this.isTriggered){
            this.playAnimation(this.IMAGES_WALKING);
            }


            if(this.isTriggered){
                this.playAnimation(this.IMAGES_ATTACKING);
            }

            
        }, 180);





    }
}

