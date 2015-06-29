// reverse-array.js

// SPOILER WARNING
// A solution to Eloquent Javascript Chapter 4

// reverseArray(arr) - produces a new array in reverse
// order of its argument
var reverseArray = function (a) {
  var result = [];
  var len = a.length;
  for (var i = 0; i < len; i++) {
    result[i] = a[len - i - 1];
  };
  return result;
};

// ** Testing ** //

// arrayEquals(a,b) is true iff all corresponding elements of a and b
// are equal
var arrayEquals = function (a, b) {
  var len = a.length;
  if (len != b.length)
    return false;
  if (a === []) return true;
  for (var i = 0; i < len; i++){
    if (a[i] != b[i])
      return false;
    }
  return true;
  };

var arrayNotEquals = function (a, b) {
  return ! arrayEquals(a, b);
  }

if (!(arrayEquals([], []))) console.log ("test [] == [] FAILED");
if (!(arrayEquals([1,2,3],[1,2,3]))) console.log ("arrayEquals for equal arrays FAILED");
if (arrayEquals([1,2,4],[1,2,3])) console.log ("arrayEquals for unequal arrays FAILED");
if (arrayEquals([1,2],[1,2,3])) console.log ("arrayEquals for unequal length arrays FAILED");

if (arrayNotEquals(reverseArray([1,2,3]), [3,2,1])) console.log ("reverseArray for 3 elements FAILED");
if (arrayNotEquals(reverseArray([]), [])) console.log ("reverseArray for empty array FAILED");
// test if it leaves the original array unharmed
var foo = [5,7,9];
var bar = reverseArray(foo);
if (arrayNotEquals(foo, [5,7,9])) console.log ("reverseArray doesn't mutate its argument FAILED");
console.log ("tests completed.");
