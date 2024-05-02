import { apiUrlUser } from "./api.mjs";

export async function getPosts(name, accessToken = null, queryParams = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Construct query string from queryParams object
  const queryString = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(
      `${apiUrlUser}/${name}${queryString ? "?" + queryString : ""}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text(); // Assuming error details are in text format
      throw new Error(
        `HTTP error! Status: ${response.status} - ${errorDetails}`
      );
    }

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

console.log("getPosts module loaded");


export async function getSinglePost(name, id, accessToken = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${apiUrlUser}/${name}/${id}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status} - ${errorDetails}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching the selected post:", error);
    throw error;
  }
}
