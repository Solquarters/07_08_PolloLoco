class BackgroundObject extends MoveableObject{
    width =720;
    height = 480;

    //Parallax effect
    speedFactor;

    constructor(imagePath, xInput, yInput, speedFactor){
        super().loadImage(imagePath);
        this.x = xInput;
        this.y = yInput;
        this.speedFactor = speedFactor;
    }
}