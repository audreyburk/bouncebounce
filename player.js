function Player(canvas) {
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.dx = 4;
  this.dy = 0;
  this.r = 20;
  this.maxVelocity = 3;
}

Player.prototype.accelerate = function(){
  if (keyStates["left"] && this.dx > -3.5) this.dx -= 0.1;
  if (keyStates["right"] && this.dx < 3.5) this.dx += 0.1;
  if (keyStates["up"] && this.dy > -3.5) this.dy -= 0.1;
  if (keyStates["down"] && this.dy < 3.5) this.dy += 0.1;

  if (this.dx !== 0 && !(keyStates["left"] || keyStates["right"])){
    this.dx += ( this.dx > 0 ? -0.02 : 0.02 );
  }
  if (this.dy !== 0 && !(keyStates["up"] || keyStates["down"])){
    this.dy += ( this.dy > 0 ? -0.02 : 0.02 );
  }
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
