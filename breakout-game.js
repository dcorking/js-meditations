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
  dy: -2
};

BG.ball.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD"
  ctx.fill();
  ctx.closePath();
}

BG.ball.step = function () {
  this.x += this.dx;
  this.y += this.dy;
}

BG.draw = function () {
  BG.ctx.clearRect(0, 0, BG.canvas.width, BG.canvas.height);
  BG.ball.draw(BG.ctx);
  BG.ball.step()
}

setInterval(BG.draw, 10);
