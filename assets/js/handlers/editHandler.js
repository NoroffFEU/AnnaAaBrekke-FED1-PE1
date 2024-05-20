// editHandler.js
import { editPostApi } from "../api/editApi.js";
import { getName } from "../auth/userName.js";
import { editPostApi } from "../api/editApi.js";
import { isLoggedIn } from "../api/loginApi.js";
import { showErrorAlert, showSuccessAlert } from "../utils/alerts.js";

export function setupEditFormEventHandler() {
  const editPostForm = document.getElementById("editPostForm");
  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!isLoggedIn()) {
      alert("You need to be logged in to edit posts.");
      //redirect to login page
      return;
    }

    const postId = document.getElementById("postId").value; // Get the post ID from the form
    const formData = {
      title: document.getElementById("postTitle").value,
      media: {
        url: document.getElementById("postImage").value,
        alt: document.getElementById("postImageAlt").value,
      },
      author: {
        name: document.getElementById("postAuthor").value,
      },
      tags: document
        .getElementById("postTags")
        .value.split(",")
        .map((tag) => tag.trim()),
      body: document.getElementById("postContent").value,
    };

    try {
      await editPostApi(postId, formData); // Call the editPostApi function to update the post
      console.log("Post updated successfully");
      showSuccessAlert("Post updated successfully!");
      // Optionally, you can perform further actions after the post is updated
    } catch (error) {
      console.error("Failed to update post:", error);
      showErrorAlert("Failed to update post. Please try again.");
    }
  });
}

// export async function handleEditClick(event) {
//   const name = getName();
//   // const postId = event.target.id;
//   try {
//     console.log("Clicked product ID:", id);
//     const post = await editPostApi(name, id);
//     setupEditFormEventHandler(post);
//   } catch (error) {
//     console.error("Failed to fetch post for editing:", error);
//   }
// }

// export function handleEditClick(event) {
//   // Get the ID attached to the post
//   const postId = event.target.dataset.postId;

//   // Now you can perform any action with the postId, such as editing the post
//   console.log("Edit button clicked for post with ID:", postId);
// }
//   const editButtons = document.querySelectorAll(".edit-button");
//   editButtons.forEach((button) => {
//     button.addEventListener("click", handleEditClick);
//   });
