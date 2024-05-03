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
  console.log("Login successfull;", loginResponse);
  if (loginResponse && loginResponse.data && loginResponse.data.accessToken);
  localStorage.setItem(`token`, loginResponse.data.accessToken);
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
    console.log("Login successful:", loginResponse);
    if (loginResponse.data && loginResponse.data.accessToken) {
      localStorage.setItem("token", loginResponse.data.accessToken); // Assuming token is directly available
      return loginResponse; // Return the login response for possible use later
    } else {
      throw new Error("Access token not found in logn response");
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Rethrowing error to be handled in the calling scope
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
      localStorage.setItem("token", loginResponse.data.accessToken); // Store the token in local storage
      document.getElementsByClassName("login-message")[0].textContent =
        "Login successful!";

      // Redirect to edit page after successful login
      window.location.href = "/post/create.html";
    } catch (error) {
      document.getElementsByClassName("login-message")[0].textContent =
        "Login failed: " + error.message;
    }
  });

// export async function logout() {
//   localStorage.removeItem("token");
//   window.location.href = "../account/login.html";
// }
