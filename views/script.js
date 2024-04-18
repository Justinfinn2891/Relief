const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const loginError = document.getElementById("login-error-msg-holder");
 
const sendDataToServer = async (email, username, password, callback) => {
    try {
        const response = await fetch('/loginsubmit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email })
        });
 
        if (response.ok) {
            const result = await response.json();
            const log = result.loginResponse;
            //let idResult = result.idResponse; // Declare idResult using let
            //window.idResult = idResult; // Assign idResult to window.idResult
            //console.log(window.idResult);
           // console.log("test");
            const idResult = result.idResponse;
            localStorage.setItem('idResult', idResult);
          //  callback(idResult); // Pass idResult to the callback function
            if (result.loginResponse === 1) {
                alert("You have successfully logged in.");
                location.href = "home.html";
            } else if (result.loginResponse === 0) {
                alert("Wrong username or password");
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
    const email = prompt("Please enter your email for verification:");
    sendDataToServer(email, username, password, function(login_id) {
        window.idResult = login_id; // Set login_id to window.idResult
    });
});