class Cloud extends MoveableObject{
    constructor(){
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = 10 + Math.random() * (300);
        this.y = 20;
        this.height= 280;
        this.width= 450;
        this.animate();
    }


    animate(){
        setInterval(() =>{
        this.moveLeft();
    }, 1000/60)
    }


    
}