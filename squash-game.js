// Copyright 2015 David Corking, Chris Mills,
// Mozilla Development Network and individual MDN contributors.

// Unless otherwise indicated, the content is available under the
// terms of the Creative Commons Attribution-ShareAlike license
// (CC-BY-SA), v2.5 or any later version.
// http://creativecommons.org/licenses/by-sa/2.5/

// Adapted from the tutorial at
// https://developer.mozilla.org/en-US/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript

// ********************************
// *****1 PLAYER SQUASH GAME*******
// ********************************

// global singleton to contain game
var sg = {
  rightPressed: false,
  leftPressed: false
};

// event handlers must be defined before they are registered
sg.keyDownHandler = function (e) {
  if(e.keyCode == 39) {
    sg.rightPressed = true;
  }
  else if(e.keyCode == 37) {
    sg.leftPressed = true;
  }
  else if(e.keyCode == 32) {
    sg.paused = ! sg.paused;
  };
};

sg.keyUpHandler = function (e) {
  if(e.keyCode == 39) {
    sg.rightPressed = false;
  }
  else if(e.keyCode == 37) {
    sg.leftPressed = false;
  };
};

sg.canvas = document.getElementById("myCanvas");
sg.ctx = sg.canvas.getContext("2d");

// constants
sg.paddle = {
  height: 10,
  width: 75,
  speed: 3};
sg.ball = {
  radius: 10};
//initialize game
sg.score = 0;
sg.paused = false;
sg.gameOver = false; // the game never ends
// initialize ball
sg.ball.initialize = function () {
  // velocity
  sg.ball.dx = 2;  // rightwards
  sg.ball.dy = -2; // upwards
  // position
  sg.ball.x = sg.canvas.width / 2;
  sg.ball.y = sg.canvas.height - sg.paddle.height - sg.ball.radius + sg.ball.dy;
};
sg.ball.initialize();

// paddle starts in middle
sg.paddle.x = (sg.canvas.width - sg.paddle.width ) / 2;


sg.ball.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

sg.ball.step = function () {
  // TODO poss. refactor to avoid referring
  // directly to sg
  //////////////////////////////
  // collision with top
  if (this.y - this.radius + this.dy < 0) {
    this.dy = - this.dy;
  };
  // collision with paddle - y too big
  if ((this.y + this.radius + this.dy + sg.paddle.height >
      sg.canvas.height)    &&
      this.x > sg.paddle.x &&
      this.x - sg.paddle.x < sg.paddle.width) {
    this.dy = - this.dy;
  };
  // collision with sides
  if (this.x - this.radius + this.dx < 0 ||
      this.x + this.radius + this.dx > sg.canvas.width ) {
    this.dx = - this.dx;
  };
  // lose the ball and lose a point
  if (this.y + this.radius + this.dy > sg.canvas.height ) {
    sg.score -= 1;
    // TODO pause

    // restart ball
    this.initialize();
    };
  //move
  this.x += this.dx;
  this.y += this.dy;
};


sg.paddle.draw = function (ctx) {
  ctx.beginPath();
  ctx.rect(this.x,
           sg.canvas.height - this.height,
           this.width, this.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

sg.paddle.step = function () {
  if (sg.rightPressed && this.x + this.width < sg.canvas.width ) {
    this.x += this.speed;
  };
  if (sg.leftPressed && this.x > 0) {
    this.x -= this.speed;
  };
};

sg.walls = {
  width: 10
};
sg.walls.draw = function (ctx) {
  ctx.beginPath();
  ctx.rect(0, 0, this.width, sg.canvas.height);
  ctx.rect(0, 0, sg.canvas.width, this.width);
  ctx.rect(sg.canvas.width - this.width, 0,
           sg.canvas.width, sg.canvas.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

// Draw the world, then update it
sg.draw = function () {
  // When setInterval invokes sg.draw, 'this' is the global object
  // so this doesn't refer to my game object
  // When I wrap the callback in setInterval to an anonymous function, so:
  //    function(){sg.draw()}
  // then 'this' does indeed become the game object.

  if (! sg.gameOver) {
    sg.ctx.clearRect(0, 0, sg.canvas.width, sg.canvas.height);
    sg.walls.draw(sg.ctx);
    sg.ball.draw(sg.ctx);
    (! sg.paused) && sg.ball.step();
    sg.paddle.draw(sg.ctx);
    sg.paddle.step();
  }
  else {
    window.clearInterval(sg.drawAction); // stop the world
    document.write ("<p>Game over!</p><p>Reload page to play again.</p>");
  };
};

var displayScore = function () {
  // TODO
};

////////////////////////////////////////////////////////
// Main program
////////////////////////////////////////////////////////

document.addEventListener("keydown", sg.keyDownHandler, false);
document.addEventListener("keyup", sg.keyUpHandler, false);

// repeatedly draw and update the world
sg.drawAction = window.setInterval(
  function(){
    sg.draw();
    displayScore();
  },
  5);
