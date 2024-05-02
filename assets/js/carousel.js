// import { getPosts } from "./get";

// Yes, it makes sense to fetch posts directly from a central function like createBlogPost.js if that's where your posts are being managed and created. This approach will help maintain a single source of truth for post data across your application, making it easier to manage updates and changes to post data.

// In your carousel.js file, instead of clearing and creating new HTML content directly, you would modify the function to accept an array of posts and then handle only the display logic within the carousel.

// https://webdesign.tutsplus.com/how-to-build-a-simple-carousel-with-vanilla-javascript--cms-41734t
// chat gpt helped me with thos one
// import { fetchAndDisplayPosts } from "./init.js";

// import { setupCarouselEvents } from "./eventHandlers.js";

// import { redirectToPostPage } from "./routingUtils.js";

import { handlePostClick } from "./eventHandlers.js";

export function latestPostsCarousel(posts) {
  try {
    console.log("Latest posts selected:", posts);

    // Get the carousel container element
    const carouselContainer = document.getElementById("slidesContainer");
    carouselContainer.innerHTML = ""; // Clear existing content
    console.log("Carousel container cleared");
    const defaultImage = `https://placehold.co/600x400`;

    posts.forEach((post, index) => {
      let truncatedBody = post.body.split(" ").slice(0, 20).join(" ");
      truncatedBody += post.body.split(" ").length > 20 ? "..." : "";

      const li = document.createElement("li");
      li.className = `slide ${index === 0 ? "active" : ""}`;
      li.innerHTML = `
        <div class="post-info">
          <img src="${post.media.url}" onError="this.onerror=null; this.src='${defaultImage}'" alt="${post.media.alt}" class="post-img">
          <h2>${post.title}</h2>
          <div class="post-country">${post.country}</div>
          <p>${truncatedBody}</p>
          <p><small>Posted on: ${new Date(post.created).toLocaleDateString()}</small></p>
          <div class="post-author">${post.author}</div>
          <button class="read-more">Read More</button>
        </div>
      `;

      carouselContainer.appendChild(li);;
      console.log(`Slides added for post: ${post.id}`);

      const readMoreButton = li.querySelector(".read-more");
      readMoreButton.addEventListener("click", () => {
        handlePostClick(post);
        redirectToPostPage(post.id);
    });
  });
    console.log("Carousel has been created");
  } catch (error) {
    console.error("Error creating latest posts carousel:", error);
  }
}

// Slide to next and previous post
 
export function navigateCarousel(direction) {
  const slides = document.querySelectorAll(".slide");
  const activeSlide = document.querySelector(".slide.active");
  let newIndex = Array.from(slides).indexOf(activeSlide);

  if (direction === "next") {
    newIndex = (newIndex + 1) % slides.length;
    console.log("Next slide works")
  } else {
    newIndex = (newIndex - 1 + slides.length) % slides.length;
    console.log("prev slide works")
  }

  slides.forEach(slide =>
  slide.classList.remove("active"));
  slides[newIndex].classList.add("active")
}