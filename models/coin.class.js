class Coin extends MoveableObject {
    time;

    constructor(){
        super().loadImage('./img/8_coin/coin_1.png');
        
        this.x = 500 + MoveableObject.lastCoinX; // Use the static property for x coordinate
        MoveableObject.lastCoinX += 200; // Update the static property
        if(MoveableObject.lastCoinX % 800){
            MoveableObject.lastCoinX += 200;
        }
        
        this.y = 100;
        this.height= 120;
        this.width= 120;
        this.animate();
        this.speed = 0.4;

        this.time = MoveableObject.lastCoinX; // Time variable to create a continuous movement
        this.amplitude = 2; // Amplitude of the sine wave
        this.frequency = 1; // Frequency of the sine wave
    }


    animate(){
        setInterval(() =>{

        this.time += 0.1; // Increment time to create continuous movement
        this.y =  this.y + this.amplitude * Math.sin(this.frequency * this.time);


    }, 1000/20)
    }





}