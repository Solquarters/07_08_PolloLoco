let canvas;
let world;
let keyboard = new Keyboard();
let lastInputTimer = new Date().getTime();
let intervalIds = [];

let globalAudioArray = [ ];
let allAudioMutedBool = false;




let gameEndSound = new Audio("./sounds/Pollo Loco Sound/El Jarabe Tapatio-The Mexican Hat Dance.mp3");
globalAudioArray.push(gameEndSound);




////AUDIO MUTING 



function toggleAllAudio(){
  globalAudioArray.forEach(audio => {
    // audio.pause();
    audio.muted = !audio.muted;
});

if(allAudioMutedBool){
  document.getElementById('toggleAudioImgId').src = './img/icons8-lautsprecher-48.png';
}
else{
  document.getElementById('toggleAudioImgId').src = './img/icons8-kein-ton-48.png';
}

allAudioMutedBool = !allAudioMutedBool;

console.log(allAudioMutedBool);



}

////AUDIO MUTING END

function toggleInfoOverlay(){

  let overlay = document.getElementById('mainInfoOverlayId');
  if (overlay.style.display === 'flex') {
    // Fade out
    overlay.style.opacity = '0';
    // Wait for the opacity transition to finish before setting display to 'none'
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 500); // Match this time with the CSS transition duration
} else {
    // Set display to flex and then fade in
    overlay.style.display = 'flex';
    // Trigger a reflow to ensure the transition starts
    overlay.offsetHeight; // Forces a repaint to ensure the next step applies
    overlay.style.opacity = '1';
}
}




function init(event) {
  event.preventDefault();
  document.getElementById("startScreenMainDivId").style.display = "none";
  canvas = document.getElementById("canvasId");
  initLevel();
  world = new World(canvas, keyboard);
  ctx = canvas.getContext("2d");
  setTimeout(() => {
    world.draw();
  }, "15");

  if (window.innerWidth < 1025) {
    document.getElementById("mobileMainDivId").style.display = "flex";
  }


}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
  lastInputTimer = new Date().getTime();
});

window.addEventListener("keyup", (event) => {
  // console.log(event);
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
    world.character.jumpAlreadyTriggered = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
    world.character.jumpAlreadyTriggered = false;
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

function stopGame() {
  intervalIds.forEach(clearInterval);
  document.getElementById("gameStopOverlayId").style.display = "flex";
  gameEndSound.play();
}

function toggleFullscreen() {
  let fullscreenContainer = document.getElementById("canvasContainerId");
  if (
    !document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    enterFullscreen(fullscreenContainer);
  } else {
    exitFullscreen();
  }
}
// function enterFullscreen(element) {
//   if (element.requestFullscreen) {
//     element.requestFullscreen();
//   } else if (element.msRequestFullscreen) {
//     element.msRequestFullscreen();
//   } else if (element.webkitRequestFullscreen) {
//     element.webkitRequestFullscreen();
//   }
// }

// function exitFullscreen() {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.webkitRequestFullscreen) {
//     document.webkitRequestFullscreen();
//   }
// }

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen(); // For Firefox
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen(); // For Firefox
  }
}

///Prevent context menu popup on mobile devices
document.getElementById('canvasId').addEventListener('contextmenu', function(event) {
  event.preventDefault();
});
document.body.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});




///TEST POINTERDOWN EVENT
///IMPLEMENT CUSTOM LONG PRESS FUNCTIONALITY TO PREVENT CONTEXTMENU POPUP







//////////////MOBILE CONTROLS
document
  .getElementById("rightArrowId")
  .addEventListener("touchstart", (event) => {event.preventDefault(); keyboard.RIGHT = true;});

document
  .getElementById("rightArrowId")
  .addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.RIGHT = false;
  });

document
  .getElementById("leftArrowId")
  .addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
  });

document.getElementById("leftArrowId").addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.LEFT = false;
});

document
  .getElementById("shootButtonId")
  .addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.DOWN = true;
  });

document
  .getElementById("shootButtonId")
  .addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.DOWN = false;
  });

document
  .getElementById("jumpButtonId")
  .addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.SPACE = true;
    
  });

document
  .getElementById("jumpButtonId")
  .addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.SPACE = false;
    world.character.jumpAlreadyTriggered = false;
  });






  function checkOrientation() {
    // Check if the device is in portrait mode
    if (window.innerHeight > window.innerWidth && window.innerWidth < 800) {
        document.getElementById('turnMessageOverlayId').style.display = 'flex'; // Show overlay
    } else {
        document.getElementById('turnMessageOverlayId').style.display = 'none'; // Hide overlay
    }
}

// Add event listener for when the window is resized or orientation changes
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

// Initial check on page load
window.onload = checkOrientation;




