import {
  loadCreatedPosts,
  saveCreatedPosts,
  displayPosts,
} from "./createBlogPost.js";
import { sortPostByNewest } from "../utils/sort.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { showErrorAlert } from "../utils/alerts.js";
import { getPosts } from "../api/getApi.js";
import { getName } from "../auth/userName.js";

const name = getName();

let editPosts = [];

// Fetch and display posts to select for editing
export async function fetchAndDisplayPostsForEdit() {
  try {
    showLoader();

    // Load posts from local storage
    editPosts = loadCreatedPosts();

    // Check if there are any posts
    if (!Array.isArray(editPosts) || editPosts.length === 0) {
      const response = await getPosts(name);
      editPosts = response.data; // Extract data field from the response
      saveCreatedPosts(editPosts); // Save fetched posts to local storage
    }

    // Ensure editPosts is an array before sorting and displaying
    if (Array.isArray(editPosts)) {
      // Sort posts by newest
      editPosts = sortPostByNewest(editPosts);

      // Display posts with edit options
      displayPosts(editPosts, true, -1);

      // Search functionality
      setupSearch(editPosts);
    } else {
      console.error("Expected editPosts to be an array but got:", editPosts);
      showErrorAlert("Failed to load posts. Invalid data format.");
    }
  } catch (error) {
    console.error("Failed to load posts:", error);
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
