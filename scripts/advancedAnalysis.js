let outputTblDiv = document.getElementById("outputTbl");
let searchBtn = document.getElementById("searchBtn");
let totalPageItems = [];
let startIdx = 0;
let endIdx = 0;

const fetchAdvancedNavData = async (
  fundHouse,
  schemeType,
  indicator,
  offset = 0
) => {
  let response = await fetch(
    `https://operations.webclass.in/api/navCalculator/getSchemeAdvancedAnalysis`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fundHouse,
        schemeType,
        indicator,
        offset,
      }),
    }
  );

  if (response.ok) {
    let data = await response.json();
    if (data["advancedSchemeViewList"].length > 0) {
      let tableHtml =
        `<div id="dataTable" class="relative overflow-x-auto">
          <table id="firstTbl" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-red-300 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="text-gray-900 px-6 py-3">
                          Scheme Name
                      </th>
                      <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (indicator == "sd" ? "bg-red-300" : "") +
        `">
                          SD
                      </th>
                      <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (indicator == "beta" ? "bg-red-300" : "") +
        `">
                          Beta
                      </th>
                      <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (indicator == "alpha" ? "bg-red-300" : "") +
        `">
                          Alpha
                      </th>
                      <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (indicator == "jensen_alpha" ? "bg-red-300" : "") +
        `">
                          Jensen's Alpha
                      </th>
                      <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (indicator == "sharpe_ratio" ? "bg-red-300" : "") +
        `">
                          Sharpe Ratio
                      </th>
                      <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (indicator == "treynor_ratio" ? "bg-red-300" : "") +
        `">
                          Treynor Ratio
                      </th>
                       <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (indicator == "sortino_ratio" ? "bg-red-300" : "") +
        `">
                          Sortino Ratio
                      </th>
                  </tr>
              </thead><tbody>`;
      data["advancedSchemeViewList"].forEach((scheme) => {
        tableHtml += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-bold text-gray-900  whitespace-normal dark:text-white">
                          ${scheme.schemeName}
                      </th>
                      <td class="font-bold text-gray-900 px-6 py-4 ${
                        indicator == "sd" ? "bg-red-300" : ""
                      }">
                          ${
                            scheme.standardDeviation !== null
                              ? scheme.standardDeviation
                              : "-"
                          }
                      </td>
                      <td class="font-bold text-gray-900 px-6 py-4 ${
                        indicator == "beta" ? "bg-red-300" : ""
                      }">
                      ${scheme.beta !== null ? scheme.beta : "-"}
                      </td>
                      <td class="font-bold text-gray-900 px-6 py-4 ${
                        indicator == "alpha" ? "bg-red-300" : ""
                      }">
                      ${scheme.alpha !== null ? scheme.alpha : "-"}
                      </td>
                       <td class="font-bold text-gray-900 px-6 py-4 ${
                         indicator == "jensen_alpha" ? "bg-red-300" : ""
                       }">
                      ${scheme.jensenAlpha !== null ? scheme.jensenAlpha : "-"}
                      </td>
                       <td class="font-bold text-gray-900 px-6 py-4 ${
                         indicator == "sharpe_ratio" ? "bg-red-300" : ""
                       }">
                      ${scheme.sharpeRatio !== null ? scheme.sharpeRatio : "-"}
                      </td>
                       <td class="font-bold text-gray-900 px-6 py-4 ${
                         indicator == "treynor_ratio" ? "bg-red-300" : ""
                       }">
                      ${
                        scheme.treynorRatio !== null ? scheme.treynorRatio : "-"
                      }
                      </td>
                      <td class="font-bold text-gray-900 px-6 py-4 ${
                        indicator == "sortino_ratio" ? "bg-red-300" : ""
                      }">
                      ${
                        scheme.sortinoRatio !== null ? scheme.sortinoRatio : "-"
                      }
                      </td>
                  </tr>`;
      });

      tableHtml += `</tbody>
          </table>
      </div>
      `;
      outputTblDiv.innerHTML = tableHtml;

      if (data["totalAdvancedSchemeCount"] > 0) {
        let pageItems = Math.ceil(data["totalAdvancedSchemeCount"] / 10);
        totalPageItems = [];
        for (let i = 0; i < pageItems; i++) {
          totalPageItems.push(i + 1);
        }
        if (totalPageItems.length > 0) {
          if (endIdx == 0) {
            endIdx = totalPageItems.length > 5 ? 5 : totalPageItems.length;
          }

          let paginationHtml = ` <nav aria-label="Page navigation example">
            <ul class="flex justify-center mt-7 items-center -space-x-px h-10 text-base">`;
          let prevButton =
            totalPageItems.length > 1 && startIdx > 0
              ? `<li>
                <p
                  onClick="onClickPrevBtn(` +
                ("'" +
                  fundHouse +
                  "','" +
                  schemeType +
                  "','" +
                  indicator +
                  "'") +
                `)"
                  class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </p>
              </li>`
              : ``;
          let numBtns = ``;
          for (let i = startIdx; i < endIdx; i++) {
            numBtns +=
              `<li>
                <p 
                onClick="onClickNumBtn(${i + 1}` +
              (`,` +
                "'" +
                fundHouse +
                "','" +
                schemeType +
                "','" +
                indicator +
                "'") +
              `)"` +
              (i == offset ? `aria-current="page"` : ``) +
              `class="z-10 flex items-center justify-center px-4 h-10 leading-tight ` +
              (i == offset
                ? `text-blue-600 border border-blue-300 bg-blue-50`
                : `text-gray-500 bg-white border border-gray-300 bg-blue-50`) +
              `hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                ${i + 1}
                </p>
              </li>`;
          }

          let nextBtn =
            endIdx < totalPageItems.length
              ? `<li>
                <p
                  onClick="onClickNextBtn(` +
                ("'" +
                  fundHouse +
                  "','" +
                  schemeType +
                  "','" +
                  indicator +
                  "'") +
                `)"
                  class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </p>
              </li>
            </ul>
          </nav>`
              : `</ul>
          </nav>`;

          paginationHtml += prevButton + numBtns + nextBtn;
          outputTblDiv.innerHTML += paginationHtml;
        }
      }
    } else {
      let noDataHtml = `<blockquote class="text-xl text-center italic font-semibold text-gray-900 dark:text-white">
                  <p>Oops ! We could not find any data for this criteria !</p>
              </blockquote>`;
      outputTblDiv.innerHTML = noDataHtml;
    }

    // Assuming you want to set this HTML to an element with an
  } else {
    console.log(response.err);
  }
};

searchBtn.addEventListener("click", () => {
  let fundHouse = document.getElementById("fundHouse").value;
  let schemeType = document.getElementById("schemeType").value;
  let indicator = document.getElementById("indicator").value;
  console.log(fundHouse);
  startIdx = 0;
  endIdx = 0;
  fetchAdvancedNavData(fundHouse, schemeType, indicator);
});

const onClickNumBtn = (offset, fundHouse, schemeType, indicator) => {
  fetchAdvancedNavData(fundHouse, schemeType, indicator, offset - 1);
};

const onClickNextBtn = (fundHouse, schemeType, indicator) => {
  if (endIdx < totalPageItems.length) {
    startIdx = endIdx;
    endIdx =
      totalPageItems.length > startIdx + 5
        ? startIdx + 5
        : totalPageItems.length;
    fetchAdvancedNavData(fundHouse, schemeType, indicator, startIdx);
  }
};

const onClickPrevBtn = (fundHouse, schemeType, indicator) => {
  if (startIdx > -1) {
    endIdx = startIdx;
    startIdx = endIdx - 5;
    fetchAdvancedNavData(fundHouse, schemeType, indicator, endIdx - 1);
  }
};

window.addEventListener("load", () => {
    fetchAdvancedNavData(
      "All",
      "Open Ended Schemes ( Equity Scheme - Large Cap Fund )",
      "All"
    );
  });