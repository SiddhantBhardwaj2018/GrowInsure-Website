/** @format */

const correctPassword = "GrowInsure123";

// Check if the user is already authenticated
if (sessionStorage.getItem("authenticated") === "true") {
  unlockContent();
}

// Add event listener for the "Unlock" button
document
  .getElementById("submit-password")
  .addEventListener("click", validatePassword);

// Add event listener for the "Enter" key in the password field
document
  .getElementById("password-input")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      validatePassword();
    }
  });

// Function to validate the password
function validatePassword() {
  const passwordInput = document.getElementById("password-input").value;

  if (passwordInput === correctPassword) {
    sessionStorage.setItem("authenticated", "true");
    unlockContent();
  } else {
    document.getElementById("error-message").textContent =
      "Incorrect password. Try again.";
  }
}

// Function to unlock the content
function unlockContent() {
  document.getElementById("password-overlay").style.display = "none";
  document.getElementById("content").style.display = "block";
}
