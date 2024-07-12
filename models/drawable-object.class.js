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


    
    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken){
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle= 'blue';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.stroke();
        }
        
    }
}