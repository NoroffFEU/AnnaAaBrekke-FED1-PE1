import { apiUrlLogin } from "./apiUrl.mjs";
import { redirectToLoginPage } from "../utils/routing.js";
import { showErrorAlert } from "../utils/alerts.js";

const method = "post";

// Login function that sends a request to the api
export async function loginOwner(loginData) {
  console.log("Attempting to log in with the following data:", loginData);

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

  console.log("Received login response data:", data);
  console.log("Extracted accessToken and user information:", {
    accessToken,
    user,
  });

  return { accessToken, user };
}

// Function to save login data and store it in localStorage
export async function saveLogin(loginData) {
  try {
    console.log("Saving login data for:", loginData);
    const { accessToken, user } = await loginOwner(loginData); // Perform login
    console.log("Login successful:", { accessToken, user });

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
    console.log("Checking if user is logged in...");

    const accessToken = localStorage.getItem("token"); // Retrieve access token from localStorage
    if (accessToken) {
      console.log("Access token found and user is logged in:", accessToken);
      return true; // User is logged in
    } else {
      console.log("No access token found. User is not logged in.");
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
