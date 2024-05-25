export function redirectToPostPage(postId) {
  window.location.href = `post/index.html?id=${postId}`;
}

export function redirectToPostPageFromCreate(postId) {
  window.location.href = `../post/index.html?id=${postId}`;
}

export function redirectToLoginPage() {
  window.location.href = `../account/login.html`;
}


