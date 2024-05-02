// Sort posts by created date (latest posts)

// export function sortedPostsByDateCreated(posts) {
//   return posts.slice(6, 30).sort((a, b) => {
//     const dateA = new Date(a.created).getTime();
//     const dateB = new Date(b.created).getTime();
//     return dateB - dateA || b.id - a.id; // Sort by date first, then by id if dates are equal
//   });
// }

export function sortPostByNewest(posts) {
  return posts.sort((a, b) => new Date(b.created) - new Date(a.created));
}

export function sortPostsByOldest(posts) {
  return posts.sort((a, b) => new Date(a.created) - new Date(b.created));
}

// data.created?
