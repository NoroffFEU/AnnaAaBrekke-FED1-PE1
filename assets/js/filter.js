import { displayPosts, loadCreatedPosts } from "./createBlogPost.js";

export function addFilterButtonsEventListener() {
  const countryButtons = document.querySelectorAll(".country");
  countryButtons.forEach(button => {
      button.addEventListener("click", () => {
          console.log(`Button clicked: ${button.value}`);
      try {
        filterPostsByCountry(button.value);
      } catch (error) {
        console.error("Error filtering posts by country", error);
      }
    });
  });
}

// Function to filter products by gender
export async function filterPostsByCountry(country) {
  try {
    const allPosts = await loadCreatedPosts();
    const filteredPosts = allPosts.filter
      (posts => country => posts.country === country);
      await displayPosts(filteredPosts);
  } catch (error) {
    console.error("Error filtering products by country:", error);
    // alert("Error filtering products by gender. Please try again later.");
  }
}
