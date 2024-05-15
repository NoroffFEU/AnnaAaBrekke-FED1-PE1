// editHandler.js

// import { editPostApi } from "./editApi.js";
// import { getName } from "./userName.js";

// export function setupEditFormEventHandler() {
//   const form = document.getElementById("editPostForm");
//   form.addEventListener("submit", async (event) => {
//     event.preventDefault(); // Prevent default form submission behavior

//     // Get the post ID from the form
//     const postId = form.getAttribute("data-id");

//     // Get the updated data from the form fields
//     const postData = {
//       title: document.getElementById("postTitle").value,
//       body: document.getElementById("postContent").value,
//       imageUrl: document.getElementById("postImage").value, // Assuming you have an input field for image URL
//       // Add more fields as needed
//     };

//     // Get the name of the user/owner
//     const name = getName();

//     try {
//       // Send a PUT request to the API endpoint to update the post
//       const updatedPost = await editPostApi(name, postId, postData);
      
//       // Optionally, handle successful update (e.g., display success message, update UI)
//       console.log("Post updated successfully:", updatedPost);
//     } catch (error) {
//       // Handle errors (e.g., display error message, log error)
//       console.error("Failed to update post:", error);
//     }
//   });
// }


// // Function to initialize data fetching and form population
// export async function editPostInit(postId) {
//   getSinglePost(name, postId)
//     .then((post) => populateEditForm(post))
//     .catch((error) => {
//       console.error("Error fetching post:", error.message);
//     });
// }
