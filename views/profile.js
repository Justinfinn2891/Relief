const profileSubmit = document.getElementById("profile-form-submit");
const profileForm = document.getElementById("profile-form");

const sendDataToServer = async (age, weight, height, address, zipcode, ssn, login_id, verification, phone, name) => {
    try {

        const response = await fetch('/profilesubmit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({age, weight, height, address, zipcode, ssn, login_id, verification, phone, name})
        });

        if (response.ok) {
            const result = await response.json();
            if (result === 1) {
                alert("You have successfully made your profile.");
                location.href = "profilepage.html";
            } else if (result === 0) {
                alert("The information wasn't filled out correctly");
                location.reload();
                loginError.style.display = "grid";
                loginErrorMsg.style.opacity = 1;
            }
        } else {
            //console.error('Failed to send data to server:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending data to server:', error);
    }
};

profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(window.idResult);
    const idResult = localStorage.getItem('idResult');
    const name = profileForm.name.value;
    const phone = profileForm.phone.value;
    const age = profileForm.age.value;
    const weight = profileForm.weight.value;
    const height = profileForm.height.value;
    const address = profileForm.address.value;
    const zipcode = profileForm.zipcode.value;
    const ssn = profileForm.ssn.value;
    const verification = 1;
    sendDataToServer(age, weight, height, address, zipcode, ssn, idResult, verification, phone, name);
});