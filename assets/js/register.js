import { apiUrlRegister } from "./api.mjs";

const registerData = {
  name: "SerenaTravel",
  email: "annaas00208@stud.noroff.no",
  password: "firstRegisterApiPasswordSerena",
  venueManager: true, // Assuming this field is always true for new registrations
};

export async function registerUser(registerData) {
  const response = await fetch(`${apiUrlRegister}`, {
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

document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    // Retrieve input values for the new registration data
    const regForm = event.target;
    const newName = regForm.name.value;
    const newEmail = regForm.email.value;
    const newPassword = regForm.password.value;
    const confirmPassword = regForm.confirmPassword.value;

    console.log("Name:", newName);
    console.log("Email:", newEmail);
    console.log("Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    if (newPassword === confirmPassword) {
      const newLoginData = {
        name: newName,
        email: newEmail,
        password: newPassword,
        venueManager: registerData.venueManager,
      };

      console.log("New Registration Data:", newLoginData);

      //now make the new loginData for loggin in - checkif it works... test- then delete later?

      try {
        await registerUser(newLoginData);
        document.getElementsByClassName("register-message")[0].textContent =
          "Registration successful! Log in with your new account.";

        // Redirect to login page after registration if needed login.html
        window.location.href = "/account/login.html";
      } catch (error) {
        // Handle registration errors
        document.getElementsByClassName("register-message")[0].textContent =
          "Registration failed: " + error.message;
      }
    } else {
      // Display error message if passwords don't match
      document.getElementsByClassName("register-message")[0].textContent =
        "Registration failed: Passwords do not match.";
    }
  });
// import { getPosts } from "./getBlogPosts.js";

// const registerData = {
//     name: "SerenaTravel",
//     email: "annaas00208@stud.noroff.no",
//     password: "firstRegisterApiPasswordSerena",
//     bio: "This is my profile bio",
//     venueManager: true
// };

// export async function registerUser(registerData) {
//     const response = await fetch(`${apiUrl}/auth/register`, {
//         method: `POST`,
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(registerData)
//     });

//     if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await response.json();
// }
