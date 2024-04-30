import { apiUrlUser } from "./api.mjs";
console.log(apiUrlUser);

let locallyCreatedPosts = []; // Initialize an array to store created posts at the very top

export async function saveCreatedPosts() {
  localStorage.setItem("posts", JSON.stringify(locallyCreatedPosts));
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

    return await response.json();
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
    posts.slice(0, 12).forEach((post) => {
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

// this is for the home page posts container

function createPostElement(post) {
  const postData = post.data || post;

  console.log("Post:", postData);

  const postElement = document.createElement("div");
  postElement.classList.add("grid-post");

  const defaultImage = `https://placehold.co/600x400`;

  // Ensure media object exists and has a url, otherwise use defaultImage (this helped when not work: if, 30.april)
  const imageSrc =
    postData.media && postData.media.url ? postData.media.url : defaultImage;
  const imageAlt =
    postData.media && postData.media.alt
      ? postData.media.alt
      : "Default image description";

  // Handle tags safely, check if they exist and are iterable
  let tagsHtml = "";
  if (post.tags && Array.isArray(post.tags)) {
    tagsHtml = post.tags
      .map((tag) => {
        // Assuming each tag is an object with a 'label' property, adjust as necessary
        const tagLabel = tag.label || tag; // This will use 'tag' as the label if 'label' property does not exist . do not think it exists
        return `<button class="tag" value="${tagLabel}">${tagLabel}</button>`;
      })
      .join("");
  } else {
    console.log("No tags to display or tags are not in expected format.");
  }

  // Add the tagsHtml right after the author div
  postElement.innerHTML = `
  <div class="post-info">
    <img src="${imageSrc}" onError="this.onerror=null; this.src='${defaultImage}';" alt="${imageAlt}" class="post-img">
    <h3 class="post-title">${postData.title}</h3>
    <div class="post-author">${postData.author}</div>
    <time datetime="${postData.created}">${new Date(
    postData.created
  ).toLocaleDateString()}</time>
    <div class="tags">${tagsHtml}</div>
    <div class="more-buttons">
      <button class="read-more">Read More</button>
    </div>
  </div>
`;

  return postElement;
}

function redirectToPostPage(postId) {
  // Redirect to post/index.html with the post ID as a query parameter
  window.location.href = `post/index.html?id=${postId}`;
}

function createFormHandler() {
  const form = document.getElementById("createPostForm");
  if (!form) {
    console.log("No form expected on this page, none found."); // Log a message if the form is not found
    return; // Exit the function if there is no form
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submission prevented.");

    // Assuming there's an input for the media URL and another for the alt text
    const mediaUrl = document.getElementById("postImage").value;
    const mediaAlt = "Description of the image"; // Update this with a real input or dynamic data if necessary

    const media = {
      url: mediaUrl,
      alt: mediaAlt,
    };
    const title = document.getElementById("postTitle").value;
    const author = document.getElementById("postAuthor").value;
    // const date = document.getElementById("postDate").value;
    const tags = document
      .getElementById("postTags")
      .value.split(",")
      .map((tag) => tag.trim());
    const body = document.getElementById("postContent").value;

    const postData = {
      media,
      title,
      author,
      tags,
      body,
    };
    console.log("Submitting post data:", postData);

    try {
      const response = await createPost("SerenaTravel", postData);
      console.log("Post created successfully:", response);

      // Note that we are now accessing the properties through 'response.data'
      locallyCreatedPosts.push({
        id: response.data.id,
        media: response.data.media, // Add banner URL to the object
        title: response.data.title,
        body: response.data.body,
        author: response.data.author.name,
        created: response.data.created,
        updated: response.data.updated,
        tags: response.data.tags.map((tag) => tag.label || tag), // Ensure tag structure is consistent
      });

      saveCreatedPosts(); // Save the updated array to localStorage
      displayPosts([response.data]); // Update the display with the new post
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    }
  });
}

function init() {
  console.log("Already ready");
  loadCreatedPosts();
  createFormHandler(); // Call createFormHandler within init
}

export async function loadCreatedPosts() {
  const storedPosts = localStorage.getItem("posts");
  if (storedPosts) {
    locallyCreatedPosts = JSON.parse(storedPosts);
    console.log("Loaded posts:", locallyCreatedPosts); // Should show the array of posts
    displayPosts(locallyCreatedPosts);
  }
}

document.addEventListener("DOMContentLoaded", init);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
