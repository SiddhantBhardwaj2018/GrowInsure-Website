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
  let rate;
  let timePeriod;
  let resultContainer;
  let stepUp;
  let currentAge;
  let retirementAge;
  let retirementCorpus;
  let academicCorpus;
  let educationAge;
  let amountInvest;
  let snapshotDiv;
  switch (id) {
    case "sipCalculatorButton":
      e.preventDefault();

      resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<div id="resultContainer">' +
        '<div id="resultHeader" style="display:flex;justify-content:center;">' +
        '</div><div style="display:flex;justify-content:center;">' +
        '<div id="line-chart"></div>' +
        '</div><br /><div id="showOutput" style="display:flex;justify-content:center;"></div></div>';

      principal = document.getElementById("amount");
      rate = document.getElementById("rateOfReturn");
      timePeriod = document.getElementById("timePeriod");
      if (
        principal.value !== "" &&
        rate.value !== "" &&
        timePeriod.value !== ""
      ) {
        if (
          !(
            isNotNumeric(principal.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(timePeriod.value)
          )
        ) {
          explainPara.innerText =
            "Please input only numeric values for Time Period, Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let returnArr = [];
          let growthArr = [];
          let newVal;
          for (let i = 1; i < Number(timePeriod.value) + 1; i++) {
            newVal = Math.round(
              calculateSIPReturn(
                Number(rate.value) / 100,
                Number(principal.value),
                i
              )
            );
            growthVal = Number(principal.value) * 12 * i;
            returnArr.push(newVal);
            growthArr.push(growthVal);
          }

          const getNextYears = () => {
            let currentYr = new Date().getFullYear();
            const yrs = [];
            for (let i = 0; i < Number(timePeriod.value); i++) {
              yrs.push(currentYr + i);
            }

            return yrs;
          };

          const options = {
            chart: {
              height: "300px",
              width: "600px",
              type: "line",
              fontFamily: "Inter, sans-serif",
              dropShadow: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 6,
            },
            grid: {
              show: true,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -26,
              },
            },
            series: [
              {
                name: "SIP Amount Invested (₹)",
                data: growthArr,
                color: "#FF0000",
              },
              {
                name: "SIP Maturity Amount (₹)",
                data: returnArr,
                color: "#1A56DB",
              },
            ],
            legend: {
              show: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: getNextYears(),
              labels: {
                show: true,
                rotate: -45,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass:
                    "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tickAmount: getNextYears().length / 2,
            },
            yaxis: {
              show: false,
            },
          };

          if (
            document.getElementById("line-chart") &&
            typeof ApexCharts !== "undefined"
          ) {
            const chart = new ApexCharts(
              document.getElementById("line-chart"),
              options
            );
            chart.render();
          }

          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-4xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">SIP Maturity & Growth (₹)</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Total SIP Amount Invested</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(
              Number(principal.value) * 12 * Number(timePeriod.value)
            ) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Total SIP Maturity Amount</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(returnArr[returnArr.length - 1]) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for rate, time period and amount to calculate SIP Return";
        modalBtn.click();
      }
      break;
    case "sipStepUpCalculatorButton":
      e.preventDefault();
      resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<div id="resultContainer">' +
        '<div id="resultHeader" style="display:flex;justify-content:center;">' +
        '</div><div style="display:flex;justify-content:center;">' +
        '<div id="line-chart"></div>' +
        '</div><br /><div id="showOutput" style="display:flex;justify-content:center;"></div></div>';

      principal = document.getElementById("amount");
      rate = document.getElementById("rateOfReturn");
      timePeriod = document.getElementById("timePeriod");
      stepUp = document.getElementById("stepUp");
      if (
        principal.value !== "" &&
        rate.value !== "" &&
        timePeriod.value !== "" &&
        stepUp.value !== ""
      ) {
        if (
          !(
            isNotNumeric(principal.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(timePeriod.value) &&
            isNotNumeric(stepUp.value)
          )
        ) {
          explainPara.innerText =
            "Please input only numeric values for Time Period, Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let returnArr = [];
          let growthArr = [];
          let newVal;
          for (let i = 1; i < Number(timePeriod.value) + 1; i++) {
            newVal = Math.round(
              calculateSIPReturn(
                Number(rate.value) / 100,
                Number(principal.value),
                i,
                Number(stepUp.value)
              )
            );
            growthVal = Number(principal.value) * 12 * i;
            returnArr.push(newVal);
            growthArr.push(growthVal);
          }

          const getNextYears = () => {
            let currentYr = new Date().getFullYear();
            const yrs = [];
            for (let i = 0; i < Number(timePeriod.value); i++) {
              yrs.push(currentYr + i);
            }

            return yrs;
          };

          const options = {
            chart: {
              height: "300px",
              width: "600px",
              type: "line",
              fontFamily: "Inter, sans-serif",
              dropShadow: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 6,
            },
            grid: {
              show: true,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -26,
              },
            },
            series: [
              {
                name: "SIP Amount Invested (₹)",
                data: growthArr,
                color: "#FFA500",
              },
              {
                name: "SIP Maturity Amount (₹)",
                data: returnArr,
                color: "#013220",
              },
            ],
            legend: {
              show: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: getNextYears(),
              labels: {
                show: true,
                rotate: -45,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass:
                    "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tickAmount: getNextYears().length / 2,
            },
            yaxis: {
              show: false,
            },
          };

          if (
            document.getElementById("line-chart") &&
            typeof ApexCharts !== "undefined"
          ) {
            const chart = new ApexCharts(
              document.getElementById("line-chart"),
              options
            );
            chart.render();
          }

          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-4xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Step-Up SIP Maturity & Growth (₹)</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Total SIP Amount Invested</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(
              Number(principal.value) * 12 * Number(timePeriod.value)
            ) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Total SIP Maturity Amount</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(returnArr[returnArr.length - 1]) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for rate, time period and amount to calculate SIP With Step Up Return";
        modalBtn.click();
      }
      break;
    case "lumpsumButton":
      e.preventDefault();

      resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<div id="resultContainer">' +
        '<div id="resultHeader" style="display:flex;justify-content:center;">' +
        '</div><div style="display:flex;justify-content:center;">' +
        '<div id="line-chart"></div>' +
        '</div><br /><div id="showOutput" style="display:flex;justify-content:center;"></div></div>';

      principal = document.getElementById("amount");
      rate = document.getElementById("rateOfReturn");
      timePeriod = document.getElementById("timePeriod");
      if (
        principal.value !== "" &&
        rate.value !== "" &&
        timePeriod.value !== ""
      ) {
        if (
          !(
            isNotNumeric(principal.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(timePeriod.value)
          )
        ) {
          explainPara.innerText =
            "Please input only numeric values for Time Period, Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let returnArr = [];
          let growthArr = [];
          let newVal;
          for (let i = 1; i < Number(timePeriod.value) + 1; i++) {
            newVal = Math.round(
              calculateSIPReturn(
                Number(rate.value) / 100,
                Number(principal.value),
                i,
                0,
                0,
                true
              )
            );
            returnArr.push(newVal);
          }
          const getNextYears = () => {
            let currentYr = new Date().getFullYear();
            const yrs = [];
            for (let i = 0; i < Number(timePeriod.value); i++) {
              yrs.push(currentYr + i);
            }

            return yrs;
          };

          const options = {
            chart: {
              height: "300px",
              width: "600px",
              type: "line",
              fontFamily: "Inter, sans-serif",
              dropShadow: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 6,
            },
            grid: {
              show: true,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -26,
              },
            },
            series: [
              {
                name: "Lumpsum Maturity Amount (₹)",
                data: returnArr,
                color: "#1A56DB",
              },
            ],
            legend: {
              show: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: getNextYears(),
              labels: {
                show: true,
                rotate: -45,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass:
                    "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tickAmount: getNextYears().length / 2,
            },
            yaxis: {
              show: false,
            },
          };

          if (
            document.getElementById("line-chart") &&
            typeof ApexCharts !== "undefined"
          ) {
            const chart = new ApexCharts(
              document.getElementById("line-chart"),
              options
            );
            chart.render();
          }

          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-4xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Lumpsum Maturity & Growth (₹)</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Total SIP Amount Invested</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(
              Number(principal.value) * 12 * Number(timePeriod.value)
            ) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Lump-Sum Maturity Amount</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(returnArr[returnArr.length - 1]) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for rate, time period and amount to calculate LumpSum Return";
        modalBtn.click();
      }
      break;
    case "sipLumpSumButton":
      e.preventDefault();

      resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<div id="resultContainer">' +
        '<div id="resultHeader" style="display:flex;justify-content:center;">' +
        '</div><div style="display:flex;justify-content:center;">' +
        '<div id="line-chart"></div>' +
        '</div><br /><div id="showOutput" style="display:flex;justify-content:center;"></div></div>';

      principal = document.getElementById("amount");
      rate = document.getElementById("rateOfReturn");
      timePeriod = document.getElementById("timePeriod");
      lumpsum = document.getElementById("lumpsum");
      if (
        principal.value !== "" &&
        rate.value !== "" &&
        timePeriod.value !== "" &&
        lumpsum.value !== ""
      ) {
        if (
          !(
            isNotNumeric(principal.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(timePeriod.value) &&
            isNotNumeric(lumpsum.value)
          )
        ) {
          explainPara.innerText =
            "Please input only numeric values for Time Period, Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let returnArr = [];
          let growthArr = [];
          let newVal;
          for (let i = 1; i < Number(timePeriod.value) + 1; i++) {
            newVal = Math.round(
              calculateTotalReturnWithLumpSumAndSIP(
                Number(lumpsum.value),
                Number(principal.value),
                Number(rate.value) / 100,
                i
              )
            );
            growthVal = Number(principal.value) * 12 * i;
            returnArr.push(newVal);
            growthArr.push(growthVal);
          }

          const getNextYears = () => {
            let currentYr = new Date().getFullYear();
            const yrs = [];
            for (let i = 0; i < Number(timePeriod.value); i++) {
              yrs.push(currentYr + i);
            }

            return yrs;
          };

          const options = {
            chart: {
              height: "300px",
              width: "600px",
              type: "line",
              fontFamily: "Inter, sans-serif",
              dropShadow: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 6,
            },
            grid: {
              show: true,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -26,
              },
            },
            series: [
              {
                name: "SIP Amount Invested (₹)",
                data: growthArr,
                color: "#FF0000",
              },
              {
                name: "SIP Maturity Amount (₹)",
                data: returnArr,
                color: "#1A56DB",
              },
            ],
            legend: {
              show: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: getNextYears(),
              labels: {
                show: true,
                rotate: -45,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass:
                    "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tickAmount: getNextYears().length / 2,
            },
            yaxis: {
              show: false,
            },
          };

          if (
            document.getElementById("line-chart") &&
            typeof ApexCharts !== "undefined"
          ) {
            const chart = new ApexCharts(
              document.getElementById("line-chart"),
              options
            );
            chart.render();
          }

          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-4xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">SIP With Lumpsum Maturity & Growth (₹)</h5>';
          showOutput = document.getElementById("showOutput");
          let totalSIPAmtInvested =
            Number(principal.value) * 12 * Number(timePeriod.value);
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Total SIP Amount Invested</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(totalSIPAmtInvested) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Total SIP Lumpsum Maturity Amount</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(returnArr[returnArr.length - 1]) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for rate, time period and amount to calculate SIP With LumpSum Return";
        modalBtn.click();
      }
      break;
    case "delayedInvestBtn":
      e.preventDefault();

      resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<div id="resultContainer">' +
        '<div id="resultHeader" style="display:flex;justify-content:center;">' +
        '</div><div style="display:flex;justify-content:center;">' +
        '<div id="column-chart"></div>' +
        '</div><br /><div id="showOutput" style="display:flex;justify-content:center;"></div></div>';

      currentAge = document.getElementById("currentAge");
      retirementAge = document.getElementById("retirementAge");
      retirementCorpus = document.getElementById("retirementCorpus");
      rate = document.getElementById("rateOfReturn");
      if (
        currentAge.value !== "" &&
        retirementAge.value !== "" &&
        retirementCorpus.value !== "" &&
        rate.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentAge.value) &&
            isNotNumeric(retirementAge.value) &&
            isNotNumeric(retirementCorpus.value) &&
            isNotNumeric(rate.value)
          )
        ) {
          explainPara.innerText =
            "Please input only numeric values for Current Age, Retirement Age, Retirement Corpus & Rate Of Return";
          modalBtn.click();
        } else {
          let { prevTenYr, currentYr, nextTenYr } =
            calculateDifferentialReturnsByAge(
              Number(currentAge.value),
              Number(retirementAge.value),
              Number(retirementCorpus.value),
              Number(rate.value) / 100
            );

          const options = {
            colors: ["#1A56DB", "#FDBA8C", "#4CAF50"], // Blue, Orange, Green
            series: [
              {
                name: "SIP Amount At Age " + (Number(currentAge.value) - 10),
                data: [Math.round(prevTenYr), 0, 0],
              },
              {
                name: "SIP Amount At Age " + Number(currentAge.value),
                data: [0, Math.round(currentYr), 0],
              },
              {
                name: "SIP Amount At Age " + (Number(currentAge.value) + 10),
                data: [0, 0, Math.round(nextTenYr)],
              },
            ],
            chart: {
              type: "bar",
              height: "320px",
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
              position: "bottom", // Align legends at the top
              offsetY: 10, // Adjust vertical offset if needed
              itemMargin: {
                horizontal: 5, // Reduce spacing between legend items
              },
            },
            xaxis: {
              categories: [
                Number(currentAge.value) - 10 + "",
                Number(currentAge.value) + "",
                Number(currentAge.value) + 10 + "",
              ],
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
            '<h5 class="leading-none text-4xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Differential Returns By SIP (₹)</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">SIP Amount From Age ' +
            (Number(currentAge.value) - 10) +
            " Yrs</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(prevTenYr)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">SIP Amount From Age ' +
            Number(currentAge.value) +
            " Yrs</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(currentYr)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">SIP Amount From Age ' +
            (Number(currentAge.value) + 10) +
            " Yrs</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(nextTenYr)) +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for rate, time period and amount to calculate Cost Of Delayed Investment Return";
        modalBtn.click();
      }
      break;
    case "sipInflationCalculatorButton":
      e.preventDefault();

      resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<div id="resultContainer">' +
        '<div id="resultHeader" style="display:flex;justify-content:center;">' +
        '</div><div style="display:flex;justify-content:center;">' +
        '<div id="line-chart"></div>' +
        '</div><br /><div id="showOutput" style="display:flex;justify-content:center;"></div></div>';

      principal = document.getElementById("amount");
      rate = document.getElementById("rateOfReturn");
      timePeriod = document.getElementById("timePeriod");
      inflation = document.getElementById("inflation");
      if (
        principal.value !== "" &&
        rate.value !== "" &&
        timePeriod.value !== "" &&
        inflation.value !== ""
      ) {
        if (
          !(
            isNotNumeric(principal.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(timePeriod.value) &&
            isNotNumeric(inflation.value)
          )
        ) {
          explainPara.innerText =
            "Please input only numeric values for Time Period, Amount, Inflation & Rate Of Return";
          modalBtn.click();
        } else {
          let returnArr = [];
          let growthArr = [];
          let newVal;
          for (let i = 1; i < Number(timePeriod.value) + 1; i++) {
            newVal = Math.round(
              calculateSIPReturn(
                Number(rate.value) / 100,
                Number(principal.value),
                i,
                0,
                Number(inflation.value) / 100
              )
            );
            growthVal = Math.round(
              calculateSIPReturn(
                Number(rate.value) / 100,
                Number(principal.value),
                i
              )
            );
            returnArr.push(newVal);
            growthArr.push(growthVal);
          }

          const getNextYears = () => {
            let currentYr = new Date().getFullYear();
            const yrs = [];
            for (let i = 0; i < Number(timePeriod.value); i++) {
              yrs.push(currentYr + i);
            }

            return yrs;
          };

          const options = {
            chart: {
              height: "300px",
              width: "600px",
              type: "line",
              fontFamily: "Inter, sans-serif",
              dropShadow: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 6,
            },
            grid: {
              show: true,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -26,
              },
            },
            series: [
              {
                name: "SIP Maturity Amount (₹)",
                data: growthArr,
                color: "#FF0000",
              },
              {
                name: "Inflation-Adjusted SIP Maturity Amount (₹)",
                data: returnArr,
                color: "#1A56DB",
              },
            ],
            legend: {
              show: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: getNextYears(),
              labels: {
                show: true,
                rotate: -45,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass:
                    "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tickAmount: getNextYears().length / 2,
            },
            yaxis: {
              show: false,
            },
          };

          if (
            document.getElementById("line-chart") &&
            typeof ApexCharts !== "undefined"
          ) {
            const chart = new ApexCharts(
              document.getElementById("line-chart"),
              options
            );
            chart.render();
          }

          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-4xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">SIP Maturity & Growth (₹)</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">SIP Maturity Amount (Without Inflation) </th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(growthArr[growthArr.length - 1]) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">SIP Maturity Amount (With Inflation) </th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(returnArr[returnArr.length - 1]) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for rate, time period and amount to calculate SIP Return (With Inflation)";
        modalBtn.click();
      }
      break;
    case "sipStepUpInflationButton":
      e.preventDefault();
      resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<div id="resultContainer">' +
        '<div id="resultHeader" style="display:flex;justify-content:center;">' +
        '</div><div style="display:flex;justify-content:center;">' +
        '<div id="line-chart"></div>' +
        '</div><br /><div id="showOutput" style="display:flex;justify-content:center;"></div></div>';

      principal = document.getElementById("amount");
      rate = document.getElementById("rateOfReturn");
      timePeriod = document.getElementById("timePeriod");
      stepUp = document.getElementById("stepUp");
      inflation = document.getElementById("inflation");
      if (
        principal.value !== "" &&
        rate.value !== "" &&
        timePeriod.value !== "" &&
        stepUp.value !== "" &&
        inflation.value !== ""
      ) {
        if (
          !(
            isNotNumeric(principal.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(timePeriod.value) &&
            isNotNumeric(stepUp.value) &&
            isNotNumeric(inflation.value)
          )
        ) {
          explainPara.innerText =
            "Please input only numeric values for Time Period, Amount, Inflation & Rate Of Return";
          modalBtn.click();
        } else {
          let returnArr = [];
          let growthArr = [];
          let newVal;
          for (let i = 1; i < Number(timePeriod.value) + 1; i++) {
            newVal = Math.round(
              calculateSIPReturn(
                Number(rate.value) / 100,
                Number(principal.value),
                i,
                Number(stepUp.value),
                Number(inflation.value) / 100
              )
            );
            growthVal = Math.round(
              calculateSIPReturn(
                Number(rate.value) / 100,
                Number(principal.value),
                i,
                Number(stepUp.value)
              )
            );
            returnArr.push(newVal);
            growthArr.push(growthVal);
          }

          const getNextYears = () => {
            let currentYr = new Date().getFullYear();
            const yrs = [];
            for (let i = 0; i < Number(timePeriod.value); i++) {
              yrs.push(currentYr + i);
            }

            return yrs;
          };

          const options = {
            chart: {
              height: "300px",
              width: "600px",
              type: "line",
              fontFamily: "Inter, sans-serif",
              dropShadow: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 6,
            },
            grid: {
              show: true,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -26,
              },
            },
            series: [
              {
                name: "SIP Maturity Invested (₹)",
                data: growthArr,
                color: "#FFA500",
              },
              {
                name: "Inflation-Adjusted SIP Maturity Amount (₹)",
                data: returnArr,
                color: "#013220",
              },
            ],
            legend: {
              show: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: getNextYears(),
              labels: {
                show: true,
                rotate: -45,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass:
                    "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tickAmount: getNextYears().length / 2,
            },
            yaxis: {
              show: false,
            },
          };

          if (
            document.getElementById("line-chart") &&
            typeof ApexCharts !== "undefined"
          ) {
            const chart = new ApexCharts(
              document.getElementById("line-chart"),
              options
            );
            chart.render();
          }

          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-4xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Step-Up SIP Maturity & Growth (₹)</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Total SIP Maturity Amount (Without Inflation)</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(growthArr[growthArr.length - 1]) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Total SIP Maturity Amount (With Inflation)</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(returnArr[returnArr.length - 1]) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for rate, time period and amount to calculate SIP With Inflation Return";
        modalBtn.click();
      }
      break;
    case "lumpsumInflationButton":
      e.preventDefault();

      resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<div id="resultContainer">' +
        '<div id="resultHeader" style="display:flex;justify-content:center;">' +
        '</div><div style="display:flex;justify-content:center;">' +
        '<div id="line-chart"></div>' +
        '</div><br /><div id="showOutput" style="display:flex;justify-content:center;"></div></div>';

      principal = document.getElementById("amount");
      rate = document.getElementById("rateOfReturn");
      timePeriod = document.getElementById("timePeriod");
      inflation = document.getElementById("inflation");
      if (
        principal.value !== "" &&
        rate.value !== "" &&
        timePeriod.value !== "" &&
        inflation.value !== ""
      ) {
        if (
          !(
            isNotNumeric(principal.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(timePeriod.value) &&
            isNotNumeric(inflation.value)
          )
        ) {
          explainPara.innerText =
            "Please input only numeric values for Time Period, Amount, Inflation & Rate Of Return";
          modalBtn.click();
        } else {
          let returnArr = [];
          let growthArr = [];
          let newVal;
          for (let i = 1; i < Number(timePeriod.value) + 1; i++) {
            newVal = Math.round(
              calculateSIPReturn(
                Number(rate.value) / 100,
                Number(principal.value),
                i,
                0,
                Number(inflation.value) / 100,
                true
              )
            );
            growthVal = Math.round(
              calculateSIPReturn(
                Number(rate.value) / 100,
                Number(principal.value),
                i,
                0,
                0,
                true
              )
            );
            returnArr.push(newVal);
            growthArr.push(growthVal);
          }
          const getNextYears = () => {
            let currentYr = new Date().getFullYear();
            const yrs = [];
            for (let i = 0; i < Number(timePeriod.value); i++) {
              yrs.push(currentYr + i);
            }

            return yrs;
          };

          const options = {
            chart: {
              height: "300px",
              width: "600px",
              type: "line",
              fontFamily: "Inter, sans-serif",
              dropShadow: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 6,
            },
            grid: {
              show: true,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -26,
              },
            },
            series: [
              {
                name: "Inflation-Adjusted Lumpsum Maturity Amount (₹)",
                data: returnArr,
                color: "#013220",
              },
              {
                name: "Lumpsum Maturity Amount (₹)",
                data: growthArr,
                color: "#1A56DB",
              },
            ],
            legend: {
              show: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: getNextYears(),
              labels: {
                show: true,
                rotate: -45,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass:
                    "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tickAmount: getNextYears().length / 2,
            },
            yaxis: {
              show: false,
            },
          };

          if (
            document.getElementById("line-chart") &&
            typeof ApexCharts !== "undefined"
          ) {
            const chart = new ApexCharts(
              document.getElementById("line-chart"),
              options
            );
            chart.render();
          }

          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-4xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Lumpsum Maturity & Growth (₹)</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Lump-Sum Maturity Amount (Without Inflation)</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(growthArr[growthArr.length - 1]) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Lump-Sum Maturity Amount (With Inflation)</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(returnArr[returnArr.length - 1]) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for rate, time period and amount to calculate Lumpsum With Inflation Return";
        modalBtn.click();
      }
      break;
    case "sipLumpSumInflationButton":
      e.preventDefault();
      resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<div id="resultContainer">' +
        '<div id="resultHeader" style="display:flex;justify-content:center;">' +
        '</div><div style="display:flex;justify-content:center;">' +
        '<div id="line-chart"></div>' +
        '</div><br /><div id="showOutput" style="display:flex;justify-content:center;"></div></div>';

      principal = document.getElementById("amount");
      rate = document.getElementById("rateOfReturn");
      timePeriod = document.getElementById("timePeriod");
      lumpsum = document.getElementById("lumpsum");
      inflation = document.getElementById("inflation");
      if (
        principal.value !== "" &&
        rate.value !== "" &&
        timePeriod.value !== "" &&
        lumpsum.value !== "" &&
        inflation.value !== ""
      ) {
        if (
          !(
            isNotNumeric(principal.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(timePeriod.value) &&
            isNotNumeric(lumpsum.value) &&
            isNotNumeric(inflation.value)
          )
        ) {
          explainPara.innerText =
            "Please input only numeric values for Time Period, Amount, Inflation & Rate Of Return";
          modalBtn.click();
        } else {
          let returnArr = [];
          let growthArr = [];
          let newVal;
          for (let i = 1; i < Number(timePeriod.value) + 1; i++) {
            newVal = Math.round(
              calculateTotalReturnWithLumpSumAndSIP(
                Number(lumpsum.value),
                Number(principal.value),
                Number(rate.value) / 100,
                i,
                Number(inflation.value) / 100
              )
            );
            growthVal = Math.round(
              calculateTotalReturnWithLumpSumAndSIP(
                Number(lumpsum.value),
                Number(principal.value),
                Number(rate.value) / 100,
                i
              )
            );
            returnArr.push(newVal);
            growthArr.push(growthVal);
          }

          const getNextYears = () => {
            let currentYr = new Date().getFullYear();
            const yrs = [];
            for (let i = 0; i < Number(timePeriod.value); i++) {
              yrs.push(currentYr + i);
            }

            return yrs;
          };

          const options = {
            chart: {
              height: "300px",
              width: "600px",
              type: "line",
              fontFamily: "Inter, sans-serif",
              dropShadow: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 6,
            },
            grid: {
              show: true,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -26,
              },
            },
            series: [
              {
                name: "SIP Maturity Amount (₹)",
                data: growthArr,
                color: "#FF0000",
              },
              {
                name: "Inflation-Adjusted SIP Maturity Amount (₹)",
                data: returnArr,
                color: "#1A56DB",
              },
            ],
            legend: {
              show: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: getNextYears(),
              labels: {
                show: true,
                rotate: -45,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass:
                    "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tickAmount: getNextYears().length / 2,
            },
            yaxis: {
              show: false,
            },
          };

          if (
            document.getElementById("line-chart") &&
            typeof ApexCharts !== "undefined"
          ) {
            const chart = new ApexCharts(
              document.getElementById("line-chart"),
              options
            );
            chart.render();
          }

          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-4xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">SIP With Lumpsum Maturity & Growth (₹)</h5>';
          showOutput = document.getElementById("showOutput");
          let totalSIPAmtInvested =
            Number(principal.value) * 12 * Number(timePeriod.value);
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">SIP Lumpsum Maturity (Without Inflation)</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(growthArr[growthArr.length - 1]) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">SIP Lumpsum Maturity (With Inflation)</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(returnArr[returnArr.length - 1]) +
            "</th>" +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for rate, time period and amount to calculate SIP With LumpSum (Inflation) Return";
        modalBtn.click();
      }
      break;
    case "delayedInflationBtn":
      e.preventDefault();
      resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<div id="resultContainer">' +
        '<div id="resultHeader" style="display:flex;justify-content:center;">' +
        '</div><div style="display:flex;justify-content:center;">' +
        '<div id="column-chart"></div>' +
        '</div><br /><div id="showOutput" style="display:flex;justify-content:center;"></div></div>';

      currentAge = document.getElementById("currentAge");
      retirementAge = document.getElementById("retirementAge");
      retirementCorpus = document.getElementById("retirementCorpus");
      rate = document.getElementById("rateOfReturn");
      inflation = document.getElementById("inflation");
      if (
        currentAge.value !== "" &&
        retirementAge.value !== "" &&
        retirementCorpus.value !== "" &&
        rate.value !== "" &&
        inflation.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentAge.value) &&
            isNotNumeric(retirementAge.value) &&
            isNotNumeric(retirementCorpus.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(inflation.value)
          )
        ) {
          explainPara.innerText =
            "Please input only numeric values for Current Age, Retirement Age, Retirement Corpus, Inflation & Rate Of Return";
          modalBtn.click();
        } else {
          let inflationAdjustedVals = calculateDifferentialReturnsByAge(
            Number(currentAge.value),
            Number(retirementAge.value),
            Number(retirementCorpus.value),
            Number(rate.value) / 100,
            Number(inflation.value) / 100
          );

          let regularVals = calculateDifferentialReturnsByAge(
            Number(currentAge.value),
            Number(retirementAge.value),
            Number(retirementCorpus.value),
            Number(rate.value) / 100
          );

          const options = {
            colors: ["#1A56DB", "#FDBA8C", "#4CAF50"], // Blue, Orange, Green
            series: [
              {
                name: "SIP Amount At Age " + (Number(currentAge.value) - 10),
                data: [
                  Math.round(regularVals.prevTenYr),
                  Math.round(inflationAdjustedVals.prevTenYr),
                ],
              },
              {
                name: "SIP Amount At Age " + Number(currentAge.value),
                data: [
                  Math.round(regularVals.currentYr),
                  Math.round(inflationAdjustedVals.currentYr),
                ],
              },
              {
                name: "SIP Amount At Age " + (Number(currentAge.value) + 10),
                data: [
                  Math.round(regularVals.nextTenYr),
                  Math.round(inflationAdjustedVals.nextTenYr),
                ],
              },
            ],
            chart: {
              type: "bar",
              height: "320px",
              fontFamily: "Inter, sans-serif",
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "70%",
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
              position: "bottom", // Align legends at the top
              offsetY: 10, // Adjust vertical offset if needed
              itemMargin: {
                horizontal: 5, // Reduce spacing between legend items
              },
            },
            xaxis: {
              categories: ["SIP Without Inflation", "SIP With Inflation"],
              labels: {
                show: true,
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
            '<h5 class="leading-none text-4xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Differential Returns By SIP (₹)</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Inflation-Adjusted SIP Amount From Age ' +
            (Number(currentAge.value) - 10) +
            " Yrs</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(
              Math.round(inflationAdjustedVals.prevTenYr)
            ) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Inflation-Adjusted SIP Amount From Age ' +
            Number(currentAge.value) +
            " Yrs</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(
              Math.round(inflationAdjustedVals.currentYr)
            ) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Inflation-Adjusted SIP Amount From Age ' +
            (Number(currentAge.value) + 10) +
            " Yrs</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(
              Math.round(inflationAdjustedVals.nextTenYr)
            ) +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please fill in values for rate, time period and amount to calculate Cost Of Delayed Investment (Inflation) Return";
        modalBtn.click();
      }
      break;
    case "educationInvestBtn":
      e.preventDefault();
      currentAge = document.getElementById("currentAge");
      educationAge = document.getElementById("educationAge");
      academicCorpus = document.getElementById("academicCorpus");
      rate = document.getElementById("rateOfReturn");
      inflation = document.getElementById("inflationRate");
      amountInvest = document.getElementById("currentInvestAmt");
      snapshotDiv = document.getElementById("snapshotDiv");
      if (
        currentAge.value !== "" &&
        educationAge.value !== "" &&
        academicCorpus.value !== "" &&
        rate.value !== "" &&
        inflation.value !== "" &&
        amountInvest.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentAge.value) &&
            isNotNumeric(educationAge.value) &&
            isNotNumeric(academicCorpus.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(inflation.value) &&
            isNotNumeric(amountInvest.value)
          )
        ) {
          explainPara.innerText =
            "Please Input Only Numeric Values For Child's Current Age, College-Going Age, Academic Corpus, Inflation, Current Investment Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let {
            futureCost,
            investAppAmt,
            deficitCorpus,
            lumpSumAmt,
            monthlyInvestReqd,
          } = calculateGoalInvestBtn(
            Number(currentAge.value),
            Number(educationAge.value),
            Number(academicCorpus.value),
            Number(rate.value) / 100,
            Number(inflation.value) / 100,
            Number(amountInvest.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Educational Planning Details</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Future Cost Of Child\'s Education ' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(futureCost)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Appreciation Of Investments Made Today </th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(investAppAmt)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Deficit Corpus</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(deficitCorpus)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Lumpsum Funding Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(lumpSumAmt)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Monthly Investment Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(monthlyInvestReqd)) +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please Fill In Values For Child's Current Age, College-Going Age, Academic Corpus, Inflation, Current Investment Amount & Rate Of Return";
        modalBtn.click();
      }
      break;
    case "marriageInvestBtn":
      e.preventDefault();
      currentAge = document.getElementById("currentAge");
      marriageAge = document.getElementById("marriageAge");
      marriageCorpus = document.getElementById("marriageCorpus");
      rate = document.getElementById("rateOfReturn");
      inflation = document.getElementById("inflationRate");
      amountInvest = document.getElementById("currentInvestAmt");
      snapshotDiv = document.getElementById("snapshotDiv");
      if (
        currentAge.value !== "" &&
        marriageAge.value !== "" &&
        marriageCorpus.value !== "" &&
        rate.value !== "" &&
        inflation.value !== "" &&
        amountInvest.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentAge.value) &&
            isNotNumeric(marriageAge.value) &&
            isNotNumeric(marriageCorpus.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(inflation.value) &&
            isNotNumeric(amountInvest.value)
          )
        ) {
          explainPara.innerText =
            "Please Input Only Numeric Values For Child's Current Age, Marriage Age, Marriage Corpus, Inflation, Current Investment Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let {
            futureCost,
            investAppAmt,
            deficitCorpus,
            lumpSumAmt,
            monthlyInvestReqd,
          } = calculateGoalInvestBtn(
            Number(currentAge.value),
            Number(marriageAge.value),
            Number(marriageCorpus.value),
            Number(rate.value) / 100,
            Number(inflation.value) / 100,
            Number(amountInvest.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Marriage Planning Details</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Future Cost Of Child\'s Marriage ' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(futureCost)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Appreciation Of Investments Made Today </th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(investAppAmt)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Deficit Corpus</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(deficitCorpus)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Lumpsum Funding Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(lumpSumAmt)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Monthly Investment Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(monthlyInvestReqd)) +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please Fill In Values For Child's Current Age, Marriage Age, Academic Corpus, Inflation, Current Investment Amount & Rate Of Return";
        modalBtn.click();
      }
      break;
    case "houseInvestBtn":
      e.preventDefault();
      currentAge = document.getElementById("currentAge");
      houseAge = document.getElementById("houseAge");
      houseCorpus = document.getElementById("houseCorpus");
      rate = document.getElementById("rateOfReturn");
      inflation = document.getElementById("inflationRate");
      amountInvest = document.getElementById("currentInvestAmt");
      snapshotDiv = document.getElementById("snapshotDiv");
      if (
        currentAge.value !== "" &&
        houseAge.value !== "" &&
        houseCorpus.value !== "" &&
        rate.value !== "" &&
        inflation.value !== "" &&
        amountInvest.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentAge.value) &&
            isNotNumeric(houseAge.value) &&
            isNotNumeric(houseCorpus.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(inflation.value) &&
            isNotNumeric(amountInvest.value)
          )
        ) {
          explainPara.innerText =
            "Please Input Only Numeric Values For Current Age, House Purchase Age, House Investment Corpus, Inflation, Current Investment Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let {
            futureCost,
            investAppAmt,
            deficitCorpus,
            lumpSumAmt,
            monthlyInvestReqd,
          } = calculateGoalInvestBtn(
            Number(currentAge.value),
            Number(houseAge.value),
            Number(houseCorpus.value),
            Number(rate.value) / 100,
            Number(inflation.value) / 100,
            Number(amountInvest.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">House Planning Details</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Future Cost Of House Construction ' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(futureCost)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Appreciation Of Investments Made Today </th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(investAppAmt)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Deficit Corpus</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(deficitCorpus)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Lumpsum Funding Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(lumpSumAmt)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Monthly Investment Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(monthlyInvestReqd)) +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please Fill In Values For Current Age, House Purchase Age, House Purchase Corpus, Inflation, Current Investment Amount & Rate Of Return";
        modalBtn.click();
      }
      break;
    case "carInvestBtn":
      e.preventDefault();
      currentAge = document.getElementById("currentAge");
      houseAge = document.getElementById("houseAge");
      houseCorpus = document.getElementById("houseCorpus");
      rate = document.getElementById("rateOfReturn");
      inflation = document.getElementById("inflationRate");
      amountInvest = document.getElementById("currentInvestAmt");
      snapshotDiv = document.getElementById("snapshotDiv");
      if (
        currentAge.value !== "" &&
        houseAge.value !== "" &&
        houseCorpus.value !== "" &&
        rate.value !== "" &&
        inflation.value !== "" &&
        amountInvest.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentAge.value) &&
            isNotNumeric(houseAge.value) &&
            isNotNumeric(houseCorpus.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(inflation.value) &&
            isNotNumeric(amountInvest.value)
          )
        ) {
          explainPara.innerText =
            "Please Input Only Numeric Values For Current Age, Car Purchase Age, Car Investment Corpus, Inflation, Current Investment Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let {
            futureCost,
            investAppAmt,
            deficitCorpus,
            lumpSumAmt,
            monthlyInvestReqd,
          } = calculateGoalInvestBtn(
            Number(currentAge.value),
            Number(houseAge.value),
            Number(houseCorpus.value),
            Number(rate.value) / 100,
            Number(inflation.value) / 100,
            Number(amountInvest.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Dream Car Details</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Future Cost Of Car ' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(futureCost)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Appreciation Of Investments Made Today </th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(investAppAmt)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Deficit Corpus</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(deficitCorpus)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Lumpsum Funding Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(lumpSumAmt)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Monthly Investment Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(monthlyInvestReqd)) +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please Fill In Values For Current Age, Car Purchase Age, Car Purchase Corpus, Inflation, Current Investment Amount & Rate Of Return";
        modalBtn.click();
      }
      break;
    case "vacationInvestBtn":
      e.preventDefault();
      currentAge = document.getElementById("currentAge");
      houseAge = document.getElementById("houseAge");
      houseCorpus = document.getElementById("houseCorpus");
      rate = document.getElementById("rateOfReturn");
      inflation = document.getElementById("inflationRate");
      amountInvest = document.getElementById("currentInvestAmt");
      snapshotDiv = document.getElementById("snapshotDiv");
      if (
        currentAge.value !== "" &&
        houseAge.value !== "" &&
        houseCorpus.value !== "" &&
        rate.value !== "" &&
        inflation.value !== "" &&
        amountInvest.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentAge.value) &&
            isNotNumeric(houseAge.value) &&
            isNotNumeric(houseCorpus.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(inflation.value) &&
            isNotNumeric(amountInvest.value)
          )
        ) {
          explainPara.innerText =
            "Please Input Only Numeric Values For Current Age, Age of Vacation, Vacation Investment Corpus, Inflation, Current Investment Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let {
            futureCost,
            investAppAmt,
            deficitCorpus,
            lumpSumAmt,
            monthlyInvestReqd,
          } = calculateGoalInvestBtn(
            Number(currentAge.value),
            Number(houseAge.value),
            Number(houseCorpus.value),
            Number(rate.value) / 100,
            Number(inflation.value) / 100,
            Number(amountInvest.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Dream Vacation Details</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Future Cost Of Vacation ' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(futureCost)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Appreciation Of Investments Made Today </th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(investAppAmt)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Deficit Corpus</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(deficitCorpus)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Lumpsum Funding Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(lumpSumAmt)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Monthly Investment Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(monthlyInvestReqd)) +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please Fill In Values For Current Age, Age for Vacation, Vacation Purchase Corpus, Inflation, Current Investment Amount & Rate Of Return";
        modalBtn.click();
      }
      break;
    case "businessInvestBtn":
      e.preventDefault();
      currentAge = document.getElementById("currentAge");
      businessAge = document.getElementById("businessAge");
      businessCorpus = document.getElementById("businessCorpus");
      rate = document.getElementById("rateOfReturn");
      inflation = document.getElementById("inflationRate");
      amountInvest = document.getElementById("currentInvestAmt");
      snapshotDiv = document.getElementById("snapshotDiv");
      if (
        currentAge.value !== "" &&
        businessAge.value !== "" &&
        businessCorpus.value !== "" &&
        rate.value !== "" &&
        inflation.value !== "" &&
        amountInvest.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentAge.value) &&
            isNotNumeric(businessAge.value) &&
            isNotNumeric(businessCorpus.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(inflation.value) &&
            isNotNumeric(amountInvest.value)
          )
        ) {
          explainPara.innerText =
            "Please Input Only Numeric Values For Current Age, Business Creation Age, Business Investment Corpus, Inflation, Current Investment Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let {
            futureCost,
            investAppAmt,
            deficitCorpus,
            lumpSumAmt,
            monthlyInvestReqd,
          } = calculateGoalInvestBtn(
            Number(currentAge.value),
            Number(businessAge.value),
            Number(businessCorpus.value),
            Number(rate.value) / 100,
            Number(inflation.value) / 100,
            Number(amountInvest.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Business Planning Details</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Future Capital Requirements Of Business' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(futureCost)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Appreciation Of Investments Made Today </th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(investAppAmt)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Deficit Corpus</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(deficitCorpus)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Lumpsum Funding Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(lumpSumAmt)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Monthly Investment Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(monthlyInvestReqd)) +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please Fill In Values For Current Age, Business Investment Age, Business Investment Corpus, Inflation, Current Investment Amount & Rate Of Return";
        modalBtn.click();
      }
      break;
    case "retirementInvestBtn":
      e.preventDefault();
      currentAge = document.getElementById("currentAge");
      retirementAge = document.getElementById("retirementAge");
      preRetirementReturn = document.getElementById("returnPreRetirement");
      postRetirementReturn = document.getElementById("returnPostRetirement");
      inflation = document.getElementById("inflationRate");
      lifeExpectancy = document.getElementById("lifeExpectancy");
      monthlyExpense = document.getElementById("monthlyExpense");
      snapshotDiv = document.getElementById("snapshotDiv");
      if (
        currentAge.value !== "" &&
        retirementAge.value !== "" &&
        monthlyExpense.value !== "" &&
        preRetirementReturn.value !== "" &&
        inflation.value !== "" &&
        postRetirementReturn.value !== "" &&
        lifeExpectancy.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentAge.value) &&
            isNotNumeric(retirementAge.value) &&
            isNotNumeric(monthlyExpense.value) &&
            isNotNumeric(preRetirementReturn.value) &&
            isNotNumeric(inflation.value) &&
            isNotNumeric(postRetirementReturn.value) &&
            isNotNumeric(lifeExpectancy.value)
          )
        ) {
          explainPara.innerText =
            "Please Input Only Numeric Values For  Current Age, Retirement Age, Life Expectancy, Current Monthly Expense, Pre-Retirement Return Rate, Post-Retirement Return Rate & Inflation";
          modalBtn.click();
        } else {
          let {
            monthlyRequirementAtRetirement,
            corpusAtRetirement,
            monthlySIPAmtForInvestment,
          } = calculateRetirementGoal(
            Number(currentAge.value),
            Number(retirementAge.value),
            Number(inflation.value) / 100,
            Number(monthlyExpense.value),
            Number(preRetirementReturn.value) / 100,
            Number(postRetirementReturn.value) / 100,
            Number(lifeExpectancy.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Retirement Planning Details</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Future Corpus Requirements For Retirement' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(corpusAtRetirement)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Monthly Expenses After Retirement </th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(
              Math.round(monthlyRequirementAtRetirement)
            ) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Monthly SIP To Reach Retirement Corpus</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(
              Math.round(monthlySIPAmtForInvestment)
            ) +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please Fill In Values For  Current Age, Retirement Age, Life Expectancy, Current Monthly Expense, Pre-Retirement Return Rate, Post-Retirement Return Rate & Inflation";
        modalBtn.click();
      }
      break;
    case "emergencyInvestBtn":
      e.preventDefault();
      currentAge = document.getElementById("currentAge");
      emergencyAge = document.getElementById("emergencyAge");
      emergencyCorpus = document.getElementById("emergencyCorpus");
      rate = document.getElementById("rateOfReturn");
      inflation = document.getElementById("inflationRate");
      amountInvest = document.getElementById("currentInvestAmt");
      snapshotDiv = document.getElementById("snapshotDiv");
      if (
        currentAge.value !== "" &&
        emergencyAge.value !== "" &&
        emergencyCorpus.value !== "" &&
        rate.value !== "" &&
        inflation.value !== "" &&
        amountInvest.value !== ""
      ) {
        if (
          !(
            isNotNumeric(currentAge.value) &&
            isNotNumeric(emergencyAge.value) &&
            isNotNumeric(emergencyCorpus.value) &&
            isNotNumeric(rate.value) &&
            isNotNumeric(inflation.value) &&
            isNotNumeric(amountInvest.value)
          )
        ) {
          explainPara.innerText =
            "Please Input Only Numeric Values For Current Age, Emergency Age, Emergency Corpus, Inflation, Current Investment Amount & Rate Of Return";
          modalBtn.click();
        } else {
          let {
            futureCost,
            investAppAmt,
            deficitCorpus,
            lumpSumAmt,
            monthlyInvestReqd,
          } = calculateGoalInvestBtn(
            Number(currentAge.value),
            Number(emergencyAge.value),
            Number(emergencyCorpus.value),
            Number(rate.value) / 100,
            Number(inflation.value) / 100,
            Number(amountInvest.value)
          );
          snapshotDiv.style = 'display:"block"';
          resultHeader = document.getElementById("resultHeader");
          resultHeader.innerHTML =
            '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Emergency Planning Details</h5>';
          showOutput = document.getElementById("showOutput");
          showOutput.innerHTML =
            '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
            '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
            '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
            '<tr><th scope="col" class="px-6 py-3">Future Corpus Requirements For Emergency' +
            "</th>" +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(futureCost)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Appreciation Of Investments Made Today </th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(investAppAmt)) +
            "</th>" +
            '</tr><tr><th scope="col" class="px-6 py-3">Deficit Corpus</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(deficitCorpus)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Lumpsum Funding Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(lumpSumAmt)) +
            '</tr><tr><th scope="col" class="px-6 py-3 text-red-500">Monthly Investment Required</th>' +
            '<th scope="col" class="px-6 py-3"> ₹' +
            Intl.NumberFormat("en-IN").format(Math.round(monthlyInvestReqd)) +
            "</tr></thead></table></div>";
          scrollToElement("resultHeader");
        }
      } else {
        explainPara.innerText =
          "Please Fill In Values For Current Age, Emergency Age, Emergency Corpus, Inflation, Current Investment Amount & Rate Of Return";
        modalBtn.click();
      }
      break;
    default:
      break;
  }
});
