import { apiUrl } from "./api.mjs";
// Register and Login
const registerData = {
  name: "SerenaTravel",
  email: "annaas00208@stud.noroff.no",
  password: "firstRegisterApiPasswordSerena",
  bio: "This is my profile bio",
  venueManager: true,
};

const loginData = {
  email: "annaas00208@stud.noroff.no",
  password: "firstRegisterApiPasswordSerena",
};

try {
  const loginResponse = await loginOwner(loginData);
  if (loginResponse && loginResponse.data && loginResponse.data.accessToken) {
    localStorage.setItem(`token`, loginResponse.data.accessToken);
  }
} catch (error) {
  console.error("Login failed:", error);
}

export async function registerUser(registerData) {
  const response = await fetch(`${apiUrl}auth/register`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

export async function loginOwner(loginData) {
  const response = await fetch(`${apiUrl}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
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

document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const loginData = {
      email: document.getElementById("ownerEmail").value,
      password: document.getElementById("ownerPassword").value,
    };

    try {
      const loginResponse = await performLogin(loginData);
      console.log("Login successful:", loginResponse);
      localStorage.setItem("token", loginResponse.data.accessToken); // Store the token in local storage
      document.getElementsByClassName("login-message")[0].textContent =
        "Login successful!";

      // // Redirect to edit page after successful login
      window.location.href = "/post/create.html";
    } catch (error) {
      document.getElementsByClassName("login-message")[0].textContent =
        "Login failed: " + error.message;
    }
  });

// Check login status when the document is ready
document.addEventListener("DOMContentLoaded", () => {
  if (!checkLoginStatus()) {
    // If not logged in or token expired, redirect to login page
    window.location.href = "../account/login.html";
  }
});
