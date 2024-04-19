const surveyForm = document.getElementById("form");
const surveyButton = document.getElementById("survey_button");



surveyForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Add your code to handle the form submission here
    console.log("Form submitted!");

    // You can collect form data and perform other actions here
  });