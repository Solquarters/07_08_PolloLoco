class Character extends MoveableObject {
  height = 250;
  width = 130;
  speed = 9;
  y = 20;
  currentImage = 0;
  world;

  walking_sound = new Audio("./sounds/Pollo Loco Sound/steps.ogg");
  inpain_sound = new Audio("./sounds/Pollo Loco Sound/PepeGrunt.ogg");
  snoring_sound = new Audio("./sounds/Pollo Loco Sound/pepe_snoring.ogg");
  jump_sound = new Audio("./sounds/Pollo Loco Sound/jumpbounce.ogg");
  characterDeath_sound = new Audio("./sounds/Pollo Loco Sound/wilhelmscream.ogg");

  jumpAlreadyTriggered = false;
  deadAnimationFrame = 0;
  idleTimer = 0;

  offset = {
    top: 100,
    bottom: 10,
    left: 28,
    right: 20,
  };

  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_IDLE_LONG = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
    "img/2_character_pepe/3_jump/J-39.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  constructor() {
    super().loadImage("./img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
    this.x = 300;

    this.addAudioToGlobalArray();
  }

  addAudioToGlobalArray() {
    globalAudioArray.push(
      this.walking_sound,
      this.inpain_sound,
      this.snoring_sound,
      this.jump_sound,
      this.characterDeath_sound
    );
  }

  animate() {
    setStoppableInterval(() => {
      this.walking_sound.pause();

      // if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      //   lastInputTimer = new Date().getTime();
      //   this.moveRight();
      //   this.otherDirection = false;
      //   if (!this.isAboveGround()) {
      //     this.walking_sound.play();
      //   }
      // }
      this.moveRightIfConditionTrue();

     

      // if (this.world.keyboard.LEFT && this.x > 120) {
      //   lastInputTimer = new Date().getTime();
      //   this.moveLeft();
      //   this.otherDirection = true;
      //   if (!this.isAboveGround()) {
      //     this.walking_sound.play();
      //   }
      // }

      this.moveLeftIfConditionTrue();

      // if ((this.world.keyboard.UP || this.world.keyboard.SPACE) &&!this.isAboveGround() && !this.jumpAlreadyTriggered) 
      //   {
      //   lastInputTimer = new Date().getTime();
      //   this.jump_sound.play();
      //   this.jumpAlreadyTriggered = true;
      //   this.currentImage = 9;
      //   this.jump();
      // }
      this.jumpIfConditionTrue();

      this.world.camera_x = -this.x + 120;

    }, 1000 / 60);


   

    setStoppableInterval(() => {
      if (this.isDead() && this.deadAnimationFrame < 12) {
        // this.characterDeath_sound.play();
        // if (this.deadAnimationFrame == 0) {
        //   this.currentImage = 0;
        // }
        // this.playAnimation(this.IMAGES_DEAD);
        // this.deadAnimationFrame++;
        // if (this.deadAnimationFrame == 12) {
        //   //If dead animation reaches end, display end screen
        //   stopGame();
        //   document.getElementById("gameLostOverlayDivId").style.display =
        //     "flex";
        // }
        this.handleDeathCondition();
        return;
      } 
      

      if (this.isHurt()) {
        // this.snoring_sound.pause();
        // this.playAnimation(this.IMAGES_HURT);
        // this.inpain_sound.play();
        this.handleIsHurt();

      } else if (this.isAboveGround()) {
        this.snoring_sound.pause();
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.snoring_sound.pause();
          this.playAnimation(this.IMAGES_WALKING);
        }
      }


      // let timePassed = new Date().getTime() - lastInputTimer;

      // if (timePassed / 1000 > 4) {
      //   this.playAnimation(this.IMAGES_IDLE_LONG);
      //   this.snoring_sound.play();
      // } else if (
      //   !this.isAboveGround() &&
      //   !this.isDead() &&
      //   !this.isHurt() &&
      //   !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
      // ) {
      //   this.snoring_sound.pause();
      //   this.playAnimation(this.IMAGES_IDLE);
      // }
      this.handleShortAndLongIdleAnimation();


    }, 1000 / 20);
  }






  moveRightIfConditionTrue(){
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      lastInputTimer = new Date().getTime();
      this.moveRight();
      this.otherDirection = false;
      if (!this.isAboveGround()) {
        this.walking_sound.play();
      }
    }
  }

  moveLeftIfConditionTrue(){
    if (this.world.keyboard.LEFT && this.x > 120) {
      lastInputTimer = new Date().getTime();
      this.moveLeft();
      this.otherDirection = true;
      if (!this.isAboveGround()) {
        this.walking_sound.play();
      }
    }

  }


jumpIfConditionTrue(){
  if ((this.world.keyboard.UP || this.world.keyboard.SPACE) &&!this.isAboveGround() && !this.jumpAlreadyTriggered) 
    {
    lastInputTimer = new Date().getTime();
    this.jump_sound.play();
    this.jumpAlreadyTriggered = true;
    this.currentImage = 9;
    this.jump();
  }
}

handleDeathCondition(){
    this.characterDeath_sound.play();
    if (this.deadAnimationFrame == 0) {
      this.currentImage = 0;
    }
    this.playAnimation(this.IMAGES_DEAD);
    this.deadAnimationFrame++;
    if (this.deadAnimationFrame == 12) {
      //If dead animation reaches end, display end screen
      stopGame();
      document.getElementById("gameLostOverlayDivId").style.display =
        "flex";
    }
}

handleIsHurt(){
  this.snoring_sound.pause();
  this.playAnimation(this.IMAGES_HURT);
  this.inpain_sound.play();
}

handleShortAndLongIdleAnimation(){
  let timePassed = new Date().getTime() - lastInputTimer;

  if (timePassed / 1000 > 4) {
    this.playAnimation(this.IMAGES_IDLE_LONG);
    this.snoring_sound.play();
  } else if (
    !this.isAboveGround() &&
    !this.isDead() &&
    !this.isHurt() &&
    !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
  ) {
    this.snoring_sound.pause();
    this.playAnimation(this.IMAGES_IDLE);
  }

}


}
