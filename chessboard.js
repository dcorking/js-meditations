// Chess board version 1 - 8x8 hard coded
// SPOILER WARNING
// A solution to Eloquent Javascript Chapter 2

// To use:
// require ("./chessboard.js")
// console.log(board)

var board = function () {
  var str = "";
  for (var i = 0; i < 8 ; i++){
    for (var j = 0; j < 8 ; j = j + 2){
      str += (i%2 == 0 ? "# " : " #")
    }
    str += "\n"
  }
  return str;
}()
