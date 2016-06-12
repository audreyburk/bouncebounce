width = 800;
height = 600;

left  = false;
right = false;
up    = false;
down  = false;
player = null;
balls  = [];
running = false;

// score by average size
// assuming we shrink over time

function init() {
  running = true;
  createThangs();
  window.requestAnimationFrame(run);
}

function run() {
  movePlayer();
  moveBalls();
  checkCollisions();
  draw();
  if(running){
    window.requestAnimationFrame(run);
  }
}

function createThangs() {
  player = {
    x: width/2,
    y: height/2,
    dx: 3,
    dy: 3,
    r: 20
  };

  for(let i = 0; i < 30; i++){
    balls.push({
      x: Math.floor(Math.random()*(width-20) + 10),
      y: Math.floor(Math.random()*(height-20) + 10),
      dx: Math.floor(Math.random()*4 - 2),
      dy: Math.floor(Math.random()*4 - 2),
      r: 20,
      color: (i % 2 === 0 ? "red" : "blue")
    });
  }
}

function movePlayer() {
  if(left && player.x > player.r){
    player.x -= player.dx;
  }
  if(right && player.x < (width - player.r)){
    player.x += player.dx;
  }
  if(down && player.y < (height - player.r)){
    player.y += player.dy;
  }
  if(up && player.y > player.r){
    player.y -= player.dy;
  }
}

function moveBalls() {
  balls.forEach(ball => {
    if((ball.dx > 0 && ball.x >= (width - ball.r)) || (ball.dx < 0 && ball.x <= ball.r)){
      ball.dx *= -1;
    }
    if((ball.dy > 0 && ball.y >= (height - ball.r)) || (ball.dy < 0 && ball.y <= ball.r)){
      ball.dy *= -1;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
  });
}

function checkCollisions() {
  length = balls.length;
  for(let i = 0; i < length; i++){
    if(haveCollided(balls[i], player)){
      hitPlayer(i);
      if (!balls[i]) continue;
    }
    for(let j = i+1; j < length; j++){
      if(j === i || !balls[j]) continue;
      if(haveCollided(balls[i], balls[j])) bounce(balls[i], balls[j]);
    }
  }
  balls = balls.filter( Boolean );
}

function haveCollided(a, b) {
  let x1 = a.x;
  let x2 = b.x;
  let y1 = a.y;
  let y2 = b.y;
  if(x1 < x2 + a.r + b.r &&
     x1 + b.r + a.r > x2 &&
     y1 < y2 + a.r + b.r &&
     b.r + a.r + y1 > y2){
       return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) ) <= (a.r + b.r);
  } else return false;
}

function bounce(a, b) {
  // console.log(`Hit!`);
}

function hitPlayer(num) {
  ball = balls[num];
  if (ball.color === "red"){
    document.getElementById("title").textContent = "You lose.";
    running = false;
  } else if (ball.color === "blue"){
    delete balls[num];
    player.r += 3;
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgb(50, 200, 255)';
  ctx.beginPath();
  ctx.ellipse(player.x, player.y, player.r, player.r, 0, 0, 6.2, false);
  ctx.fill();
  balls.forEach(ball => {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y, ball.r, ball.r, 0, 0, 6.2, false);
    ctx.fill();
  });
}
