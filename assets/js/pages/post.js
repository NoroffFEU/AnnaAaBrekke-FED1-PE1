import { getSinglePost } from "../get.js";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

console.log("Fetching single post with ID:", postId);

// Fetch the single post data using the post ID
fetchSinglePost(postId);

async function fetchSinglePost(postId) {
  try {
    console.log("Fetching post data for post ID:", postId);
    const response = await getSinglePost("SerenaTravel", postId);
    console.log("Post data received:", response);

    const post = response.data; // Assuming the post data is in response.data
    console.log("Displaying post:", post);
    displaySinglePost(post);
  } catch (error) {
    console.error("Error fetching single post:", error);
  }
}

function displaySinglePost(post) {
  const mainPostContent = document.querySelector(".main-post");
  mainPostContent.innerHTML = "";
  mainPostContent.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <!-- Add more content here as needed -->
      `;
}
