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

// initialize ball
BG.ball = {
  // position
  x: BG.canvas.width / 2,
  y: BG.canvas.height - 30,
  // velocity
  dx: 2,
  dy: -2,
};

BG.ball.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

BG.ball.step = function () {
  // collision with top - TODO poss. refactor to avoid referring
  // directly to BG ?
  if (this.y - this.radius + this.dy < 0 ||
      this.y + this.radius + this.dy > BG.canvas.height ) {
        this.dy = - this.dy;
      };
  // collision with sides
  if (this.x - this.radius + this.dx < 0 ||
      this.x + this.radius + this.dx > BG.canvas.width ) {
    this.dx = - this.dx;
  };
  this.x += this.dx;
  this.y += this.dy;
};

// constants
BG.ball.radius = 10;
BG.paddle = {
  height: 10,
  width: 75,
  speed: 3};

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
  console.log("arrow keys: " + BG.rightPressed + BG.leftPressed);
  BG.ctx.clearRect(0, 0, BG.canvas.width, BG.canvas.height);
  BG.ball.draw(BG.ctx);
  BG.ball.step();
  BG.paddle.draw(BG.ctx);
  BG.paddle.step();
};

////////////////////////////////////////////////////////
// Main program
////////////////////////////////////////////////////////

document.addEventListener("keydown", BG.keyDownHandler, false);
document.addEventListener("keyup", BG.keyUpHandler, false);

// paddle starts in middle
BG.paddle.x = (BG.canvas.width - BG.paddle.width ) / 2;

setInterval(
  function(){BG.draw();},
  5);
