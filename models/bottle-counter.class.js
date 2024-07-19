class Bottlecounter extends DrawableObject {
  bottleCount = 3;

  constructor() {
    super().loadImage(
      "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.x = 620;
    this.y = 20;
    this.width = 50;
    this.height = 50;
  }

  // Override draw method to include coin count display
  draw(ctx) {
    // Draw the coin image
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    // Set the font and color for the text
    ctx.font = "26px Arial";
    ctx.fillStyle = "white";

    // Draw the coin count next to the coin image
    ctx.fillText(this.bottleCount, this.x + 46, this.y + this.height - 12);
  }
}
