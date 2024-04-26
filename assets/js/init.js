import { getPosts } from "./get.js"; // Handles fetching posts from the server
import { savePosts, loadPosts, displayPosts } from "./createBlogPost.js"; // Handles local storage and displaying posts

// Function to fetch posts from the server and display them
async function fetchAndDisplayPosts() {
  try {
    let posts = await loadPosts(); // First try to load posts from local storage

    if (!posts || !posts.length) {
      // If no posts are found in local storage, fetch from server
      posts = await getPosts("SerenaTravel"); // Fetch posts
      savePosts(posts); // Save fetched posts to local storage
    }
    // Display only the first twelve posts
    displayPosts(posts.slice(0, 12));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    alert("Failed to load posts. Please try again.");
  }
}


// Initialize the page by fetching and displaying posts
function init() {
  console.log("DOM Content Loaded or already ready");
  fetchAndDisplayPosts();
}

document.addEventListener("DOMContentLoaded", init); // Ensure this runs after the DOM is fully loaded
