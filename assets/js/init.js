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
async function fetchAndDisplayPosts() {
  console.log("Attempting to fetch and display posts...");
  try {
    console.log("Loading posts from local storage...");
    let homePosts = await loadCreatedPosts(); // First try to load posts from local storage

    if (!homePosts || !homePosts.length) {
      console.log("No posts in local storage, fetching from server...");
      homePosts = await getPosts("SerenaTravel"); // Fetch posts
      saveCreatedPosts(homePosts); // Save fetched posts to local storage
      console.log("Posts saved to local storage");
    } else {
      console.log(`Loaded posts from local storage`);
    }

    // console.log("Sorting posts by creation date...");
    // homePosts = sortedPostsByDateCreated(homePosts); // Use the imported sorting function
    // console.log(`Fetched posts:`, homePosts); // Ensure this logs an array

    console.log("Displaying posts...");
    displayPosts(homePosts); // Assuming displayPosts can handle and limit the posts on its own
    console.log("Posts displayed");

    console.log("Creating carousel for latest posts...");
    latestPostsCarousel(homePosts); // Assuming latestPostsCarousel can handle and limit the posts on its own
    console.log("Latest posts carousel created");
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    // alert("Failed to load posts. Please try again.");
  }
}


// Initialize the page by fetching and displaying posts
async function init() {
  console.log("DOM Content Loaded or already ready, initializing...");
  const posts = (await loadCreatedPosts()) || [];
  console.log("Posts loaded:", posts.length);

  await fetchAndDisplayPosts(posts);
  console.log("Posts fetched and displayed.");

  addSortButtonsEventListener(posts);
  console.log("Sort buttons event listeners added.");

  addFilterButtonsEventListener(); // Assume filters don't need posts directly
  console.log("Filter buttons event listeners added.");
}

document.addEventListener("DOMContentLoaded", init);
