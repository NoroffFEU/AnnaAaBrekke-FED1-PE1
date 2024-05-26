import { loadCreatedPosts, saveCreatedPosts, displayPosts } from "./createBlogPost.js";
import { sortPostByNewest } from "../utils/sort.js";
import { setupEditFormEventHandler } from "../handlers/eventHandlers.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { showErrorAlert } from "../utils/alerts.js";
import { checkLoginAndRedirect } from "../api/loginApi.js";

let editPosts = [];

// Fetch and display posts to select for editing
export async function fetchAndDisplayPostsForEdit() {
  try {
    showLoader();
    console.log("Fetching posts for edit...");

    // Load posts from local storage
    editPosts = loadCreatedPosts();
    console.log("Loaded posts for editing:", editPosts);

    // Check if there are any posts
    if (Array.isArray(editPosts) && editPosts.length === 0) {
      showErrorAlert("No posts available for editing.");
      console.log("No posts available for editing.");
    } else if (Array.isArray(editPosts)) {
      // Sort posts by newest
      editPosts = sortPostByNewest(editPosts);
      console.log("Sorted posts for editing:", editPosts);

      // Display posts with edit options
      displayPosts(editPosts, true, -1);
      console.log("Displayed posts for editing.");

      // Search functionality
      setupSearch(editPosts);
      console.log("Search setup completed.");
    } else {
      console.error("Expected editPosts to be an array but got:", editPosts);
      showErrorAlert("Failed to load posts. Invalid data format.");
    }
  } catch (error) {
    console.error("Failed to load posts:", error);
    // Display error message if posts fail to load
    showErrorAlert("Error loading posts. Please try again later.");
  } finally {
    hideLoader();
  }
}

function isEditPage() {
  return document.body.dataset.page === "edit";
}

// Sources used (https://www.youtube.com/watch?v=TlP5WIxVirU and https://blog.openreplay.com/implementing-live-search-functionality-in-javascript/)
// Function to setup search functionality for title and tags
function setupSearch(posts) {
  if (!isEditPage()) return;

  const searchInput = document.getElementById("searchInput");
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

// Function to initialize the edit page
async function initializeEditPage() {
  console.log("Initializing edit page...");
  await checkLoginAndRedirect();
  setupEditFormEventHandler();
  await fetchAndDisplayPostsForEdit();
}

document.addEventListener("DOMContentLoaded", () => {
  checkLoginAndRedirect()
    .then(() => {
      if (isEditPage()) {
        console.log("Edit page detected. Initializing...");
        initializeEditPage();
      }
    })
    .catch(error => {
      console.error(error);
    });
});
