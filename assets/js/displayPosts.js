// import { getPosts } from "./api.mjs";

// export async function displayPosts(name) {
//     const postContainer = document.querySelector(".post-container");
//     // Clear the container before adding new content
//     postContainer.innerHTML = '';

//     try {
//         const posts = await getPosts(name); // Fetch posts without token
//         posts.forEach(post => {
//             const postElement = createPostElement(post);
//             postContainer.appendChild(postElement);
//         });
//     } catch (error) {
//         console.error("Error displaying posts:", error);
//     }
// }

// function createPostElement(post) {
//   // Create elements based on your HTML structure for `.grid-post`
//   const postElement = document.createElement("div");
//   postElement.classList.add("grid-post");
//   postElement.innerHTML = `
//     <img class="post-img" src="${post.imageUrl}" alt="${post.imageAlt}" />
//     <div class="post-info">
//       <h3 class="post-title">${post.title}</h3>
//       <p class="post-text">${post.body}</p>
//       <div class="tags">${post.tags
//         .map((tag) => `<button class="tag" value="${tag}">${tag}</button>`)
//         .join("")}</div>
//       <div class="more-buttons">
//         <button class="read-more">Read More</button>
//       </div>
//     </div>
//   `;
//   return postElement;
// }

// if (newPost) {
//   const postElement = createPostElement(newPost);
//   const children = postContainer.children;
//   const index = 2; // say you want to add it at the third position
//   if (index >= children.length) {
//     postContainer.appendChild(postElement);
//   } else {
//     postContainer.insertBefore(postElement, children[index]);
//   }
// }
