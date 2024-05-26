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
  let homePosts = [];
  try {
    showLoader();

    homePosts = await loadCreatedPosts(); // Load posts from local storage

    // If no posts found in local storage, fetch from server
    if (!homePosts || !homePosts.data || homePosts.data.length === 0) {
      homePosts = await getPosts(name);
      saveCreatedPosts(homePosts.data); // Save fetched posts to local storage
    }

    sortPostByNewest(homePosts.data);

    displayPosts(homePosts.data, false, 12); // Display posts, limit to 12 on the home page
    latestPostsCarousel(homePosts.data.slice(0, 3)); // Create carousel for the latest posts
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    showErrorAlert("Failed to load posts. Please try again.");
  } finally {
    hideLoader();
  }

  return homePosts;
}

// // Initialize the application
// async function init() {
//   showLoader();
//   const homePosts = await fetchAndDisplayPosts(); // Fetch and display posts

//   setupCarouselClickEvents(); // Set up event listeners for carousel navigation
//   addSortButtonsEventListener(homePosts); // Add event listeners for sort buttons
//   addFilterButtonsEventListener(); // Add event listeners for filter buttons

//   // Add click event listeners to each post
//   const posts = document.querySelectorAll(".post");
//   posts.forEach((post) => {
//     post.addEventListener("click", () => {
//       handlePostClick(post); // Handle post click
//     });
//   });

//   hideLoader();
// }

// // Initialize when DOM content is loaded
// document.addEventListener("DOMContentLoaded", init);