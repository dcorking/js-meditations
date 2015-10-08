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

var BG = {}; // global container for game code

BG.canvas = document.getElementById("myCanvas");
BG.ctx = BG.canvas.getContext("2d");

BG.ball = {
  // position
  x: BG.canvas.width / 2,
  y: BG.canvas.height - 30,
  // velocity
  dx: 2,
  dy: -2,
  radius: 10
};

BG.ball.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD"
  ctx.fill();
  ctx.closePath();
  console.log(this);
};

BG.ball.step = function () {
  // collision with top - TODO poss. refactor to avoid referring
  // directly to BG ?
  // TODO ball is prone to getting stuck in the corners
  if (this.y - this.radius + this.dy < 0 ||
      this.y + this.radius + this.dy > BG.canvas.height ) {
        this.dy = - this.dy;
      };
  // collision with sides
  if (this.x - this.radius + this.dx < 0 ||
      this.x + this.radius + this.dy > BG.canvas.width ) {
    this.dx = - this.dx;
  };
  this.x += this.dx;
  this.y += this.dy;
};

// Draw the world, then update it
BG.draw = function () {
  // When setInterval invokes BG.draw, 'this' is the global object
  // so this doesn't refer to my game object
  // When I wrap the callback in setInterval to an anonymous function, so:
  //    function(){BG.draw()}
  // then 'this' does indeed become the game object.
  BG.ctx.clearRect(0, 0, BG.canvas.width, BG.canvas.height);
  BG.ball.draw(BG.ctx);
  BG.ball.step()
};

setInterval(
  function(){BG.draw()},
  30);
