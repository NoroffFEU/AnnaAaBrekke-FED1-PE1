import { apiUrlUser } from "./api.mjs";

export async function getPosts(name, queryParams = {}) {
  const queryString = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(`${apiUrlUser}/${name}${queryString ? "?" + queryString : ""}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status} - ${errorDetails}`
      );
    }

    const data = await response.json();
    if (!Array.isArray(data) && data.posts) {
      return data.posts;
    }
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}


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
