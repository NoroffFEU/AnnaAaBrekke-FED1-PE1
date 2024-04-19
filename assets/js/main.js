import { getSinglePost, getPosts } from "./getBlogPosts.js";


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const posts = await getPosts();
        console.log('All posts:', posts);

        // const postId = 'post_1';  // This should be the actual ID of the post you're trying to fetch
        // const singlePost = await getSinglePost(postId);
        // console.log('Single post:', singlePost);

    }   catch (error) {
        // If there's an error fetching the posts, it will be caught here
        console.error("There was an error fetching the posts:", error);
    }
});