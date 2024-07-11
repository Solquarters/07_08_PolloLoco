class World{

    character = new Character();
    
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    ];

    clouds = [
    new Cloud()
  
    ];

    backgroundObjects = [
        new BackgroundObject('./img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0, 0)
    ];

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();

    this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }

    draw(){

        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        

        this.ctx.translate(-this.camera_x, 0);


        ////Wird asynchron ausgeführt , nachdem alle Objecte oberhalb gerendert wurden.
        ///Innerhalb von requestAnimationFrame funktioniert this nicht mehr !!! Eigenheit von JS
        //deshalb wird this einer Variable self zugewiesen...
        //Draw wird nun entsprechend der GPU in einer gewissen Framerate aufgerufen
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objectArray){
        objectArray.forEach(obj => {
            this.addToMap(obj);
        });

    }

    addToMap(moveableObject){

        ///Spiegelung der Bilder bei linksseitiger Bewegung
        if(moveableObject.otherDirection){
            this.ctx.save();
            this.ctx.translate(moveableObject.width, 0);
            this.ctx.scale(-1, 1);
            moveableObject.x = moveableObject.x * -1;
        }

        this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height)

        if(moveableObject.otherDirection){
            this.ctx.restore();
            moveableObject.x = moveableObject.x * -1;


        }

    }

}