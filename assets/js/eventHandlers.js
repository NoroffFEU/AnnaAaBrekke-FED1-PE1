import { displayPosts } from "./createBlogPost.js";
import { sortPostByNewest, sortPostsByOldest } from "./sort.js";
import { redirectToPostPage } from "./routingUtils.js";

export function addSortButtonsEventListener(posts) {
  const sortNew = document.querySelector(".sort-newest");
  const sortOld = document.querySelector(".sort-oldest");

  if (!sortNew || !sortOld) {
    console.error("Sort buttons are not found in the document.");
    return;
  }

  sortNew.addEventListener("click", () => {
    console.log("Sorting posts by newest");

    if (Array.isArray(posts.data)) {
      const sortedPosts = sortPostByNewest([...posts.data]); // Sort homePosts directly
      displayPosts(sortedPosts);
      console.log("Displayed posts sorted by newest");
    } else {
      console.error("Posts data is not an array.");
    }
  });

  sortOld.addEventListener("click", () => {
    console.log("Sorting posts by oldest");

    if (Array.isArray(posts.data)) {
      const sortedPosts = sortPostsByOldest([...posts.data]); // Sort homePosts directly
      displayPosts(sortedPosts);
      console.log("Displayed posts sorted by oldest");
    } else {
      console.error("Posts data is not an array.");
    }
  });

  let dropdown = document.querySelector(".dropdown-sort");

  dropdown.addEventListener("click", (e) => {
    if (dropdown.classList.contains("closed")) {
      dropdown.classList.remove("closed");
    } else {
      dropdown.classList.add("closed");
    }
  });
}

// Click on next and previous button

export function setupCarouselClickEvents() {
  const slidesContainer = document.getElementById("slidesContainer");
  const slideWidth = document.querySelector(".slide").clientWidth;
  const prevButton = document.getElementById("slideArrowPrev");
  const nextButton = document.getElementById("slideArrowNext");

  nextButton.addEventListener("click", () => {
    slidesContainer.scrollLeft += slideWidth;
  });

  prevButton.addEventListener("click", () => {
    slidesContainer.scrollLeft -= slideWidth;
  });
}

// When click on read more/check it out button redirect to post main page
export function handlePostClick(post) {
  const postId = post.id; // Assuming each post has an 'id' property
  redirectToPostPage(postId);
  console.log("Clicked post ID:", postId);
}
