/** @format */

// Function to get query parameters from the script URL
function getScriptQueryParams() {
  const scripts = document.getElementsByTagName("script");
  const currentScript = scripts[scripts.length - 1].src;
  const urlParams = new URL(currentScript).searchParams;
  return Object.fromEntries(urlParams.entries());
}

const valueParam = getScriptQueryParams().value;

// Convert base64 to blob
function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

document
  .getElementById("emailReportBtn")
  .addEventListener("click", function () {
    let emailAddress = document.getElementById("emailAddr").value;
    let explainPara = document.getElementById("explainPara");
    let modalBtn = document.getElementById("modalBtn");
    let resultHeader;
    let newTable;
    let sender = "GrowInsure";
    let type;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailAddress == "" || !emailRegex.test(emailAddress)) {
      explainPara.innerText =
        "Please Enter Valid Email Address to get the Scheme Return Report !";
      modalBtn.click();
    } else {
      if (
        valueParam == "education" ||
        valueParam == "marriage" ||
        valueParam == "retirement" ||
        valueParam == "house" ||
        valueParam == "business" ||
        valueParam == "emergency" ||
        valueParam == "swpCalc" ||
        valueParam == "sipCalc"
      ) {
        type =
          valueParam == "education"
            ? "Education Planning"
            : valueParam == "marriage"
            ? "Marriage Planning"
            : valueParam == "retirement"
            ? "Retirement Planning"
            : valueParam == "house"
            ? "House Planning"
            : valueParam == "business"
            ? "Business Planning"
            : valueParam == "emergency"
            ? "Emergency Planning"
            : valueParam == "swpCalc"
            ? "SWP Calculation Details"
            : valueParam == "sipCalc"
            ? "SIP Calculation Details"
            : "";
      } else {
        let tbl = document.getElementById("dataTable");
        ``;
        newTable = document.createElement("table");
        type =
          valueParam == "return"
            ? "MF Scheme Return Analysis"
            : valueParam == "pointCompare"
            ? "MF Scheme Volatility Analysis"
            : valueParam == "riskMetrics"
            ? "MF Scheme Risk Metrics"
            : valueParam == "schemeComparison"
            ? "MF Scheme Performance Comparison"
            : "";
        newTable.className = `w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`;
        newTable.innerHTML = `
              <thead class="text-xs text-white uppercase bg-blue-800 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th style="font-size:1rem;" class="text-white px-6 py-3 text-center align-middle">
                      From The Desk Of ${sender} - ${type} 
                    </th>
                  </tr>
                </thead>
          `;
        tbl.insertBefore(newTable, tbl.querySelector("#firstTbl"));
      }

      explainPara.innerText =
        "Please find " +
        type +
        " Report in the inbox of your email - " +
        emailAddress;
      modalBtn.click();
      html2canvas(document.querySelector("#dataTable"), {
        scale: 3,
        useCORS: true,
        scrollY: 0,
        scrollX: 0,
      }).then((canvas) => {
        let ctx = canvas.getContext("2d");
        let trimmedCanvas = document.createElement("canvas");
        let trimmedCtx = trimmedCanvas.getContext("2d");

        // Set new canvas dimensions
        trimmedCanvas.width = canvas.width;
        trimmedCanvas.height = canvas.height - 10; // Decrease height by 10px

        // Draw the trimmed part of the original canvas
        trimmedCtx.drawImage(
          canvas,
          0,
          10,
          canvas.width,
          canvas.height - 10,
          0,
          0,
          canvas.width,
          canvas.height - 10
        );

        // Get the trimmed image data
        let imgData = trimmedCanvas.toDataURL("image/jpeg");
        if (
          valueParam !== "education" &&
          valueParam !== "marriage" &&
          valueParam !== "retirement" &&
          valueParam !== "house" &&
          valueParam !== "business" &&
          valueParam !== "emergency" &&
          valueParam !== "sipCalc" && 
          valueParam != "swpCalc"
        ) {
          newTable.innerHTML = ``;
        }
        let imgBlob = dataURLtoBlob(imgData);
        console.log(imgBlob);
        const formData = new FormData();
        formData.append("file", imgBlob, "image.jpeg");
        formData.append("email", emailAddress);
        formData.append("type", type);
        formData.append("sender", sender);
        fetch(
          "https://operations.webclass.in/api/navCalculator/emailAnalysisReport",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    }
  });
