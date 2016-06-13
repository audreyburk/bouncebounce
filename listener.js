keyStates = {};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);

function mouseDownHandler(e) {
    window.focus();
    e.preventDefault();
}

function keyDownHandler(e) {
  switch(e.keyCode){
    case 37: keyStates["left"]  = true; break;
    case 38: keyStates["up"]    = true; break;
    case 39: keyStates["right"] = true; break;
    case 40: keyStates["down"]  = true; break;
  }
}

function keyUpHandler(e) {
  switch(e.keyCode){
    case 37: keyStates["left"]  = false; break;
    case 38: keyStates["up"]    = false; break;
    case 39: keyStates["right"] = false; break;
    case 40: keyStates["down"]  = false; break;
  }
}
