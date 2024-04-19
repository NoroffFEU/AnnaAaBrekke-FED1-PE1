// create new post and access token?

// const newPostData = {
//     title: "Lombok Paradise",
//     body: "Discover pristine white beaches, catch the perfect surf, and embrace the ultimate chill vibes.",
//     tags: ["Surf", "Tropical", "Beach", "Food"],
//     media: {
//         url: "",
//         alt: "An amazing travel photo"
//     }
// };

// // Function to create a new post
// export async function createPost(name, postData) {
//     try {
//         const response = await fetch(`${apiUrlUser}/${name}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Add authorization header if required
//                 'Authorization': `Bearer ${yourAccessToken}`
//             },
//             body: JSON.stringify(postData)
//         });
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error creating post:", error);
//         throw error;
//     }
// }

// // Using the createPost function
// createPost("SerenaTravel", newPostData).then(data => {
//     console.log("Post created", data);
// }).catch(error => {
//     console.error("Failed to create post:", error);
// });
