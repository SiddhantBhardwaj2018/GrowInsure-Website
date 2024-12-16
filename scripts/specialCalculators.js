/** @format */

let explainPara = document.getElementById("explainPara");
let modalBtn = document.getElementById("modalBtn");

const scrollToElement = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const rect = element.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - 100; // Adjusted offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

document.addEventListener("click", (e) => {
  let id = e.target.id;
  let principal;
  let inflationRate;
  let rateOfInterest;
  let timePeriod;
  let snapshotDiv;
  let resultHeader;
  let currentIncome;
  let investGrowthRate;
  let incomeIncrementRate;
  let targetAmt;
  switch (id) {
    case "emiSipBtn":
      e.preventDefault();
      principal = document.getElementById("houseCost");
      inflationRate = document.getElementById("inflationRate");
      rateOfInterest = document.getElementById("loanRate");
      timePeriod = document.getElementById("loanPeriod");
      snapshotDiv = document.getElementById("snapshotDiv");
      let personalFunding = document.getElementById("selfFunding");
      if (
        principal.value !== "" &&
        inflationRate.value !== "" &&
        rateOfInterest.value !== "" &&
        timePeriod.value !== "" &&
        personalFunding.value !== ""
      ) {
        if (
          !(
            isNotNumeric(principal.value) &&
            isNotNumeric(inflationRate.value) &&
            isNotNumeric(rateOfInterest.value) &&
            isNotNumeric(timePeriod.value) &&
            isNotNumeric(personalFunding.value)
          )
        ) {
          explainPara.innerText =
            "Please enter only numeric values for loan rate, loan period, housing cost, personal contribution and inflation rate to calculate SIP Versus Housing Return";
          modalBtn.click();
        } else {
          let {
            bankFunding,
            emiAmt,
            totalLoanPayment,
            loanInterestPaid,
            emiPaymentBalance,
            sipInvestFV,
            houseCostFV,
            profitSIPInvest,
            monthlyRent,
          } = calculateEMIVersusSIP(
            Number(principal.value),
            Number(personalFunding.value),
            Number(rateOfInterest.value) / 100,
            Number(timePeriod.value),
            Number(inflationRate.value) / 100
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">House Purchase Vs SIP Investment</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Loan EMI Amount' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(emiAmt)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Total Loan Payment Amount</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(totalLoanPayment)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Capital Paid In Loan</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(bankFunding)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Interest Paid In Loan</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(loanInterestPaid) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Consider Present House Value For Rent</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(principal.value)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Monthly Rent At 3% Rental Yield</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(monthlyRent)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">SIP Amount After EMI</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(emiPaymentBalance)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Assumed SIP Growth Rate</th>' +
            '<th scope="col" class="px-6 py-3">12%</th>' +
            '</tr><tr><th scope="col" class="px-6 py-3">Future Value Of SIP Investment</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(sipInvestFV)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Future House Valuation With Inflation</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(houseCostFV)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Profit In SIP Investment Versus EMI</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(profitSIPInvest)) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for loan rate, loan period, housing cost, personal contribution and inflation rate to calculate SIP Versus Housing Return";
        modalBtn.click();
      }
      break;
    case "humanLifeBtn":
      e.preventDefault();
      currentIncome = document.getElementById("currentIncome");
      investGrowthRate = document.getElementById("investGrowthRate");
      incomeIncrementRate = document.getElementById("incomeIncrementRate");
      timePeriod = document.getElementById("timePeriod");
      snapshotDiv = document.getElementById("snapshotDiv");
      if (
        currentIncome.value !== "" &&
        investGrowthRate.value !== "" &&
        incomeIncrementRate.value !== "" &&
        timePeriod.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentIncome.value) &&
            isNotNumeric(investGrowthRate.value) &&
            isNotNumeric(incomeIncrementRate.value) &&
            isNotNumeric(timePeriod.value)
          )
        ) {
          explainPara.innerText =
            "Please enter only numeric values for current income, investment growth rate, income increment rate and time period to calculate Human Life Value For Insurance";
          modalBtn.click();
        } else {
          let { reqdCorpus } = humanLifeMethod(
            Number(currentIncome.value),
            Number(investGrowthRate.value) / 100,
            Number(incomeIncrementRate.value) / 100,
            Number(timePeriod.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Human Life Insurance Amount Results</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Insurance Corpus Required' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(reqdCorpus)) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for current income, investment growth rate, income increment rate and time period to calculate Human Life Value For Insurance";
        modalBtn.click();
      }
      break;
    case "needApproachBtn":
      e.preventDefault();
      currentIncome = document.getElementById("currentIncome");
      investGrowthRate = document.getElementById("investGrowthRate");
      incomeIncrementRate = document.getElementById("incomeIncrementRate");
      timePeriod = document.getElementById("timePeriod");
      snapshotDiv = document.getElementById("snapshotDiv");
      let outstandingLoanAmt = document.getElementById("outstandingLoanAmt");
      let childEducationLiability = document.getElementById(
        "childEducationLiability"
      );
      let marriageIncidentalLiability = document.getElementById(
        "marriageIncidentalLiability"
      );
      let deductInsurance = document.getElementById("deductInsurance");
      let currentInvestBalance = document.getElementById(
        "currentInvestBalance"
      );
      if (
        currentIncome.value !== "" &&
        investGrowthRate.value !== "" &&
        incomeIncrementRate.value !== "" &&
        timePeriod.value !== "" &&
        outstandingLoanAmt.value !== "" &&
        childEducationLiability.value !== "" &&
        marriageIncidentalLiability.value !== "" &&
        deductInsurance.value !== "" &&
        currentInvestBalance.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentIncome.value) &&
            isNotNumeric(investGrowthRate.value) &&
            isNotNumeric(incomeIncrementRate.value) &&
            isNotNumeric(timePeriod.value) &&
            isNotNumeric(outstandingLoanAmt.value) &&
            isNotNumeric(childEducationLiability.value) &&
            isNotNumeric(marriageIncidentalLiability.value) &&
            isNotNumeric(deductInsurance.value) &&
            isNotNumeric(currentInvestBalance.value)
          )
        ) {
          explainPara.innerText =
            "Please enter only numeric values for current income, investment growth rate, income increment rate, time period, outstanding loan amount, children education liability, marriage incidental liability, available insurance deductible and current investment balance to calculate Needs Based Value For Insurance";
          modalBtn.click();
        } else {
          let { reqdCorpus, additionReqdCorpus } = needBasedApproach(
            Number(currentIncome.value),
            Number(investGrowthRate.value) / 100,
            Number(incomeIncrementRate.value) / 100,
            Number(timePeriod.value),
            Number(outstandingLoanAmt.value),
            Number(childEducationLiability.value),
            Number(marriageIncidentalLiability.value),
            Number(deductInsurance.value),
            Number(currentInvestBalance.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Human Life Insurance Amount Results</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Insurance Corpus Required (As Per Human Life Value Method)' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(reqdCorpus)) +
            "</th></tr>" +
            '<tr><th scope="col" class="px-6 py-3">Insurance Corpus Required (As Per Needs-Based Approach)' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(additionReqdCorpus)) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for current income, investment growth rate, income increment rate, time period, outstanding loan amount, children education liability, marriage incidental liability, available insurance deductible and current investment balance to calculate Needs Based Value For Insurance";
        modalBtn.click();
      }
      break;
    case "crorepatiClacBtn":
      e.preventDefault();
      rateOfInterest = document.getElementById("growthRate");
      timePeriod = document.getElementById("timePeriod");
      snapshotDiv = document.getElementById("snapshotDiv");
      targetAmt = document.getElementById("targetAmtReqd");
      if (
        rateOfInterest.value !== "" &&
        timePeriod.value !== "" &&
        targetAmt.value !== ""
      ) {
        if (
          !(
            isNotNumeric(rateOfInterest.value) &&
            isNotNumeric(targetAmt.value) &&
            isNotNumeric(timePeriod.value)
          )
        ) {
          explainPara.innerText =
            "Please enter only numeric values for investment growth rate, target amount, and time period  to calculate target SIP to become a crorepati";
          modalBtn.click();
        } else {
          let pmt = calculatePmt(
            Number(rateOfInterest.value) / 1200,
            Number(timePeriod.value) * 12,
            0,
            Number(targetAmt.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Target SIP / Plan a Crorepati Target</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Required Target SIP To Become Crorepati' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(pmt)) +
            "</th></tr>" +
            "</thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for current income, investment growth rate, income increment rate, time period, outstanding loan amount, children education liability, marriage incidental liability, available insurance deductible and current investment balance to calculate Needs Based Value For Insurance";
        modalBtn.click();
      }
      break;
    case "futureExpenseButton":
      e.preventDefault();
      rateOfInterest = document.getElementById("rateOfReturn");
      timePeriod = document.getElementById("timePeriod");
      snapshotDiv = document.getElementById("snapshotDiv");
      principal = document.getElementById("amount");
      if (
        rateOfInterest.value !== "" &&
        timePeriod.value !== "" &&
        principal.value !== ""
      ) {
        if (
          !(
            isNotNumeric(rateOfInterest.value) &&
            isNotNumeric(principal.value) &&
            isNotNumeric(timePeriod.value)
          )
        ) {
          explainPara.innerText =
            "Please enter only numeric values for investment growth rate, target amount, and time period  to calculate target Future Value of Expense";
          modalBtn.click();
        } else {
          let fv = calculateFV(
            Number(rateOfInterest.value) / 100,
            Number(timePeriod.value),
            0,
            Number(principal.value)
          );
          const options = {
            colors: ["#1A56DB", "#4CAF50"], // Blue, Green
            series: [
              {
                name: "Present Value of Expense",
                data: [Math.round(principal.value), 0], // Only two values
              },
              {
                name: "Future Value of Expense",
                data: [0, Math.round(fv)], // Only two values
              },
            ],
            chart: {
              type: "bar",
              height: "320px",
              width: "200px",
              fontFamily: "Inter, sans-serif",
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "110%",
                borderRadius: 8,
              },
            },
            tooltip: {
              shared: true,
              intersect: false,
              style: {
                fontFamily: "Inter, sans-serif",
              },
            },
            states: {
              hover: {
                filter: {
                  type: "darken",
                  value: 1,
                },
              },
            },
            stroke: {
              show: true,
              width: 0,
              colors: ["transparent"],
            },
            grid: {
              show: false,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -14,
              },
            },
            dataLabels: {
              enabled: false,
              offsetY: -20,
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                colors: ["#fff"],
              },
            },
            legend: {
              position: "bottom", // Align legends at the bottom
              offsetY: 10, // Adjust vertical offset if needed
              itemMargin: {
                horizontal: 5, // Reduce spacing between legend items
              },
            },
            xaxis: {
              categories: [Number(principal.value) + "", Number(fv) + ""], // Only two categories
              labels: {
                show: false,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass:
                    "text-xs font-normal fill-gray-800 dark:fill-gray-400",
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            fill: {
              opacity: 1,
            },
          };

          if (
            document.getElementById("column-chart") &&
            typeof ApexCharts !== "undefined"
          ) {
            const chart = new ApexCharts(
              document.getElementById("column-chart"),
              options
            );
            chart.render();
          }
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Future Value of Expense</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Present Value of Expense' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(principal.value)) +
            "</th></tr>" +
            '<tr><th scope="col" class="px-6 py-3">Future Value of Expense' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(fv)) +
            "</th></tr>" +
            "</thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for current income, investment growth rate, income increment rate, time period, outstanding loan amount, children education liability, marriage incidental liability, available insurance deductible and current investment balance to calculate Needs Based Value For Insurance";
        modalBtn.click();
      }
      break;
    default:
      break;
  }
});
