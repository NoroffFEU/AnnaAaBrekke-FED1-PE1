import { apiUrlUser } from "./apiUrl.mjs";

export async function getPosts(name, queryParams = {}) {
  const queryString = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(
      `${apiUrlUser}/${name}${queryString ? "?" + queryString : ""}`,
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

export async function getSinglePost(name, id) {
  // Define the headers inside the function to ensure they are used in the fetch call
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    // Perform the GET request using the constructed URL
    const response = await fetch(`${apiUrlUser}/${name}/${id}`, {
      method: "GET",
      headers: headers,
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status} - ${errorDetails}`
      );
    }

    // Parse the response into JSON
    return await response.json();
  } catch (error) {
    console.error("Error fetching the selected post:", error);
    throw error; // Rethrowing the error to be handled by the caller
  }
}
