
const surveyForm = document.getElementById("form");

const sendDatatoServer = async (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, loginId, verification) => {
    try {
        const response = await fetch('/surveysubmit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, loginId, verification})
        });

        if (response.ok) {
            const result = await response.json();
    
            console.log(result);
            console.log(result);
            console.log(result);
           if(result === "veteran"){
                location.href = "veteran.html";
            }
            if(result === "vitalityHealth"){
                location.href = "vitalityhealth.html";
            }
            if(result === "vitalCare"){
                location.href = "vitalcare.html";
            }
            if(result === "healthGuard")
                location.href = "HealthGuard.html";
            
            
            // You can add further actions here if needed
        } else {
            console.error('Failed to send survey data:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending survey data:', error);
    }
}


surveyForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Initialize question variables
    let q1 = '';
    let q2 = '';
    let q3 = '';
    let q4 = '';
    let q5 = '';
    let q6 = '';
    let q7 = '';
    let q8 = '';
    let q9 = '';
    let q10 = '';
    

    // Retrieve selected values from the form
    q1 = document.querySelector('input[name="recommed"]:checked').value;
    q2 = document.querySelector('input[name="payment"]:checked').value;
    q3 = document.querySelector('input[name="disabled"]:checked').value;
    q4 = document.querySelector('input[name="therapy"]:checked').value;
    q5 = document.querySelector('input[name="military"]:checked').value;
    q6 = document.querySelector('input[name="nicotine"]:checked').value;
    q7 = document.querySelector('input[name="medical"]:checked').value;
    q8 = document.querySelector('input[name="salary"]:checked').value;
    q9 = document.querySelector('input[name="deductible"]:checked').value;
    q10 = document.querySelector('input[name="health"]:checked').value;
    
    let healthGuard = 0;
    let vitalityHealth = 0;
    let vitalCare = 0;
    let veteran = 0;
// QUESTION 1
    if(q1 === 'A'){
        healthGuard++;
        vitalCare++;
      }
    else
        vitalityHealth++;
// QUESTION 2
    if(q2 === 'A'){
        healthGuard++;
        vitalCare++;
    }
    else
        vitalityHealth++;

// QUESTION 3
    if(q3 === 'A'){
        healthGuard++;
        vitalCare++;
    }
    else
        vitalityHealth++;
// QUESTION 4
    if(q4 === 'A')
    vitalCare++;
    else{
        vitalityHealth++;
        healthGuard++;
    }
    if(q5 === 'A')
    {
        veteran += 10; 
    }
    else

// QUESTION 6
    if(q6 === 'A'){
        vitalCare++;
        vitalityHealth++;
    }
    else{
        healthGuard++;
}
// QUESTION 7
    if(q7 === 'A'){ 
        vitalCare++;
        healthGuard++;
    }
    else{
        vitalityHealth++;
    }
    
// QUESTION 8
    if(q8 === 'A')
        vitalCare += 5; 
    else if(q8 === 'B')
        vitalCare += 2;
    else if(q8 === 'C')
        healthGuard +=2; 
    else
        vitalityHealth += 5;

// QUESITON 9
    if(q9 === 'A')
        vitalityHealth += 3; 
    else if(q9 === 'B')
        healthGuard++;
    else if(q9 === 'C')
    {
        healthGuard++;
        vitalCare++; 
    }
    else
        vitalCare += 2; 


    console.log(vitalCare);
    console.log(vitalityHealth);
    console.log(healthGuard); 
    let user_healthcare = "";

    if (healthGuard > vitalityHealth && healthGuard > vitalCare && healthGuard > veteran) {
        user_healthcare = "healthGuard";
      } else if (vitalityHealth > healthGuard && vitalityHealth > vitalCare && vitalityHealth > veteran) {
        user_healthcare = "vitalityHealth";
      } else if (vitalCare > healthGuard && vitalCare > vitalityHealth && vitalCare > veteran) {
        user_healthcare = "vitalCare";
      } else if (veteran > healthGuard && veteran > vitalityHealth && veteran > vitalCare) {
        user_healthcare = "veteran";
      } else {
        user_healthcare = "There is a tie or all values are equal.";
      }
      const loginId = localStorage.getItem('idResult');
  
      let verification = 1;
      console.log(q1);
    sendDatatoServer(q1, q2, q3, q4, q5, q6, q7, q8,q9,q10, user_healthcare, loginId, verification);
});