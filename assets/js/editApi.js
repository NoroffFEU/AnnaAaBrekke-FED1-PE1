import { apiUrlUser } from "./api.mjs";
import { fetchWithAuth } from "./apiAuth.js";

export async function editPostApi(name, postId, postData) {
    const response = await fetchWithAuth(`${apiUrlUser}/${name}/${postId}`, {
        method: "PUT",
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorDetails}`);
    }

    return await response.json();
}

export async function deletePostApi(name, postId) {
    const response = await fetchWithAuth(`${apiUrlUser}/${name}/${postId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorDetails}`);
    }

    return await response.json();
}
