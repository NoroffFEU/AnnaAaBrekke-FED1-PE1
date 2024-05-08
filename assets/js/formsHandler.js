// src/handlers/register.mjs
import { register } from "./register.js";

export function setRegisterFormListener() {
  const form = document.getElementById("registerForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const registerData = Object.fromEntries(formData.entries());

      console.log("Profile Data:", registerData);

      // Confirm Password validation
      if (registerData.password !== registerData.confirmPassword) {
        document.getElementsByClassName("register-message")[0].textContent =
          "Registration failed: Passwords do not match.";
        return;
      }

      // Remove confirmPassword from the data being sent to the API
      delete registerData.confirmPassword;

      try {
        await register(registerData);
        document.getElementsByClassName("register-message")[0].textContent =
          "Registration successful! Log in with your new account.";

        // Store relevant data in local storage for login purposes
        localStorage.setItem("email", registerData.email);
        localStorage.setItem("password", registerData.password);

        // Redirect to login page
        window.location.href = "../account/login.html";
      } catch (error) {
        document.getElementsByClassName("register-message")[0].textContent =
          "Registration failed: " + error.message;
      }
    });
  }
}

// import { register } from "/register.js";
// import { loginOwner } from "/login.js";

// export function setRegisterFormListener() {
//   const form = document.querySelector("#registerForm");

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const profile = Object.fromEntries(formData.entries());

//     console.log("Profile Data:", profile);

//     try {
//       const registrationResult = await register(profile);
//       document.getElementsByClassName("register-message")[0].textContent =
//         "Registration successful! Log in with your new account.";

//       // Store relevant data in local storage for login purposes
//       localStorage.setItem("email", profile.email);
//       localStorage.setItem("password", profile.password);

//       // Redirect to login page
//       window.location.href = "/account/login.html";
//     } catch (error) {
//       document.getElementsByClassName("register-message")[0].textContent =
//         "Registration failed: " + error.message;
//     }
//   });
// }

// export function setLoginFormListener() {
//   const form = document.querySelector("#loginForm");

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const credentials = Object.fromEntries(formData.entries());

//     console.log("Login Credentials:", credentials);

//     try {
//       const loginResponse = await login(credentials);
//       localStorage.setItem("token", loginResponse.accessToken);
//       localStorage.setItem("loginTime", new Date().getTime());
//       localStorage.setItem("user", JSON.stringify(loginResponse));

//       console.log("Login successful:", loginResponse);

//       // Remove the login form
//       form.style.display = "none";

//       // Show a greeting message
//       const greetingMessage = document.createElement("h1");
//       greetingMessage.textContent = `Hello ${loginResponse.name}!`;
//       document.body.appendChild(greetingMessage);

//       // Create a div for navigation buttons
//       const chooseWhereNext = document.createElement("div");
//       chooseWhereNext.classList.add("choose-container");

//       // Create "Edit" button
//       const editNavButton = document.createElement("button");
//       editNavButton.textContent = "Edit";
//       editNavButton.addEventListener("click", () => {
//         window.location.href = "/post/edit.html";
//       });

//       // Create "Create" button
//       const createNavButton = document.createElement("button");
//       createNavButton.textContent = "Create";
//       createNavButton.addEventListener("click", () => {
//         window.location.href = "/post/create.html";
//       });

//       // Append buttons to the navigation div
//       chooseWhereNext.appendChild(editNavButton);
//       chooseWhereNext.appendChild(createNavButton);

//       // Append the navigation div to the document body
//       document.body.appendChild(chooseWhereNext);
//     } catch (error) {
//       const errorMessageElement = document.getElementsByClassName("login-message")[0];
//       errorMessageElement.textContent = "Login failed: " + error.message;
//       errorMessageElement.style.color = "red";
//       console.error("Login Error Details:", error.message);
//     }
//   });
// }

// // import { saveCreatedPosts, displayPosts, createPost, loadCreatedPosts } from "./createBlogPost.js";

// // let locallyCreatedPosts = []; // Initialize an array to store created posts at the very top

// // export async function createFormHandler() {
// //   const form = document.getElementById("createPostForm");
// //   if (!form) {
// //     console.log("No form expected on this page, none found."); // Log a message if the form is not found
// //     return; // Exit the function if there is no form
// //   }

// //   form.addEventListener("submit", async (event) => {
// //     event.preventDefault();
// //     console.log("Form submission prevented.");

// //     // Assuming there's an input for the media URL and another for the alt text
// //     const mediaUrl = document.getElementById("postImage").value;
// //     const mediaAlt = "Description of the image"; // Update this with a real input or dynamic data if necessary

// //     const media = {
// //       url: mediaUrl,
// //       alt: mediaAlt,
// //     };
// //     const title = document.getElementById("postTitle").value;
// //     const author = document.getElementById("postAuthor").value;
// //     // const date = document.getElementById("postDate").value;
// //     const tags = document
// //       .getElementById("postTags")
// //       .value.split(",")
// //       .map((tag) => tag.trim());
// //     const body = document.getElementById("postContent").value;

// //     const postData = {
// //       media,
// //       title,
// //       author,
// //       tags,
// //       body,
// //     };
// //     console.log("Submitting post data:", postData);

// //     try {
// //       const response = await createPost("SerenaTravel", postData);
// //       console.log("Post created successfully:", response);

// //       // Note that we are now accessing the properties through 'response.data'
// //       locallyCreatedPosts.push({
// //         id: response.data.id,
// //         media: response.data.media, // Add banner URL to the object
// //         title: response.data.title,
// //         body: response.data.body,
// //         author: response.data.author.name,
// //         created: response.data.created,
// //         updated: response.data.updated,
// //         tags: response.data.tags.map((tag) => tag.label || tag), // Ensure tag structure is consistent
// //       });

// //       saveCreatedPosts(); // Save the updated array to localStorage
// //       displayPosts([response.data]); // Update the display with the new post
// //       loadCreatedPosts();
// //     } catch (error) {
// //       console.error("Failed to create post:", error);
// //       alert("Failed to create post. Please try again.");
// //     }
// //   });
// // }
