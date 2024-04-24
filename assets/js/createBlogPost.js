import { apiUrlUser } from "./api.mjs";
import { displayPosts } from "./displayPosts.js";

// Function to create a new blog post
export async function createPost(name, postData, accessToken) {
  console.log("Attempting to create a post with data:", postData); // Log the postData being sent
  try {
    const response = await fetch(`${apiUrlUser}/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });

    console.log("Response received from API:", response); // Log the raw response from the API

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Post created successfully, response data:", responseData); // Log the response data

    // displayPosts();
    // // Possibly redirect to the blog feed page or display a success message
    // window.location.href = "../index.html"; // Adjust the path as necessary

    return responseData;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// This part of your script handles form submission
document
  .getElementById("createPostForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("token"); // Retrieve the token
    console.log("Access token retrieved from localStorage:", accessToken); // Log the access token

    // Make sure you have these IDs in your form
    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postContent").value;
    const tags = document
      .getElementById("postTags")
      .value.split(",")
      .map((tag) => tag.trim());

    const name = "SerenaTravel"; // Use the name from the login response

    // Construct the new post data object
    const newPostData = {
      title: title,
      body: body,
      tags: tags,

      // Add other data fields like tags and media if needed
    };

    console.log("New post data prepared for submission:", newPostData); // Log the newPostData object

    try {
      // Call the createPost function with the new post data
      const data = await createPost(newPostData, accessToken);
      console.log("Post created successfully:", data);
      window.location.href = "./index.html"; // Redirect to the index page
    } catch (error) {
      console.error("Failed to create post:", error);
      // Display an error message to the user
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const accessToken = localStorage.getItem("token");
  if (!accessToken) {
    console.log("No access token found in localStorage, redirecting to login.");
    window.location.href = "login.html"; // Redirect to login page
  }
});

// tags: ["Surf", "Tropical", "Beach", "Food"],
// media: {
//   url: "",
//   alt: "An amazing travel photo",
// },
