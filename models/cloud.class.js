class Cloud extends MoveableObject{
    constructor(){
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x =  MoveableObject.lastCloudX + Math.random()*(500);
        MoveableObject.lastCloudX += 800;
        this.y = 20;
        this.height= 200 + Math.random() * (200);
        this.width= 450 + Math.random() * (200);
        this.animate();
    }


    animate(){
        setInterval(() =>{
        this.moveLeft();
    }, 1000/60)
    }


    
}