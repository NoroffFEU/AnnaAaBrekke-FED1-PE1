import { displayPosts } from "./createBlogPost.js";
import { sortPostByNewest, sortPostsByOldest } from "./sort.js";

export function addSortButtonsEventListener() {
  const sortNew = document.querySelector(".sort-newest");
  const sortOld = document.querySelector(".sort-oldest");

  if (!sortNewestBtn || !sortOldestBtn) {
    console.error("Sort buttons are not found in the document.");
    return;
  }

  sortNew.addEventListener("click", () => {
    console.log("Sorting posts by newest");

    const sortedPosts = sortPostByNewest([...locallyCreatedPosts]);
    displayPosts(sortedPosts);
    console.log("Displayed posts sorted by oldest");
  });

  sortOld.addEventListener("click", () => {
    console.log("Sorting posts by oldest");

    const sortedPosts = sortPostsByOldest([...locallyCreatedPosts]);
    displayPosts(sortedPosts);
    console.log("Displayed posts sorted by oldest");
  });
}
