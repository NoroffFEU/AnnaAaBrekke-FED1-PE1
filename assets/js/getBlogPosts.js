const apiUrl = 'https://v2.api.noroff.dev/blog/posts';

const registerData = {
    name: "SerenaTravel",
    email: "annaas00208@stud.noroff.no",
    password: "firstRegisterApiPasswordSerena",
    bio: "This is my profile bio",
    venueManager: true
};

// Fetch all products
export async function getPosts (name) {
    try {
        const response = await fetch(`${apiUrl}/${name}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

// Fetch a single product by ID
export async function getSinglePost(name, id) {
    try {
        const response = await fetch(`${apiUrl}/${name}/${id}`);
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

// create new post and access token?

const newPostData = {
    title: "Lombok Paradise",
    body: "Discover pristine white beaches, catch the perfect surf, and embrace the ultimate chill vibes.",
    tags: ["Surf", "Tropical", "Beach", "Food"],
    media: {
        url: "",
        alt: "An amazing travel photo"
    }
};

// Function to create a new post
export async function createPost(name, postData) {
    try {
        const response = await fetch(`${apiUrl}/${name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add authorization header if required
                'Authorization': `Bearer ${yourAccessToken}`
            },
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}

// Using the createPost function
createPost("SerenaTravel", newPostData).then(data => {
    console.log("Post created", data);
}).catch(error => {
    console.error("Failed to create post:", error);
});


    // avatar: {
    //     url: "https://img.service.com/avatar.jpg", // Optional
    //     alt: "SerenaAvatar" // Optional
    //   },
    // banner: {
    //     url: "https://img.service.com/banner.jpg", // Optional
    //     alt: "Travel diary" // Optional
    //   },

    