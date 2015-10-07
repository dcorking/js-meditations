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

BG.redSquare = function (ctx){
  ctx.beginPath();
  ctx.rect(20, 40, 50, 50);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
  };

BG.redSquare(BG.ctx);

// draw a green disc with an anonymous function?
(function (ctx) {
  ctx.beginPath();
  ctx.arc(240, 160, 20, 0, Math.PI*2, false);
  ctx.fillStyle= "green";
  ctx.fill();
  ctx.closePath();
  })(BG.ctx);

// empty rectangle
BG.ctx.beginPath();
BG.ctx.rect(160, 10, 100, 40);
BG.ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
BG.ctx.stroke();
BG.ctx.closePath();
