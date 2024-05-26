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

    // Check if homePosts.data is an array and has posts
    if (!Array.isArray(homePosts) || homePosts.length === 0) {
      const response = await getPosts(name);
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        homePosts = response.data; // Extract data field from the response
        saveCreatedPosts(homePosts); // Save fetched posts to local storage
      } else {
        console.error("Unexpected data structure:", response);
        showErrorAlert("Failed to load posts. Invalid data format.");
      }
    }

    // Ensure homePosts is an array before sorting and displaying
    if (Array.isArray(homePosts)) {
      sortPostByNewest(homePosts);

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
