// Some used from: https://webdesign.tutsplus.com/how-to-build-a-simple-carousel-with-vanilla-javascript--cms-41734t

import { handlePostClick } from "../handlers/eventHandlers.js";

// Function to create a carousel of the latest posts
export function latestPostsCarousel(posts) {
  try {
    const carouselContainer = document.getElementById("slidesContainer");
    carouselContainer.innerHTML = "";
    const defaultImage = `https://placehold.co/600x400`;

    // Iterate over each post to create carousel slides
    posts.forEach((post, index) => {
      // Truncate post body to 20 words
      let contentBody = post.body.split(" ").slice(0, 20).join(" ");
      contentBody += post.body.split(" ").length > 20 ? "..." : "";

      const li = document.createElement("li");
      li.className = `slide ${index === 0 ? "active" : ""}`; // Set the first slide as active

      // Determine the author of the post
      const author =
        typeof post.author === "object"
          ? post.author.name || "Anonymous"
          : post.author || "Anonymous";

      // Set the innerHTML of the slide
      li.innerHTML = `
        <div class="post-info">
          <img src="${
            post.media.url
          }" onError="this.onerror=null; this.src='${defaultImage}'" alt="${
        post.media.alt
      }" class="post-img">
          <h2>${post.title}</h2>
          <p>${contentBody}</p>
          <div class="post-author">${author}</div>
          <time class="date-carousel">${new Date(
            post.created
          ).toLocaleDateString()}</time>
          <button class="read-more">Read More</button>
        </div>
      `;

      // Append the slide to the carousel container
      carouselContainer.appendChild(li);

      // Add event listener for "Read More" button
      const readMoreButton = li.querySelector(".read-more");
      readMoreButton.addEventListener("click", () => {
        handlePostClick(post); // Handle the post click event
      });
    });
  } catch (error) {
    console.error("Error creating latest posts carousel:", error);
  }
}
