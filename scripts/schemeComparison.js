let schemeList = document.getElementById("schemeList");
let schemeType = document.getElementById("schemeType");
let fundHouse = document.getElementById("fundHouse");
let searchBtn = document.getElementById("searchBtn");
let outputTblDiv = document.getElementById("outputTbl");

const initializeCheckboxListeners = () => {
  const checkboxes = document.querySelectorAll(
    '#schemeList input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
};

const handleCheckboxChange = (e) => {
  updateCheckboxState();
};

const updateCheckboxState = () => {
  const checkboxes = document.querySelectorAll(
    '#schemeList input[type="checkbox"]'
  );
  const checkedCheckboxes = document.querySelectorAll(
    '#schemeList input[type="checkbox"]:checked'
  );
  if (checkedCheckboxes.length >= 20) {
    checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.disabled = true;
      }
    });
  } else {
    checkboxes.forEach((checkbox) => {
      checkbox.disabled = false;
    });
  }
};

const getCheckedBoxes = () => {
  const checkboxes = document.querySelectorAll(
    '#schemeList input[type="checkbox"]'
  );
  const checkedBoxes = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedBoxes.push(checkbox.value);
    }
  });
  return checkedBoxes;
};

const fetchSchemeList = async (schemeType, fundHouse) => {
  let response = await fetch(
    `https://operations.webclass.in/api/navCalculator/getSchemeList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fundHouse,
        schemeType,
      }),
    }
  );
  schemeList.innerHTML = "";
  if (response.ok) {
    let data = await response.json();
    if (data["schemeList"].length > 0) {
      schemeList.innerHTML += `
         <li>
               <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                   <label for="checkbox-item-17" class="w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">Select Upto 20 Schemes</label>
               </div>
           </li>`;
      let i = 1;
      data["schemeList"].forEach((scheme) => {
        schemeList.innerHTML += `
            <li>
               <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                   <input id="checkbox-item-${i}" type="checkbox" value="${scheme}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                   <label for="checkbox-item-${i}" class="w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">${scheme}</label>
               </div>
           </li>
           `;
        i += 1;
      });
      initializeCheckboxListeners();
    } else {
      schemeList.innerHTML = `
         <li>
               <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                   <label for="checkbox-item-17" class="w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">No Schemes Available</label>
               </div>
           </li>`;
    }
  }
};

const fetchSchemePerformanceList = async (schemeList) => {
  let response = await fetch(
    `https://operations.webclass.in/api/navCalculator/getSchemePerformanceList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schemeList,
      }),
    }
  );

  if (response.ok) {
    let data = await response.json();
    if (data["schemeList"].length > 0) {
      let tableHtml = `<div id="dataTable" class="relative overflow-x-auto">
      <table id="firstTbl" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-red-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" class="text-left px-4 py-3">
                    Scheme Name
                </th>
                <th scope="col" class="text-center px-4 py-3">
                    1 Yr (%)
                </th>
                <th scope="col" class="text-center px-4 py-3">
                    3 Yr (%)
                </th>
                <th scope="col" class="text-center px-4 py-3">
                    5 Yr (%)
                </th>
                <th scope="col" class="text-center px-4 py-3">
                    10 Yr (%)
                </th>
                 <th scope="col" class="text-center px-4 py-3">
                    Inception (%)
                </th>
                <th scope="col" class="text-center px-4 py-3">
                    SD
                </th>
                <th scope="col" class="text-center px-4 py-3">
                    Beta
                </th>
                 <th scope="col" class="text-center px-4 py-3">
                    Alpha
                </th>
                <th scope="col" class="text-center px-4 py-3">
                    Jensen's Alpha
                </th>
                <th scope="col" class="text-center px-4 py-3">
                    Sharpe
                    Ratio
                </th>
                 <th scope="col" class="text-center px-4 py-3">
                    Treynor
                    Ratio
                </th>
                 <th scope="col" class="text-center px-4 py-3">
                    Sortino
                    Ratio
                </th>
            </tr>
            </thead>
            <tbody>`;
      data["schemeList"].forEach((scheme) => {
        tableHtml += `
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="text-left px-4 py-4 font-medium text-gray-900 whitespace-normal dark:text-white">
               ${scheme.schemeName}
            </th>
            <td class="font-bold text-gray-900 px-4 py-4 ${
              data["maxOneYear"] !== null &&
              data["maxOneYear"] == scheme.oneYearReturn
                ? "bg-green-300"
                : ""
            }">
                        ${
                          scheme.oneYearReturn !== null
                            ? scheme.oneYearReturn
                            : "-"
                        }
                    </td>
                    <td class="font-bold text-gray-900  px-4 py-4  ${
                      data["maxThreeYear"] !== null &&
                      data["maxThreeYear"] == scheme.threeYearReturn
                        ? "bg-green-300"
                        : ""
                    } ">
                    ${
                      scheme.threeYearReturn !== null
                        ? scheme.threeYearReturn
                        : "-"
                    }
                    </td>
                    <td class="font-bold text-gray-900  px-4 py-4 ${
                      data["maxFiveYear"] !== null &&
                      data["maxFiveYear"] == scheme.fiveYearReturn
                        ? "bg-green-300"
                        : ""
                    } ">
                    ${
                      scheme.fiveYearReturn !== null
                        ? scheme.fiveYearReturn
                        : "-"
                    }
                    </td>
                     <td class="font-bold text-gray-900  px-4 py-4 ${
                       data["maxTenYear"] !== null &&
                       data["maxTenYear"] == scheme.tenYearReturn
                         ? "bg-green-300"
                         : ""
                     }">
                    ${
                      scheme.tenYearReturn !== null ? scheme.tenYearReturn : "-"
                    }
                    </td>
                     <td class="font-bold text-gray-900  px-4 py-4 ${
                       data["maxInception"] !== null &&
                       data["maxInception"] == scheme.inceptionReturn
                         ? "bg-green-300"
                         : ""
                     }">
                    ${
                      scheme.inceptionReturn !== null
                        ? scheme.inceptionReturn
                        : "-"
                    }
                    </td>
                    <td class="font-bold text-gray-900  px-4 py-4 ${
                      data["minSD"] !== null && data["minSD"] == scheme.schemeSD
                        ? "bg-green-300"
                        : ""
                    }">
                    ${scheme.schemeSD !== null ? scheme.schemeSD : "-"}
                    </td>
                    <td class="font-bold text-gray-900  px-4 py-4  ${
                      data["minBeta"] !== null &&
                      data["minBeta"] == scheme.schemeBeta
                        ? "bg-green-300"
                        : ""
                    } ">
                    ${scheme.schemeBeta !== null ? scheme.schemeBeta : "-"}
                    </td>
                     <td class="font-bold text-gray-900  px-4 py-4  ${
                       data["maxAlpha"] !== null &&
                       data["maxAlpha"] == scheme.alpha
                         ? "bg-green-300"
                         : ""
                     }">
                    ${scheme.alpha !== null ? scheme.alpha : "-"}
                    </td>
                    <td class="font-bold text-gray-900  px-4 py-4 ${
                      data["maxJensenAlpha"] !== null &&
                      data["maxJensenAlpha"] == scheme.jensenAlpha
                        ? "bg-green-300"
                        : ""
                    } ">
                    ${scheme.jensenAlpha !== null ? scheme.jensenAlpha : "-"}
                    </td>
                     <td class="font-bold text-gray-900  px-4 py-4 ${
                       data["maxSharpe"] !== null &&
                       data["maxSharpe"] == scheme.sharpeRatio
                         ? "bg-green-300"
                         : ""
                     }">
                    ${scheme.sharpeRatio !== null ? scheme.sharpeRatio : "-"}
                    </td>
                     <td class="font-bold text-gray-900  px-4 py-4  ${
                       data["maxTreynor"] !== null &&
                       data["maxTreynor"] == scheme.treynorRatio
                         ? "bg-green-300"
                         : ""
                     }">
                    ${scheme.treynorRatio !== null ? scheme.treynorRatio : "-"}
                    </td>
                      <td class="font-bold text-gray-900  px-4 py-4  ${
                        data["maxSortino"] !== null &&
                        data["maxSortino"] == scheme.sortinoRatio
                          ? "bg-green-300"
                          : ""
                      } ">
                    ${scheme.sortinoRatio !== null ? scheme.sortinoRatio : "-"}
                    </td>
          </tr>
        `;
      });
      tableHtml += `</tbody></table>`;
      outputTblDiv.innerHTML = tableHtml;
      let emailForm = document.getElementById("emailForm");
      emailForm.style = `display:block;`;
    } else {
      let noDataHtml = `<blockquote class="text-xl text-center italic font-semibold text-gray-900 dark:text-white">
    <p>Oops ! We could not find any data for this criteria !</p>
</blockquote>`;
      outputTblDiv.innerHTML = noDataHtml;
    }
  } else {
    let noDataHtml = `<blockquote class="text-xl text-center italic font-semibold text-gray-900 dark:text-white">
    <p>Oops ! We could not find any data for this criteria !</p>
</blockquote>`;
    outputTblDiv.innerHTML = noDataHtml;
  }
};

fundHouse.addEventListener("change", () => {
  let schemeTypeAll = document.getElementById("schemeTypeAll");
  console.log(fundHouse.value);
  if (fundHouse.value == "All") {
    schemeTypeAll.style = "display:none;";
    if (schemeType.value == "All") {
      schemeType.value =
        "Open Ended Schemes ( Equity Scheme - Large Cap Fund )";
    }
  } else {
    schemeTypeAll.style = "";
  }
  fetchSchemeList(schemeType.value, fundHouse.value);
});

schemeType.addEventListener("change", () => {
  fetchSchemeList(schemeType.value, fundHouse.value);
});

searchBtn.addEventListener("click", () => {
  let checkBoxList = getCheckedBoxes();
  fetchSchemePerformanceList(checkBoxList);
});

window.addEventListener("load", () => {
  fetchSchemeList(
    "Open Ended Schemes ( Equity Scheme - Large Cap Fund )",
    "All"
  );
});