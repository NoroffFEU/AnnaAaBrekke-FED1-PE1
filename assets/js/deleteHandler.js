import { deletePostApi } from "./editApi.js";
import { getName } from "./userName.js";

export async function handleDeleteClick(event) {
  // Retrieve the logged-in user's name
  const name = getName(); // Retrieve the author from data attribute DET ER HERR!!!!!!

  const postId = event.target.dataset.id;
  console.log(`Deleting post with ID: ${postId}`);
  if (confirm("Are you sure you want to delete this post?")) {
    try {
      await deletePostApi(name, postId);
      // deletePost(postId);
    } catch (error) {
      console.error(`Failed to delete post with ID ${postId}:`, error);
      alert("Failed to delete post. Please try again.");
    }
  }
}

// function deletePost(postId) {
//   locallyCreatedPosts = locallyCreatedPosts.filter(
//     (post) => post.id !== postId
//   );
//   saveCreatedPosts(locallyCreatedPosts);
//   displayPosts(locallyCreatedPosts, true);
// }
