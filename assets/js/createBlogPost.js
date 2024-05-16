// createBlogPost.js
import { apiUrlUser } from "./api.mjs";
import { handlePostClick } from "./eventHandlers.js";
import { redirectToPostPage } from "./routingUtils.js";
import { handleEditClick } from "./eventHandlers.js";
import { handleDeleteClick } from "./eventHandlers.js";
import { getName } from "./userName.js";
import { editPostApi } from "./editApi.js";
console.log(apiUrlUser);

const name = getName();

let locallyCreatedPosts = [];

// let locallyCreatedPosts = loadCreatedPosts(); // Ensure locallyCreatedPosts is loaded

export function saveCreatedPosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
  locallyCreatedPosts = posts;
}
console.log("saveCreatedPosts module loaded");

export function loadCreatedPosts() {
  const storedPosts = localStorage.getItem("posts");
  if (storedPosts) {
    locallyCreatedPosts = JSON.parse(storedPosts);
  }
  return locallyCreatedPosts;
}
console.log("loadCreatedPosts module loaded");

export async function createPost(name, postData) {
  const accessToken = localStorage.getItem("token");
  if (!accessToken) {
    throw new Error("No access token found, please login.");
  }

  try {
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
  }
}

export function displayPosts(posts, isEditPage = false) {
  const postContainer = document.querySelector(".post-container");
  if (!postContainer) {
    console.error("post-container does not exist in the DOM.");
    return;
  }
  // Clear existing posts to prevent duplication
  postContainer.innerHTML = "";

  if (posts && posts.length > 0) {
    posts.slice(0, 12).forEach((post) => {
      const postElement = createPostElement(post, isEditPage);

      if (isEditPage) {
        postElement
          .querySelector(".edit-post")
          .addEventListener("click", () => {
            handleEditClick(post, locallyCreatedPosts);
            console.log("Clicked id", post.id);
          });
        postElement
          .querySelector(".delete-post")
          .addEventListener("click", () => {
            handleDeleteClick(post, locallyCreatedPosts); // Pass locallyCreatedPosts here
            console.log(
              "Clicked delete button, name and id:",
              getName(),
              post.id
            );
          });
      } else {
        postElement
          .querySelector(".read-more")
          .addEventListener("click", () => {
            handlePostClick(post);
            redirectToPostPage(post.id);
          });
      }

      postContainer.appendChild(postElement);
    });
  } else {
    console.log("No posts to display");
  }
}

console.log("displayPosts module loaded");

function createPostElement(post, includeEditButtons = false) {
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

  const country = postData.country || "No country specified";
  const author =
    typeof postData.author === "object"
      ? postData.author.name || "Anonymous"
      : postData.author || "Anonymous";

  let moreButtonsHtml = `
    <div class="more-buttons">
      <button class="read-more" data-id="${postData.id}">Check it out!</button>
    </div>`;

  if (includeEditButtons) {
    moreButtonsHtml = `
      <div class="more-buttons">
        <button class="edit-post" data-id="${postData.id}">Edit</button>
        <button class="delete-post" data-id="${postData.id}">Delete</button>
      </div>`;
  }

  postElement.innerHTML = `
  <div class="post-info">
    <img src="${imageSrc}" onError="this.onerror=null; this.src='${defaultImage}';" alt="${imageAlt}" class="post-img">
    <h3 class="post-title">${postData.title}</h3>
    <div class="post-author">${author}</div>
    <time class="post-date" datetime="${post.created}">${new Date(
    post.updated
  ).toLocaleDateString()}</time>
    <div class="tags">${tagsHtml}</div>
    <div class="post-country">${country}</div>
    ${moreButtonsHtml}
  </div>
`;

  // // Add event listeners for edit and delete buttons if includeEditButtons is true
  // if (includeEditButtons) {
  //   // const postData = post.data || post;
  //   const editButton = postElement.querySelector(".edit-post");
  //   const deleteButton = postElement.querySelector(".delete-post");

  //   editButton.addEventListener("click", () => {
  //     handleEditClick(); // Call handleEditClick function with post ID
  //   });

  //   deleteButton.addEventListener("click", () => {
  //     handleDeleteClick(); // Call handleDeleteClick function with post ID
  //   });
  // }

  return postElement;
}

// Implement the logic to edit the post or redirect to an edit form

// DET ER HER!!!!

// function deletePost(postId) {
//   locallyCreatedPosts = locallyCreatedPosts.filter(
//     (post) => post.id !== postId
//   );
//   saveCreatedPosts(locallyCreatedPosts);
//   displayPosts(locallyCreatedPosts, true);
// }

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

    const media = {
      url: mediaUrl,
      alt: mediaAlt,
    };
    const title = document.getElementById("postTitle").value;
    const author = document.getElementById("postAuthor").value;
    const tags = document
      .getElementById("postTags")
      .value.split(",")
      .map((tag) => tag.trim());
    const body = document.getElementById("postContent").value;
    const country = document.getElementById("postCountry").value;

    const postData = {
      media,
      title,
      author,
      tags,
      body,
      country,
    };

    console.log("Submitting post data:", postData);

    try {
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
        country: response.data.country || country,
      });

      saveCreatedPosts(locallyCreatedPosts);
      displayPosts(postData);
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    }
  });
}

// maybe this part on create.index.js?

export function initCreatePage() {
  loadCreatedPosts();
  displayPosts(locallyCreatedPosts, false);
  createFormHandler();
}

document.addEventListener("DOMContentLoaded", initCreatePage);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCreatePage);
} else {
  initCreatePage();
}
