import { loginOwner } from "./login.js";

export function setLoginFormListener() {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior

      const email = document.getElementById("ownerEmail").value;
      const password = document.getElementById("ownerPassword").value;

      if (!email || !password) {
        // If email or password is empty, notify the user
        console.error("Email and password are required");
        return;
      }

      const loginData = {
        email: email,
        password: password,
      };

      console.log("Login Data:", loginData);

      try {
        await loginOwner(loginData);

        // Store access token in local storage
        localStorage.setItem("token", loginResponse.data.accessToken);

        // Remove the login form
        // form.style.display = "none";

        // Show a greeting message
        const greetingMessage = document.createElement("h1");
        greetingMessage.textContent = `Hello ${loginResponse.data.name}!`;
        document.body.appendChild(greetingMessage);

        // Create a div for navigation buttons
        const chooseWhereNext = document.createElement("div");
        chooseWhereNext.classList.add("choose-container");

        // Create "Edit" button
        const editNavButton = document.createElement("button");
        editNavButton.textContent = "Edit";
        editNavButton.addEventListener("click", () => {
          window.location.href = "/post/edit.html";
        });

        // Create "Create" button
        const createNavButton = document.createElement("button");
        createNavButton.textContent = "Create";
        createNavButton.addEventListener("click", () => {
          window.location.href = "/post/create.html";
        });

        // Append buttons to the navigation div
        chooseWhereNext.appendChild(editNavButton);
        chooseWhereNext.appendChild(createNavButton);

        // Append the navigation div to the document body
        document.body.appendChild(chooseWhereNext);
      } catch (error) {
        console.error("Login failed:", error);
        document.getElementsByClassName("login-message")[0].textContent =
          "Login failed: " + error.message;
      }
    });
  }
}
