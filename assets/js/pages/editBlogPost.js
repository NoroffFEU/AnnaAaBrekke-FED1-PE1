import { loadCreatedPosts, displayPosts } from "./createBlogPost.js";
import { sortPostByNewest } from "../utils/sort.js";
import { setupEditFormEventHandler } from "../handlers/eventHandlers.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { showErrorAlert } from "../utils/alerts.js";
import { checkLoginAndRedirect } from "../api/loginApi.js";


let editPosts = [];

function isEditPage() {
  return document.body.id === "editBody";
}

// Fetch and display posts to select for editing
export async function fetchAndDisplayPostsForEdit() {
  try {
    console.log("Showing loading indicator");
    showLoader();

    // Load posts from local storage
    editPosts = await loadCreatedPosts();

    // Check if there are any posts
    if (!editPosts || editPosts.length === 0) {
      console.log("No posts in local storage");
      showErrorAlert("No posts available for editing.");
    } else {
      console.log("Posts on edit page loaded");
      // Sort posts by newest
      editPosts = sortPostByNewest(editPosts);
      // Display posts with edit options
      displayPosts(editPosts, true, -1);

      // Search functionality
      setupSearch(editPosts);
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

// Sources used (https://www.youtube.com/watch?v=TlP5WIxVirU and https://blog.openreplay.com/implementing-live-search-functionality-in-javascript/)
// Function to setup search functionality for title and tags
function setupSearch(posts) {
  if (!isEditPage()) return;

  console.log("Setting up search functionality");
  const searchInput = document.getElementById("searchInput");
  console.log("Search input element:", searchInput);
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchValue = e.target.value.toLowerCase();
      const filteredPosts = posts.filter((post) => {
        const titleSearch = post.title.toLowerCase().includes(searchValue);
        const tagsSearch = post.tags.some((tag) =>
          tag.toLowerCase().includes(searchValue)
        );
        return titleSearch || tagsSearch;
      });
      displayPosts(filteredPosts, true);
    });
  } else {
    console.error("Search input element not found");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!isEditPage()) return;

  console.log("DOM fully loaded and parsed");
  checkLoginAndRedirect();
  setupEditFormEventHandler();
  fetchAndDisplayPostsForEdit();
});