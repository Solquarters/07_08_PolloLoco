/**
 * Class representing a moveable object in the game.
 * 
 * @extends DrawableObject
 * 
 * @property {object} world - Reference to the world object the moveable object is part of.
 * @property {number} static lastCoinX - Static property tracking the last x-position of a coin.
 * @property {number} static lastCloudX - Static property tracking the last x-position of a cloud.
 * @property {number} static lastChickenX - Static property tracking the last x-position of a chicken.
 * @property {number} static lastBottleX - Static property tracking the last x-position of a bottle.
 * @property {number} speed - The speed at which the object moves.
 * @property {boolean} otherDirection - Whether the object is moving in the opposite direction.
 * @property {boolean} onCollisionCourse - Whether the object is set to collide with something.
 * @property {number} speedY - The vertical speed for jumps or falling.
 * @property {number} acceleration - The gravity acceleration applied to the object.
 * @property {number} energy - The health or energy of the object.
 * @property {number} lastHit - Timestamp of when the object was last hit.
 * @property {boolean} justDied - Determines if the object just died and has reset its death state.
 * @property {object} offset - The collision offset values for the moveable object.
 */
class MoveableObject extends DrawableObject {
  world;
  static lastCoinX = 0; // Make lastCoinX a static property
  static lastCloudX = 0;
  static lastChickenX = 0;
  static lastBottleX = 0;

  speed = 0.15;
  otherDirection = false;
  onCollisionCourse = true;
  speedY = 0;
  acceleration = 6;
  energy = 100;
  lastHit = 0;
  justDied = true;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the object, causing it to fall if it's above ground or moving upward.
   * The object's vertical speed decreases due to acceleration.
   */
  applyGravity() {
    setTimeout(() => {
      setStoppableInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }, 1000 / 25);
    }, 50);
  }

   /**
   * Checks if the object is above the ground.
   * 
   * @returns {boolean} - True if the object is above the ground or if it's a ThrowableObject, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else if (!(this instanceof Endboss)) {
      return this.y < 170;
    } else if (this instanceof Endboss) {
      return this.y < 50;
    }
  }

  /**
   * Checks if this object is colliding with another moveable object using offsets.
   * 
   * @param {MoveableObject} moveableObject - The other object to check collision with.
   * @returns {boolean} - True if the objects are colliding, false otherwise.
   */
  isColliding(moveableObject) {
    let thisLeft = this.x + this.offset.left;
    let thisRight = this.x + this.width - this.offset.right;
    let thisTop = this.y + this.offset.top;
    let thisBottom = this.y + this.height - this.offset.bottom;

    let moveableLeft = moveableObject.x + moveableObject.offset.left;
    let moveableRight =
      moveableObject.x + moveableObject.width - moveableObject.offset.right;
    let moveableTop = moveableObject.y + moveableObject.offset.top;
    let moveableBottom =
      moveableObject.y + moveableObject.height - moveableObject.offset.bottom;

    return (
      ((moveableLeft <= thisLeft && thisLeft <= moveableRight) ||
        (moveableLeft <= thisRight && thisRight <= moveableRight) ||
        (thisLeft <= moveableLeft && moveableLeft <= thisRight)) &&
      ((moveableTop <= thisTop && thisTop <= moveableBottom) ||
        (moveableTop <= thisBottom && thisBottom <= moveableBottom) ||
        (thisTop <= moveableTop && moveableTop <= thisBottom))
    );
  }


  /**
   * Checks if the player is colliding with an enemy from above, which can result in defeating the enemy.
   * 
   * @param {MoveableObject} player - The player object.
   * @param {MoveableObject} enemy - The enemy object.
   * @returns {boolean} - True if the player is colliding from above, false otherwise.
   */
  checkCollisionFromAbove(player, enemy) {
    if (
      player.isColliding(enemy) &&
      player.isAboveGround() &&
      player.speedY < 0
    ) {
      player.currentImage = 5;
      return true;
    }
    return false;
  }


    /**
   * Reduces the object's energy when hit and updates the life display for characters or bosses.
   */
  hit() {
    if (this instanceof Character) {
      this.energy -= 2;
      document.getElementById("lifeDivId").style.width = `${this.energy}%`;
    }

    if (this instanceof Endboss) {
      document.getElementById("bossLifeDivId").style.width = `${this.energy}%`;
    }

    lastInputTimer = new Date().getTime();

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }


   /**
   * Checks if the object is hurt by seeing how much time has passed since the last hit.
   * 
   * @returns {boolean} - True if the object was hit in the last 400 milliseconds, false otherwise.
   */
  isHurt() {
    //Difference in millisecs
    let timePassed = new Date().getTime() - this.lastHit;
    //difference in secs
    return timePassed < 400; //wehen last hit was not longer than 3 secs ago return true
  }

  /**
   * Checks if the object is dead based on its energy level.
   * 
   * @returns {boolean} - True if the object has 0 or less energy, false otherwise.
   */
  isDead() {
    if (this.justDied) {
      this.currentImage = 0;
      this.justDied = false;
    }
    return this.energy <= 0;
  }


  /**
   * Plays an animation using a set of images.
   * 
   * @param {Array<string>} images - An array of image paths to loop through for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

    /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 47;
  }
}
