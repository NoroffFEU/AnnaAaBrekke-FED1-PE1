import { getPosts } from "./api.mjs";

export async function displayPosts() {
  const postContainer = document.querySelectorAll(".grid-post");

  postContainer.forEach(async (postContainer) => {
    postContainer.innerHTML = "";

    try {
      const posts = await getPosts();
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <p>Tags: ${post.tags.join(", ")}</p>
        `;
        postContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error("Error displaying the posts:", error);
    }
  });
}
