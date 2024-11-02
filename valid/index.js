const form = document.forms.namedItem("signup");
const labels = form.querySelectorAll("label");
const successElement = document.querySelector(".valid-count");
const failElement = document.querySelector(".invalid-count");
const totalElement = document.querySelector(".total-count");
const requiredElement = document.querySelector(".required-count");
const submitButton = document.querySelector(".submit-btn");

const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^[a-z ,.'-]+$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  "home-phone":
    /^\+?\d{0,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  "cell-phone":
    /^\+?\d{0,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
};

const residenceOptions = [
  { value: "Dog", imgSrc: "img/dog.jpg" },
  { value: "Kapibara", imgSrc: "img/kapibara.jpg" },
  { value: "Ostrich", imgSrc: "img/ostrich.jpg" },
];

totalElement.textContent = labels.length;
requiredElement.textContent = form.querySelectorAll("label.required").length;

const validateInput = (input) => {
  const value = input.value.trim();
  const pattern = patterns[input.name];
  const isBirthDate = input.name === "birth-date";
  let isValid = true;

  if (isBirthDate) {
    const year = new Date(value).getFullYear();
    const currentYear = new Date().getFullYear();
    isValid = year >= 1900 && year <= currentYear;
  }

  input.parentNode.classList.toggle(
    "error",
    (pattern && !pattern.test(value)) ||
      (!value && input.parentNode.classList.contains("required")) ||
      (isBirthDate && !isValid)
  );
};

form
  .querySelectorAll("input")
  .forEach((input) =>
    input.addEventListener("keyup", () => validateInput(input))
  );

form.onsubmit = (event) => {
  event.preventDefault();
  let successCount = 0,
    failCount = 0;
  const user = {};

  labels.forEach((label) => {
    const input = label.querySelector("input");
    validateInput(input);
    if (label.classList.contains("error")) {
      failCount++;
    } else {
      successCount++;
      user[input.name] = input.value.trim();
    }
  });

  successElement.textContent = successCount;
  failElement.textContent = failCount;

  if (failCount === 0) {
    console.log(user);
  } else {
    submitButton.classList.add("suberror");
  }
};

const residenceInput = form.querySelector('input[list="residences"]');
const residenceImages = document.querySelectorAll(".residence-image");

const filterImages = () => {
  const value = residenceInput.value.toLowerCase();

  residenceImages.forEach((img) => {
    img.classList.add("hidden");
    if (img.alt.toLowerCase() === value) {
      img.classList.remove("hidden");
    }
  });
};

residenceInput.addEventListener("input", filterImages);
residenceInput.addEventListener("change", () => {
  const value = residenceInput.value.toLowerCase();
  const matchFound = residenceOptions.some(
    (opt) => opt.value.toLowerCase() === value
  );

  if (!matchFound) {
    residenceImages.forEach((img) => img.classList.remove("hidden"));
  }
});
