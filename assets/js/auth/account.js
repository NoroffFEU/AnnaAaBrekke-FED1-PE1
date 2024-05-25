import { setRegisterFormListener } from "../handlers/registerHandler.js";
import { setLoginFormListener } from "../handlers/loginHandler.js";
import { checkLoginAndRedirect } from "../api/loginApi.js";

// Set function and listener for login and register forms
if (document.getElementById("loginForm")) {
  setLoginFormListener();
} else if (document.getElementById("registerForm")) {
  checkLoginAndRedirect();
  setRegisterFormListener();
}
