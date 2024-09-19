/**
 * Represents a throwable object, such as a bottle, with animations, sounds, and collision logic.
 * @constructor
 * @param {number} x - The initial x-coordinate of the throwable object.
 * @param {number} y - The initial y-coordinate of the throwable object.
 */
class ThrowableObject extends MoveableObject {
  throwInterval;
  speedY;
  speedX;
  width = 80;
  height = 80;
  isBroken = false;
  thrownAlready = false;
  firstAnimationRound = true;

  breaking_sound1 = new Audio("./sounds/Pollo Loco Sound/bottle_break1.ogg");
  breaking_sound2 = new Audio("./sounds/Pollo Loco Sound/bottle_break2.ogg");
  breaking_sound3 = new Audio("./sounds/Pollo Loco Sound/bottle_break3.ogg");
  throw_sound = new Audio("./sounds/Pollo Loco Sound/Cartoon throw away sound effect (peww).mp3");

  offset = {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  };

  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
   
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    
    this.x = x;
    this.y = y;


    this.throw();
    this.animate();


  }

 /**
   * Handles the animation for the throwable object, including rotation during flight and the breaking animation upon collision with the ground or enemies.
   */
  animate() {
    let counter = 0;
    setInterval(() => {
      if (this.y < 360 && !this.isBroken) {
        this.playAnimation(this.IMAGES_ROTATION);
      }
      //Bottle break for floor collision
      if (this.y >= 360 && counter < 6) {
        //begin animation from the start
        if (counter == 0) {this.currentImage = 0;}
        counter = this.handleBottleBreakAnimationAndSound(counter);
      }
      //Handle collision with enemies
      world.level.enemies.forEach((enemy) => {
        if (this.isColliding(enemy) && counter < 6) {
          if (this.firstAnimationRound) {counter = 0;}
          this.firstAnimationRound = false;
          if (counter == 0) {this.currentImage = 0;}
          this.handleDamageToBoss(enemy);
          //bottle break for enemy collision
          if (enemy.isAlive || counter < 6) {
            counter = this.handleBottleBreakAnimationAndSound(counter);
          }
          if (!(enemy instanceof Endboss)) {enemy.isAlive = false;}
        }
      });
    }, 1000 / 16);
  }


  /**
   * Initiates the throw of the object, applying gravity and determining the direction based on the character's orientation.
   */
  throw() {
    if(!allAudioMutedBool){
      this.throw_sound.play();
    }
    this.speedY = 40;
    this.applyGravity();
    let throwDirection = world.character.otherDirection;
    this.throwInterval = setInterval(() => {
      if (!throwDirection) {
        this.x += 13;
      }
      if (throwDirection) {
        this.x -= 14;
      }
    }, 20);
  }

 /**
   * Manages the breaking animation and sound effects when the bottle hits the ground or an enemy.
   * @param {number} counter - Tracks the frames of the breaking animation.
   * @returns {number} Updated counter after processing the animation and sound.
   */
handleBottleBreakAnimationAndSound(counter){
        this.isBroken = true;
        counter++;
        this.playAnimation(this.IMAGES_SPLASH);
        this.speedY = 0;
        this.speed = 0;
        this.acceleration = 0;
        // Clear the throw interval when the condition is met
        if (this.throwInterval !== null) {
          clearInterval(this.throwInterval);
          this.throwInterval = null;
        }
        if(!allAudioMutedBool){
          this.breaking_sound1.play();
        }
        return counter;
}

/**
   * Applies damage to the end boss if the bottle collides with it.
   * Reduces the boss's energy and marks it as dead if energy falls below zero.
   * @param {Endboss} enemy - The enemy object (end boss) that the bottle collides with.
   */
handleDamageToBoss(enemy){
 if (enemy instanceof Endboss && !this.isBroken) {
            enemy.energy -= 20;
            enemy.hit();
            if (enemy.energy <= 0) {
              enemy.isAlive = false;
            }
          }
}

}
