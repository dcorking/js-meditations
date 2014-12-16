// Chess board version 2 - size is an argument
// bug : gives an even width board for odd size

// SPOILER WARNING
// A solution to Eloquent Javascript Chapter 2

// To use:
// require ("./chessboard.js")
// console.log(board)

var board = function (size) {
  var str = "";
  for (var i = 0; i < size ; i++){
    for (var j = 0; j < size ; j = j + 2){
      console.log("j = " + j + ". str = " + str)
      str += (i%2 == 0 ? "# " : " #")
    }
    str += "\n"
  }
  return str;
}(21)
