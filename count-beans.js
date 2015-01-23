// count-beans.js - two character counting functions
// countBs version 1 - self sufficient

// SPOILER WARNING
// A solution to Eloquent Javascript Chapter 3

// countBs(str) - number of upper case B's in string str
var countBs = function (s) {
  // recursive implementation because it is fun and easy,
  // even though it fills up the stack
  var len = s.length;
  var capB; // counts any capital B at the end of the string
  if (len == 0)
    return 0;
  if (s.charAt(len -1) == "B")
    capB = 1
  else
    capB = 0
  return capB + countBs(s.substr(0, s.length - 1));
  }

if (countBs("BABBAGE") !=3) console.log("BABBAGE FAILED")
if (countBs("HOPPER") !=0) console.log("HOPPER FAILED")
if (countBs("Bernard Cribbins") !=1) console.log("Bernard Cribbins FAILED")
console.log ("tests completed.")
