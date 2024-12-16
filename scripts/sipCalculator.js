/** @format */

let fundHouse = document.getElementById("fundHouse");
let datePicker = document.getElementById("datepicker-custom");

let schemeList = document.getElementById("schemeList");
let modalBtn = document.getElementById("modalBtn");
let explainPara = document.getElementById("explainPara");
let selectSchemes = document.getElementById("selectScheme");
let gridMargin = document.getElementById("gridMargin");

let searchBtn = document.getElementById("searchBtn");
let schemeListName = document.getElementById("schemeList");

let emailForm = document.getElementById("emailForm");
let resultHeader = document.getElementById("resultHeader");
let schemeType = document.getElementById("schemeType");

let lumpsumInput = document.getElementById("lumpsum-input");

let outputTbl = document.getElementById("outputTbl");

datePicker.addEventListener("changeDate", () => {
  const [investDay, investMonth, investYear] = datePicker.value.split("/");
  let investDate = new Date(`${investYear}-${investMonth}-${investDay}`);
  if (investDate > new Date()) {
    explainPara.innerText = "Please select Past Dates for SIP Calculator";
    modalBtn.click();
    datePicker.value = "";
  } else {
    if (fundHouse.value !== "" && schemeType.value !== "") {
      gridMargin.className = "gridMargin grid md:grid-cols-2 md:gap-6";
      selectSchemes.style = "text-align: center;display:none;";
      fetchSchemeList(schemeType.value, fundHouse.value);
    }
  }
});

const scrollToElement = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const rect = element.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - 130; // Adjusted offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const fetchSchemeList = async (schemeType, fundHouse, loading = false) => {
  resultHeader.innerHTML = "";
  outputTbl.innerHTML = "";
  emailForm.style = "display:none";
  if (datePicker.value == "") {
    explainPara.innerText =
      "Please input Date Of Investment Date Before Selecting Scheme";
    modalBtn.click();
  } else if (
    fundHouse == undefined ||
    schemeType == undefined ||
    fundHouse == "" ||
    schemeType == ""
  ) {
    explainPara.innerText = "Please ";
    modalBtn.click();
  } else {
    const [investDay, investMonth, investYear] = datePicker.value.split("/");
    let investDate = new Date(`${investYear}-${investMonth}-${investDay}`);
    investDate = `${investYear}-${investMonth}-${investDay}`;
    outputTbl.innerHTML = ` <div role="status">
        <div class="grid items-center">
          <div style="margin: 0.5% 50%">
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
              Fetching Schemes For Data From Investment Date
              And ${fundHouse}
            </p>
          </blockquote>
        </div>
      </div>`;
    let response = await fetch(
      `https://operations.webclass.in/api/navCalculator/getSchemeListForSIP`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fundHouse,
          investDate,
          schemeType,
        }),
      }
    );
    schemeList.innerHTML = "";
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      if (data["schemeList"].length > 0) {
        schemeList.innerHTML += `
                 <li>
                       <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                           <label for="checkbox-item-17" class="w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">Select Scheme</label>
                       </div>
                   </li>`;
        let i = 1;
        data["schemeList"].forEach((scheme) => {
          if (loading) {
            schemeList.innerHTML += `
                  <li>
                   <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                         <input id="scheme-option-${i}" type="radio" name="schemes" value="${scheme}" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                        <label for="scheme-option-${i}" class="w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">${scheme}</label>
                     </div>
                 </li>
                 `;
          } else {
            schemeList.innerHTML += `
                <li>
                 <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                       <input id="scheme-option-${i}" type="radio" name="schemes" value="${scheme}" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                      <label for="scheme-option-${i}" class="w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">${scheme}</label>
                   </div>
               </li>
               `;
          }
          i += 1;
        });
      } else {
        schemeList.innerHTML = `
                 <li>
                       <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                           <label for="checkbox-item-17" class="w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">No Schemes Available</label>
                       </div>
                   </li>`;
      }
    }
    gridMargin.className = "gridMargin grid md:grid-cols-3 md:gap-6";
    selectSchemes.style = "text-align: center;";
    outputTbl.innerHTML = ``;
  }
};

const calculateSIP = async (lumpsum, investDate, schemeName) => {
  emailForm.style = "display:none";
  resultHeader.innerHTML = "";
  outputTbl.innerHTML = ` <div role="status">
    <div class="grid items-center">
      <div style="margin: 1% 50%">
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
          Calculation  Might Take Some Time ! Please
          wait for 5-10 seconds !
        </p>
      </blockquote>
    </div>
  </div>`;
  let response = await fetch(
    `https://operations.webclass.in/api/navCalculator/calculateSIP`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lumpsum,
        investDate,
        schemeName,
      }),
    }
  );
  if (response.ok) {
    let data = await response.json();
    emailForm.style = 'display:"block"';
    const options = { day: "numeric", month: "short", year: "numeric" };
    let investmentDate = new Date(investDate).toLocaleDateString(
      "en-GB",
      options
    );
    resultHeader.innerHTML = `<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">SIP Calculation Details</h5> <h5 class="text-center text-lg font-semibold">${schemeName}</h5><h5 class="text-center text-lg font-semibold">From ${investmentDate} to Today</h5>`;
    outputTbl.innerHTML =
      '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
      '<table id="firstTbl" class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
      '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
      '<tr><th scope="col" class="px-6 py-3">Monthly SIP Investment ' +
      "</th>" +
      '<th scope="col" class="px-6 py-3"> ₹' +
      Intl.NumberFormat("en-IN").format(data.monthlySIP) +
      "</th>" +
      "</tr>" +
      '<tr><th scope="col" class="px-6 py-3">Total Amount of SIP Contribution ' +
      "</th>" +
      '<th scope="col" class="px-6 py-3"> ₹' +
      Intl.NumberFormat("en-IN").format(data.totalSIPAmt) +
      "</th>" +
      "</tr>" +
      '<tr><th scope="col" class="px-6 py-3">Present Value Of Investment ' +
      "</th>" +
      '<th scope="col" class="px-6 py-3"> ₹' +
      Intl.NumberFormat("en-IN").format(data.presentInvestValue) +
      "</th>" +
      '</tr><tr><th scope="col" class="px-6 py-3">Total SIP CAGR</th>' +
      '<th scope="col" class="px-6 py-3">' +
      Intl.NumberFormat("en-IN").format(data.sipCagr) +
      "%</th>" +
      "</tr></thead></table></div>";
    scrollToElement("resultHeader");
  } else {
    let noDataHtml = `<blockquote class="text-xl text-center italic font-semibold text-gray-900 dark:text-white">
                <p>Oops ! There was an error in the calculation !</p>
            </blockquote>`;
    outputTbl.innerHTML = noDataHtml;
  }
};

fundHouse.addEventListener("input", () => {
  if (
    schemeType.value != undefined &&
    schemeType.value != "" &&
    datePicker.value !== ""
  ) {
    gridMargin.className = "gridMargin grid md:grid-cols-2 md:gap-6";
    selectSchemes.style = "text-align: center;display:none;";
    fetchSchemeList(schemeType.value, fundHouse.value);
  }
});

schemeType.addEventListener("input", () => {
  if (
    fundHouse.value != undefined &&
    fundHouse.value != "" &&
    datePicker.value !== ""
  ) {
    gridMargin.className = "gridMargin grid md:grid-cols-2 md:gap-6";
    selectSchemes.style = "text-align: center;display:none;";
    fetchSchemeList(schemeType.value, fundHouse.value);
  }
});

searchBtn.addEventListener("click", () => {
  let selectSchemeNameElement = document.querySelector(
    'input[name="schemes"]:checked'
  );
  let selectSchemeName = null;
  if (selectSchemeNameElement) {
    selectSchemeName = selectSchemeNameElement.value;
    if (lumpsumInput.value !== "") {
      const [investDay, investMonth, investYear] = datePicker.value.split("/");
      let investDate = `${investYear}-${investMonth}-${investDay}`;
      calculateSIP(lumpsumInput.value, investDate, selectSchemeName);
    } else {
      explainPara.innerText =
        "Please enter SIP Investment Amount in order to calculate SIP";
      modalBtn.click();
    }
  } else {
    explainPara.innerText = "Please select scheme in order to calculate SIP";
    modalBtn.click();
  }
});
