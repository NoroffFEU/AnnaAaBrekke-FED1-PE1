export const apiUrlUser = "https://v2.api.noroff.dev/blog/posts";
export const apiUrl = `https://v2.api.noroff.dev/`;


// Fetch all products
// Fetch all posts, with Authorization header if needed
// export async function getPosts(name, accessToken) {
//   // accessToken parameter added
//   try {
//     const headers = {};
//     if (accessToken) {
//       headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     const response = await fetch(`${apiUrlUser}/${name}`, {
//       method: "GET",
//       headers: headers,
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw error;
//   }
// }

// avatar: {
//     url: "https://img.service.com/avatar.jpg", // Optional
//     alt: "SerenaAvatar" // Optional
//   },
// banner: {
//     url: "https://img.service.com/banner.jpg", // Optional
//     alt: "Travel diary" // Optional
//   },
