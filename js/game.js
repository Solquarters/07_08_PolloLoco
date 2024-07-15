let canvas;
let world;
let keyboard = new Keyboard();
let lastInputTimer = new Date().getTime();




function init(){
   
    canvas = document.getElementById('canvasId');

    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    

    // console.log("My Character is", world.character);
    
    setTimeout(() => {
        world.draw();
      }, "15");

  
}







window.addEventListener("keydown", (event) => {
  if(event.keyCode == 39){
    keyboard.RIGHT = true;
  }
  if(event.keyCode == 37){
    keyboard.LEFT = true;
  }
  if(event.keyCode == 38){
    keyboard.UP = true;
  }
  if(event.keyCode == 40){
    keyboard.DOWN = true;
  }
  if(event.keyCode == 32){
    keyboard.SPACE = true;
  }
  if(event.keyCode == 68){
    keyboard.D = true;
  }
  lastInputTimer = new Date().getTime();
});


window.addEventListener("keyup", (event) => {

  console.log(event);
  if(event.keyCode == 39){
    keyboard.RIGHT = false;
  }
  if(event.keyCode == 37){
    keyboard.LEFT = false;
  }
  if(event.keyCode == 38){
    keyboard.UP = false;
    world.character.jumpAlreadyTriggered = false;
  }
  if(event.keyCode == 40){
    keyboard.DOWN = false;
  }
  if(event.keyCode == 32){
    keyboard.SPACE = false;
    world.character.jumpAlreadyTriggered = false;
  }
  if(event.keyCode == 68){
    keyboard.D = false;
  }


  
  
  
});

