import { getPosts } from "./get.js"; // Handles fetching posts from the server
import {
  saveCreatedPosts,
  loadCreatedPosts,
  displayPosts,
} from "./createBlogPost.js"; // Handles local storage and displaying posts
import { latestPostsCarousel } from "./carousel.js"; // Displays a carousel of the latest posts
import { sortPostByNewest, sortPostsByOldest } from "./sort.js"; // Import the sorting function
import { addSortButtonsEventListener } from "./eventHandlers.js";

// Function to fetch posts from the server and display them
export async function fetchAndDisplayPosts() {
  console.log("fetchAndDisplayPosts started");
  let homePosts = [];
  try {
    console.log("Loading posts from local storage...");
    homePosts = await loadCreatedPosts(); // First try to load posts from local storage
    // console.log("Loaded from local storage:", homePosts.data);

    if (!homePosts || !homePosts.data || homePosts.data.length === 0) {
      console.log("No posts in local storage, fetching from server...");
      homePosts = await getPosts("SerenaTravel"); // Fetch posts
      saveCreatedPosts(homePosts.data); // Save fetched posts to local storage
      console.log("Posts saved to local storage");
    } else {
      console.log(`Loaded posts from local storage`);
    }

    homePosts.data = sortPostByNewest(homePosts.data);

    console.log("Displaying posts...");
    displayPosts(homePosts.data); // Assuming displayPosts can handle and limit the posts on its own
    console.log("Posts displayed");

    console.log("Creating carousel for latest posts...");
    latestPostsCarousel(homePosts.data.slice(0, 3)); // Assuming latestPostsCarousel can handle and limit the posts on its own
    console.log("Latest posts carousel created");
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    // alert("Failed to load posts. Please try again.");
  }

  return homePosts;
}

async function init() {
  console.log("Initializing application...");
  const homePosts = await fetchAndDisplayPosts(); // Call fetchAndDisplayPosts and wait for it to finish
  console.log("Posts fetched and displayed:", homePosts);

  // Call addSortButtonsEventListener with the returned homePosts object
  addSortButtonsEventListener(homePosts);
  console.log("Sort buttons event listeners added.");

  // addFilterButtonsEventListener(); // Assume filters don't need posts directly
  // console.log("Filter buttons event listeners added.");
}

console.log(document.readyState);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}