import { displayPosts, saveCreatedPosts } from "../pages/createBlogPost.js";
import { sortPostByNewest, sortPostsByOldest } from "../utils/sort.js";
import {
  redirectToPostPage,
  redirectToPostPageFromCreate,
} from "../utils/routing.js";
import { apiUrlUser } from "../api/apiUrl.mjs";
import { getName } from "../auth/userName.js";
import { editPostApi } from "../api/editApi.js";
import { deletePostApi } from "../api/deleteApi.js";
import { isLoggedIn } from "../api/loginApi.js";
import { getSinglePost } from "../api/getApi.js";
import { showErrorAlert, showSuccessAlert } from "../utils/alerts.js";
import { hideLoader, showLoader } from "../utils/loading.js";
import { fetchAndDisplaySinglePost } from "../pages/post.js";

export function addSortButtonsEventListener(posts) {
  const sortNew = document.querySelector(".sort-newest");
  const sortOld = document.querySelector(".sort-oldest");

  if (!sortNew || !sortOld) {
    console.error("Sort buttons are not found in the document.");
    return;
  }

  sortNew.addEventListener("click", async () => {
    console.log("Sorting posts by newest");
    showLoader(); // Show loading indicator

    try {
      if (Array.isArray(posts.data)) {
        const sortedPosts = sortPostByNewest([...posts.data]);
        displayPosts(sortedPosts);
        console.log("Displayed posts sorted by newest");
      } else {
        console.error("Posts data is not an array.");
      }
    } catch (error) {
      console.error("Error sorting posts:", error);
    } finally {
      hideLoader(); // Hide loading indicator
    }
  });

  sortOld.addEventListener("click", async () => {
    console.log("Sorting posts by oldest");
    showLoader(); // Show loading indicator

    try {
      if (Array.isArray(posts.data)) {
        const sortedPosts = sortPostsByOldest([...posts.data]);
        displayPosts(sortedPosts);
        console.log("Displayed posts sorted by oldest");
      } else {
        console.error("Posts data is not an array.");
      }
    } catch (error) {
      console.error("Error sorting posts:", error);
    } finally {
      hideLoader(); // Hide loading indicator
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

export function setupCarouselClickEvents() {
  const slidesContainer = document.getElementById("slidesContainer");
  const slideWidth = document.querySelector(".slide").clientWidth;
  const slideCount = document.querySelectorAll(".slide").length;
  const prevButton = document.getElementById("slideArrowPrev");
  const nextButton = document.getElementById("slideArrowNext");

  nextButton.addEventListener("click", () => {
    slidesContainer.scrollLeft += slideWidth;
    if (slidesContainer.scrollLeft >= (slideCount - 1) * slideWidth) {
      slidesContainer.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  });

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
  console.log("Clicked post ID:", postId);
}

export async function handleEditClick(post) {
  if (!isLoggedIn(true)) {
    return;
  }

  try {
    console.log("Showing loading indicator");
    showLoader();
    const postId = post.id;
    const name = getName();

    console.log("Fetching post data for edit:", { name, postId });

    const response = await fetch(`${apiUrlUser}/${name}/${postId}`);
    console.log("API response status:", response.status);

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error response text:", errorMessage);
      throw new Error("Failed to fetch post data for the post edit ID");
    }

    const postData = await response.json();
    console.log("The post data found:", postData);

    if (!postData || !postData.data) {
      throw new Error("Invalid post data structure");
    }

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

    console.log("Edit form fields populated with post data:", postData);
  } catch (error) {
    console.error("Error handling edit click:", error);
    showErrorAlert("Failed to load post data for editing. Please try again.");
  } finally {
    hideLoader();
  }
}

export async function setupEditFormEventHandler() {
  const editPostForm = document.getElementById("editPostForm");

  if (editPostForm) {
    editPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      showLoader(); // Show loader on form submission

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
        console.log("Post updated successfully");
      } catch (error) {
        console.error("Failed to update post:", error);
        showErrorAlert("Failed to update post. Please try again.");
      } finally {
        hideLoader(); // Hide loader after operation is complete
      }
    });
  }
}

export async function handleDeleteClick(post, locallyCreatedPosts) {
  if (!isLoggedIn(true)) {
    return;
  }

  const postId = post.id;

  if (confirm("Are you sure you want to delete this post?")) {
    try {
      showLoader();
      const isDeleted = await deletePostApi(postId);
      if (isDeleted) {
        console.log(`Post with ID: ${postId} deleted successfully.`);
        showSuccessAlert("Post deleted successfully!");

        locallyCreatedPosts = locallyCreatedPosts.filter(
          (p) => p.id !== postId
        );
        saveCreatedPosts(locallyCreatedPosts);
        displayPosts(locallyCreatedPosts, true);
      }
    } catch (error) {
      console.error(`Failed to delete post with ID ${postId}:`, error);
      showErrorAlert("Failed to delete post. Please try again.");
    } finally {
      hideLoader();
    }
  }
}
