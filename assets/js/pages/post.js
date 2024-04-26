import { getSinglePost } from "../get.js";

const urlParams = new URLSearchParams(window.location.search);
console.log("URL Search Params:", window.location.search);

const postId = urlParams.get("id");

if (!postId) {
  console.error("No post ID in URL parameters");
} else {
  console.log("Fetching single post with ID:", postId);
  fetchSinglePost(postId);
}

async function fetchSinglePost(postId) {
  try {
    console.log("Fetching post data for post ID:", postId);
    const response = await getSinglePost("SerenaTravel", postId);
    console.log("Post data received:", response.data);

    const postData = response.data; // Assuming the post data is in response.data
    console.log("Displaying post:", postData);
    displaySinglePost(postData);
  } catch (error) {
    console.error("Error fetching single post:", error);
  }
}

// this is for the post page posts container
export async function displaySinglePost(postData) {
  console.log("Received postData:", postData); // Log the received postData

  const mainPostContent = document.querySelector(".main-post");
  mainPostContent.innerHTML = "";
  console.log("Post ID:", postData.id); // Log the post ID

  // Post header section
  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");
  postHeader.innerHTML = `
    <img class="post-img" src="${postData.media}" alt="Post Image" />
    <h1 class="post-title">${postData.title}</h1>
    <div class="post-author">
    <a href="link-to-author-profile.html" rel="author">${postData.author}</a>
  </div>
    <time datetime="${postData.created}">${new Date(
    postData.updated
  ).toLocaleDateString()}</time>
    <div class="tags">
      ${postData.tags
        .map((tag) => `<button class="tag" value="${tag}">${tag}</button>`)
        .join("")}
    </div>
  `;
  mainPostContent.appendChild(postHeader);

  // Intro section
  const introSection = document.createElement("section");
  introSection.classList.add("intro");
  introSection.innerHTML = `
    <h2 class="intro-title">Intro</h2>
    <p class="post-text">${postData.body}</p>
  `;
  mainPostContent.appendChild(introSection);

  // // Memory section
  // const memorySection = document.createElement("section");
  // memorySection.classList.add("memory");
  // memorySection.innerHTML = `
  //   <h3>Core Memory</h3>
  //   <p>${postData.body}</p>
  // `;
  // mainPostContent.appendChild(memorySection);

  // // Activities section
  // const activitiesSection = document.createElement("section");
  // activitiesSection.classList.add("activities");
  // activitiesSection.innerHTML = `
  //   <h3>Activities</h3>
  //   <p>${postData.activities}</p>
  // `;
  // mainPostContent.appendChild(activitiesSection);

  // // Places to See section
  // const placesToSeeSection = document.createElement("section");
  // placesToSeeSection.classList.add("places-to-see");
  // placesToSeeSection.innerHTML = `
  //   <h3>Places to See</h3>
  //   <p>${postData.placesToSee}</p>
  // `;
  // mainPostContent.appendChild(placesToSeeSection);

  // // Places to Eat section
  // const foodSection = document.createElement("section");
  // foodSection.classList.add("food");
  // foodSection.innerHTML = `
  //   <h3>Places to Eat</h3>
  //   <p>${postData.food}</p>
  // `;
  // mainPostContent.appendChild(foodSection);

  // Gallery section
  const gallerySection = document.createElement("section");
  gallerySection.classList.add("gallery");
  gallerySection.innerHTML = `
    <h4>Gallery</h4>
    <div class="gallery-grid">
      ${postData.media
        .map((media) => `<img src="${media.src}" alt="${media.alt}" />`)
        .join("")}
    </div>
  `;
  mainPostContent.appendChild(gallerySection);
}
