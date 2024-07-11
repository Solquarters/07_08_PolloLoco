class World{

    character = new Character();
    
    level = level1;

    // enemies = level1.enemies;
    // clouds = level1.clouds;
    // backgroundObjects = level1.backgroundObjects;

    // backgroundObjects = this.returnBackgroundImageArray(5);

    // returnBackgroundImageArray(levelLength){
    //     let backgroundArray = [];

    //     for(let i = 0; i < levelLength; i++){
    //         backgroundArray.push(new BackgroundObject('./img/5_background/layers/air.png', (-719 + 719*i*2), 0));
    //         backgroundArray.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', (-719+ 719*i*2), 0));
    //         backgroundArray.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png',(-719+ 719*i*2), 0));
    //         backgroundArray.push(new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', (-719+ 719*i*2), 0));

    //         backgroundArray.push(new BackgroundObject('./img/5_background/layers/air.png',  719*i*2, 0));
    //         backgroundArray.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png',  719*i*2, 0));
    //         backgroundArray.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png',  719*i*2, 0));
    //         backgroundArray.push(new BackgroundObject('./img/5_background/layers/1_first_layer/1.png',  719*i*2, 0));
    //     }
    //     return backgroundArray;
    // }



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
    this.checkCollisions();
    }

    
    setWorld(){
        this.character.world = this;
    }

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
               if(this.character.isColliding(enemy)){
                
                this.character.hit();
                console.log(this.character.energy);
                
               }
            })

        }, 200);
    };



    draw(){

        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        

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
            this.flipImage(moveableObject);
        }

        moveableObject.draw(this.ctx);

        moveableObject.drawFrame(this.ctx);

        if(moveableObject.otherDirection){
           this.flipImageBack(moveableObject);
        }

    }

    flipImage(moveableObject){
        this.ctx.save();
        this.ctx.translate(moveableObject.width, 0);
        this.ctx.scale(-1, 1);
        moveableObject.x = moveableObject.x * -1;
    }

    flipImageBack(moveableObject){
        this.ctx.restore();
        moveableObject.x = moveableObject.x * -1;
    }

}