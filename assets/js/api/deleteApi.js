import { apiUrlUser } from "./apiUrl.mjs";
import { getName } from "../auth/userName.js";

export async function deletePostApi(postId) {
  try {
    const name = getName();
    const accessToken = localStorage.getItem("token");

    const response = await fetch(`${apiUrlUser}/${name}/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204) {
      console.log("Post deleted successfully");
      return true; // Indicate successful deletion
    } else {
      const errorMessage = await response.text();
      throw new Error(`Failed to delete post: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
