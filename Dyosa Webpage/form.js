
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBLwgStAX9NNM3g3jmJDy3XpyULoO0SBVw",
    authDomain: "authentication-ee69e.firebaseapp.com",
    databaseURL: "https://authentication-ee69e-default-rtdb.firebaseio.com",
    projectId: "authentication-ee69e",
    storageBucket: "authentication-ee69e.appspot.com",
    messagingSenderId: "588181222605",
    appId: "1:588181222605:web:36b63c5f1fbf3b95bda584"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth= getAuth()

//get elements in html
var name= document.getElementById("name")
var email= document.getElementById("email")
var password= document.getElementById("password")
//function to store data
window.signup = function(e){
  e.preventDefault();
  var obj ={
    name:name.value,
    email:email.value,
    password:password.value,
  }
  createUserWithEmailAndPassword(auth,obj.email,obj.password)
  .then(function(success){
    alert("Sign-up Successfuly")
  })
  .catch(function(err){
    alert("ERROR" + err)
  })
  console.log(obj)
};
// Function to handle login
window.login = function(e) {
  e.preventDefault();
  var loginEmail = document.getElementById("log_email").value;
  var loginPassword = document.getElementById("log_password").value;

  // Log in with email and password
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(function(success) {
      alert("Login Successful"); window.location.href = "main-app.html";
    })

    .catch(function(err) {
      alert("ERROR: " + err.message);
    });
};

//animation
const wrapper = document.querySelector(".wrapper"),
          signupHeader = document.querySelector(".signup header"),
          loginHeader = document.querySelector(".login header");

        loginHeader.addEventListener("click", () => {
          wrapper.classList.add("active");
        });
        signupHeader.addEventListener("click", () => {
          wrapper.classList.remove("active");
        });
      