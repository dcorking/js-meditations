// sum-a-range.js - The sum of a range

// SPOILER WARNING
// A solution to Eloquent Javascript Chapter 4

// range(start, end) - produces an array of all the integers from
// start up to and including end
var range = function (start, end, step) {
  var arr = [];
  if (! step) step = 1;
  for (var i = start;
       (step <0) ? (i >= end) : (i <= end);
       i += step){
    arr.push(i);
    }
  return arr;
  };

// myReduce(array, func, start)
//  my quick and dirty alternative to Array.prototype.reduce()
// not used - just for extra practice
var myReduce = function (arr, func, start){
  var accumulator = start;
  for (var i = 0; i < arr.length; i++){
    console.log (accumulator);
    accumulator = func(accumulator, arr[i]);
  }
  return accumulator;
}

// sum(array) - consumes an array of numbers, and produces their sum
var sum = function (arr) {
  return arr.reduce(function(a,b) {return a + b;}, 0);
  }

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
if (arrayNotEquals(range(10,9), [])) console.log ("range end too small FAILED");
if (arrayNotEquals(range(3,5), [3,4,5])) console.log ("range(3,5) FAILED");
if (arrayNotEquals(range(-2,3), [-2,-1,0,1,2,3])) console.log ("range(-2,3) FAILED");

if (sum([3,4,5]) != 12) console.log ("sum([3,4,5]) FAILED");
if (sum(range(1,10)) != 55) console.log ("sum(range(1,10)) FAILED");

// ranges in steps
if (arrayNotEquals(range(1, 10, 2), [1,3,5,7,9])) console.log ("range(1,10,2) FAILED");
if (arrayNotEquals(range(5, 2, -1), [5,4,3,2])) console.log ("range(5,2,-1) FAILED");
if (sum(range(5,9,2)) != 21) console.log ("sum(range(5,9,2)) FAILED");

console.log ("tests completed.");
