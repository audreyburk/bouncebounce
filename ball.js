function Ball(options) {
  this.x = options['x'];
  this.y = options['y'];
  this.dx = options['dx'];
  this.dy = options['dy'];
  this.r = options['r'];
  this.color = options['color'];
}

Ball.makeBalls = function(canvas, n) {
  let balls = [];
  const centerWidth = canvas.width/2;
  const centerHeight = canvas.height/2;
  for(let i = 0; i < n; i++){
    const dir1 = Math.floor(Math.random()*2) < 1 ? -1 : 1;
    const dir2 = Math.floor(Math.random()*2) < 1 ? -1 : 1;
    const dir3 = Math.floor(Math.random()*2) < 1 ? -1 : 1;
    const dir4 = Math.floor(Math.random()*2) < 1 ? -1 : 1;

    const xPos = centerWidth  + dir1 * Math.floor(Math.random()*(centerWidth - 70) + 50);
    const yPos = centerHeight + dir2 * Math.floor(Math.random()*(centerHeight - 70) + 50);

    const velocity = Math.floor(Math.random()*2) + 1;
    const angle = Math.floor(Math.random()*360);

    let ball = new Ball({
      x: xPos,
      y: yPos,
      dx: Math.cos(angle * (Math.PI / 180)) * velocity,
      dy: Math.sin(angle * (Math.PI / 180)) * velocity,
      r: 20,
      color: (i % 2 === 0 ? "blue" : "red")
    });
    balls.push(ball);
  }
  return balls;
};

Ball.prototype.move = function (canvas) {
  if((this.dx > 0 && this.x >= (canvas.width - this.r)) || (this.dx < 0 && this.x <= this.r)){
    this.dx *= -1;
  }
  if((this.dy > 0 && this.y >= (canvas.height - this.r)) || (this.dy < 0 && this.y <= this.r)){
    this.dy *= -1;
  }

  this.x += this.dx;
  this.y += this.dy;
};

Ball.prototype.hasCollidedWith = function (other) {
  let x1 = this.x;
  let x2 = other.x;
  let y1 = this.y;
  let y2 = other.y;
  if(x1 < x2 + this.r + other.r &&
    x1 + other.r + this.r > x2 &&
    y1 < y2 + this.r + other.r &&
    other.r + this.r + y1 > y2){
      return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) ) <= (this.r + other.r);
  } else return false;
};

Ball.prototype.draw = function (canvas) {
  canvas.ctx.fillStyle = this.color;
  canvas.ctx.beginPath();
  canvas.ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, 6.2, false);
  canvas.ctx.fill();
};
