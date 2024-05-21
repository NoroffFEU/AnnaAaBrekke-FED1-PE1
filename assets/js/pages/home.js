import { getPosts } from "../api/getApi.js"; 
import {
  saveCreatedPosts,
  loadCreatedPosts,
  displayPosts,
} from "./createBlogPost.js"; 
import { latestPostsCarousel } from "../utils/carousel.js"; 
import { sortPostByNewest } from "../utils/sort.js"; 
import {
  addSortButtonsEventListener,
  handlePostClick,
  setupCarouselClickEvents,
} from "../handlers/eventHandlers.js"; 
import { getName } from "../auth/userName.js"; 
import { hideLoader, showLoader } from "../utils/loading.js"; 
import { addFilterButtonsEventListener } from "../utils/filter.js"; 
import { showErrorAlert } from "../utils/alerts.js"; 

const name = getName(); 

// Function to fetch posts from the server and display them
export async function fetchAndDisplayPosts() {
  console.log("fetchAndDisplayPosts started");
  let homePosts = [];
  try {
    showLoader(); 

    console.log("Loading posts from local storage...");
    homePosts = await loadCreatedPosts(); // Load posts from local storage

    // If no posts found in local storage, fetch from server
    if (!homePosts || !homePosts.data || homePosts.data.length === 0) {
      console.log("No posts in local storage, fetching from server...");
      homePosts = await getPosts(name);
      saveCreatedPosts(homePosts.data); // Save fetched posts to local storage
      console.log("Posts saved to local storage");
    } else {
      console.log(`Loaded posts from local storage`);
    }

    homePosts.data = sortPostByNewest(homePosts.data); // Sort posts by newest

    console.log("Displaying posts...");
    displayPosts(homePosts.data, false, 12); // Display posts, limit to 12 on the home page
    console.log("Posts displayed");

    console.log("Creating carousel for latest posts...");
    latestPostsCarousel(homePosts.data.slice(0, 3)); // Create carousel for the latest posts
    console.log("Latest posts carousel created");
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    showErrorAlert("Failed to load posts. Please try again."); 
  } finally {
    hideLoader(); 
  }

  return homePosts;
}

// Initialize the application
async function init() {
  showLoader(); 
  console.log("Initializing application...");
  const homePosts = await fetchAndDisplayPosts(); // Fetch and display posts
  console.log("Posts fetched and displayed:", homePosts);

  setupCarouselClickEvents(); // Set up event listeners for carousel navigation
  console.log("Next and prev buttons event listeners added.");

  addSortButtonsEventListener(homePosts); // Add event listeners for sort buttons
  console.log("Sort buttons event listeners added.");
  addFilterButtonsEventListener(); // Add event listeners for filter buttons

  // Add click event listeners to each post
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    post.addEventListener("click", () => {
      handlePostClick(post); // Handle post click
    });
  });

  hideLoader(); 
}

// Check if document is still loading and initialize accordingly
console.log(document.readyState);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init); // Initialize when DOM content is loaded
} else {
  init(); // Initialize immediately if DOM is already loaded
}
