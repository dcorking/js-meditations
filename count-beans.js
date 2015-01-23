// count-beans.js - two character counting functions
// countBs version 3, explicit for loop

// SPOILER WARNING
// A solution to Eloquent Javascript Chapter 3

// countBs(str) - number of upper case B's in string str
var countBs = function (s) {
  return countChar(s, "B");
  }

// countChar(str, c) - number of characters, c,in string str
var countChar = function (s, c) {
  var len = s.length;
  var count = 0; // counts c
  for (var i = 0; i < len; i++)
    if (s.charAt(i) == c)
      count++;
  return count;
}

// tests
if (countBs("BABBAGE") !=3) console.log("BABBAGE FAILED")
if (countBs("HOPPER") !=0) console.log("HOPPER (B) FAILED")
if (countBs("Bernard Cribbins") !=1) console.log("Bernard Cribbins FAILED")
if (countChar("LOVELACE", "L") !=2) console.log("LOVELACE FAILED")
if (countChar("HOPPER", "L") !=0) console.log("HOPPER (L) FAILED")
if (countChar("Lendl", "L") !=1) console.log("Lendl FAILED")
console.log ("tests completed.")
