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

export async function loginOwner(registerData) {
  const body = JSON.stringify(registerData);
  const response = await fetch(apiUrlLogin, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const loginResponse = await response.json();
  console.log("you are registered correct", loginResponse);
}

// Perform login and save the token
export async function performLogin(loginData) {
  try {
    const loginResponse = await loginOwner(loginData);
    localStorage.setItem("token", loginResponse.data.accessToken);
    localStorage.setItem("loginTime", new Date().getTime());
    console.log("Login successful:", loginResponse); // Move this log statement here
    return loginResponse;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export function isTokenTimeLong() {
  const loginTime = localStorage.getItem("loginTime");
  if (!loginTime) return true; // If login time is not set, token overdue
  const currentTime = new Date().getTime();
  const timeLeft = currentTime - parseInt(loginTime);
  const timeRunOut = 2 * 60 * 1000; // Token expires after 2 min test
  return timeLeft >= timeRunOut;
}

export function logout() {
  console.log("logging out..");
  localStorage.removeItem("token");
  localStorage.removeItem("loginTime");
  window.location.href = "../account/login.html";
}

export function checkLoginStatus() {
  if (!isTokenTimeLong()) {
    // Token is not expired, return true to indicate the user is logged in
    return true;
  } else {
    // Token is expired, log out and redirect to the login page
    logout();
    return false;
  }
}

const loginFormSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // can change later to name.value if i want to
  const loginData = {
    email: document.getElementById("ownerEmail").value,
    password: document.getElementById("ownerPassword").value,
  };

  try {
    const loginResponse = await performLogin(loginData);
    console.log("Login successful:", loginResponse);
    localStorage.setItem("token", loginResponse.data.accessToken); // Store the token in local storage
    // document.getElementsByClassName("login-message")[0].textContent =
    //   "Login successful!";
    // Add event listener for the login form submission

    // if logges in then remove log in form and display "hello owner/admin.username" createlet navigation bar for edit or create. (if time add user profile with )
    // / Remove the login form
    const logForm = event.target;
    logForm.style.display = "none";

    const greetingMessage = document.createElement("h1");
    greetingMessage.textContent = `Hello ${loginResponse.data.name}!`;
    document.body.appendChild(greetingMessage);

    // Create a div for buttons
    const chooseWhereNext = document.createElement("div");
    chooseWhereNext.classList.add("choose-container");

    // Create buttons
    const editNavButton = document.createElement("button");
    editNavButton.textContent = "Edit";
    editNavButton.addEventListener("click", () => {
      // Redirect to edit page
      window.location.href = "/post/edit.html";
    });

    const createNavButton = document.createElement("button");
    createNavButton.textContent = "Create";
    createNavButton.addEventListener("click", () => {
      // Redirect to create page
      window.location.href = "/post/create.html";
    });

    // Append buttons to the div
    chooseWhereNext.appendChild(editNavButton);
    chooseWhereNext.appendChild(createNavButton);

    // Append the div to the document body
    document.body.appendChild(chooseWhereNext);

    // Redirect to edit page after successful login
  } catch (error) {
    document.getElementsByClassName("login-message")[0].textContent =
      "Login failed: " + error.message;
  }
};

document
  .getElementById("loginForm")
  .addEventListener("submit", loginFormSubmit);

// Add event listener for the register button
document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.querySelector(".register-button");
  if (registerButton) {
    registerButton.addEventListener("click", () => {
      // Redirect to the register page
      window.location.href = "/register.html"; // Replace 'register.html' with the actual URL of your register page
    });
  }
});

//   // Check login status when the document is ready
//   if (!checkLoginStatus()) {
//     // If not logged in or token expired, redirect to login page
//     window.location.href = "../account/login.html";
//   }
// };
