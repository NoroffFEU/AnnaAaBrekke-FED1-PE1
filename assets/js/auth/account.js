import { setRegisterFormListener } from "../handlers/registerHandler.js";
import { setLoginFormListener } from "../handlers/loginHandler.js";

// Set listeners for login and register forms
if (document.getElementById("loginForm")) {
  setLoginFormListener();
} else if (document.getElementById("registerForm")) {
  setRegisterFormListener();
}
