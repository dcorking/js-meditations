// minimum.js - function to find minimum of 2 arguments

// SPOILER WARNING
// A solution to Eloquent Javascript Chapter 3

var minimum = function (a,b) { return a < b ? a : b}

if (minimum (5,6) != 5)
  console.log ("test 1 FAILED")
if (minimum (10,7) != 7)
  console.log ("test 2 FAILED")
if (minimum (8,8) != 8)
  console.log ("test 3 FAILED")
console.log ("tests completed.")
