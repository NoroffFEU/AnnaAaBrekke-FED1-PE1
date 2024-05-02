// Redirect to post/index.html with the post ID as a query parameter

export function redirectToPostPage(postId) {
  window.location.href = `post/index.html?id=${postId}`;
}
