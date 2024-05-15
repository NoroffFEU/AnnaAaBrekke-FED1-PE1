// import { apiUrlUser } from "./api.mjs";

// export async function deletePostApi(name, postId) {
//   const accessToken = localStorage.getItem("token");
//   if (!accessToken) {
//     throw new Error("No access token found, please login.");
//   }

//   try {
//     const response = await fetch(`${apiUrlUser}/${name}/${postId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     console.log(`Post with ID ${postId} deleted successfully.`);
//   } catch (error) {
//     console.error(`Error deleting post with ID ${postId}:`, error);
//     throw error;
//   }
// }