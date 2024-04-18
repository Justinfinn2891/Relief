// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }


 async function finishFunction( id ) {
    const response = await fetch('/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    });

    const result = await response.json();
    console.log(result);
    if (result === 1) {
        location.href = "profilepage.html";
        
    } else if(result === null) {
        location.href = "profile.html";
  }
}