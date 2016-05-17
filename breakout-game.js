// Copyright Chris Mills
// https://developer.mozilla.org/en-US/profiles/chrisdavidmills,
// Mozilla Development Network and individual MDN contributors.
// Arbitrarily modified by David Corking.

// Unless otherwise indicated, the content is available under the
// terms of the Creative Commons Attribution-ShareAlike license
// (CC-BY-SA), v2.5 or any later version.
// http://creativecommons.org/licenses/by-sa/2.5/ --> Made by
// following the tutorial at
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

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
  speed: 3
};
BG.ball = {
  radius: 10
};
BG.wall = {
  rowCount: 3,
  columnCount: 5,
  offsetTop: 30,
  offsetLeft: 30
};
BG.wall.brick = {
  width: 75,
  height: 20,
  padding: 10
};

// bounce in the opposite Y direction, for example off a brick
BG.ball.bounceY = function () {
  this.dy = - this.dy;
};

BG.ball.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

BG.ball.step = function () {
  // TODO: poss. refactor to avoid referring
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
  // only one ball, so lose it and it's game over
  if (this.y + this.radius + this.dy > BG.canvas.height ) {
    BG.gameOver = true;
  };
  // collision with a brick
  BG.wall.collisionDetection(this);
  //move
  this.x += this.dx;
  this.y += this.dy;
};

BG.wall.collisionDetection = function(ball) {
  for(var c=0; c< BG.wall.columnCount; c++) {
    for(var r=0; r<BG.wall.rowCount; r++) {
      var brick = BG.wall.bricks[c][r];
      if (BG.wall.overlaps(ball, brick)) {
        BG.wall.bricks[c][r].visible = false;
        ball.bounceY();
      }
    }
  }
}

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

// build a 2D array of bricks to represent a wall
BG.wall.build = function () {
  for(var c=0; c < this.columnCount; c++) {
    this.bricks[c] = [];
    for(var r=0; r < this.rowCount; r++ ) {
      var brickX = (c * (this.brick.width + this.brick.padding)) +
            this.offsetLeft;
      var brickY = (r * (this.brick.height + this.brick.padding)) +
            this.offsetTop;
      this.bricks[c][r] = { x: 0, y: 0, visible: true };
      this.bricks[c][r].x = brickX;
      this.bricks[c][r].y = brickY;
    }
  }
};

// render a wall
BG.wall.draw = function (ctx) {
  for(var c=0; c < this.columnCount; c++) {
    for(var r=0; r < this.rowCount; r++) {
      if (this.bricks[c][r].visible) {
        var brickX = this.bricks[c][r].x;
        var brickY = this.bricks[c][r].y;
        ctx.beginPath();
        ctx.rect(brickX, brickY, this.brick.width, this.brick.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

// boolean
BG.wall.overlaps = function (ball, brick) {
  return (brick.visible &&
          ball.x > brick.x &&
          ball.x < (brick.x + BG.wall.brick.width) &&
          ball.y > brick.y &&
          ball.y < (brick.y + BG.wall.brick.height));
}

// Draw the world, then update it
BG.draw = function () {
  // When setInterval invokes BG.draw, 'this' is the global object
  // so this doesn't refer to my game object
  // When I wrap the callback in setInterval to an anonymous function, as:
  //    function(){BG.draw()}
  // then 'this' does indeed become the game object.

  if (! BG.gameOver) {
    BG.ctx.clearRect(0, 0, BG.canvas.width, BG.canvas.height);
    BG.wall.draw(BG.ctx);
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
// Main program                                       //
////////////////////////////////////////////////////////

// initialize game
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
// initialize wall
BG.wall.bricks = [];
BG.wall.build();

document.addEventListener("keydown", BG.keyDownHandler, false);
document.addEventListener("keyup", BG.keyUpHandler, false);

// repeatedly draw and update the world
BG.drawAction = window.setInterval(
  function(){BG.draw();},
  10);
