// import { getPosts } from "./get";

// Yes, it makes sense to fetch posts directly from a central function like createBlogPost.js if that's where your posts are being managed and created. This approach will help maintain a single source of truth for post data across your application, making it easier to manage updates and changes to post data.

// In your carousel.js file, instead of clearing and creating new HTML content directly, you would modify the function to accept an array of posts and then handle only the display logic within the carousel.

// https://webdesign.tutsplus.com/how-to-build-a-simple-carousel-with-vanilla-javascript--cms-41734t

// import { fetchAndDisplayPosts } from "./init.js";

export function latestPostsCarousel(posts) {
  try {
    console.log("Latest posts selected:", posts);
    const defaultImage = `https://placehold.co/600x400`;

    // Get the carousel container element
    const carouselContainer = document.getElementById("slidesContainer");
    carouselContainer.innerHTML = ""; // Clear existing content
    console.log("Carousel container cleared");

    posts.forEach((post, index) => {
      // Add eplisis to body text if over 50 words in carousel.
      let truncatedBody = post.body.split(" ").slice(0, 20).join(" ");
      if (post.body.split("").length > 50) {
        truncatedBody += "...";
      }

      // Create carousel elements for the latest three posts
      console.log(`Creating carousel slide for post: ${post.id}`);
      const carouselSlide = document.createElement("div");
      carouselSlide.className = `carousel-slide ${index === 0 ? "active" : ""}`; // Make the first slide active by default
      carouselSlide.innerHTML = `
      <div class="post-info">
        <img src="${
          post.media.url
        }" onError="this.onerror=null; this.src='${defaultImage}';" alt="${
        post.media.alt
      }" class="post-img">
        <h2>${post.title}</h2>
        <div class="post-country">${post.country}</div>
        <p>${truncatedBody}</p>
        <p><small>Posted on: ${new Date(
          post.created
        ).toLocaleDateString()}</small></p>
        <div class="post-author">${post.author}</div>
        <div class="more-buttons">
          <button class="read-more">Read More</button>
        </div>
      `;

      // Add the slide to the carousel container
      carouselContainer.appendChild(carouselSlide);
      console.log(`Slide added for post: ${post.id}`);
    });
    console.log("Carousel has been created");
  } catch (error) {
    console.error("Error creating latest posts carousel:", error);
  }
}

console.log("caorusel function module loaded");

// Assuming you want to run the carousel function after the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', latestPostsCarousel);
