// import { saveCreatedPosts, displayPosts, createPost, loadCreatedPosts } from "./createBlogPost.js";

// let locallyCreatedPosts = []; // Initialize an array to store created posts at the very top

// export async function createFormHandler() {
//   const form = document.getElementById("createPostForm");
//   if (!form) {
//     console.log("No form expected on this page, none found."); // Log a message if the form is not found
//     return; // Exit the function if there is no form
//   }

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     console.log("Form submission prevented.");

//     // Assuming there's an input for the media URL and another for the alt text
//     const mediaUrl = document.getElementById("postImage").value;
//     const mediaAlt = "Description of the image"; // Update this with a real input or dynamic data if necessary

//     const media = {
//       url: mediaUrl,
//       alt: mediaAlt,
//     };
//     const title = document.getElementById("postTitle").value;
//     const author = document.getElementById("postAuthor").value;
//     // const date = document.getElementById("postDate").value;
//     const tags = document
//       .getElementById("postTags")
//       .value.split(",")
//       .map((tag) => tag.trim());
//     const body = document.getElementById("postContent").value;

//     const postData = {
//       media,
//       title,
//       author,
//       tags,
//       body,
//     };
//     console.log("Submitting post data:", postData);

//     try {
//       const response = await createPost("SerenaTravel", postData);
//       console.log("Post created successfully:", response);

//       // Note that we are now accessing the properties through 'response.data'
//       locallyCreatedPosts.push({
//         id: response.data.id,
//         media: response.data.media, // Add banner URL to the object
//         title: response.data.title,
//         body: response.data.body,
//         author: response.data.author.name,
//         created: response.data.created,
//         updated: response.data.updated,
//         tags: response.data.tags.map((tag) => tag.label || tag), // Ensure tag structure is consistent
//       });

//       saveCreatedPosts(); // Save the updated array to localStorage
//       displayPosts([response.data]); // Update the display with the new post
//       loadCreatedPosts();
//     } catch (error) {
//       console.error("Failed to create post:", error);
//       alert("Failed to create post. Please try again.");
//     }
//   });
// }