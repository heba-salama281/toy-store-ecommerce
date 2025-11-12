// login page 

let LoginEmail = document.getElementById('email');
let LoginPsw = document.getElementById('pswd');
let loginBtn = document.getElementById('loginBtn');
let getEmail = localStorage.getItem('email');
let getPswrd = localStorage.getItem('password')

loginBtn.addEventListener("click", function(e){
    e.preventDefault(); // stops form from reloading the page
    console.log('ok')
    if(LoginEmail.value === getEmail.trim() && LoginPsw.value === getPswrd.trim()){
        setTimeout( () => window.location='index.html' , 1500);
        console.log('ok')
    } else{
        window.alert('The email or the password is wrong');
        console.log('no')
    }

})