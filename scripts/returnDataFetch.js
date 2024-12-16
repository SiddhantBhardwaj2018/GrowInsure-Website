let outputTblDiv = document.getElementById("outputTbl");
let searchBtn = document.getElementById("searchBtn");
let totalPageItems = [];
let startIdx = 0;
let endIdx = 0;

const fetchNavData = async (fundHouse, schemeType, timePeriod, offset = 0) => {
  let response = await fetch(
    `https://operations.webclass.in/api/navCalculator/getSchemeReturnsView`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fundHouse,
        schemeType,
        timePeriod,
        offset,
      }),
    }
  );

  if (response.ok) {
    let data = await response.json();
    if (data["schemeList"].length > 0) {
      let tableHtml =
        `<div id="dataTable" class="relative overflow-x-auto">
        <table id="firstTbl" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-red-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="text-gray-900 px-6 py-3">
                        Scheme Name
                    </th>
                    <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (timePeriod == "1" ? "bg-red-300" : "") +
        `">
                        1 Year (%)
                    </th>
                    <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (timePeriod == "3" ? "bg-red-300" : "") +
        `">
                        3 Years (%)
                    </th>
                    <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (timePeriod == "5" ? "bg-red-300" : "") +
        `">
                        5 Years (%)
                    </th>
                    <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (timePeriod == "10" ? "bg-red-300" : "") +
        `">
                        10 Years (%)
                    </th>
                    <th scope="col" class="text-gray-900 px-6 py-3 ` +
        (timePeriod == "Inception" ? "bg-red-300" : "") +
        `">
                        Inception (%)
                    </th>
                </tr>
            </thead><tbody>`;
      data["schemeList"].forEach((scheme) => {
        tableHtml += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-bold text-gray-900 whitespace-normal dark:text-white">
                        ${scheme.schemeName}
                    </th>
                    <td class="font-bold text-gray-900 px-6 py-4 ${
                      timePeriod == "1" ? "bg-red-300" : ""
                    }">
                        ${
                          scheme.oneYearReturn !== null
                            ? scheme.oneYearReturn
                            : "-"
                        }
                    </td>
                    <td class="font-bold text-gray-900  px-6 py-4 ${
                      timePeriod == "3" ? "bg-red-300" : ""
                    }">
                    ${
                      scheme.threeYearReturn !== null
                        ? scheme.threeYearReturn
                        : "-"
                    }
                    </td>
                    <td class="font-bold text-gray-900  px-6 py-4 ${
                      timePeriod == "5" ? "bg-red-300" : ""
                    }">
                    ${
                      scheme.fiveYearReturn !== null
                        ? scheme.fiveYearReturn
                        : "-"
                    }
                    </td>
                     <td class="font-bold text-gray-900  px-6 py-4 ${
                       timePeriod == "10" ? "bg-red-300" : ""
                     }">
                    ${
                      scheme.tenYearReturn !== null ? scheme.tenYearReturn : "-"
                    }
                    </td>
                     <td class="font-bold text-gray-900  px-6 py-4 ${
                       timePeriod == "Inception" ? "bg-red-300" : ""
                     }">
                    ${
                      scheme.inceptionReturn !== null
                        ? scheme.inceptionReturn
                        : "-"
                    }
                    </td>
                </tr>`;
      });

      tableHtml += `</tbody>
        </table>
    </div>
    `;
      outputTblDiv.innerHTML = tableHtml;

      if (data["totalSchemeCount"] > 0) {
        let pageItems = Math.ceil(data["totalSchemeCount"] / 10);
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
                  timePeriod +
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
                timePeriod +
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
                  timePeriod +
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
  let timePeriod = document.getElementById("timePeriod").value;
  startIdx = 0;
  endIdx = 0;
  fetchNavData(fundHouse, schemeType, timePeriod);
});

const onClickNumBtn = (offset, fundHouse, schemeType, timePeriod) => {
  fetchNavData(fundHouse, schemeType, timePeriod, offset - 1);
};

const onClickNextBtn = (fundHouse, schemeType, timePeriod) => {
  if (endIdx < totalPageItems.length) {
    startIdx = endIdx;
    endIdx =
      totalPageItems.length > startIdx + 5
        ? startIdx + 5
        : totalPageItems.length;
    fetchNavData(fundHouse, schemeType, timePeriod, startIdx);
  }
};

const onClickPrevBtn = (fundHouse, schemeType, timePeriod) => {
  if (startIdx > -1) {
    endIdx = startIdx;
    startIdx = endIdx - 5;
    fetchNavData(fundHouse, schemeType, timePeriod, endIdx - 1);
  }
};

window.addEventListener("load", () => {
  fetchNavData(
    "All",
    "Open Ended Schemes ( Equity Scheme - Large Cap Fund )",
    "All"
  );
});