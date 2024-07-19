class World {
  character = new Character();
  statusBar = new StatusBar();
  // bossStatusBar = new BossStatusBar();
  coinCounter = new Coincounter();
  coin_sound = new Audio("./sounds/Pollo Loco Sound/moneysound.ogg");
  bottle_sound = new Audio(
    "./sounds/Pollo Loco Sound/fully_trimmed_Sound_effect-bottle_cork.mp3"
  );
  bottleCounter = new Bottlecounter();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  throwableObjects = [];
  levelAmbience = new Audio(
    "./sounds/Pollo Loco Sound/desertAmbienceTrimmed.ogg"
  );

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
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 50);
  }

  checkThrowObjects() {
    const currentTime = Date.now();
    if (this.keyboard.D || this.keyboard.DOWN) {
      if (world.bottleCounter.bottleCount <= 0) {
        //PLAY DRAGGY SOUND, NO BOTTLES TO THROW!
      }

      if (
        currentTime - this.lastThrowTime >= this.throwCooldown &&
        world.bottleCounter.bottleCount > 0
      ) {
        let bottle = new ThrowableObject(
          this.character.x + 30,
          this.character.y + 50
        );
        this.throwableObjects.push(bottle);
        world.bottleCounter.bottleCount--;
        this.lastThrowTime = currentTime;
      }
    }

    if (currentTime - this.lastThrowTime >= this.WaitBeforeDespawnTime) {
      this.despawnBrokenBottles();
    }
  }

  despawnBrokenBottles() {
    this.throwableObjects = this.throwableObjects.filter(
      (bottle) => !bottle.isBroken
    );
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      //////Collision from above
      if (
        this.character.checkCollisionFromAbove(this.character, enemy) &&
        enemy.isAlive &&
        !(enemy instanceof Endboss)
      ) {
        enemy.isAlive = false;
        this.character.speedY = 35;

        ////PLAY JUMP ANIM GEHT NICHT
      }
      if (this.character.isColliding(enemy) && enemy.isAlive) {
        this.character.hit();
        //console.log(this.character.energy);
        // this.statusBar.setPercentage(this.character.energy);
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

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    // this.addObjectsToMap(this.level.backgroundObjects);
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

  addObjectsToMap(objectArray) {
    objectArray.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(moveableObject) {
    ///Spiegelung der Bilder bei linksseitiger Bewegung
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }

    moveableObject.draw(this.ctx);

    moveableObject.drawFrame(this.ctx);

    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
    }
  }

  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0);
    this.ctx.scale(-1, 1);
    moveableObject.x = moveableObject.x * -1;
  }

  flipImageBack(moveableObject) {
    this.ctx.restore();
    moveableObject.x = moveableObject.x * -1;
  }
}
