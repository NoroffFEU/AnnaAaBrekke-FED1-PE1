import { displayPosts } from "./createBlogPost.js";
import { sortPostByNewest, sortPostsByOldest } from "./sort.js";
import { redirectToPostPage } from "./routingUtils.js";
// import { logout } from "./login.js";
// import { logout } from "./login.js";

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


// export function addRegisterButtonListener() {
//   const registerButtonListener = () => {
//     // Redirect to the register page
//     window.location.href = "/register.html"; // Replace 'register.html' with the actual URL of your register page
//   };

//   // Add event listener for the register button
//   document.addEventListener("DOMContentLoaded", () => {
//     const registerButton = document.querySelector(".register-button");
//     if (registerButton) {
//       registerButton.addEventListener("click", registerButtonListener);
//     }
//   });
// }


// export function handleLogoutClicked() {
//   const logoutButton = document.querySelector(".logout-button");
//   if (logoutButton) {
//     logoutButton.addEventListener("click", logout);
//   }
// }

// // // based on this https://css-tricks.com/how-to-use-the-web-share-api/

// export function handleShareButton() {
//   const shareButton = document.querySelectorAll(".share-button");
//   shareButton.addEventListener("mouseenter", () => {});
// }

//     if (navigator.share) {
//       navigator
//         .share({
//           title: "post",
//           url: "",
//         })
//         .then(() => {
//           console.log("Thanks for sharing!");
//         })
//         .catch(console.error);
//     } else {
//       // fallback
//     }
//   });
// }
