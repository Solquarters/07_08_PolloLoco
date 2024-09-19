class Endboss extends MoveableObject {
  angry_sound = new Audio("./sounds/Pollo Loco Sound/angrychicken.ogg");
  hitBoss_sound = new Audio("./sounds/Pollo Loco Sound/bosshit.ogg");
  bossDead_sound = new Audio("./sounds/Pollo Loco Sound/chickenfunny.ogg");
  bossHit_sound = new Audio("./sounds/Pollo Loco Sound/bosshit.ogg");
  x = 7800;

  isAlive = true;

  y = 50;
  height = 420;
  width = 280;
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
  };

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACKING = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  currentImage = 0;

  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.applyGravity();
    this.animate();

    this.addAudioToGlobalArray();
  }


  /**
 * Adds end boss audio objects to the global audio array for collective muting.
 */
addAudioToGlobalArray() {
globalAudioArray.push(
  this.angry_sound,
  this.hitBoss_sound,
  this.bossDead_sound,
  this.bossHit_sound
);
}

/**
 * Makes the boss jump, randomizing the jump height and horizontal displacement.
 */
  jump() {
    this.speedY = 25 + Math.random() * 20;
    this.x = this.x + Math.random() * 70;
  }


  /**
 * Animates the end boss' movement, attack, and other states, handling conditions for death, hurt, or triggering boss behavior.
 * Runs at intervals to simulate continuous animation.
 */
  animate() {
    //added little delay before accessing character attributes to catch access error
    this.lastJumpTimer = new Date().getTime();

    //Handle animation and states
    setTimeout(() => {
      setStoppableInterval(() => {



        if (this.isDead()) {

          //Handle beginning of death animation
          if (this.deadAnimationFrame == 0) {
            this.currentImage = 0;
          }
          //Handle end of death animation 
          if (this.deadAnimationFrame == this.IMAGES_DEAD.length - 1) {
            // this.y = 100;
            // setTimeout(() => {
            //   stopGame();
            //   this.world.levelAmbience.pause();
            //   document.getElementById("gameWonOverlayDivId").style.display =
            //     "flex";
            // }, 800);
            this.handleGameWon();
            return;
          }

          // this.deadAnimationFrame++;
          // this.playAnimation(this.IMAGES_DEAD);
          // document.getElementById("bossBarDivId").style.display = "none";
          this.continueDeathAnimation();
          return;
        }



        if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
          this.bossHit_sound.play();
          return;
        }

        if (this.x - this.world.character.x <= 320 || this.energy < 100) {
          this.isTriggered = true;
          document.getElementById("bossBarDivId").style.display = "block";
        } else {
          this.isTriggered = false;
        }

        if (!this.isTriggered) {
          this.playAnimation(this.IMAGES_WALKING);
        }

        // if (this.isTriggered && this.world.character.x < this.x) {
        //   this.otherDirection = false;
        //   this.playAnimation(this.IMAGES_ATTACKING);
        //   // this.moveLeft();
        // }

        // if (this.isTriggered && this.world.character.x >= this.x) {
        //   this.otherDirection = true;
        //   this.playAnimation(this.IMAGES_ATTACKING);
        //   this.moveRight();
        // }
        this.handleTriggeredMovement();

      }, 1000 / 8);
    }, 150);


    //Handle movement and sound
    setTimeout(() => {
      setStoppableInterval(() => {



        // if (this.x - this.world.character.x < 800 && !this.isDead()) {
        //   this.angry_sound.play();
        // } else if (this.isDead()) {
        //   this.angry_sound.pause();
        //   this.bossDead_sound.play();
        // }
        this.handleNearbyOrDeathSound();


        // if (
        //   this.isTriggered &&
        //   this.world.character.x <= this.x &&
        //   !this.isDead()
        // ) {
        //   this.moveLeft();

        //   this.newTimeAfterJump = new Date().getTime();

        //   if (this.newTimeAfterJump - this.lastJumpTimer > 1600) {
        //     this.jump();
        //     this.newTimeAfterJump = new Date().getTime();
        //     this.lastJumpTimer = new Date().getTime();
        //   }
        // }
this.handleMoveLeftIfConditionIsTrue();


        // if (
        //   this.isTriggered &&
        //   this.world.character.x > this.x &&
        //   !this.isDead()
        // ) {
        //   this.moveRight();
        //   this.newTimeAfterJump = new Date().getTime();

        //   if (this.newTimeAfterJump - this.lastJumpTimer > 1600) {
        //     this.jump();
        //     this.newTimeAfterJump = new Date().getTime();
        //     this.lastJumpTimer = new Date().getTime();
        //   }
        // }
        this.handleMoveRightIfConditionIsTrue();



      }, 1000 / 60);
    }, 300);
  }


  /**
 * Handles boss movement to the right if the character is to the right of the boss, including jump logic if conditions are met.
 */
  handleMoveRightIfConditionIsTrue(){
    if (
      this.isTriggered &&
      this.world.character.x > this.x &&
      !this.isDead()
    ) {
      this.moveRight();
      this.newTimeAfterJump = new Date().getTime();

      if (this.newTimeAfterJump - this.lastJumpTimer > 1600) {
        this.jump();
        this.newTimeAfterJump = new Date().getTime();
        this.lastJumpTimer = new Date().getTime();
      }
    }
  }


  /**
 * Handles boss movement to the left if the character is to the left of the boss, including jump logic if conditions are met.
 */
  handleMoveLeftIfConditionIsTrue(){
    if (
      this.isTriggered &&
      this.world.character.x <= this.x &&
      !this.isDead()
    ) {
      this.moveLeft();

      this.newTimeAfterJump = new Date().getTime();

      if (this.newTimeAfterJump - this.lastJumpTimer > 1600) {
        this.jump();
        this.newTimeAfterJump = new Date().getTime();
        this.lastJumpTimer = new Date().getTime();
      }
    }

  }

/**
 * Plays the angry sound when the player is nearby and plays the boss' death sound when the boss dies.
 */
  handleNearbyOrDeathSound(){
    if (this.x - this.world.character.x < 800 && !this.isDead()) {
      this.angry_sound.play();
    } else if (this.isDead()) {
      this.angry_sound.pause();
      this.bossDead_sound.play();
    }
  }

  /**
 * Displays the game won screen after the boss dies, pauses background sound, and stops the game.
 */
  handleGameWon(){
    this.y = 100;
    setTimeout(() => {
      stopGame();
      this.world.levelAmbience.pause();
      document.getElementById("gameWonOverlayDivId").style.display =
        "flex";
    }, 800);

  }

  /**
 * Continues the boss' death animation and hides the boss' health bar.
 */
  continueDeathAnimation(){
    this.deadAnimationFrame++;
          this.playAnimation(this.IMAGES_DEAD);
          document.getElementById("bossBarDivId").style.display = "none";
  }

/**
 * Manages the boss' attack and movement based on the player's position when the boss is triggered.
 * Handles animation for attack sequences.
 */
  handleTriggeredMovement(){
    if (this.isTriggered && this.world.character.x < this.x) {
      this.otherDirection = false;
      this.playAnimation(this.IMAGES_ATTACKING);
      // this.moveLeft();
    }

    if (this.isTriggered && this.world.character.x >= this.x) {
      this.otherDirection = true;
      this.playAnimation(this.IMAGES_ATTACKING);
      this.moveRight();
    }
  }











}
