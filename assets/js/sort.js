// Sort posts by created date (latest posts)

export function sortedPostsByDateCreated(posts) {
  return posts.slice(0, 3).sort((a, b) => {
    const dateA = new Date(a.created).getTime();
    const dateB = new Date(b.created).getTime();
    return dateB - dateA || b.id - a.id; // Sort by date first, then by id if dates are equal
  });
}
