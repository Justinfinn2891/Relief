const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const loginError = document.getElementById("login-error-msg-holder");

const registerForm = document.getElementById("login-form");
const registerButton = document.getElementById("registerbtn");

const sendDataToServer = async (username, password) => {
    try {
        const response = await fetch('/loginsubmit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const result = await response.json();
            if (result === 1) {
                alert("You have successfully logged in.");
                location.reload();
            } else {
                loginError.style.display = "grid";
                loginErrorMsg.style.opacity = 1;
            }
        } else {
            console.error('Failed to send data to server:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending data to server:', error);
    }
};

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    sendDataToServer(username, password);
});

/*registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    sendDataToServer(username, password);
});
*/