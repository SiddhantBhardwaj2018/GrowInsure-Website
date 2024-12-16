/** @format */

let submitEvent = 0;

let toggleModalBtn = document.getElementById("modalBtn");
let errorDesc = document.getElementById("modalBody");

const scrollToElement = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const rect = element.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - 100; // Adjusted offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const calculateRiskScore = (
  age,
  investment,
  horizon,
  tolerance,
  react,
  experience,
  comfort,
  financialSituation,
  lossReaction,
  investmentReliance
) => {
  let totalScore = 0;
  switch (age) {
    case "More Than 60 Years":
      totalScore += 1;
      break;
    case "Less Than 60 Years":
      totalScore += 2;
      break;
    case "Less Than 45 Years":
      totalScore += 3;
      break;
    case "Less than 30 Years":
      console.log(age);
      totalScore += 4;
      break;
    default:
      break;
  }
  console.log(totalScore);
  switch (investment) {
    case "Capital preservation":
      totalScore += 1;
      break;
    case "Income Generation":
      totalScore += 2;
      break;
    case "Capital Appreciation":
      totalScore += 3;
      break;
    case "Speculative Growth":
      totalScore += 4;
      break;
    default:
      break;
  }
  console.log(totalScore);
  switch (horizon) {
    case "Less Than 3 Years":
      totalScore += 1;
      break;
    case "3 - 5 Years":
      totalScore += 2;
      break;
    case "5 - 10 Years":
      totalScore += 3;
      break;
    case "More Than 10 Years":
      totalScore += 4;
      break;
    default:
      break;
  }
  console.log(totalScore);
  switch (tolerance) {
    case "Very Low (Cannot Tolerate Any Loss)":
      totalScore += 1;
      break;
    case "Low (Uncomfortable With Loss)":
      totalScore += 2;
      break;
    case "Moderate (Can Tolerate Some Loss)":
      totalScore += 3;
      break;
    case "High (Comfortable With Significant Loss)":
      totalScore += 4;
      break;
    default:
      break;
  }
  console.log(totalScore);
  switch (react) {
    case "Sell Immediately To Prevent Further Losses":
      totalScore += 1;
      break;
    case "Consider Selling But Prefer To Hold":
      totalScore += 2;
      break;
    case "Hold And Wait For Recovery":
      totalScore += 3;
      break;
    case "See It As A Buying Opportunity":
      totalScore += 4;
      break;
    default:
      break;
  }
  console.log(totalScore);
  switch (experience) {
    case "No Experience":
      totalScore += 1;
      break;
    case "Some Experience":
      totalScore += 2;
      break;
    case "Experienced":
      totalScore += 3;
      break;
    case "Very Experienced":
      totalScore += 4;
      break;
    default:
      break;
  }
  console.log(totalScore);
  switch (comfort) {
    case "Less Than 20%":
      totalScore += 1;
      break;
    case "20% - 40%":
      totalScore += 2;
      break;
    case "40% - 60%":
      totalScore += 3;
      break;
    case "More Than 60%":
      totalScore += 4;
      break;
    default:
      break;
  }
  console.log(totalScore);
  switch (financialSituation) {
    case "Unstable With Potential Financial Risks":
      totalScore += 1;
      break;
    case "Low But Stable Income":
      totalScore += 2;
      break;
    case "Moderate Income With Occasional Fluctuations":
      totalScore += 3;
      break;
    case "Stable With Secure Income":
      totalScore += 4;
      break;
    default:
      break;
  }
  console.log(totalScore);
  switch (lossReaction) {
    case "Sell To Avoid Further Losses":
      totalScore += 1;
      break;
    case "Hold And Wait For Recovery":
      totalScore += 2;
      break;
    case "Will Do Asset Rebalancing":
      totalScore += 3;
      break;
    case "Buy More To Capitalize On Lower Prices":
      totalScore += 4;
      break;
    default:
      break;
  }
  console.log(totalScore);
  switch (investmentReliance) {
    case "Rely On Them For Regular Income":
      totalScore += 1;
      break;
    case "A Mix Of Income And Growth":
      totalScore += 2;
      break;
    case "Rely On Deferred Regular Income":
      totalScore += 3;
      break;
    case "Purely For Long-Term Growth":
      totalScore += 4;
      break;
    default:
      break;
  }
  console.log(totalScore);
  return totalScore;
};

document.getElementById("riskProfilerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (submitEvent == 0) {
    submitEvent += 1;
    let selectedAge = document.querySelector('input[name="age"]:checked');
    let selectedInvestment = document.querySelector(
      'input[name="investment"]:checked'
    );
    let selectedHorizon = document.querySelector(
      'input[name="horizon"]:checked'
    );
    let selectedTolerance = document.querySelector(
      'input[name="tolerance"]:checked'
    );
    let selectedReact = document.querySelector('input[name="react"]:checked');
    let selectedExperience = document.querySelector(
      'input[name="experience"]:checked'
    );
    let selectedComfort = document.querySelector(
      'input[name="comfort"]:checked'
    );
    let selectedFinancialSituation = document.querySelector(
      'input[name="financialSituation"]:checked'
    );
    let selectedLossReaction = document.querySelector(
      'input[name="lossReaction"]:checked'
    );
    let selectedInvestmentReliance = document.querySelector(
      'input[name="investmentReliance"]:checked'
    );
    let name = document.getElementById("name");
    let explainImg = document.getElementById("explainImg");

    if (selectedAge == null) {
      errorDesc.innerText = "Please select your age category !";
      toggleModalBtn.click();
      return;
    }
    if (selectedInvestment == null) {
      errorDesc.innerText = "Please select your primary investment goal !";
      toggleModalBtn.click();
      return;
    }

    if (selectedHorizon == null) {
      errorDesc.innerText = "Please select your Investment Time Horizon !";
      toggleModalBtn.click();
      return;
    }

    if (selectedTolerance == null) {
      errorDesc.innerText =
        "Please select your Tolerance Category For Investment Losses !";
      toggleModalBtn.click();
      return;
    }

    if (selectedReact == null) {
      errorDesc.innerText =
        "Please select how you would react to Stock Market Decline !";
      toggleModalBtn.click();
      return;
    }

    if (selectedExperience == null) {
      errorDesc.innerText =
        "Please select your level of experience in stock market !";
      toggleModalBtn.click();
      return;
    }

    if (selectedComfort == null) {
      errorDesc.innerText =
        "Please select how much you would be comfortable investing in equity !";
      toggleModalBtn.click();
      return;
    }

    if (selectedFinancialSituation == null) {
      errorDesc.innerText =
        "Please select what your current financial situation is !";
      toggleModalBtn.click();
      return;
    }

    if (selectedLossReaction == null) {
      errorDesc.innerText =
        "Please select what your reaction if your portfolio lost 20% of its values in a short period !";
      toggleModalBtn.click();
      return;
    }

    if (selectedInvestmentReliance == null) {
      errorDesc.innerText =
        "Please select how much you would rely on your investment for income or growth !";
      toggleModalBtn.click();
      return;
    }

    if (name.value == "" || name.value == null) {
      errorDesc.innerText = "Please enter your name !";
      toggleModalBtn.click();
      return;
    }

    let totalScore = calculateRiskScore(
      selectedAge.value,
      selectedInvestment.value,
      selectedHorizon.value,
      selectedTolerance.value,
      selectedReact.value,
      selectedExperience.value,
      selectedComfort.value,
      selectedFinancialSituation.value,
      selectedLossReaction.value,
      selectedInvestmentReliance.value
    );

    resultHeader = document.getElementById("resultHeader");
    resultHeader.innerHTML =
      '<h5 class="leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">Risk Profile Score</h5>';
    showOutput = document.getElementById("showOutput");
    showOutput.innerHTML =
      '<div class="max-w-full relative overflow-x-auto shadow-md sm:rounded-lg">' +
      '<table class="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">' +
      '<thead class="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">' +
      '<tr><th scope="col" class="px-6 py-3">Final Risk Profile Score' +
      "</th>" +
      '<th scope="col" class="px-6 py-3"> ' +
      totalScore +
      " / 40" +
      "</th></tr></thead></table></div>";
    explainImg.style =
      "margin-top:1.5rem;display:flex;justify-content:center;align-items:center;";

    scrollToElement("resultHeader");

    var form = e.target; // Correct reference to the form
    var xhr = new XMLHttpRequest();
    xhr.open("POST", form.action); // Use form's action attribute

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Successful response
          var response = xhr.responseText;
          // form.reset(); // Clear the form fields
        } else {
          // Error response
          explainPara.innerText =
            "Oops ! Something went wrong ! Please try again later";
          modalBtn.click();
        }
      }
    };

    xhr.send(new FormData(form)); // Send form data
  } else {
    errorDesc.innerText =
      "Please refresh page to re-enter risk profiling data !";
    toggleModalBtn.click();
  }
});
