function Game() {
  this.width = 800;
  this.height = 600;

  this.canvas = new Canvas;
  this.player = new Player(this.canvas);
  this.balls = Ball.makeBalls(this.canvas, 20);

  this.score = 0;
  this.scores = Cookies.getJSON('scores') || [];

  this.running = true;
}

Game.init = function(){
  game = new Game;
  game.showScores();
  game.run();
};

Game.prototype.run = function () {
  this.draw();
  this.showCurrentScore();
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
    this.score++;
    this.player.r += 3;
  }
};

Game.prototype.draw = function() {
  this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.player.draw(this.canvas);
  this.balls.forEach(ball => ball.draw(this.canvas));
};

Game.prototype.showCurrentScore = function () {
  document.getElementById("currentScore").textContent = `SCORE: ${this.score}`;
};

Game.prototype.showScores = function () {
  let allScores = "";
  this.scores.forEach((score, i) => {
    allScores += `${i+1}: ${score}<br>`;
  });
  document.getElementById("scores").textContent = allScores;
};

Game.prototype.updateHighScores = function(){
  this.scores.push(this.score);
  this.scores = this.scores.sort((a, b) => a + b).slice(0, 10);
  Cookies.set('scores', this.scores);
}

Game.prototype.lose = function () {
  document.getElementById("currentScore").style.color = "red";
  this.updateHighScores();
  alert(Cookies.getJSON('scores'));
  this.showScores();
  this.running = false;
};
