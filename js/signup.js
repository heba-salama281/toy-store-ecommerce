let fstName = document.getElementById('fstName');
let lstName = document.getElementById('lstName');
let email = document.getElementById('email');
let pswd = document.getElementById('pswd');
let rememberMe = document.getElementById('rememberMe');
let submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener("click", function(event){

    event.preventDefault(); // stops form from reloading the page

    if (!fstName.value || !lstName.value || !email.value || !pswd.value) {
        alert("Please fill out all fields before registering.");
        return; // stop here if any field is empty
    }

    localStorage.setItem('firstName', fstName.value)
    localStorage.setItem('lastName', lstName.value)
    localStorage.setItem('email', email.value)
    localStorage.setItem('password', pswd.value)
    
    alert("Account Created Successfuly!");
    setTimeout( () => window.location='login.html' , 1500)

    //openPopup()

})

// function openPopup() {
//   document.getElementById("popup").style.display = "flex";
// }

