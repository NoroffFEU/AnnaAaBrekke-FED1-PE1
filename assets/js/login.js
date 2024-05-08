import { apiUrlLogin } from "./api.mjs";

// import { register } from "./register.js";

// import { register } from "./register.js"
// import { addRegisterButtonListener } from "./eventHandlers.js";

// const loginData = {
//   email: "annaas00208@stud.noroff.no",
//   password: "firstRegisterApiPasswordSerena",
// };

// try {
//   const loginResponse = await loginOwner(loginData);
//   if (loginResponse && loginResponse.data && loginResponse.data.accessToken) {
//     localStorage.setItem(`token`, loginResponse.data.accessToken);
//   }
// } catch (error) {
//   console.error("Login failed:", error);
// }

// HereYouGo

const method = "post";

// Login function that sends a request to the login endpoint
export async function loginOwner(loginData) {
  const body = JSON.stringify(loginData);
  const response = await fetch(apiUrlLogin, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Login failed: ${errorText}`);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  console.log("Login Result:", result);
  return result;
}

// Perform login and save the token
// export async function performLogin(loginData) {
//   try {
//     const loginResponse = await loginOwner(loginData);
//     localStorage.setItem("token", loginResponse.accessToken);
//     localStorage.setItem("loginTime", new Date().getTime());
//     localStorage.setItem("user", JSON.stringify(loginResponse)); // Store the entire user data for navigation

//     console.log("Login successful:", loginResponse);
//     return loginResponse;
//   } catch (error) {
//     console.error("Login failed:", error);
//     throw error;
//   }
// }

// // Check if the token has expired
// export function isTokenExpired() {
//   const loginTime = localStorage.getItem("loginTime");
//   if (!loginTime) return true; // If login time is not set, token is considered expired
//   const currentTime = new Date().getTime();
//   const timeElapsed = currentTime - parseInt(loginTime);
//   const expirationTime = 24 * 60 * 60 * 1000; // Token expires after 24 hours
//   return timeElapsed >= expirationTime;
// }

// Log out the user and redirect to the login page
// export function logout() {
//   console.log("Logging out...");
//   localStorage.removeItem("token");
//   localStorage.removeItem("loginTime");
//   localStorage.removeItem("user");
//   window.location.href = "../account/login.html";
// }

// // Check the login status and log out if the token is expired
// export function checkLoginStatus() {
//   if (!isTokenExpired()) {
//     // Token is not expired, return true to indicate the user is logged in
//     return true;
//   } else {
//     // Token is expired, log out and redirect to the login page
//     logout();
//     return false;
//   }
// }

// // Handle form submission for login
// const loginFormSubmit = async (event) => {
//   event.preventDefault(); // Prevent the default form submission behavior

//   const loginData = {
//     email: localStorage.getItem("email") || document.getElementById("ownerEmail").value,
//     password: localStorage.getItem("password") || document.getElementById("ownerPassword").value,
//   };

//   try {
//     const loginResponse = await performLogin(loginData);
//     console.log("Login successful:", loginResponse);

//     // Remove the login form
//     const logForm = event.target;
//     logForm.style.display = "none";

//     // Show a greeting message
//     const greetingMessage = document.createElement("h1");
//     greetingMessage.textContent = `Hello ${loginResponse.name}!`;
//     document.body.appendChild(greetingMessage);

//     // Create a div for navigation buttons
//     const chooseWhereNext = document.createElement("div");
//     chooseWhereNext.classList.add("choose-container");

//     // Create "Edit" button
//     const editNavButton = document.createElement("button");
//     editNavButton.textContent = "Edit";
//     editNavButton.addEventListener("click", () => {
//       window.location.href = "/post/edit.html";
//     });

//     // Create "Create" button
//     const createNavButton = document.createElement("button");
//     createNavButton.textContent = "Create";
//     createNavButton.addEventListener("click", () => {
//       window.location.href = "/post/create.html";
//     });

//     // Append buttons to the navigation div
//     chooseWhereNext.appendChild(editNavButton);
//     chooseWhereNext.appendChild(createNavButton);

//     // Append the navigation div to the document body
//     document.body.appendChild(chooseWhereNext);
//   } catch (error) {
//     document.getElementsByClassName("login-message")[0].textContent =
//       "Login failed: " + error.message;
//   }
// };

// // Add the login form event listener
// document.getElementById("loginForm").addEventListener("submit", loginFormSubmit);

// // Add event listener for the register button
// document.addEventListener("DOMContentLoaded", () => {
//   const registerButton = document.querySelector(".register-button");
//   if (registerButton) {
//     registerButton.addEventListener("click", () => {
//       window.location.href = "/account/register.html";
//     });
//   }

//   // Prefill the login form with the last registered email and password if available
//   const lastRegisteredEmail = localStorage.getItem("email");
//   const lastRegisteredPassword = localStorage.getItem("password");
//   if (lastRegisteredEmail) {
//     document.getElementById("ownerEmail").value = lastRegisteredEmail;
//   }
//   if (lastRegisteredPassword) {
//     document.getElementById("ownerPassword").value = lastRegisteredPassword;
//   }
// });

// //   // Check login status when the document is ready
// //   if (!checkLoginStatus()) {
// //     // If not logged in or token expired, redirect to login page
// //     window.location.href = "../account/login.html";
// //   }
// // });
