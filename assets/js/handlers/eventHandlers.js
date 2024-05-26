import { displayPosts, saveCreatedPosts } from "../pages/createBlogPost.js";
import { sortPostsByOldest, sortPostByNewest } from "../utils/sort.js";
import {
  redirectToPostPage,
  redirectToPostPageFromCreate,
} from "../utils/routing.js";
import { apiUrlUser } from "../api/apiUrl.mjs";
import { getName } from "../auth/userName.js";
import { editPostApi } from "../api/editApi.js";
import { deletePostApi } from "../api/deleteApi.js";
import { isLoggedIn } from "../api/loginApi.js";
import { showErrorAlert, showSuccessAlert } from "../utils/alerts.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { fetchAndDisplaySinglePost } from "../pages/post.js";

// Add event listeners to sort buttons
export function addSortButtonsEventListener(posts) {
  const sortNew = document.querySelector(".sort-newest");
  const sortOld = document.querySelector(".sort-oldest");

  if (!sortNew || !sortOld) {
    console.error("Sort buttons are not found in the document.");
    return;
  }

  // Event listener for sorting by newest
  sortNew.addEventListener("click", async () => {
    showLoader();

    try {
      if (Array.isArray(posts)) {
        const sortedPosts = sortPostByNewest([...posts]);
        displayPosts(sortedPosts);
      } else {
        console.error("Posts data is not an array.");
      }
    } catch (error) {
      console.error("Error sorting posts:", error);
    } finally {
      hideLoader();
    }
  });

  // Event listener for sorting by oldest
  sortOld.addEventListener("click", async () => {
    showLoader();

    try {
      if (Array.isArray(posts)) {
        const sortedPosts = sortPostsByOldest([...posts]);
        displayPosts(sortedPosts);
      } else {
        console.error("Posts data is not an array.");
      }
    } catch (error) {
      console.error("Error sorting posts:", error);
    } finally {
      hideLoader();
    }
  });

  // Dropdown for sorting options
  let dropdown = document.querySelector(".dropdown-sort");

  dropdown.addEventListener("click", (e) => {
    if (dropdown.classList.contains("closed")) {
      dropdown.classList.remove("closed");
    } else {
      dropdown.classList.add("closed");
    }
  });
}

// Setup event listeners for carousel navigation
export function setupCarouselClickEvents() {
  const slidesContainer = document.getElementById("slidesContainer");
  const slideWidth = document.querySelector(".slide").clientWidth;
  const slideCount = document.querySelectorAll(".slide").length;
  const prevButton = document.getElementById("slideArrowPrev");
  const nextButton = document.getElementById("slideArrowNext");

  // Event listener for next button
  nextButton.addEventListener("click", () => {
    slidesContainer.scrollLeft += slideWidth;
    if (slidesContainer.scrollLeft >= (slideCount - 1) * slideWidth) {
      slidesContainer.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  });

  // Event listener for previous button
  prevButton.addEventListener("click", () => {
    slidesContainer.scrollLeft -= slideWidth;
    if (slidesContainer.scrollLeft <= 0) {
      slidesContainer.scrollTo({
        left: (slideCount - 1) * slideWidth,
        behavior: "smooth",
      });
    }
  });
}

// Handle post click events to view or edit post
export async function handlePostClick(post) {
  const postId = post.id;
  try {
    showLoader();
    await fetchAndDisplaySinglePost(postId);

    if (window.location.pathname.includes("create.html")) {
      redirectToPostPageFromCreate(postId);
    } else {
      redirectToPostPage(postId);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    showErrorAlert("Failed to load post. Please try again later.");
  } finally {
    hideLoader();
  }
}

// Handle edit click events to edit post
export async function handleEditClick(post) {
  if (!isLoggedIn(true)) {
    return;
  }

  try {
    showLoader();
    const postId = post.id;
    const name = getName();

    const response = await fetch(`${apiUrlUser}/${name}/${postId}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error response text:", errorMessage);
      throw new Error("Failed to fetch post data for the post edit ID");
    }

    const postData = await response.json();

    if (!postData || !postData.data) {
      throw new Error("Invalid post data structure");
    }

    // Populate edit form fields with post data
    document.getElementById("postId").value = postData.data.id;
    document.getElementById("postTitle").value = postData.data.title;
    document.getElementById("postImage").value = postData.data.media.url;
    document.getElementById("postImageAlt").value = postData.data.media.alt;
    document.getElementById("postAuthor").value = postData.data.author.name;
    document.getElementById("postTags").value = postData.data.tags.join(", ");
    document.getElementById("postContent").value = postData.data.body;

    const editForm = document.getElementById("editPostForm");
    editForm.classList.remove("editFormHidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (error) {
    console.error("Error handling edit click:", error);
    showErrorAlert("Failed to load post data for editing. Please try again.");
  } finally {
    hideLoader();
  }
}

// Setup event handler for edit form submission
export async function setupEditFormEventHandler() {
  const editPostForm = document.getElementById("editPostForm");

  if (editPostForm) {
    editPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      showLoader();

      const postId = document.getElementById("postId").value;
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
      };

      try {
        await editPostApi(postId, formData);
        editPostForm.classList.add("editFormHidden");

        showSuccessAlert("Post updated successfully!");
      } catch (error) {
        console.error("Failed to update post:", error);
        showErrorAlert("Failed to update post. Please try again.");
      } finally {
        hideLoader();
      }
    });
  }
}

// Handle delete click events to delete post
export async function handleDeleteClick(post, locallyCreatedPosts) {
  if (!isLoggedIn(true)) {
    return;
  }

  const postId = post.id;

  // Confirmation dialog
  const confirmation = confirm(
    `Are you sure you want to delete the post titled "${post.title}"? This action cannot be undone.`
  );

  if (confirmation) {
    try {
      showLoader();
      const isDeleted = await deletePostApi(postId);
      if (isDeleted) {
        showSuccessAlert("Post deleted successfully!");
      } else {
        showErrorAlert("Post not found. It might have been deleted already.");
      }

      // Update locally created posts regardless of whether the post was found or not
      locallyCreatedPosts = locallyCreatedPosts.filter((p) => p.id !== postId);
      saveCreatedPosts(locallyCreatedPosts);
      displayPosts(locallyCreatedPosts, true, -1);
    } catch (error) {
      showErrorAlert("Failed to delete post. Please try again.");
    } finally {
      hideLoader();
    }
  }
}
