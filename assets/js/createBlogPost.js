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
    console.log("No form found on this page."); // Log a message if the form is not found
    return; // Exit the function if there is no form
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submission prevented.");

    // const image = document.getElementById("postImage").files[0];
    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postContent").value;

    const postData = { title, body };
    console.log("Submitting post data:", postData);

    try {
      const response = await createPost("SerenaTravel", postData);
      console.log("Post created successfully:", response);
      createdPosts.push(response); // add response to createdPosts
      savePosts(); // Save posts to localStorage
      displayPosts([response]); // Display new post
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
  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postContainer.appendChild(postElement);
  });
}

function createPostElement(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("grid-post");
  postElement.innerHTML = `
    <div class="post-info">
      <h3 class="post-title">${post.data.title}</h3>
      <p class="post-text">${post.data.body}</p>
      <div class="more-buttons">
        <button class="read-more">Read More</button>
      </div>
    </div>
  `;
  return postElement;
}

// <img src="${post.data.image}" alt="Posted Image" class="post-image">
