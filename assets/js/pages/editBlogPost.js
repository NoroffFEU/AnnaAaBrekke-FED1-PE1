import { loadCreatedPosts, displayPosts } from "./createBlogPost.js";
import { sortPostByNewest } from "../utils/sort.js";
import { setupEditFormEventHandler } from "../handlers/eventHandlers.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { showErrorAlert } from "../utils/alerts.js";
import { isLoggedIn } from "../api/loginApi.js";
import { redirectToLoginPage } from "../utils/routing.js";

let editPosts = [];

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
  const searchInput = document.querySelector("[data-search]");
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
}

document.addEventListener("DOMContentLoaded", () => {
  // Check if the user is on the register, edit or create page
  const currentPage = window.location.pathname;
  if (
    currentPage.includes("edit.html") ||
    currentPage.includes("create.html") ||
    currentPage.includes("register.html")
  ) {
    // Redirect to login page if not logged in
    if (!isLoggedIn()) {
      showErrorAlert("You need to be logged in to access this page");
      redirectToLoginPage();
    }
    return;
  }

  // Setup event handlers and fetch posts for editing on DOMContentLoaded
  setupEditFormEventHandler();
  fetchAndDisplayPostsForEdit();
});
