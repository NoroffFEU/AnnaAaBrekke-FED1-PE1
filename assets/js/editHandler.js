// editHandler.js
import { editPostApi } from "./editApi.js";
import { getName } from "./userName.js";
import { getSinglePost } from "./get.js";

export function setupEditFormEventHandler(post) {
  const form = document.getElementById("editPostForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postData = {
      title: document.getElementById("postTitle").value,
      body: document.getElementById("postContent").value,
      tags: document
        .getElementById("postTags")
        .value.split(",")
        .map((tag) => tag.trim()),
      media: {
        url: document.getElementById("postImage").value,
        alt: document.getElementById("postImageAlt").value,
      },
    };
    const name = getName();
    const postId = data.post.id;

    try {
      const updatedPost = await editPostApi(name, postId, postData);
      console.log("Post updated successfully:", updatedPost);
      // Optionally refresh the page or inform the user of success
    } catch (error) {
      console.error("Failed to update post:", error);
      // Optionally inform the user of the failure
    }
  });
}

export async function handleEditClick(event, postId) {
  const name = getName();

  try {
    const post = await editPostApi(name, postId);
    setupEditFormEventHandler(post);
  } catch (error) {
    console.error("Failed to fetch post for editing:", error);
  }
}
