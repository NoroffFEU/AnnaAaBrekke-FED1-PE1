import { apiUrlUser } from "./apiUrl.mjs";
import { fetchAndDisplayPostsForEdit } from "../pages/editBlogPost.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { getName } from "../auth/userName.js";

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
    await fetchAndDisplayPostsForEdit();
  } catch (error) {
    console.error("Error updating post:", error);
  } finally {
    hideLoader();
  }
}
