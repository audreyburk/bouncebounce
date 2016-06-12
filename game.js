function Game() {
  this.width = 800;
  this.height = 600;

  this.canvas = new Canvas;
  this.player = new Player(this.canvas);
  this.balls = Ball.makeBalls(this.canvas, 30);

  this.running = true;
}

Game.init = function(){
  game = new Game;
  console.log(this.balls);
  game.run();
};

Game.prototype.run = function () {
  this.draw();
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
    document.getElementById("title").textContent = "You lose.";
    this.running = false;
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



// score by average size
// assuming we shrink over time

// function bounce(a, b) {
//   // maaaaaaaaaaaaaath
// }
