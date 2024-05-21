import { loadCreatedPosts, displayPosts } from "./createBlogPost.js";
import { sortPostByNewest } from "../utils/sort.js";
import { setupEditFormEventHandler } from "../handlers/eventHandlers.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { showErrorAlert } from "../utils/alerts.js";

// Fetch and display posts to select for editing
export async function fetchAndDisplayPostsForEdit() {
  try {
    console.log("Showing loading indicator");
    showLoader();

    // Load posts from local storage
    let editPosts = await loadCreatedPosts();

    // Check if there are any posts
    if (!editPosts || editPosts.length === 0) {
      console.log("No posts in local storage");
      showErrorAlert("No posts available for editing.");
    } else {
      console.log("Posts on edit page loaded");
      // Sort posts by newest
      editPosts = sortPostByNewest(editPosts);
      // Display posts with edit options
      displayPosts(editPosts, true);
    }
  } catch (error) {
    console.error("Failed to load posts:", error);
    // Display error message if posts fail to load
    showErrorAlert("Error loading posts. Please try again later.");
  } finally {
    console.log("Hiding loading indicator");
    hideLoader();
  }
}

// Setup event handlers and fetch posts for editing on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  setupEditFormEventHandler();
  fetchAndDisplayPostsForEdit();
});
