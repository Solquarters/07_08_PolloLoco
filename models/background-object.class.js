class BackgroundObject extends MoveableObject{
    width =720;
    height = 480;
    constructor(imagePath, xInput, yInput){
        super().loadImage(imagePath);
        this.x = xInput;
        this.y = yInput;
    }
}