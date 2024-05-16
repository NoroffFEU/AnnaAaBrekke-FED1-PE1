import { displayPosts, saveCreatedPosts } from "./createBlogPost.js";
import { sortPostByNewest, sortPostsByOldest } from "./sort.js";
import { redirectToPostPage } from "./routingUtils.js";
import { apiUrlUser } from "./api.mjs";
import { getName } from "./userName.js"; // Import the isLoggedIn function
import { editPostApi } from "./editApi.js";
import { deletePostApi } from "./deleteApi.js";
import { isLoggedIn } from "./login.js";
import { getSinglePost } from "./get.js";

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

  let dropdown = document.querySelector(".dropdown-sort");

  dropdown.addEventListener("click", (e) => {
    if (dropdown.classList.contains("closed")) {
      dropdown.classList.remove("closed");
    } else {
      dropdown.classList.add("closed");
    }
  });
}

// Click on next and previous button

export function setupCarouselClickEvents() {
  const slidesContainer = document.getElementById("slidesContainer");
  const slideWidth = document.querySelector(".slide").clientWidth;
  const slideCount = document.querySelectorAll(".slide").length;
  const prevButton = document.getElementById("slideArrowPrev");
  const nextButton = document.getElementById("slideArrowNext");

  nextButton.addEventListener("click", () => {
    slidesContainer.scrollLeft += slideWidth;
    // If at the end, scroll back to the beginning
    if (slidesContainer.scrollLeft >= (slideCount - 1) * slideWidth) {
      slidesContainer.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  });

  prevButton.addEventListener("click", () => {
    slidesContainer.scrollLeft -= slideWidth;
    // If at the beginning, scroll to the end
    if (slidesContainer.scrollLeft <= 0) {
      slidesContainer.scrollTo({
        left: (slideCount - 1) * slideWidth,
        behavior: "smooth",
      });
    }
  });
}

// When click on read more/check it out button redirect to post main page
export function handlePostClick(post) {
  const postId = post.id; // Assuming each post has an 'id' property
  redirectToPostPage(postId);
  console.log("Clicked post ID:", postId);
}
export async function handleEditClick(post) {
  if (!isLoggedIn(true)) {
    // The user will be alerted and redirected if not logged in
    return;
  }

  try {
    // Get the ID attached to the post
    const postId = post.id;
    const name = getName(); // Assuming getName() is defined elsewhere

    console.log("Fetching post data for edit:", { name, postId });

    // Fetch the post data using the postId
    const response = await fetch(`${apiUrlUser}/${name}/${postId}`);
    console.log("API response status:", response.status);

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error response text:", errorMessage);
      throw new Error("Failed to fetch post data for the post edit ID");
    }

    const postData = await response.json();
    console.log("The post data found:", postData);

    // Ensure the expected structure is available
    if (!postData || !postData.data) {
      throw new Error("Invalid post data structure");
    }

    // Populate the edit form fields with the post data
    document.getElementById("postId").value = postData.data.id;
    document.getElementById("postTitle").value = postData.data.title;
    document.getElementById("postImage").value = postData.data.media.url;
    document.getElementById("postImageAlt").value = postData.data.media.alt;
    document.getElementById("postAuthor").value = postData.data.author.name;
    document.getElementById("postTags").value = postData.data.tags.join(", ");
    document.getElementById("postContent").value = postData.data.body;
    document.getElementById("postCountry").value = postData.data.country;

    // Show/display edit form after clicked edit form - otherwise hide
    const editForm = document.getElementById("editPostForm");
    editForm.classList.remove("editFormHidden");

    // Smooth scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    console.log("Edit form fields populated with post data:", postData);
  } catch (error) {
    console.error("Error handling edit click:", error);
    // Handle error appropriately, such as displaying an error message to the user
  }
}

export async function setupEditFormEventHandler() {
  const editPostForm = document.getElementById("editPostForm");

  // Check if the edit form element exists before proceeding
  if (editPostForm) {
    editPostForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Update/edit the post
      const postId = document.getElementById("postId").value; // Get the post ID from the form
      const formData = {
        title: document.getElementById("postTitle").value,
        media: {
          url: document.getElementById("postImage").value,
          alt: document.getElementById("postImageAlt").value,
        },
        author: {
          name: document.getElementById("postAuthor").value,
        },
        tags: document
          .getElementById("postTags")
          .value.split(",")
          .map((tag) => tag.trim()),
        body: document.getElementById("postContent").value,
        country: document.getElementById("postCountry").value,
      };

      try {
        await editPostApi(postId, formData); // Call the editPostApi function to update the post
        editPostForm.classList.add("editFormHidden");

        console.log("Post updated successfully");
        // Optionally, you can perform further actions after the post is updated
      } catch (error) {
        console.error("Failed to update post:", error);
        // Handle error appropriately, such as displaying an error message to the user
      }
    });
  }
}

export async function handleDeleteClick(post, locallyCreatedPosts) {
  if (!isLoggedIn(true)) {
    // The user will be alerted and redirected if not logged in
    return;
  }

  const postId = post.id;

  if (confirm("Are you sure you want to delete this post?")) {
    try {
      const isDeleted = await deletePostApi(postId);
      if (isDeleted) {
        console.log(`Post with ID: ${postId} deleted successfully.`);
        // Update local state and UI
        locallyCreatedPosts = locallyCreatedPosts.filter(
          (p) => p.id !== postId
        );
        saveCreatedPosts(locallyCreatedPosts);
        displayPosts(locallyCreatedPosts, true);
      }
    } catch (error) {
      console.error(`Failed to delete post with ID ${postId}:`, error);
      alert("Failed to delete post. Please try again.");
    }
  }
}
