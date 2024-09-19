class Chicken extends MoveableObject {
  // world;
  isAlive = true;
  splat_sound = new Audio("./sounds/Pollo Loco Sound/splat.ogg");
  playedSplatAlready = false;
  offset = {
    top: 0,
    bottom: 0,
    left: 5,
    right: 5,
  };

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  currentImage = 0;

  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 750 + MoveableObject.lastChickenX + Math.random() * 2000;
    MoveableObject.lastChickenX += 500;
    this.y = 350;
    this.height = 80;
    this.width = 80;
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.2 + Math.random() * 2;
    this.animate();
    this.addAudioToGlobalArray();
  }


addAudioToGlobalArray() {
  globalAudioArray.push(
   this.splat_sound
  );
}

  animate() {

    //Handle movement
    setTimeout(() => {
      setStoppableInterval(() => {
        if (this.isAlive && this.world.character.x < this.x) {
          this.moveLeft();
          this.otherDirection = false;
        }
        if (this.isAlive && this.world.character.x > this.x) {
          this.moveRight();
          this.otherDirection = true;
        }
      }, 1000 / 60);
    }, 300);

    //Handle animation and sound
    setTimeout(() => {
      setStoppableInterval(() => {
        if (this.isAlive) {
          this.playAnimation(this.IMAGES_WALKING);
        } else {
          if (!this.playedSplatAlready) {
            this.splat_sound.play();
            this.playedSplatAlready = true;
          }

          this.loadImage(
            "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
          );
        }
      }, 140);
    }, 300);
  }





}
