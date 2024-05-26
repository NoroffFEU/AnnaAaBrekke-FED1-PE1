import { checkLoginAndRedirect } from "../api/loginApi.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { showErrorAlert } from "../utils/alerts.js";
import { getName } from "../auth/userName.js";
import { fetchAndDisplayPosts } from "./home.js";
import {
  loadCreatedPosts,
  displayPosts,
  createFormHandler,
} from "./createBlogPost.js";
import {
  addSortButtonsEventListener,
  handlePostClick,
  setupCarouselClickEvents,
  setupEditFormEventHandler,
} from "../handlers/eventHandlers.js";
import { addFilterButtonsEventListener } from "../utils/filter.js";
import { fetchAndDisplayPostsForEdit } from "./editBlogPost.js";

const name = getName();

async function initHomePage() {
  try {
    showLoader();
    const homePosts = await fetchAndDisplayPosts();

    setupCarouselClickEvents();
    addSortButtonsEventListener(homePosts);
    addFilterButtonsEventListener();

    // Add click event listeners to each post
    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
      post.addEventListener("click", () => {
        handlePostClick(post); // Handle post click
      });
    });
  } catch (error) {
    console.error("Failed to initialize home page:", error);
    showErrorAlert("Failed to initialize home page. Please try again.");
  } finally {
    hideLoader();
  }
}

async function initCreatePage() {
  try {
    showLoader();
    await checkLoginAndRedirect();
    const posts = loadCreatedPosts();
    displayPosts(posts, false, -1);
    createFormHandler();
  } catch (error) {
    console.error("Failed to initialize create page:", error);
    showErrorAlert("Failed to initialize create page. Please try again.");
  } finally {
    hideLoader();
  }
}

async function initEditPage() {
  try {
    showLoader();
    await checkLoginAndRedirect();
    setupEditFormEventHandler();
    await fetchAndDisplayPostsForEdit();
  } catch (error) {
    console.error("Failed to initialize edit page:", error);
    showErrorAlert("Failed to initialize edit page. Please try again.");
  } finally {
    hideLoader();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const bodyId = document.body.id;
  if (bodyId === "homeBody") {
    initHomePage();
  } else if (bodyId === "createBody") {
    initCreatePage();
  } else if (bodyId === "editBody") {
    initEditPage();
  }
});
