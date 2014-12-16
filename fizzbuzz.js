// Version 1, Fizz, buzz but not fizzbuzz.
// SPOILER WARNING -
// Eloquent Javascript Chapter 2
for (var n = 1; n <= 100; n++) {
  console.log (function () {
    if (n % 3 == 0)
      return "Fizz"
    else if (n % 5 == 0)
      return "Buzz"
    else
      return String(n)
  }())}
