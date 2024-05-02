import { displayPosts } from "./createBlogPost.js";
import { sortPostByNewest, sortPostsByOldest } from "./sort.js";

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
}
