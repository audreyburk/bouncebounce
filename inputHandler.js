document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  switch(e.keyCode){
    case 37: left  = true; break;
    case 38: up    = true; break;
    case 39: right = true; break;
    case 40: down  = true; break;
  }
}

function keyUpHandler(e) {
  switch(e.keyCode){
    case 37: left  = false; break;
    case 38: up    = false; break;
    case 39: right = false; break;
    case 40: down  = false; break;
  }
}
