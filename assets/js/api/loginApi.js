import { apiUrlLogin } from "./apiUrl.mjs";
import { redirectToLoginPage } from "../utils/routing.js";
import { showErrorAlert } from "../utils/alerts.js";

const method = "post";

// Login function that sends a request to the api
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

  const { data } = await response.json();
  const { accessToken, ...user } = data;

  return { accessToken, user };
}

// Function to save login data and store it in localStorage
export async function saveLogin(loginData) {
  try {
    const { accessToken, user } = await loginOwner(loginData); // Perform login

    localStorage.setItem("token", accessToken); // Store access token in localStorage
    localStorage.setItem("user", JSON.stringify(user)); // Store user info in localStorage

    return { accessToken, user }; // Return accessToken and user info
  } catch (error) {
    console.error("Login failed with error:", error);
    throw new Error(`Login failed: ${error.message || "Unknown error"}`); // Throw error if login fails
  }
}

// Function to check if the user is logged in
export function isLoggedIn(redirectIfNotLoggedIn = false) {
  try {
    const accessToken = localStorage.getItem("token"); // Retrieve access token from localStorage
    if (accessToken) {
      return true; // User is logged in
    }
  } catch (error) {
    console.error("Error checking login status from localStorage:", error);
  }

  if (redirectIfNotLoggedIn) {
    showErrorAlert("You are not logged in. Redirecting to login page."); // Alert and redirect if not logged in
    redirectToLoginPage();
  }

  return false; // User is not logged in
}

export function checkLoginAndRedirect() {
  return new Promise((resolve, reject) => {
    const currentPage = window.location.pathname;
    if (
      currentPage.includes("edit.html") ||
      currentPage.includes("create.html") ||
      currentPage.includes("register.html")
    ) {
      // Redirect to login page if not logged in
      if (!isLoggedIn()) {
        showErrorAlert("You need to be logged in to access this page");
        redirectToLoginPage();
        reject("User not logged in");
      } else {
        resolve("User logged in");
      }
    } else {
      resolve("No login required for this page");
    }
  });
}