

/**
 * Represents the game world with the character, items, enemies, and background.
 * Handles drawing, collisions, audio, and game interactions.
 * @constructor
 * @param {HTMLCanvasElement} canvas - The canvas where the game is rendered.
 * @param {Object} keyboard - The keyboard input object for controlling the character.
 */
class World {
  character = new Character();
  statusBar = new StatusBar();
  coinCounter = new Coincounter();

  coin_sound = new Audio("./sounds/Pollo Loco Sound/moneysound.ogg");
  bottle_sound = new Audio("./sounds/Pollo Loco Sound/fully_trimmed_Sound_effect-bottle_cork.mp3");
  levelAmbience = new Audio("./sounds/Pollo Loco Sound/desertAmbienceTrimmed.ogg");

  bottleCounter = new Bottlecounter();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  throwableObjects = [];
  

  constructor(canvas, keyboard) {
    this.lastThrowTime = 0;
    this.throwCooldown = 500; // Cooldown period in milliseconds
    this.lastBrokenBottleTime = 0;
    this.WaitBeforeDespawnTime = 1800;

    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.levelAmbience.play();
    this.addAudioToGlobalArray();  
    this.checkAudioBoolForGlobalMute();
  }


   /**
   * If user clicks on mute before game initialization: Checks the global mute boolean and mutes all game audio if true. 
   */
  checkAudioBoolForGlobalMute(){
    if(allAudioMutedBool){
      globalAudioArray.forEach(audio => {
        audio.muted = true;
    });
    }
}

 /**
   * Adds all world-specific audio objects to the global audio array for collective muting.
   */
 addAudioToGlobalArray() {
  globalAudioArray.push(this.coin_sound, this.bottle_sound, this.levelAmbience);
}


 /**
   * Sets references to the world for the character and enemies in the level.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }


   /**
   * Starts the game logic by periodically checking collisions and handling throwable objects.
   */
  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 50);
  }


   /**
   * Checks if the throw button is pressed and, if conditions are met, throws a bottle.
   * Also manages despawning broken bottles after a certain time.
   */
  checkThrowObjects() {
    const currentTime = Date.now();
    if (this.keyboard.D || this.keyboard.DOWN) {
      // if (world.bottleCounter.bottleCount <= 0) {
      // }
      if (
        currentTime - this.lastThrowTime >= this.throwCooldown &&
        world.bottleCounter.bottleCount > 0
      ) {
        let bottle = new ThrowableObject(this.character.x + 30,this.character.y + 50);
        this.throwableObjects.push(bottle);
        world.bottleCounter.bottleCount--;
        this.lastThrowTime = currentTime;
      }
    }
    if (currentTime - this.lastThrowTime >= this.WaitBeforeDespawnTime) {
      this.despawnBrokenBottles();
    }
  }

  /**
   * Removes broken throwable objects (e.g., bottles) from the game world.
   */
  despawnBrokenBottles() {
    this.throwableObjects = this.throwableObjects.filter(
      (bottle) => !bottle.isBroken
    );
  }


    /**
   * Checks for collisions between the character and enemies, items, or objects.
   * Updates the character's state, plays audio, and removes collected items.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.checkCollisionFromAbove(this.character, enemy) &&
        enemy.isAlive &&
        !(enemy instanceof Endboss)
      ) {
        enemy.isAlive = false;
        this.character.speedY = 35;
      }
      if (this.character.isColliding(enemy) && enemy.isAlive) {
        this.character.hit();
      }
      if (this.character.isDead()) {
        this.levelAmbience.pause();
      }
    });
    // Check for collisions with items and remove collided items
    for (let i = 0; i < this.level.items.length; i++) {
      let item = this.level.items[i];
      if (this.character.isColliding(item)) {
        this.level.items.splice(i, 1);
        if (item instanceof Coin) {
          this.coin_sound.play();
          world.coinCounter.coinCount++;
          world.coinCounter.draw(ctx);
        }
        if (item instanceof Bottle) {
          this.bottle_sound.play();
          world.bottleCounter.bottleCount++;
          world.bottleCounter.draw(ctx);
        }
      }
    }
  }


    /**
   * Continuously renders the game world, including the background, clouds, enemies, and items.
   * Handles parallax scrolling and fixed objects.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    ///PARALLAX START
    // Draw background layers with different speed factors
    this.level.backgroundObjects.forEach((bgObject) => {
      this.ctx.save();
      this.ctx.translate(-this.camera_x * bgObject.speedFactor, 0);
      this.addToMap(bgObject);
      this.ctx.restore();
    });

    this.level.clouds.forEach((cloud) => {
      this.ctx.save();
      this.ctx.translate(-this.camera_x * 0.98, 0);
      this.addToMap(cloud);
      this.ctx.restore();
    });
    ///PARALLAX END

    this.addObjectsToMap(this.level.items);
    //SPACE FOR FIXED OBJECTS ON THE CANVAS /// START
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.coinCounter);
    this.addToMap(this.bottleCounter);
    this.ctx.translate(this.camera_x, 0);
    //SPACE FOR FIXED OBJECTS ON THE CANVAS /// END

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    ////Wird asynchron ausgeführt , nachdem alle Objecte oberhalb gerendert wurden.
    ///Innerhalb von requestAnimationFrame funktioniert this nicht mehr !!! Eigenheit von JS
    //deshalb wird this einer Variable self zugewiesen...
    //Draw wird nun entsprechend der GPU in einer gewissen Framerate aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }


  /**
   * Adds an array of objects to the game map by rendering each of them.
   * @param {Array} objectArray - Array of moveable or drawable objects to render.
   */
  addObjectsToMap(objectArray) {
    objectArray.forEach((obj) => {
      this.addToMap(obj);
    });
  }


   /**
   * Draws an object to the map, mirroring it if moving the other direction.
   * @param {MoveableObject} moveableObject - The object to add to the game world.
   */
  addToMap(moveableObject) {
    ///Mirror images/animation when moving left
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }
    moveableObject.draw(this.ctx);
    moveableObject.drawFrame(this.ctx);
    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
    }
  }


  /**
   * Flips an object horizontally for leftward movement before rendering.
   * @param {MoveableObject} moveableObject - The object to flip.
   */
  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0);
    this.ctx.scale(-1, 1);
    moveableObject.x = moveableObject.x * -1;
  }


   /**
   * Restores the object's position after flipping it for leftward movement.
   * @param {MoveableObject} moveableObject - The object to flip back.
   */
  flipImageBack(moveableObject) {
    this.ctx.restore();
    moveableObject.x = moveableObject.x * -1;
  }
}
