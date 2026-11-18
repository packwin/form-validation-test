import "./styles.css";

const form = document.querySelector("form");

const email = document.getElementById("email");
const country = document.getElementById("country");
const postcode = document.getElementById("post-code");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");

const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

const countries = {
  au: ["^\\d{4}$", "Australia post codes must have exactly four digits."],
  nz: [
    "^(?!0000)\\d{4}$",
    "New Zealand post codes must have exactly four digits (and cannot be '0000').",
  ],
  uk: [
    "^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$",
    "I have no idea what the go is with the United Kingdom post code rules.",
  ],
  us: ["^\\d{5}$", "United States post codes must have 5 digits."],
};

const createErrorBox = (anchor) => {
  const container = document.createElement("div");
  container.classList.add("error-box");
  const text = document.createElement("p");
  container.append(text);

  anchor.parentNode.append(container);

  return { container, text };
};

const emailErr = createErrorBox(email);
const postcodeErr = createErrorBox(postcode);
const passwordErr = createErrorBox(password);
const passwordConfirmErr = createErrorBox(passwordConfirm);

function updateError(node, err, isValid, errorText) {
  node.className = isValid ? "valid" : "invalid";

  if (!isValid) {
    // node.parentNode.append(err.container);
    err.text.textContent = errorText;
  } else {
    err.text.textContent = "";
  }
}

const validationPass = () => ({ validity: true, errText: "" });
const validationFail = (errText) => ({ validity: false, errText });

const isValidEmail = () => {
  if (!emailRegExp.test(email.value)) {
    return validationFail("Please enter a valid email.");
  }

  return validationPass();
};

const handleEmailInput = () => {
  const validityResult = isValidEmail();
  updateError(email, emailErr, validityResult.validity, validityResult.errText);
};

const isValidPostcode = () => {
  if (country.value === "") {
    return validationFail("Please select a country.");
  }

  const postcodeRegExp = new RegExp(countries[country.value][0]);
  if (!postcodeRegExp.test(postcode.value)) {
    return validationFail(countries[country.value][1]);
  }

  return validationPass();
};

const handlePostcodeInput = () => {
  const validityResult = isValidPostcode();
  updateError(
    postcode,
    postcodeErr,
    validityResult.validity,
    validityResult.errText,
  );
};

const isValidPassword = () => {
  if (password.value.length < 8) {
    return validationFail("Passwords must be at least 8 characters long.");
  }

  return validationPass();
};

const handlePasswordInput = () => {
  const validityResult = isValidPassword();
  updateError(
    password,
    passwordErr,
    validityResult.validity,
    validityResult.errText,
  );
};

const isValidPasswordConfirm = () => {
  if (passwordConfirm.value !== password.value) {
    return validationFail("Passwords do not match.");
  }

  if (!isValidPassword().validity) {
    return validationFail("");
  }

  return validationPass();
};

const handlePasswordConfirmInput = () => {
  const validityResult = isValidPasswordConfirm();
  updateError(
    passwordConfirm,
    passwordConfirmErr,
    validityResult.validity,
    validityResult.errText,
  );
};

const handleSubmit = (event) => {
  event.preventDefault();
};

form.addEventListener("submit", handleSubmit);
email.addEventListener("input", handleEmailInput);
country.addEventListener("change", handlePostcodeInput);
postcode.addEventListener("input", handlePostcodeInput);
password.addEventListener("input", handlePasswordInput);
password.addEventListener("input", handlePasswordConfirmInput);
passwordConfirm.addEventListener("input", handlePasswordConfirmInput);
