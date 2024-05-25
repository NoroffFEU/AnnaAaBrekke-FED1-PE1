import { apiUrlUser } from "../api/apiUrl.mjs";
import {
  handlePostClick,
  handleEditClick,
  handleDeleteClick,
} from "../handlers/eventHandlers.js";
import { getName } from "../auth/userName.js";
import { isLoggedIn } from "../api/loginApi.js";
import { showSuccessAlert, showErrorAlert } from "../utils/alerts.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { getPosts } from "../api/getApi.js";
import { latestPostsCarousel } from "../utils/carousel.js";
import { sortPostByNewest } from "../utils/sort.js";

// Logging the API URL for debugging
console.log(apiUrlUser);

// Get the user's name
const name = getName();
let locallyCreatedPosts = [];

// Save created posts to local storage
export function saveCreatedPosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
  locallyCreatedPosts = posts;
}

export function loadCreatedPosts() {
  const storedPosts = localStorage.getItem("posts");
  if (storedPosts) {
    try {
      locallyCreatedPosts = JSON.parse(storedPosts);
    } catch (error) {
      console.error("Error parsing posts from localStorage:", error);
      locallyCreatedPosts = []; // Initialize as an empty array if parsing fails
      localStorage.removeItem("posts"); // Clear invalid data from localStorage
    }
  } else {
    console.log("No posts found in local storage.");
    locallyCreatedPosts = [];
  }
  return locallyCreatedPosts;
}

// Function to create a new post
export async function createPost(name, postData) {
  if (!isLoggedIn(true)) {
    // The user will be alerted and redirected if not logged in
    return;
  }

  const accessToken = localStorage.getItem("token");
  if (!accessToken) {
    throw new Error("No access token found, please login.");
  }

  try {
    showLoader();
    const response = await fetch(`${apiUrlUser}/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  } finally {
    hideLoader();
  }
}

// Function to display posts in the DOM
export function displayPosts(posts, isEditPage = false, limit = 12) {
  const postContainer = document.querySelector(".post-container");
  if (!postContainer) {
    console.error("post-container does not exist in the DOM.");
    return;
  }
  postContainer.innerHTML = "";

  if (posts && posts.length > 0) {
    const postsToDisplay = limit === -1 ? posts : posts.slice(0, limit);
    postsToDisplay.forEach((post) => {
      const postElement = createPostElement(post, isEditPage);

      if (isEditPage) {
        postElement
          .querySelector(".edit-post")
          .addEventListener("click", () => {
            handleEditClick(post);
            console.log("Clicked id", post.id);
          });
        postElement
          .querySelector(".delete-post")
          .addEventListener("click", () => {
            handleDeleteClick(post);
            console.log("Clicked delete button, name and id:", post.id);
          });
      } else {
        postElement
          .querySelector(".read-more")
          .addEventListener("click", () => {
            handlePostClick(post);
          });
      }

      postContainer.appendChild(postElement);
    });
  } else {
    console.log("No posts to display");
  }
}

// Function to create a single post element
function createPostElement(post, isEditPage = false) {
  const postData = post.data || post;

  const postElement = document.createElement("div");
  postElement.classList.add("grid-post");

  const defaultImage = `https://placehold.co/600x400`;
  const imageSrc =
    postData.media && postData.media.url ? postData.media.url : defaultImage;
  const imageAlt =
    postData.media && postData.media.alt
      ? postData.media.alt
      : "Default image description";

  let tagsHtml = "";
  if (post.tags && Array.isArray(post.tags)) {
    tagsHtml = post.tags
      .map((tag) => {
        const tagLabel = tag.label || tag;
        return `<button class="tag" value="${tagLabel}">${tagLabel}</button>`;
      })
      .join("");
  } else {
    console.log("No tags to display or tags are not in expected format.");
  }

  const author =
    typeof postData.author === "object"
      ? postData.author.name || "Anonymous"
      : postData.author || "Anonymous";

  let moreButtonsHtml = `
    <div class="more-buttons">
      <button class="read-more" data-id="${postData.id}">Check it out!</button>
    </div>`;

  if (isEditPage) {
    moreButtonsHtml = `
      <div class="more-buttons">
        <button class="edit-post" data-id="${postData.id}">Edit</button>
        <button class="delete-post" data-id="${postData.id}">Delete</button>
      </div>`;
  }

  const updatedTimeHtml = isEditPage
    ? `
    <time class="post-updated" datetime="${
      postData.updated
    }">Updated: ${new Date(postData.updated).toLocaleDateString()}</time>`
    : "";

  postElement.innerHTML = `
    <div class="post-info">
      <img src="${imageSrc}" onError="this.onerror=null; this.src='${defaultImage}';" alt="${imageAlt}" class="post-img">
      <div class="post-title-container">
        <h3 class="post-title">${postData.title}</h3>
      </div>
      <div class="post-author">${author}</div>
      <time class="post-date" datetime="${
        postData.created
      }">Created: ${new Date(postData.created).toLocaleDateString()}</time>
      ${updatedTimeHtml}
      <div class="tags-container">
        <div class="tags">${tagsHtml}</div>
      </div>
      ${moreButtonsHtml}
    </div>
  `;

  return postElement;
}

// Function to handle form submission for creating a post
function createFormHandler() {
  const form = document.getElementById("createPostForm");
  if (!form) {
    console.log("No form expected on this page, none found.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submission prevented.");

    const mediaUrl = document.getElementById("postImage").value;
    const mediaAlt = document.getElementById("postImageAlt").value;
    const media = { url: mediaUrl, alt: mediaAlt };
    const title = document.getElementById("postTitle").value;
    const author = document.getElementById("postAuthor").value;
    const tags = document
      .getElementById("postTags")
      .value.split(",")
      .map((tag) => tag.trim());
    const body = document.getElementById("postContent").value;

    const postData = { media, title, author, tags, body };
    console.log("Submitting post data:", postData);

    try {
      showLoader();
      const response = await createPost(name, postData);
      console.log("Post created successfully:", response);

      locallyCreatedPosts.push({
        id: response.data.id,
        media: response.data.media,
        title: response.data.title,
        body: response.data.body,
        author: response.data.author.name,
        created: response.data.created,
        updated: response.data.updated,
        tags: response.data.tags.map((tag) => tag.label || tag),
      });

      saveCreatedPosts(locallyCreatedPosts);
      displayPosts(locallyCreatedPosts, false);
      showSuccessAlert("Post created successfully!");

      const postContainer = document.querySelector(".post-container");
      if (postContainer) {
        postContainer.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      showErrorAlert("Failed to create post. Please try again.");
    } finally {
      hideLoader();
    }
  });
}

// Function to fetch and display posts
export async function fetchAndDisplayPosts() {
  console.log("fetchAndDisplayPosts started");
  let homePosts = [];
  try {
    showLoader();
    homePosts = loadCreatedPosts();

    if (!homePosts || homePosts.length === 0) {
      console.log("No posts in local storage, fetching from server...");
      homePosts = await getPosts(name);
      saveCreatedPosts(homePosts.data);
    } else {
      console.log("Loaded posts from local storage");
    }

    homePosts = sortPostByNewest(homePosts);
    displayPosts(homePosts, false, 12);
    latestPostsCarousel(homePosts.slice(0, 3));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  } finally {
    hideLoader();
  }

  return homePosts;
}

// Function to initialize the create page
export function initCreatePage() {
  showLoader();
  loadCreatedPosts();
  displayPosts(locallyCreatedPosts, false, -1);
  createFormHandler();
  hideLoader();
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", initCreatePage);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCreatePage);
} else {
  initCreatePage();
}
