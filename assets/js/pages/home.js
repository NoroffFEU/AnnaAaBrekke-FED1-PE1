import { getPosts } from "../api/getApi.js";
import {
  saveCreatedPosts,
  loadCreatedPosts,
  displayPosts,
} from "./createBlogPost.js";
import { latestPostsCarousel } from "../utils/carousel.js";
import { sortPostByNewest } from "../utils/sort.js";
import { getName } from "../auth/userName.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { showErrorAlert } from "../utils/alerts.js";

const name = getName();

export async function fetchAndDisplayPosts() {
  let homePosts = [];
  try {
    showLoader();

    homePosts = loadCreatedPosts(); // Load posts from local storage
    console.log("Loaded posts from localStorage for home page:", homePosts);

    // If no posts found in local storage, fetch from server
    if (!Array.isArray(homePosts) || homePosts.length === 0) {
      console.log("No posts found in local storage. Fetching from server...");
      const response = await getPosts(name);
      homePosts = response.data; // Extract data field from the response
      saveCreatedPosts(homePosts); // Save fetched posts to local storage
      console.log(
        "Fetched posts from server and saved to localStorage:",
        homePosts
      );
    }

    // Ensure homePosts is an array before sorting and displaying
    if (Array.isArray(homePosts)) {
      sortPostByNewest(homePosts);
      console.log("Sorted posts for home page:", homePosts);

      displayPosts(homePosts, false, 12); // Display posts, limit to 12 on the home page
      latestPostsCarousel(homePosts.slice(0, 3)); // Create carousel for the latest posts
    } else {
      console.error("Expected homePosts to be an array but got:", homePosts);
      showErrorAlert("Failed to load posts. Invalid data format.");
    }
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
