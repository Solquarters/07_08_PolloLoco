class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 0;
  y = 200;
  height = 250;
  width = 130;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  //draw frame with offsets in mind
  drawFrame(ctx) {
 
  }
}
