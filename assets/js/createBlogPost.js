import { apiUrlUser } from "./api.mjs";
console.log(apiUrlUser); // This should log the URL to the console

console.log("Checking script execution post-import.");

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

let createdPosts = []; // Initialize an array to store created posts

function init() {
  console.log("DOM Content Loaded or already ready");
  setupFormHandler();
}

function setupFormHandler() {
  const form = document.getElementById("createPostForm");
  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submission prevented.");

    const image = document.getElementById("postImage").files[0];
    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postContent").value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (image) {
      formData.append("image", image);
    }

    const postData = { image, title, body };
    console.log("Submitting post data:", postData);

    try {
      const response = await createPost("SerenaTravel", postData);
      console.log("Post created successfully:", response);
      displayPosts([response]);
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    }
  });
}

async function createPost(name, postData) {
  const accessToken = localStorage.getItem("token"); // Ensure token is retrieved here
  if (!accessToken) {
    throw new Error("No access token found, please login.");
  }
  try {
    const response = await fetch(`${apiUrlUser}/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const createdPost = await response.json(); // Parse the response to get the created post
    createdPosts.push(createdPost); // Add the created post to the array

    return createdPost; // Return the created post
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

function displayPosts(posts) {
  const postContainer = document.querySelector(".post-container");

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postContainer.appendChild(postElement);
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

// import { apiUrlUser, getPosts} from "./api.mjs";

// // Function to create a new blog post
// export async function createPost(name, postData, accessToken) {
//   console.log("Attempting to create a post with data:", postData);
//   try {
//     const response = await fetch(`${apiUrlUser}/${name}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(postData),
//     });

//     console.log("Response received from API:", response);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const responseData = await response.json();
//     console.log("Post created successfully, response data:", responseData);

//     return responseData;
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// }

// // This part of the script handles form submission and i access the token from the local storage.
// document
//   .getElementById("createPostForm")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const accessToken = localStorage.getItem("token");
//     const title = document.getElementById("postTitle").value;
//     const body = document.getElementById("postContent").value;
//     const tags = document
//       .getElementById("postTags")
//       .value.split(",")
//       .map((tag) => tag.trim());
//     const name = "SerenaTravel"; // Use the name from the login response or elsewhere

//     const newPostData = { title, body, tags };

//     try {
//       const data = await createPost(name, newPostData, accessToken);
//       console.log("Post created successfully:", data);
//       displayPosts(name);
//       // window.location.href = "../index.html";
//     } catch (error) {
//       console.error("Failed to create post:", error);
//       alert("Failed to create post. Please try again."); // User-friendly error message
//     }
//   });

//   export async function displayPosts(name) {
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

// document.addEventListener("DOMContentLoaded", () => {
//   const accessToken = localStorage.getItem("token");
//   if (!accessToken) {
//     console.log("No access token found, redirecting to login.");
//     window.location.href = "account/login.html";
//   } else {
//     console.log("AccessToken is found:", accessToken); // Token found log here
//   }
// });

// // tags: ["Surf", "Tropical", "Beach", "Food"],
// // media: {
// //   url: "",
// //   alt: "An amazing travel photo",
// // },

// // save to localStorage??
