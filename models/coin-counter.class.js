class Coincounter extends DrawableObject {
    coinCount = 0;
    // img = url('img/8_coin/coin_1.png');

    // percentage = 100;

    constructor(){
        super().loadImage('./img/8_coin/coin_2.png');
        // this.loadImage(this.img);
        this.x = 600;
        this.y = 10;
        this.width = 80;
        this.height = 80;
        
    }

    // setPercentage(percentage){
    //     this.percentage = percentage;
    //     let path = this.IMAGES[this.returnHealthImgIndex()];
    //     this.img = this.imageCache[path];
    // }

    // Override draw method to include coin count display
    draw(ctx) {
        // Draw the coin image
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        // Set the font and color for the text
        ctx.font = "26px Arial";
        ctx.fillStyle = "white";
        
        // Draw the coin count next to the coin image
        ctx.fillText(this.coinCount, this.x + 70, this.y + this.height / 2 +11);
    }
}