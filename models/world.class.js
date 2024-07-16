class World {
  character = new Character();
  statusBar = new StatusBar();
  coinCounter = new Coincounter();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  throwableObjects = [];


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();

    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D || this.keyboard.DOWN) {
      let bottle = new ThrowableObject(
        this.character.x + 30,
        this.character.y + 50
      );
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      //////Collision from above
      if(this.character.checkCollisionFromAbove(this.character, enemy) && enemy.isAlive){
        enemy.isAlive = false;
        this.character.speedY =  30;
      }

      if (this.character.isColliding(enemy) && enemy.isAlive) {
        this.character.hit();
        //console.log(this.character.energy);
        this.statusBar.setPercentage(this.character.energy);
      }
      
    });

    // Check for collisions with items and remove collided items
    for (let i = 0; i < this.level.items.length; i++) {
      let item = this.level.items[i];
      if (this.character.isColliding(item)) {
        
    this.level.items.splice(i, 1); 
    console.log(world.coinCounter.coinCount);
    world.coinCounter.coinCount++;
    world.coinCounter.draw(ctx);
      }
    }
  }

/////////////////////Collision from above start
// checkCollisionFromAbove(player, enemy) {
//   let playerBottom = player.y + player.height - player.offset.bottom;
//   let playerNextBottom = playerBottom + player.speedY;

//   let playerLeft = player.x + player.offset.left;
//   let playerRight = player.x + player.width - player.offset.right;

//   let enemyTop = enemy.y + enemy.offset.top;
//   let enemyLeft = enemy.x + enemy.offset.left;
//   let enemyRight = enemy.x + enemy.width - enemy.offset.right;

//   if((enemyLeft < playerLeft && playerLeft < enemyRight) ||
//       (enemyLeft < playerRight && playerRight < enemyRight) &&
//     (playerBottom < enemyTop ) && (playerNextBottom > enemyTop) && player.speedY < 0){
//       return true;
//   }
//   return false;
// }
/////////////////////Collision from above END



  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);



    ///////////an stelle der alten statischen Background Funktion
    // this.addObjectsToMap(this.level.backgroundObjects);

    //////////////HIER PARALLAX START
     // Draw background layers with different speed factors
     this.level.backgroundObjects.forEach(bgObject => {
        this.ctx.save();
        this.ctx.translate(-this.camera_x * bgObject.speedFactor, 0);
        this.addToMap(bgObject);
        this.ctx.restore();
    });
    ////////////// PARALLAX END
    
    this.level.clouds.forEach(cloud => {
        this.ctx.save();
        this.ctx.translate(-this.camera_x * 0.98, 0);
        this.addToMap(cloud);
        this.ctx.restore();
    });
    // this.addObjectsToMap(this.level.clouds);

    this.addObjectsToMap(this.level.items);

    ///Was genau passiert hier ,damit die Status Bar an der selben Stelle bleibt ?
    //SPACE FOR FIXED OBJECTS ON THE CANVAS /// START
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinCounter);
    this.ctx.translate(this.camera_x, 0);
    //SPACE FOR FIXED OBJECTS ON THE CANVAS /// END

    this.addToMap(this.character);

    //////////////
    this.addObjectsToMap(this.level.enemies);

  //   this.level.enemies.forEach(enemy => {
  //     this.ctx.save();
  //     this.ctx.translate(-this.camera_x * 0.1, 0);
  //     this.addToMap(enemy);
  //     this.ctx.restore();
  // });
  //////////////////

    this.addObjectsToMap(this.throwableObjects);

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
