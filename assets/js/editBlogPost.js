// Get all the posts and put them in a list under eacother
// Add edit button and redirect to edit page - edit page similar to create post, but confrim changes and change innerhtml
// Add delete button and delete - need to log in again to delete and then innerhtml gone




// async function editPost(name, postData) {
//   const accessToken = localStorage.getItem("token"); // Ensure token is retrieved here
//   if (!accessToken) {
//     throw new Error("No access token found, please login.");
//   }
//   try {
//     const response = await fetch(`${apiUrlUser}/${name}/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(postData),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const createdPost = await response.json(); // Parse the response to get the created post
//     createdPosts.push(createdPost); // Add the created post to the array

//     return createdPost; // Return the created post
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// }
