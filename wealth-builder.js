interestRate = 15  // in basis points, that is 15 is 1.5%
marginalTaxRate = 200 // 20%
nationalInsuranceRate = 0 // not in model

annualContribution = 300 // in pounds, before tax

yearsParticipation = 20 // years paying into plan

// simple interest, contribution at start of year
oneYearOutput = function (principal, contribution, interestRate) {
  return (principal + contribution) *  (1000 + interestRate) / 1000;
}

// compound interest, contribution at start of year, interest paid at
// end of year
nYearsOutput = function (n, principal, contribution, interestRate) {
  var sum = principal; // running total
  for(var i=0; i<n; i++) {
    sum = oneYearOutput(sum, contribution, interestRate);
    console.log(sum, i);
  };
  return sum;
}
