// import { getPosts } from "./get";

export function latestPostsCarousel(sortedPosts) {
  try {
    console.log("Latest posts selected:", sortedPosts);

    // Get the carousel container element
    const carouselContainer = document.getElementById("slidesContainer");
    carouselContainer.innerHTML = ""; // Clear existing content
    console.log("Carousel container cleared");

    // Create carousel elements for the latest three posts
    sortedPosts.slice(0, 3).forEach((post, index) => {
      // Slice here to ensure only the first three are taken
      console.log(`Creating carousel slide for post: ${post.id}`);
      const carouselSlide = document.createElement("div");
      carouselSlide.className = `carousel-slide ${index === 0 ? "active" : ""}`; // Make the first slide active by default
      carouselSlide.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <p><small>Posted on: ${new Date(
          post.created
        ).toLocaleDateString()}</small></p>
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

// Assuming you want to run the carousel function after the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', latestPostsCarousel);
