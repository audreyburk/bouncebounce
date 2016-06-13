function Game() {
  this.width = 800;
  this.height = 600;

  this.canvas = new Canvas;
  this.player = new Player(this.canvas);
  this.balls = Ball.makeBalls(this.canvas, 30);

  this.startTime = Date.now();
  this.elapsedTime = 0;

  this.running = true;
}

Game.init = function(){
  game = new Game;
  console.log(this.balls);
  game.run();
};

Game.prototype.run = function () {
  this.draw();
  this.changeTime();
  this.showTime();
  this.player.accelerate();
  this.player.move(this.canvas);
  this.balls.forEach(ball => ball.move(this.canvas));
  this.checkCollisions();
  if(this.running){
    window.requestAnimationFrame(() => this.run());
  }
};

Game.prototype.checkCollisions = function() {
  balls = this.balls;
  length = balls.length;
  for(let i = 0; i < length; i++){
    if(balls[i].hasCollidedWith(this.player)){
      this.hitPlayer(i);
      if (!balls[i]) continue;
    }
    // for(let j = i+1; j < length; j++){
    //   if(j === i || !balls[j]) continue;
    //   if(haveCollided(balls[i], balls[j])) bounce(balls[i], balls[j]);
    // }
  }
  this.balls = balls.filter( Boolean );
};

Game.prototype.hitPlayer = function(num) {
  ball = this.balls[num];
  if (ball.color === "red"){
    this.lose();
  } else if (ball.color === "blue"){
    delete this.balls[num];
    this.player.r += 3;
  }
};

Game.prototype.draw = function() {
  this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.player.draw(this.canvas);
  this.balls.forEach(ball => ball.draw(this.canvas));
};

Game.prototype.changeTime = function () {
  this.elapsedTime = Math.floor((Date.now() - this.startTime)/1000);
};

Game.prototype.showTime = function () {
  const displayTime = Game.stringifyTime(this.elapsedTime);
  document.getElementById("time").textContent = displayTime;
};

Game.stringifyTime = function(time){
  const minutes = Math.floor(time/60);
  const seconds = time - minutes * 60;
  const minutesStr = ("0" + minutes).slice(-2);
  const secondsStr = ("0" + seconds).slice(-2);
  return `${minutesStr}:${secondsStr}`;
}

Game.prototype.lose = function () {
  document.getElementById("time").style.color = "red";
  this.running = false;
};
