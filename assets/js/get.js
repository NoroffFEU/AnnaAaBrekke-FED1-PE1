import { apiUrlUser } from "./api.mjs";

// In api.mjs
export async function getPosts(name, accessToken = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Optionally add an Authorization header if an access token is provided
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${apiUrlUser}/${name}`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Optionally, handle different response formats here
    const data = await response.json();
    if (!Array.isArray(data) && data.posts) {
      return data.posts; // Assuming the API might wrap posts in a "posts" property
    }
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// Fetch a single product by ID
export async function getSinglePost(name, id) {
  try {
    const response = await fetch(`${apiUrlUser}/${name}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching the selected post:", error);
    throw error;
  }
}
