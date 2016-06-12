function Player(canvas) {
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.dx = 2;
  this.dy = 0;
  this.r = 20;
  this.maxVelocity = 0;
}

// if max velocity and two directions, hold course
// if max velocity and one direction, adjust angle
// if < max velocity, adjust direction and increase velocity
//   also gotta count for direction though
//   if max velocity other direction, adjust direction and decrease velocity



Player.prototype.accelerate = function(){
  // Math.hypot
  let velocity = Math.sqrt( Math.pow(this.dx, 2) + Math.pow(this.dy, 2) );
  let theta = Math.atan2(this.dy, this.dx);
  let angle = theta *= 180 / Math.PI;
  console.log(angle);

  if (velocity >= this.maxVelocity){
    if (keyStates["left"]){
      if (this.dx <= 0){
        let sign = Math.sign(angle);
        angle += 2 * sign;
      } else {
        velocity -= 0.1 * (this.dx/this.maxVelocity);
      }
    }
    if (keyStates["right"]){
      if (this.dx >= 0){
        let sign = Math.sign(0 - angle);
        angle += 2 * sign;
      } else {
        velocity -= 0.1 * (this.dx/this.maxVelocity);
      }
    }
    if (keyStates["up"]){
      if (this.dy <= 0){
        let sign = Math.sign(-90 - angle);
        angle += 2 * sign;
      } else {
        velocity -= 0.1 * (this.dy/this.maxVelocity);
      }
    }
    if (keyStates["down"]){
      if (this.dy >= 0){
        let sign = Math.sign(90 - angle);
        angle += 2 * sign;
      } else {
        velocity -= 0.1 * (this.dy/this.maxVelocity);
      }
    }
  } else {
    velocity+=.1;
  }
  this.dx = Math.cos(angle * (Math.PI / 180)) * velocity;
  this.dy = Math.sin(angle * (Math.PI / 180)) * velocity;
};

Player.prototype.move = function(canvas){
  if (this.dx < 0){
    if (this.x > this.r){
      this.x += this.dx;
    } else this.dx *= -1;
  } else if (this.dx > 0){
    if (this.x < (canvas.width - this.r)){
      this.x += this.dx;
    } else this.dx *= -1;
  }

  if (this.dy < 0){
    if(this.y > this.r){
      this.y += this.dy;
    } else this.dy *= -1;
  } else if (this.dy > 0){
    if(this.y < (canvas.height - this.r)){
      this.y += this.dy;
    } else this.dy *= -1;
  }
};

Player.prototype.draw = function (canvas) {
  canvas.ctx.fillStyle = 'rgb(50, 200, 255)';
  canvas.ctx.beginPath();
  canvas.ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, 6.2, false);
  canvas.ctx.fill();
};

// old acceleration:
// if (keyStates["left"] && this.dx > -3.5) this.dx -= 0.1;
// if (keyStates["right"] && this.dx < 3.5) this.dx += 0.1;
// if (keyStates["up"] && this.dy > -3.5) this.dy -= 0.1;
// if (keyStates["down"] && this.dy < 3.5) this.dy += 0.1;
//
// if (this.dx !== 0 && !(keyStates["left"] || keyStates["right"])){
//   this.dx += ( this.dx > 0 ? -0.02 : 0.02 );
// }
// if (this.dy !== 0 && !(keyStates["up"] || keyStates["down"])){
//   this.dy += ( this.dy > 0 ? -0.02 : 0.02 );
// }
