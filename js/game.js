let canvas;
let world;
let keyboard = new Keyboard();
let lastInputTimer = new Date().getTime();
let intervalIds = [];
let gameEndSound = new Audio('./sounds/Pollo Loco Sound/El Jarabe Tapatio-The Mexican Hat Dance.mp3');

function init(){
    canvas = document.getElementById('canvasId');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    setTimeout(() => {
        world.draw();
      }, "15");

      if(window.innerWidth < 1025){
        document.getElementById('mobileMainDivId').style.display = "flex";
      }
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

  // console.log(event);
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

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

function stopGame(){
  intervalIds.forEach(clearInterval);
  document.getElementById('gameStopOverlayId').style.display = "flex";
  gameEndSound.play();
 
}


function toggleFullscreen(){
  let fullscreenContainer = document.getElementById('canvasContainerId');
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    enterFullscreen(fullscreenContainer);
  } else {
    exitFullscreen();
  }
}
function enterFullscreen(element){
  if(element.requestFullscreen){
    element.requestFullscreen();
  }
  else if(element.msRequestFullscreen){
    element.msRequestFullscreen();
  }
  else if(element.webkitRequestFullscreen){
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen(){
  if(document.exitFullscreen){
    document.exitFullscreen();
  }else if(document.webkitRequestFullscreen){
    document.webkitRequestFullscreen();
  }
}



//////////////MOBILE CONTROLS
document.getElementById('rightArrowId').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyboard.RIGHT = true;
});

document.getElementById('rightArrowId').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById('leftArrowId').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyboard.LEFT = true;
});

document.getElementById('leftArrowId').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyboard.LEFT = false;
});



document.getElementById('shootButtonId').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyboard.DOWN = true;
});


document.getElementById('shootButtonId').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyboard.DOWN = false;
});




document.getElementById('shootButtonId').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyboard.D = true;
});

document.getElementById('shootButtonId').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyboard.D = false;
});

document.getElementById('jumpButtonId').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyboard.SPACE = true;
});

document.getElementById('jumpButtonId').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyboard.SPACE = false;
});


