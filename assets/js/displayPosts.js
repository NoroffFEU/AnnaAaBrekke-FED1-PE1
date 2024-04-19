import { getPosts } from "/getBlogPosts.js";

export async function displayPosts() {
    try {
        const posts = await getPosts();
        console.log("Posts is here:", posts);
        return posts; // Make sure to return the posts
    } catch (error) {
        console.error("Error displaying the posts:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function postContainer (posts) {
    try {
        
    }
}
