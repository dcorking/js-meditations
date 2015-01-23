// count-beans.js - two character counting functions
// countBs version 2, uses countChar

// SPOILER WARNING
// A solution to Eloquent Javascript Chapter 3

// countBs(str) - number of upper case B's in string str
var countBs = function (s) {
  return countChar(s, "B");
  }

// countChar(str, c) - number of characters, c,in string str
var countChar = function (s, c) {
  // recursive implementation because it is fun and easy,
  // even though it fills up the stack
  var len = s.length;
  var capChar; // counts any c at the end of the string
  if (len == 0)
    return 0;
  if (s.charAt(len -1) == c)
    capChar = 1;
  else
    capChar = 0;
  return capChar + countChar(s.substr(0, s.length - 1), c);
}

// tests
if (countBs("BABBAGE") !=3) console.log("BABBAGE FAILED")
if (countBs("HOPPER") !=0) console.log("HOPPER (B) FAILED")
if (countBs("Bernard Cribbins") !=1) console.log("Bernard Cribbins FAILED")
if (countChar("LOVELACE", "L") !=2) console.log("LOVELACE FAILED")
if (countChar("HOPPER", "L") !=0) console.log("HOPPER (L) FAILED")
if (countChar("Lendl", "L") !=1) console.log("Lendl FAILED")
console.log ("tests completed.")
