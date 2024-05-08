// import { setLoginFormListener , setRegisterFormListener } from "/registerHandler.js"

// // Determine which page is currently being displayed and set the relevant form listeners
// if (document.querySelector("#loginForm")) {
//   setLoginFormListener();
// } else if (document.querySelector("#registerForm")) {
//   setRegisterFormListener();
// }

import { setRegisterFormListener } from "./registerHandler.js";
import { setLoginFormListener } from "./loginHandler.js";

// Set listeners for login and register forms
if (document.getElementById("loginForm")) {
  setLoginFormListener();
} else if (document.getElementById("registerForm")) {
  setRegisterFormListener();
}
// // Redirect to the login page if registration is successful
// const registerMessage = document.getElementsByClassName("register-message")[0];
// if (registerMessage && registerMessage.textContent.includes("Registration successful")) {
//   window.location.href = "../account/login.html";
// }
