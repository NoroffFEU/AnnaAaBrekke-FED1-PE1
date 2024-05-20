import {
  displayPosts,
  loadCreatedPosts,
  fetchAndDisplayPosts,
} from "../pages/createBlogPost.js";

export async function createFilterButtons() {
  const allPosts = await fetchAndDisplayPosts();
  const postTags = new Set();

  // Collect all the different tags
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => postTags.add(tag));
  });

  // Get the filter buttons container
  const filterButtonsContainer = document.querySelector(".filter-buttons");
  filterButtonsContainer.innerHTML = ""; // Clear existing buttons

  // Create buttons for each unique tag
  postTags.forEach((tag) => {
    const button = document.createElement("button");
    button.classList.add("tag");
    button.value = tag;
    button.textContent = tag;
    button.addEventListener("click", () => {
      console.log(`Button clicked: ${tag}`);
      try {
        filterPostsByTag(tag);
      } catch (error) {
        console.error("Error filtering posts by tag", error);
      }
    });
    filterButtonsContainer.appendChild(button);
  });
}

export function addFilterButtonsEventListener() {
  createFilterButtons(); // Ensure buttons are created based on tags created
}

// Function to filter posts by tag
export async function filterPostsByTag(tag) {
  try {
    const allPosts = await loadCreatedPosts();
    const filteredPosts = allPosts.filter((post) => post.tags.includes(tag));
    await displayPosts(filteredPosts);
  } catch (error) {
    console.error("Error filtering posts by tag:", error);
  }
}
