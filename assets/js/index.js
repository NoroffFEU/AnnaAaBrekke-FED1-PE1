import { getSinglePost } from "./get.js"; // Path to your get.js module

document.addEventListener("DOMContentLoaded", async () => {
  const name = "SerenaTravel"; // This should match the identifier used by your API
  const accessToken = localStorage.getItem("token"); // This is required if the API needs authentication

  try {
    // Fetch and display all posts
    const allPosts = await getSinglePost(name, accessToken);
    console.log("Fetched posts:", allPosts);
    displayPosts(allPosts); // Use this function to add the posts to the DOM
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Display an error message to the user
  }
});

//(this is the same as on cerateblodpost - maybe import later)
function displayPosts(posts) {
  const postContainer = document.getElementById("homePosts"); // Ensure this ID matches your container for posts
  postContainer.innerHTML = ""; // Clear existing posts (if necessary)

  posts.forEach((post) => {
    const postElement = createPostElement(post); // Create a DOM element for each post
    postContainer.appendChild(postElement); // Append the post element to the container
  });
}

function createPostElement(post) {
  console.log("Creating element for:", post); // Inspect the post object
  const postElement = document.createElement("div");
  postElement.classList.add("grid-post");

  postElement.innerHTML = `
          <div class="post-info">
          <img src="${post.data.image}" alt="Posted Image" class="post-image"> 
              <h3 class="post-title">${post.data.title}</h3>
              <p class="post-text">${post.data.body}</p>
              <div class="more-buttons">
                  <button class="read-more">Read More</button>
              </div>
          </div>
      `;
  return postElement;
}

// document.addEventListener("DOMContentLoaded", async () => {
//     const name = "SerenaTravel"; // Ensure this is defined according to your API requirements
//     const accessToken = localStorage.getItem('token'); // Retrieve the access token if needed

//     // // Example data for creating a new post
//     // const postData = {
//     //     title: "New Post Title",
//     //     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     //     tags: ["tag1", "tag2"],
//     // };

//     try {
//         const newPost = await createPost(name, postData, accessToken);
//         console.log("New post created:", newPost);

//         // Display all posts including the newly created one
//         const allPosts = await displayPosts(name, accessToken);
//         if (allPosts && allPosts.length > 0) {
//             console.log("All posts:", allPosts);
//             displayPosts(allPosts); // Display all posts fetched
//         } else {
//             console.log("No posts found.");
//         }
//     } catch (error) {
//         console.error("Error creating or fetching posts:", error);
//         // Optionally handle user feedback here
//     }
// });

// import { performLogin, getPosts } from "./api.mjs";
// import { displayPosts } from "./displayPosts.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     // Example login data
//     const loginData = {
//       email: "annaas00208@stud.noroff.no",
//       password: "firstRegisterApiPasswordSerena",
//     };

//     // Attempt to log in
//     const loginResponse = await performLogin(loginData);
//     if (loginResponse && loginResponse.data) {
//       console.log("Login succesful, fetching posts..");

//       // Now fetch posts or perform other actions requiring auth
//       const title = "exampleBlogName"; // Ensure this is defined according to your API requirements
//       const posts = await getPosts(title);

//       // Check if any posts were returned and display them
//       if (posts && posts.length > 0) {
//         console.log("All posts:", posts);
//         displayPosts(posts); // Pass the posts to the display function
//       } else {
//         console.log("No posts found.");
//       }
//     } else {
//       console.log("Login failed, unable to fetch posts.");
//     }
//   } catch (error) {
//     console.error("Error during page initialization:", error);
//   }
// });
