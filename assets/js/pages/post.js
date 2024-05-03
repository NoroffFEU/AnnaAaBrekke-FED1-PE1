import { getSinglePost } from "../get.js";
// import { apiUrl } from "../api.mjs";

const urlParams = new URLSearchParams(window.location.search);
console.log("The URL:", urlParams);
const postId = urlParams.get("id");
console.log("The link", postId);

if (!postId) {
  console.error("No post ID in URL parameters");
  // alert("No post ID provided. Please check the URL and try again.");
} else {
  console.log("Fetching single post with ID:", postId);
  fetchAndDisplaySinglePost(postId);
}

async function fetchAndDisplaySinglePost(postId) {
  try {
    const response = await getSinglePost("SerenaTravel", postId);
    const post = response.data;

    console.log("Post data received:", post);
    displaySinglePost(post);
  } catch (error) {
    console.error("Error fetching or displaying single post:", error);
    // alert("Failed to fetch post details. Please refresh the page or try again later.");
  }
}

function displaySinglePost(post) {
  const mainPostContent = document.querySelector(".main-post");
  mainPostContent.innerHTML = "";

  // Ensure media object exists and has url and alt properties, otherwise use default values
  const defaultImage = "https://placehold.co/600x400";
  const imgSrc = post.media && post.media.url ? post.media.url : defaultImage;
  const imgAlt =
    post.media && post.media.alt ? post.media.alt : "Default image description";

  // Handle tags safely, check if they exist and are iterable
  let tagsHtml = "";
  if (post.tags && Array.isArray(post.tags)) {
    tagsHtml = post.tags
      .map((tag) => {
        // Assuming each tag is an object with a 'label' property, adjust as necessary
        const tagLabel = tag.label || tag; // This will use 'tag' as the label if 'label' property does not exist
        return `<button class="tag" value="${tagLabel}">${tagLabel}</button>`;
      })
      .join("");
  } else {
    console.log("No tags to display or tags are not in expected format.");
  }

  // const country = post.country ? post.country : 'Unknown Country';  // Add fallback if no country is specified

  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");
  postHeader.innerHTML = `
    <img class="post-img" src="${imgSrc}" alt="${imgAlt}" />
    <h1 class="post-title">${post.title}</h1>
    <div class="post-author"${post.author}</div>
    <time class="post-date" datetime="${post.created}">${new Date(
    post.updated
  ).toLocaleDateString()}</time>
    <div class="tags">${tagsHtml}</div>
  `;
  mainPostContent.appendChild(postHeader);

  const contentSection = document.createElement("section");
  contentSection.classList.add("content");
  contentSection.innerHTML = `
    <p class="post-text">${post.body}</p>
  `;
  mainPostContent.appendChild(contentSection);

  const shareUrl = `${window.location.origin}/post/index.html?id=${postId}`;

  const sharePost = document.createElement("div");
  sharePost.classList.add("share");
  sharePost.innerHTML = `
      <h3 class = "share-title">Share this post</h3>
    `;

  // sharePost.innerHTML = `
  // <button class = "share-button"><a href="${shareUrl}" target="_blank">Share this post</a></button>
  // `;

  const shareInput = document.createElement("input");
  shareInput.classList.add("share-link");
  shareInput.value = shareUrl;
  shareInput.readOnly = true; // make the input read-only

  const copyButton = document.createElement("button");
  copyButton.classList.add("copy-button");
  copyButton.textContent = "Copy";
  copyButton.addEventListener("click", () => {
    // add to eventHandlers file later?
    shareInput.select();
    document.execCommand("copy"); // fix this later
    // Feedback to user when copied sucsessfully
    copyButton.textContent = "Copied!";
    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1500);
  });

  sharePost.appendChild(shareInput);
  sharePost.appendChild(copyButton);
  mainPostContent.appendChild(sharePost);

  // <div class="post-country">${country}</div>

  // if (post.galleryImages && post.galleryImages.length > 0) {
  //   const gallerySection = document.createElement("section");
  //   gallerySection.classList.add("gallery");
  //   gallerySection.innerHTML = `
  //     <h4>Gallery</h4>
  //     <div class="gallery-grid">
  //       ${post.galleryImages
  //         .map(
  //           (img) =>
  //             `<img src="${img.url}" alt="${img.alt}" class="gallery-img"/>`
  //         )
  //         .join("")}
  //     </div>
  //   `;
  // }

  // const gallerySection = document.createElement("section");
  // gallerySection.classList.add("gallery");
  // gallerySection.innerHTML = `
  //   <h4>Gallery</h4>
  //   <div class="gallery-grid">
  //     ${post.media.map(media => `<img src="${media.url}" alt="${media.alt}" />`).join("")}
  //   </div>
  // `;
  // mainPostContent.appendChild(gallerySection);
}
// // this is for the post page posts container
// function displaySinglePost(post) {
//   console.log("Received postData:", post); // Log the received postData

//   const mainPostContent = document.querySelector(".main-post");
//   mainPostContent.innerHTML = "";
//   console.log("Post ID:", post.id); // Log the post ID

//   // Post header section
//   const postHeader = document.createElement("div");
//   postHeader.classList.add("post-header");
//   postHeader.innerHTML = `
//     <img class="post-img" src="${post.media}" alt="Post Image" />
//     <h1 class="post-title">${post.title}</h1>
//     <div class="post-author">
//     <a href="link-to-author-profile.html" rel="author">${post.author}</a>
//   </div>
//     <time datetime="${post.created}">${new Date(
//     post.updated
//   ).toLocaleDateString()}</time>
//     <div class="tags">
//       ${post.tags
//         .map((tag) => `<button class="tag" value="${tag}">${tag}</button>`)
//         .join("")}
//     </div>
//   `;
//   mainPostContent.appendChild(postHeader);

//   // Intro section
//   const introSection = document.createElement("section");
//   introSection.classList.add("intro");
//   introSection.innerHTML = `
//     // <h2 class="intro-title">Intro</h2>
//     <p class="post-text">${post.body}</p>
//   `;
//   mainPostContent.appendChild(introSection);

//   // // Memory section
//   // const memorySection = document.createElement("section");
//   // memorySection.classList.add("memory");
//   // memorySection.innerHTML = `
//   //   <h3>Core Memory</h3>
//   //   <p>${postData.body}</p>
//   // `;
//   // mainPostContent.appendChild(memorySection);

//   // // Activities section
//   // const activitiesSection = document.createElement("section");
//   // activitiesSection.classList.add("activities");
//   // activitiesSection.innerHTML = `
//   //   <h3>Activities</h3>
//   //   <p>${postData.activities}</p>
//   // `;
//   // mainPostContent.appendChild(activitiesSection);

//   // // Places to See section
//   // const placesToSeeSection = document.createElement("section");
//   // placesToSeeSection.classList.add("places-to-see");
//   // placesToSeeSection.innerHTML = `
//   //   <h3>Places to See</h3>
//   //   <p>${postData.placesToSee}</p>
//   // `;
//   // mainPostContent.appendChild(placesToSeeSection);

//   // // Places to Eat section
//   // const foodSection = document.createElement("section");
//   // foodSection.classList.add("food");
//   // foodSection.innerHTML = `
//   //   <h3>Places to Eat</h3>
//   //   <p>${postData.food}</p>
//   // `;
//   // mainPostContent.appendChild(foodSection);

//   // Gallery section
//   const gallerySection = document.createElement("section");
//   gallerySection.classList.add("gallery");
//   gallerySection.innerHTML = `
//     <h4>Gallery</h4>
//     <div class="gallery-grid">
//       ${post.media
//         .map((media) => `<img src="${media.url}" alt="${media.alt}" />`)
//         .join("")}
//     </div>
//   `;
//   mainPostContent.appendChild(gallerySection);
// }
