const email = document.getElementById("mail");

email.addEventListener("input", () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an email address!");
  } else {
    email.setCustomValidity("");
  }
});

const email2 = document.getElementById("mail2");

email2.addEventListener("input", () => {
  email2.setCustomValidity("");
  if (!email2.validity.valid) {
    return;
  }

  if (!email2.value.endsWith("@example.com")) {
    email2.setCustomValidity("Please enter an email address of @example.com");
  }
});

const emailNoval = document.getElementById("mail-noval");
const formNoval = document.getElementById("form-noval");
const emailError = document.getElementById("error");

emailNoval.addEventListener("input", () => {
  if (emailNoval.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showError();
  }
});

formNoval.addEventListener("submit", (event) => {
  if (!emailNoval.validity.valid) {
    showError();
    event.preventDefault();
  }
});

function showError() {
  if (emailNoval.validity.valueMissing) {
    // If empty
    emailError.textContent = "You need to enter an email address.";
  } else if (emailNoval.validity.typeMismatch) {
    // If not an email address
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (emailNoval.validity.tooShort) {
    // If value is too short
    emailError.textContent = `Email should be at least ${emailNoval.minLength} characters; you entered ${emailNoval.value.length}.`;
  }
  // Add `active` class
  emailError.className = "error active";
}
