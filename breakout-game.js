// Copyright Chris Mills
// https://developer.mozilla.org/en-US/profiles/chrisdavidmills,
// Mozilla Development Network and individual MDN contributors.
// Arbitrarily modified by David Corking.

// Unless otherwise indicated, the content is available under the
// terms of the Creative Commons Attribution-ShareAlike license
// (CC-BY-SA), v2.5 or any later version.
// http://creativecommons.org/licenses/by-sa/2.5/ --> Made by
// following the tutorial at
// https://developer.mozilla.org/en-US/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript

// global singleton to contain game
var BG = {
  rightPressed: false,
  leftPressed: false
};

// event handlers must be defined before they are registered
BG.keyDownHandler = function (e) {
  if(e.keyCode == 39) {
    BG.rightPressed = true;
  }
  else if(e.keyCode == 37) {
    BG.leftPressed = true;
  }
};

BG.keyUpHandler = function (e) {
  if(e.keyCode == 39) {
    BG.rightPressed = false;
  }
  else if(e.keyCode == 37) {
    BG.leftPressed = false;
  }
};

BG.canvas = document.getElementById("myCanvas");
BG.ctx = BG.canvas.getContext("2d");

// constants
BG.paddle = {
  height: 10,
  width: 75,
  speed: 3};
BG.ball = {
  radius: 10};
//initialize game
BG.score = 0;
BG.gameOver = false;
// initialize ball
// velocity
BG.ball.dx = 2;  // rightwards
BG.ball.dy = -2; // upwards
// position
BG.ball.x = BG.canvas.width / 2;
BG.ball.y = BG.canvas.height - BG.paddle.height - BG.ball.radius + BG.ball.dy;
// paddle starts in middle
BG.paddle.x = (BG.canvas.width - BG.paddle.width ) / 2;


BG.ball.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

BG.ball.step = function () {
  // TODO poss. refactor to avoid referring
  // directly to BG ?
  // collision with top
  if (this.y - this.radius + this.dy < 0) {
    this.dy = - this.dy;
  };
  // collision with paddle - y too big
  if ((this.y + this.radius + this.dy + BG.paddle.height >
      BG.canvas.height)    &&
      this.x > BG.paddle.x &&
      this.x - BG.paddle.x < BG.paddle.width) {
    this.dy = - this.dy;
  };
  // collision with sides
  if (this.x - this.radius + this.dx < 0 ||
      this.x + this.radius + this.dx > BG.canvas.width ) {
    this.dx = - this.dx;
  };
  //only one ball, so lose it and it's game over
  if (this.y + this.radius + this.dy > BG.canvas.height ) {
    BG.gameOver = true
    };
  //move
  this.x += this.dx;
  this.y += this.dy;
};


BG.paddle.draw = function (ctx) {
  ctx.beginPath();
  ctx.rect(this.x,
           BG.canvas.height - this.height,
           this.width, this.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

BG.paddle.step = function () {
  if (BG.rightPressed && this.x + this.width < BG.canvas.width ) {
    this.x += this.speed;
  };
  if (BG.leftPressed && this.x > 0) {
    this.x -= this.speed;
  };
};

// Draw the world, then update it
BG.draw = function () {
  // When setInterval invokes BG.draw, 'this' is the global object
  // so this doesn't refer to my game object
  // When I wrap the callback in setInterval to an anonymous function, so:
  //    function(){BG.draw()}
  // then 'this' does indeed become the game object.

  if (! BG.gameOver) {
  BG.ctx.clearRect(0, 0, BG.canvas.width, BG.canvas.height);
  BG.ball.draw(BG.ctx);
  BG.ball.step();
  BG.paddle.draw(BG.ctx);
  BG.paddle.step();
    }
  else {
    window.clearInterval(BG.drawAction); // stop the world
    document.write ("<p>Game over!</p><p>Reload page to play again.</p>");
  };
};

////////////////////////////////////////////////////////
// Main program
////////////////////////////////////////////////////////

document.addEventListener("keydown", BG.keyDownHandler, false);
document.addEventListener("keyup", BG.keyUpHandler, false);

// repeatedly draw and update the world
BG.drawAction = window.setInterval(
  function(){BG.draw();},
  5);
