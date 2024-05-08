// Get all the posts and put them in a list under eacother
// Add edit button and redirect to edit page - edit page similar to create post, but confrim changes and change innerhtml
// Add delete button and delete - need to log in again to delete and then innerhtml gone

// editBlogPosts.js
import { loadCreatedPosts, displayPosts } from "./createBlogPost.js";
import { sortPostByNewest } from "./sort.js";

async function fetchAndDisplayPostsForEdit() {
  console.log("fetchAndDisplayPostsForEdit started");
  let editPosts = loadCreatedPosts();

  if (!editPosts || editPosts.length === 0) {
    console.log("No posts in local storage");
  } else {
    console.log(`Loaded posts from local storage`);
  }

  editPosts = sortPostByNewest(editPosts);

  console.log("Displaying posts for edit...");
  displayPosts(editPosts, true);
  console.log("Posts for edit displayed");
}

async function initEditPage() {
  console.log("Initializing edit page...");
  await fetchAndDisplayPostsForEdit();
}

document.addEventListener("DOMContentLoaded", initEditPage);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEditPage);
} else {
  initEditPage();
}

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
