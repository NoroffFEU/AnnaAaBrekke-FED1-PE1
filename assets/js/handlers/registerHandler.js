import { register } from "../api/registerApi.js";
import { showErrorAlert, showSuccessAlert } from "../utils/alerts.js";
import { redirectToLoginPage } from "../utils/routing.js";

// Function to set the event listener for the registration form
export function setRegisterFormListener() {
  const form = document.getElementById("registerForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target); // Get form data
      const registerData = Object.fromEntries(formData.entries()); // Convert form data to an object

      // Confirm Password validation
      if (registerData.password !== registerData.confirmPassword) {
        showErrorAlert("Registration failed: Passwords do not match.");
        return;
      }

      // Remove confirmPassword from the data being sent to the API
      delete registerData.confirmPassword;

      try {
        await register(registerData); // Call the register function with the form data
        showSuccessAlert(
          "Registration successful! Log in with your new account."
        );

        // Redirect to login page after some time
        setTimeout(() => {
          redirectToLoginPage();
        }, 2000);
      } catch (error) {
        showErrorAlert("Registration failed: " + error.message);
      }
    });
  }
}
