class MoveableObject{
    x = 0;
    y = 200;
    img;
    height= 250;
    width= 130;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;

    //loadImage('img/test.png')
    loadImage(path){
        this.img = new Image(); //wie HTML <img>
        this.img.src = path;
    }

    loadImages(arr){

        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        


    }

    moveRight(){
        console.log('Moving right');
    }

    moveLeft(){
       
            setInterval(() =>{
                // if(this.x < -this.width)
                // {this.x = 2* this.width;}
                this.x -= this.speed;
    
            }, 1000/60);}
        
    
}