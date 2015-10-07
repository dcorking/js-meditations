var BG = {} // global container for game code

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

// draw a green disc immediately
// and in an overly fussy style: do I really need
// an immediately invoked anonymous function?
// I am just glad I got the parens in the right place
// to get this to compile
(function (ctx) {
  ctx.beginPath();
  ctx.arc(240, 160, 20, 0, Math.PI*2, false);
  ctx.fillStyle= "green";
  ctx.fill();
  ctx.closePath();
  })(BG.ctx);
