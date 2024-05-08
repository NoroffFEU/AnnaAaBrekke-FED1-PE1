// import { setLoginFormListener , setRegisterFormListener } from "/formsHandler.js"

// // Determine which page is currently being displayed and set the relevant form listeners
// if (document.querySelector("#loginForm")) {
//   setLoginFormListener();
// } else if (document.querySelector("#registerForm")) {
//   setRegisterFormListener();
// }


import { setRegisterFormListener } from "./formsHandler.js";
import { setLoginFormListener } from "./loginHandler.js";


// Check for the presence of the `registerForm` and `loginForm`
if (document.getElementById("registerForm")) {
  setRegisterFormListener();
} else if (document.getElementById("loginForm")) {
  setLoginFormListener();
}

// // Redirect to the login page if registration is successful
// const registerMessage = document.getElementsByClassName("register-message")[0];
// if (registerMessage && registerMessage.textContent.includes("Registration successful")) {
//   window.location.href = "../account/login.html";
// }