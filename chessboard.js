// Chess board version 2 - size is an argument

// SPOILER WARNING
// A solution to Eloquent Javascript Chapter 2

// To use:
// Set the board size on line 22
// > eval (fs.readFileSync('./chessboard.js') + '');
// undefined
// > require ("./chessboard.js")
// > console.log(board)

var board = function (size) {
  var str = "";
  for (var i = 0; i < size ; i++){
    for (var j = 0; j < size ; j++){
      str += ((i+j)%2 == 0 ? "#" : " ");
    }
    str += "\n";
  }
  return str;
}(21);
