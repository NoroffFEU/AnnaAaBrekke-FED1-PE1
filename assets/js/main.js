import { performLogin, getPosts } from "./api.mjs";
import { displayPosts } from "./displayPosts.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Example login data
    const loginData = {
      email: "annaas00208@stud.noroff.no",
      password: "firstRegisterApiPasswordSerena",
    };

    // Attempt to log in
    await performLogin(loginData);

    // Now fetch posts or perform other actions requiring auth
    const title = "exampleBlogName"; // Ensure this is defined according to your API requirements
    const posts = await getPosts(title);
    if (posts && posts.length > 0) {
      console.log("All posts:", posts);
      displayPosts(posts);
    } else {
      console.log("No posts found.");
    }
  } catch (error) {
    console.error(
      "There was an error during initial page load operations:",
      error
    );
  }
});
