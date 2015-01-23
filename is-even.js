// iseven.js - recursive function isEven to calculate inefficiently
// yet pleasingly if a positive integer is even

// SPOILER WARNING
// A solution to Eloquent Javascript Chapter 3

var isEven = function (n) {
  if (n==0)
    return true;
  if (n==1)
    return false;
  if (n < 0)
    return isEven(n + 2);
  else
    return isEven(n - 2);
}

if (isEven(9)) console.log ("+ve odd number FAILED")
if (!isEven(12)) console.log ("+ve even number FAILED")
if (isEven(-19)) console.log ("-ve odd number FAILED")
if (!isEven(-20)) console.log ("-ve even number FAILED")
console.log ("tests completed.")
