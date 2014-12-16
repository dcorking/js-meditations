// Version 2, Fizz, Buzz and FizzBuzz
// SPOILER WARNING
// Eloquent Javascript Chapter 2
for (var n = 1; n <= 100; n++) {
  console.log (function () {
    if (n % 3 == 0 && n% 5 == 0)
      return "FizzBuzz"
    else if (n % 3 == 0)
      return "Fizz"
    else if (n % 5 == 0)
      return "Buzz"
    else
      return String(n)
  }())}
