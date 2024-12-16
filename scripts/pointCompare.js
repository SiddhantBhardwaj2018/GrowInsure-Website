let outputTblDiv = document.getElementById("outputTbl");
let searchBtn = document.getElementById("searchBtn");

const fetchPointToPointData = async (
  fundHouse,
  schemeType,
  previousDate,
  nextDate
) => {

    outputTblDiv.innerHTML = ` <div role="status" style="margin: 2%">
    <div class="grid items-center">
      <div style="margin: 2% 50%">
        <svg
          aria-hidden="true"
          class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
      <blockquote
        class="text-md text-center italic font-semibold text-gray-900 dark:text-white"
      >
        <p>
          Calculation For NAV & Sensex Returns Might Take Some Time ! Please
          wait for 10-15 seconds !
        </p>
      </blockquote>
    </div>
  </div>`;  

  let response = await fetch(
    `https://operations.webclass.in/api/navCalculator/getSchemePointView`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fundHouse,
        schemeType,
        previousDate,
        nextDate,
      }),
    }
  );

  

  if (response.ok) {
    let data = await response.json();
    console.log(data["navSensexReturnList"]);
    if (data["navSensexReturnList"] && data["navSensexReturnList"].length > 0) {
      let tableHtml = `<div id="dataTable" class="relative overflow-x-auto">
        <table id="firstTbl" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-red-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="text-left px-6 py-3">
                        Scheme Name
                    </th>
                    <th scope="col" class="text-center px-6 py-3">
                        Performance (%)
                    </th>
                    <th scope="col" class="text-center px-6 py-3">
                        Sensex (%)
                    </th>
                </tr>
            </thead><tbody>`;

      data["navSensexReturnList"].forEach((navSensexReturn) => {
        tableHtml += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="text-left px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white">
                        ${navSensexReturn.schemeName}
                    </th>
                    <td class="text-center font-bold px-6 py-4 ${
                      navSensexReturn.navReturn < navSensexReturn.sensexReturn
                        ? "bg-red-300"
                        : navSensexReturn.navReturn >
                          navSensexReturn.sensexReturn
                        ? "bg-green-300"
                        : ""
                    }">
                        ${navSensexReturn.navReturn}
                    </td>
                    <td class="text-center font-bold px-6 py-4">
                    ${navSensexReturn.sensexReturn}
                    </td>
                </tr>`;
      });

      tableHtml += `</tbody>
      </table>
  </div>
  `;

      outputTblDiv.innerHTML = tableHtml;
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

document.getElementById("fundHouse").addEventListener("change", () => {
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
});

searchBtn.addEventListener('click',() => {
    let fundHouse = document.getElementById("fundHouse").value;
    let schemeType = document.getElementById("schemeType").value;
    let fromDt =  document.getElementById("fromDate").value;
    let toDt = document.getElementById("toDate").value;
    fetchPointToPointData(fundHouse,schemeType,fromDt,toDt);
})


window.addEventListener("load", () => {
  fetchPointToPointData(
    "All",
    "Open Ended Schemes ( Equity Scheme - Dividend Yield Fund )",
    "10/01/2020",
    "12/02/2024"
  );
});