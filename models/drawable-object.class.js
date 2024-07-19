class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 200;
    height= 250;
    width= 130;

     //loadImage('img/test.png')
     loadImage(path){
        this.img = new Image(); //wie HTML <img>
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    //draw frame with offsets in mind
    drawFrame(ctx){
        // if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coin  || this instanceof Bottle ){
        // ctx.beginPath();
        // ctx.lineWidth = '2';
        // ctx.strokeStyle= 'red';
        // ctx.rect(this.x +this.offset.right,this.y + this.offset.top,this.width -this.offset.right -this.offset.left,this.height-this.offset.top- this.offset.bottom);
        // ctx.stroke();
        // }
        // if(this instanceof Character || this instanceof Chicken || this instanceof ThrowableObject ){
        //         ctx.beginPath();
        //         ctx.lineWidth = '2';
        //         ctx.strokeStyle= 'blue';
        //         ctx.rect(this.x,this.y,this.width,this.height);
        //         ctx.stroke();
        //         }
    }
}