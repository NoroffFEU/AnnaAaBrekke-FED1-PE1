import { saveLogin } from "../api/loginApi.js";
import { showErrorAlert } from "../utils/alerts.js";

export function setLoginFormListener() {
  const form = document.getElementById("loginForm");
  console.log("Login form found.");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior

      const email = document.getElementById("ownerEmail").value;
      const password = document.getElementById("ownerPassword").value;

      if (!email || !password) {
        console.error("Email and password are required");
        showErrorAlert("Email and password are required"); // Use showErrorAlert
        return;
      }

      const loginData = { email, password };
      console.log("Login Data:", loginData);

      showLoader(); // Show loader

      try {
        const loginResponse = await saveLogin(loginData);

        // Remove the login form
        form.style.display = "none";

        // Remove any existing body-after-login-container (maybe remove later)
        const existingContainer = document.querySelector(
          ".body-after-login-container"
        );
        if (existingContainer) {
          existingContainer.remove();
        }

        // Create a new body-after-login-container
        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("body-after-login-container");

        // Show a greeting message specifically for the owner
        const greetingMessage = document.createElement("h1");
        greetingMessage.textContent = `Welcome back, ${loginResponse.user.name}! Select what you'd like to do next:`;
        greetingMessage.classList.add("greeting-message");
        bodyContainer.appendChild(greetingMessage);

        // Create a div for navigation buttons
        const chooseWhereNext = document.createElement("div");
        chooseWhereNext.classList.add("choose-container");

        // Create "Edit Post" button
        const editNavButton = document.createElement("button");
        editNavButton.textContent = "Edit Your Posts";
        editNavButton.addEventListener("click", () => {
          window.location.href = "../post/edit.html";
        });

        // Create "Create New Post" button
        const createNavButton = document.createElement("button");
        createNavButton.textContent = "Create New Post";
        createNavButton.addEventListener("click", () => {
          window.location.href = "../post/create.html";
        });

        // Append buttons to the navigation div
        chooseWhereNext.appendChild(editNavButton);
        chooseWhereNext.appendChild(createNavButton);

        // Append the navigation div to the body container
        bodyContainer.appendChild(chooseWhereNext);

        // Append the body container to the document body
        document.body.appendChild(bodyContainer);
      } catch (error) {
        console.error("Login failed:", error);
        showErrorAlert("Login failed: " + error.message); // Use showErrorAlert
      }
    });
  }
}

// Add event listener for the register button
document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.querySelector(".register-button");
  if (registerButton) {
    registerButton.addEventListener("click", () => {
      window.location.href = "/account/register.html";
    });
  }

  setLoginFormListener();
});
