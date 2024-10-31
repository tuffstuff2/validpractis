const form = document.forms.namedItem("signup");
const labels = form.querySelectorAll("label");
const inputs = form.querySelectorAll("input");
const successElement = document.querySelector(".valid-count");
const failElement = document.querySelector(".invalid-count");
const totalElement = document.querySelector(".total-count");
const requiredElement = document.querySelector(".required-count");
const submitButton = document.querySelector(".submit-btn");

totalElement.textContent = form.querySelectorAll("label").length;
requiredElement.textContent = form.querySelectorAll("label.required").length;

form.onsubmit = (event) => {
  event.preventDefault();
  let hasError = false;
  const user = {};
  let successCount = 0;
  let failCount = 0;

  labels.forEach((label) => {
    const input = label.querySelector("input");
    const value = input.value.trim();

    if (label.classList.contains("required") && value === "") {
      hasError = true;
      label.classList.add("error");
      input.removeAttribute("placeholder");
      failCount++;
    } else {
      label.classList.remove("error");
      if (value !== "") {
        successCount++;
      }
    }

    if (input.name) {
      user[input.name] = value;
    }
  });

  successElement.textContent = successCount;
  failElement.textContent = failCount;

  console.log(user);

  if (!hasError) {
    form.submit();
  } else {
    submitButton.classList.add("suberror");
  }
};
