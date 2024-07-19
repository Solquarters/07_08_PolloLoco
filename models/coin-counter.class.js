class Coincounter extends DrawableObject {
  coinCount = 0;

  constructor() {
    super().loadImage("./img/8_coin/coin_2.png");
    // this.loadImage(this.img);
    this.x = 530;
    this.y = 7;
    this.width = 80;
    this.height = 80;
  }

  // Override draw method to include coin count display
  draw(ctx) {
    // Draw the coin image
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    // Set the font and color for the text
    ctx.font = "26px Arial";
    ctx.fillStyle = "white";

    // Draw the coin count next to the coin image
    ctx.fillText(this.coinCount, this.x + 66, this.y + this.height / 2 + 11);
  }
}
