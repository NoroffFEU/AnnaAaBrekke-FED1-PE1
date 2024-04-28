import { apiUrlUser } from "./api.mjs";
console.log(apiUrlUser);

let createdPosts = []; // Initialize an array to store created posts at the very top

export async function savePosts() {
  localStorage.setItem("posts", JSON.stringify(createdPosts));
}

export async function loadPosts() {
  const storedPosts = localStorage.getItem("posts");
  if (storedPosts) {
    createdPosts = JSON.parse(storedPosts);
    displayPosts(createdPosts);
  }
}

console.log("Checking script execution post-import.");

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
    init();
  });
} else {
  loadPosts();
  init();
}

function init() {
  console.log("Already ready");
  setupFormHandler(); // Call setupFormHandler within init
}

function setupFormHandler() {
  const form = document.getElementById("createPostForm");
  if (!form) {
    console.log("No form expected on this page, none found."); // Log a message if the form is not found
    return; // Exit the function if there is no form
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submission prevented.");

    const media = document.getElementById("postImage").files[0];
    const title = document.getElementById("postTitle").value;
    const author = document.getElementById("postAuthor").value;
    // const date = document.getElementById("postDate").value;
    const tags = document
      .getElementById("postTags")
      .value.split(",")
      .map((tag) => tag.trim());
    const body = document.getElementById("postIntro").value;

    const postData = {
      media,
      title,
      author,
      // date,
      tags,
      body,
    };
    console.log("Submitting post data:", postData);

    try {
      const response = await createPost("SerenaTravel", postData);
      console.log("Post created successfully:", response);

      // Note that we are now accessing the properties through 'response.data'
      createdPosts.push({
        id: response.data.id,
        media: response.data.media, // Add banner URL to the object
        title: response.data.title,
        body: response.data.body,
        author: response.data.author.name,
        created: response.data.created,
        updated: response.data.updated,
        tags: response.data.tags,
      });

      savePosts(); // Save the updated array to localStorage
      displayPosts([response.data]); // Update the display with the new post
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    }
  });
}

async function createPost(name, postData) {
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

    const createdPost = await response.json();
    return createdPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function displayPosts(posts) {
  const postContainer = document.querySelector(".post-container");
  postContainer.innerHTML = ""; // Clear existing posts to prevent duplication

  // Ensure there are posts to display
  if (posts && posts.length > 0) {
    posts.slice(28, 35).forEach((post) => {
      const postElement = createPostElement(post);
      postContainer.appendChild(postElement);
      // Add event listener to each post element
      postElement.addEventListener("click", () => {
        const postId = post.id; // Assuming each post has an 'id' property
        redirectToPostPage(postId);
        console.log("Clicked post ID:", postId);
      });
    });
  } else {
    console.log("No posts to display");
  }
}

function redirectToPostPage(postId) {
  // Redirect to post/index.html with the post ID as a query parameter
  window.location.href = `post/index.html?id=${postId}`;
}

// this is for the home page posts container

function createPostElement(post) {
  const postData = post.data || post;

  console.log("Post:", postData);

  const postElement = document.createElement("div");
  postElement.classList.add("grid-post");

  // Create tags HTML if tags are present in postData
  let tagsHtml = "";
  if (postData.tags && postData.tags.length > 0) {
    tagsHtml =
      '<div class="tags">' +
      postData.tags
        .map(
          (tag) =>
            `<button class="tag" value="${tag.value}">${tag.label}</button>`
        )
        .join("") +
      "</div>";
  }

  // Add the tagsHtml right after the author div
  postElement.innerHTML = `
    <div class="post-info">
      <img src="${postData.media}" alt="Post Image" class="post-img">
      <h3 class="post-title">${postData.title}</h3>
      <div class="post-author">
        <a href="link-to-author-profile.html" rel="author">${
          postData.author
        }</a>
      </div>
      ${tagsHtml} 
      <time datetime="${postData.created}">${new Date(
    postData.created
  ).toLocaleDateString()}</time>
      <p class="post-text">${postData.body}</p>
      <div class="more-buttons">
        <button class="read-more">Read More</button>
      </div>
    </div>
  `;

  return postElement;
}

// <img src="${post.data.image}" alt="Posted Image" class="post-image">
