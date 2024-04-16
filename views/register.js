const registerForm = document.getElementById("register-form");
const registerButton = document.getElementById("register-button");

const sendDataToServer = async (email, username, password) => {
    try {

        const response = await fetch('/registersubmit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });

        if (response.ok) {
            const result = await response.json();
            if (result === 1) {
                alert("You have successfully registered.");
                location.href = "login.html";
            } else if(result === 0) {
                alert("The username you entered has already been used");
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

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = registerForm.email.value;
    const username = registerForm.username.value;
    const password = registerForm.password.value;
    console.log(email);
    console.log(username);
    console.log(password);
    sendDataToServer(email, username, password);
    //sendDataToServer(username, password);
});