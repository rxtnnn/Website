
// login-form
let loginForm = document.querySelector('.login-form')
document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
}
window.onscroll = () =>{
    loginForm.classList.remove('active');
}

// login form validation
function validate(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if ( username == "rxtnrzh" && password == "admin123"){
    alert ("Login successfully");
    return false;
  }else if( username != "rxtnrzh" && password != "admin123"){
      alert("Invalid username and password");
  } else if( username != "rxtnrzh" && password == "admin123"){
      alert("Invalid username");
  }else{
      alert("Invalid password");
  }
  }  

// book now confirmation
function confirm(){
    var place = document.getElementById("place").value;
    var number = document.getElementById("number").value;
    if(place == "" || number == " "){
        alert("Please fill all required");
    }else{
        alert("Thank you for booking!");
    }
}
