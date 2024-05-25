// Sort posts by created date

export function sortPostByNewest(posts) {
  return posts.sort((a, b) => new Date(b.created) - new Date(a.created));
}

export function sortPostsByOldest(posts) {
  return posts.sort((a, b) => new Date(a.created) - new Date(b.created));
}
