// import { apiUrlUser } from "./api.mjs";
// import { getName } from "./userName";
// // import { fetchWithAuth } from "./apiAuth.js";

// export async function editPostApi(name, postId, postData) {
//     const response = await fetchWithAuth(`${apiUrlUser}/${name}/${postId}`, {
//         method: "PUT",
//         body: JSON.stringify(postData),
//     });

//     if (!response.ok) {
//         const errorDetails = await response.text();
//         throw new Error(`HTTP error! Status: ${response.status} - ${errorDetails}`);
//     }

//     return await response.json();
// }

// export async function deletePostApi(name, postId) {
//     const response = await fetchWithAuth(`${apiUrlUser}/${name}/${postId}`, {
//         method: "DELETE",
//     });

//     if (!response.ok) {
//         const errorDetails = await response.text();
//         throw new Error(`HTTP error! Status: ${response.status} - ${errorDetails}`);
//     }

//     return await response.json();
// }

// Example usage:
// Assuming postId and formData are available in your context
// postId should be the ID of the post you want to update
// formData should be an object containing the updated post data
// e.g., { title: "Updated Title", body: "Updated body content", tags: ["tag1", "tag2"], media: { url: "https://updated-url.com/image.jpg", alt: "Updated image alt text" } }
// Call the updatePost function with postId and formData
// updatePost('your-post-id', yourFormDataObject);

import { apiUrlUser } from "./api.mjs";
import { fetchAndDisplayPostsForEdit } from "./editBlogPost.js";
import { hideLoader, showLoader } from "./loading.js";
import { getName } from "./userName.js";

export async function editPostApi(postId, formData) {
  try {
    showLoader();

    const name = getName();
    const accessToken = localStorage.getItem("token"); // Retrieve access token from localStorage

    const response = await fetch(apiUrlUser + "/" + name + "/" + postId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken, // Include access token in the Authorization header
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Failed to update post: " + errorMessage);
    }

    const editedPost = await response.json();
    console.log("Updated post:", editedPost);
    // Optionally, you can perform further actions after the post is updated
    await fetchAndDisplayPostsForEdit();
  } catch (error) {
    console.error("Error updating post:", error);
    // Handle error appropriately, such as displaying an error message to the user
  } finally {
    hideLoader();
  }
}
