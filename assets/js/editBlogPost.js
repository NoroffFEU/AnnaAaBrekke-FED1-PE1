// Get all the posts and put them in a list under eacother
// Add edit button and redirect to edit page - edit page similar to create post, but confrim changes and change innerhtml
// Add delete button and delete - need to log in again to delete and then innerhtml gone

// editBlogPosts.js
// editBlogPosts.js
import { loadCreatedPosts, displayPosts } from "./createBlogPost.js";
import { sortPostByNewest } from "./sort.js";
// import { populateEditForm } from "./populateForm.js";
import { setupEditFormEventHandler } from "./eventHandlers.js";

// after populateform, then editpostapi - uodate.

// Fetch and display posts to select for editing
export async function fetchAndDisplayPostsForEdit() {
  try {
    let editPosts = await loadCreatedPosts();
    if (!editPosts || editPosts.length === 0) {
      console.log("No posts in local storage");
      document.getElementById("post-container").innerHTML =
        "<p>No posts available for editing.</p>";
    } else {
      console.log("Posts on edit page loaded");
      editPosts = sortPostByNewest(editPosts);
      displayPosts(editPosts, true); // Assuming displayPosts handles edit button setup
    }
  } catch (error) {
    console.error("Failed to load posts:", error);
    document.getElementById("post-container").innerHTML =
      "<p>Error loading posts. Please try again later.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // populateEditForm();
  setupEditFormEventHandler();
  fetchAndDisplayPostsForEdit(); // This might be conditional based on page role
});

// document.getElementById("editPostForm").style.display = "none";

// document.addEventListener('DOMContentLoaded', function () {
//   const editButtons = document.querySelectorAll(".grid-post button");

//   editButtons.forEach(button => {
//       button.addEventListener("click", function() {
//           const postId = this.parentNode.getAttribute("data-post-id");
//           showEditForm(postId);
//       });
//   });
// })

// function showEditForm(postId) {
//   // Example: Fetch post details from a data structure or the DOM
//   const postElement = document.querySelector(`[data-post-id="${postId}"]`);
//   const form = document.getElementById('editPostForm');

//   // Populate the form with the post's existing data
//   document.getElementById('postTitle').value = postElement.querySelector('h2').innerText;
//   // Add other fields as necessary...

//   // Display the form
//   form.style.display = 'block';

//   // Optional: Adjust the form's position or additional UI elements
//   form.scrollIntoView();
// }

// document.addEventListener("DOMContentLoaded", initEditPage);

// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", initEditPage);
// } else {
//   initEditPage();
// }

// import { apiUrlUser } from "./api.mjs";

// // sending a POST request to the API for this post ID
// async function editPost(name, postData) {
//   const accessToken = localStorage.getItem("token");
//   if (!accessToken) {
//     throw new Error("No access token found, please login.");
//   }

//   try {
//     const response = await fetch(`${apiUrlUser}/${name}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(postData),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// }

// async function editPost(name, postData) {
//   const accessToken = localStorage.getItem("token"); // Ensure token is retrieved here
//   if (!accessToken) {
//     throw new Error("No access token found, please login.");
//   }
//   try {
//     const response = await fetch(`${apiUrlUser}/${name}/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(postData),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const editdPost = await response.json(); // Parse the response to get the created post
//     createdPosts.push(createdPost); // Add the created post to the array

//     return createdPost; // Return the created post
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// }

//login
//editpage - add all just like fetch and display
//then add delete button
//
