const isNotNumeric = (value) => {
  return /^[+-]?\d+(\.\d+)?$/.test(value);
};

const toFixed = (x) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
};

const calculateFV = (rate, nper, pmt, pv) => {
  if (rate > 0) {
    let fv =
      pv * Math.pow(1 + rate, nper) +
      pmt * ((Math.pow(1 + rate, nper) - 1) / rate);
    return fv;
  } else {
    let fv = pv + pmt * nper;
    return fv;
  }
};

const calculatePv = (rate, nper, pmt, fv = 0) => {
  if (rate === 0) {
    return fv + pmt * nper;
  } else {
    let pv =
      pmt * ((1 - Math.pow(1 + rate, -nper)) / rate) +
      fv / Math.pow(1 + rate, nper);
    return pv;
  }
};

const calculateExcelPmt = (rate, nper, pv, fv = 0) => {
  if (nper === 0) {
    return 0;
  } else if (rate === 0) {
    return -(pv + fv) / nper;
  } else {
    var pmt = (rate * pv) / (1 - Math.pow(1 + rate, -nper));
    return pmt;
  }
};

const calculatePmt = (rate, nper, pv, fv = 0) => {
  if (nper === 0) {
    return 0;
  } else if (rate === 0) {
    return -(pv + fv) / nper;
  } else {
    var pmt = (rate * (pv + fv)) / (Math.pow(1 + rate, nper) - 1);
    return pmt;
  }
};

const calculateGoalInvestBtn = (
  currentAge,
  destinationAge,
  corpus,
  rate,
  inflation,
  amountInvest
) => {
  let futureCost = Math.round(
    calculateFV(inflation, destinationAge - currentAge, 0, corpus)
  );
  let investAppAmt = Math.round(
    calculateFV(rate, destinationAge - currentAge, 0, amountInvest)
  );
  let deficitCorpus = futureCost - investAppAmt;
  let lumpSumAmt = Math.round(
    calculatePv(rate, destinationAge - currentAge, 0, deficitCorpus)
  );
  let monthlyInvestReqd = Math.round(
    calculatePmt(
      rate / 12,
      (destinationAge - currentAge) * 12,
      0,
      deficitCorpus
    )
  );
  return {
    futureCost,
    investAppAmt,
    deficitCorpus,
    lumpSumAmt,
    monthlyInvestReqd,
  };
};

const calculateRetirementGoal = (
  currentAge,
  retirementAge,
  inflation,
  monthlyExpense,
  preRetirementReturn,
  postRetirementReturn,
  lifeExpectancy
) => {
  let monthlyRequirementAtRetirement = calculateFV(
    inflation,
    retirementAge - currentAge,
    0,
    monthlyExpense
  );
  let corpusAtRetirement = calculatePv(
    postRetirementReturn / 12,
    (lifeExpectancy - retirementAge) * 12,
    monthlyRequirementAtRetirement
  );
  let monthlySIPAmtForInvestment = calculatePmt(
    preRetirementReturn / 12,
    (retirementAge - currentAge) * 12,
    0,
    corpusAtRetirement
  );
  return {
    monthlyRequirementAtRetirement,
    corpusAtRetirement,
    monthlySIPAmtForInvestment,
  };
};

const calculateSIPReturn = (
  rate,
  principal,
  years,
  step_up = 0,
  inflation = 0,
  lump_sum = false
) => {
  let result = 0;
  if (!lump_sum) {
    let month = years * 12;
    let monthlyReturn = 0;
    for (i = 0; i < month; i++) {
      monthlyReturn =
        (principal + (i > 12 ? step_up : 0) + monthlyReturn) *
        (1 + (rate - inflation) / 12);
    }
    result = monthlyReturn;
  } else {
    result = principal * (1 + (rate - inflation)) ** years;
  }
  return result;
};

const calculateTotalReturnWithLumpSumAndSIP = (
  initial_lumpsum,
  principal,
  rate,
  years,
  inflation = 0
) => {
  return calculateFV(
    (rate - inflation) / 12,
    years * 12,
    principal,
    initial_lumpsum
  );
};

const calculateRequiredSipAmt = (
  currentAge,
  retirementAge,
  currentRate,
  inflation,
  monthlyExpense,
  assumedFutureReturn,
  assumedFutureInflation,
  residualAmt
) => {
  let amountReqdMonthly = calculateFV(
    inflation,
    retirementAge - currentAge,
    0,
    monthlyExpense
  );
  let reqdCapital = calculatePv(
    (assumedFutureReturn - assumedFutureInflation) / 12,
    12 * (90 - retirementAge),
    amountReqdMonthly,
    residualAmt
  );
  let reqdSIPAmt = calculatePmt(
    (currentRate - inflation) / 12,
    12 * (retirementAge - currentAge),
    0,
    reqdCapital
  );
  return { amountReqdMonthly, reqdCapital, reqdSIPAmt };
};

const calculateDifferentialReturnsByAge = (
  currentAge,
  retirementAge,
  corpus,
  rate,
  inflation = 0
) => {
  let currentYr = calculatePmt(
    (rate - inflation) / 12,
    (retirementAge - currentAge) * 12,
    0,
    corpus
  );
  let prevTenYr = calculatePmt(
    (rate - inflation) / 12,
    (retirementAge - (currentAge - 10)) * 12,
    0,
    corpus
  );
  let nextTenYr = calculatePmt(
    (rate - inflation) / 12,
    (retirementAge - (currentAge + 10)) * 12,
    0,
    corpus
  );
  return { prevTenYr, currentYr, nextTenYr };
};

const calculateRetirementPortfolio = (
  ppfAmt,
  ppfRate,
  pfAmt,
  pfRate,
  postalAmt,
  postalRate,
  bankAmt,
  bankRate,
  cdAmt,
  cdRate,
  insureAmt,
  insureRate,
  equityAmt,
  equityRate,
  debtAmt,
  debtRate,
  sipAmt,
  sipRate,
  rdAmt,
  rdRate,
  currentAge,
  swpRate,
  retirementAge,
  inflationRate
) => {
  let finalVal = 0;
  let finalSWP = 0;
  let retirementTracker = {};
  for (let i = 0; i < retirementAge - currentAge; i++) {
    if (i == 0) {
      retirementTracker["ppf"] = [
        calculateFV(ppfRate - inflationRate, 1, 0, ppfAmt),
      ];
      retirementTracker["pf"] = [
        calculateFV(pfRate - inflationRate, 1, 0, pfAmt),
      ];
      retirementTracker["postal"] = [
        calculateFV(postalRate - inflationRate, 1, 0, postalAmt),
      ];
      retirementTracker["bank"] = [
        calculateFV(bankRate - inflationRate, 1, 0, bankAmt),
      ];
      retirementTracker["cd"] = [
        calculateFV(cdRate - inflationRate, 1, 0, cdAmt),
      ];
      retirementTracker["insure"] = [
        calculateFV(insureRate - inflationRate, 1, 0, insureAmt),
      ];
      retirementTracker["equity"] = [
        calculateFV(equityRate - inflationRate, 1, 0, equityAmt),
      ];
      retirementTracker["debt"] = [
        calculateFV(debtRate - inflationRate, 1, 0, debtAmt),
      ];
      retirementTracker["sip"] = [
        calculateFV((sipRate - inflationRate) / 12, (i + 1) * 12, sipAmt, 0),
      ];
      retirementTracker["rd"] = [
        calculateFV((rdRate - inflationRate) / 12, (i + 1) * 12, rdAmt, 0),
      ];
    } else {
      retirementTracker["ppf"].push(
        calculateFV(
          ppfRate - inflationRate,
          1,
          0,
          retirementTracker["ppf"][i - 1]
        )
      );
      retirementTracker["pf"].push(
        calculateFV(
          pfRate - inflationRate,
          1,
          0,
          retirementTracker["pf"][i - 1]
        )
      );
      retirementTracker["postal"].push(
        calculateFV(
          postalRate - inflationRate,
          1,
          0,
          retirementTracker["postal"][i - 1]
        )
      );
      retirementTracker["bank"].push(
        calculateFV(
          bankRate - inflationRate,
          1,
          0,
          retirementTracker["bank"][i - 1]
        )
      );
      retirementTracker["cd"].push(
        calculateFV(
          cdRate - inflationRate,
          1,
          0,
          retirementTracker["cd"][i - 1]
        )
      );
      retirementTracker["insure"].push(
        calculateFV(
          insureRate - inflationRate,
          1,
          0,
          retirementTracker["insure"][i - 1]
        )
      );
      retirementTracker["equity"].push(
        calculateFV(
          equityRate - inflationRate,
          1,
          0,
          retirementTracker["equity"][i - 1]
        )
      );
      retirementTracker["debt"].push(
        calculateFV(
          debtRate - inflationRate,
          1,
          0,
          retirementTracker["debt"][i - 1]
        )
      );
      retirementTracker["sip"].push(
        calculateFV((sipRate - inflationRate) / 12, (i + 1) * 12, sipAmt, 0)
      );
      retirementTracker["rd"].push(
        calculateFV((rdRate - inflationRate) / 12, (i + 1) * 12, rdAmt, 0)
      );
    }
  }
  for (let scheme in retirementTracker) {
    finalVal += retirementTracker[scheme][retirementAge - currentAge - 1];
  }
  finalSWP = (swpRate * finalVal) / 12;
  return { finalVal, finalSWP };
};

const distributorCommissionCalc = (sipAmt, sipRate, commissionRate, time) => {
  let val = [];
  for (let i = 0; i < time; i++) {
    let info = {};
    info["aum"] = calculateFV(sipRate / 12, (i + 1) * 12, sipAmt, 0);
    info["commission"] = commissionRate * info["aum"];
    val.push(info);
  }
  let dict = {};
  let totalCommission = 0;
  dict["val"] = val;
  for (let info in val) {
    totalCommission += val[info]["commission"];
  }
  dict["totalCommission"] = totalCommission;
  return dict;
};

const diffBetweenInsuranceAndSIPCommission = (
  investAmt,
  avgInsureCommission,
  capApprRate,
  trail,
  time
) => {
  let val = [];
  for (let i = 0; i < time; i++) {
    let info = {};
    info["insurance_paid_amount"] = avgInsureCommission * investAmt;
    if (i == 0) {
      info["cap_appreciation"] = capApprRate * investAmt;
      info["cumulative_value"] = investAmt + info["cap_appreciation"];
    } else {
      info["cap_appreciation"] =
        (investAmt + val[i - 1]["cumulative_value"]) * capApprRate;
      info["cumulative_value"] =
        val[i - 1]["cumulative_value"] + investAmt + info["cap_appreciation"];
    }
    info["upfront_tail"] = trail * info["cumulative_value"];
    val.push(info);
  }
  let totalInsureCommission = 0;
  let totalUpfrontTrail = 0;
  for (let i = 0; i < val.length; i++) {
    console.log(val[i]);
    totalInsureCommission += val[i]["insurance_paid_amount"];
    totalUpfrontTrail += val[i]["upfront_tail"];
  }
  return { totalInsureCommission, totalUpfrontTrail };
};

const revenueModelSIPAndOneTimeBookSize = (
  sipBookSize,
  investRate,
  commissionRate,
  equityAum,
  time
) => {
  let sipBookSizeFutureValue = 0;
  let sipBookSizeCommission = 0;
  let equityAUMFutureValue = 0;
  let equityAUMCommission = 0;
  let grossCommission = 0;
  for (let i = 0; i < time; i++) {
    sipBookSizeFutureValue = calculateFV(
      investRate / 12,
      (i + 1) * 12,
      sipBookSize,
      0
    );
    sipBookSizeCommission = commissionRate * sipBookSizeFutureValue;
    equityAUMFutureValue = calculateFV(investRate, i + 1, 0, equityAum);
    equityAUMCommission = commissionRate * equityAUMFutureValue;
    grossCommission += sipBookSizeCommission + equityAUMCommission;
  }
  return grossCommission;
};

const calculateEMIVersusSIP = (
  houseValue,
  selfFunding,
  loanRate,
  loanPeriod,
  housingInflation,
  monthlyRent = (0.03 / 12) * houseValue,
  sipGrowthRate = 0.12
) => {
  let bankFunding = Math.round(houseValue - selfFunding);
  let emiAmt = Math.round(
    calculateExcelPmt(loanRate / 12, loanPeriod * 12, bankFunding)
  );
  let totalLoanPayment = Math.round(12 * emiAmt * loanPeriod);
  let loanInterestPaid = Math.round(totalLoanPayment - bankFunding);
  let emiPaymentBalance = Math.round(emiAmt - monthlyRent);
  let sipInvestFV = Math.round(
    calculateFV(sipGrowthRate / 12, loanPeriod * 12, emiPaymentBalance, 0)
  );
  let houseCostFV = Math.round(
    calculateFV(housingInflation, loanPeriod, 0, houseValue)
  );
  let profitSIPInvest = Math.round(sipInvestFV - houseCostFV);
  return {
    bankFunding,
    emiAmt,
    totalLoanPayment,
    loanInterestPaid,
    emiPaymentBalance,
    sipInvestFV,
    houseCostFV,
    profitSIPInvest,
    monthlyRent,
  };
};

const humanLifeMethod = (
  currentIncome,
  investGrowthRate,
  incomeIncrementRate,
  timePeriod
) => {
  console.log(1);
  let adjustRateReturn = (1 + investGrowthRate) / (1 + incomeIncrementRate) - 1;
  console.log(adjustRateReturn);
  let reqdCorpus = calculatePv(adjustRateReturn, timePeriod, currentIncome);
  return {
    reqdCorpus,
  };
};

const needBasedApproach = (
  currentIncome,
  investGrowthRate,
  incomeIncrementRate,
  timePeriod,
  outstandingLoanAmt,
  childEducationLiability,
  incidentalMarriageLiability,
  availableInsuranceDeduct,
  investmentBalance
) => {
  let { reqdCorpus } = humanLifeMethod(
    currentIncome,
    investGrowthRate,
    incomeIncrementRate,
    timePeriod
  );
  let additionReqdCorpus =
    reqdCorpus +
    outstandingLoanAmt +
    childEducationLiability +
    incidentalMarriageLiability -
    availableInsuranceDeduct -
    investmentBalance;
  return {
    reqdCorpus,
    additionReqdCorpus,
  };
};
