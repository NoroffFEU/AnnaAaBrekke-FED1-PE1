import { registerUser } from './api.js'; // Adjust the path as needed

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const registerData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    try {
        const response = await registerUser(registerData);
        document.getElementsByClassName('register-message')[0].textContent = 'Registration successful!';
        
        // Redirect to login page after registration if needed login.html

        
    } catch (error) {
        document.getElementsByClassName('register-message')[0].textContent = 'Registration failed: ' + error.message;
    }
});




// import { getPosts } from "./getBlogPosts.js";

// const registerData = {
//     name: "SerenaTravel",
//     email: "annaas00208@stud.noroff.no",
//     password: "firstRegisterApiPasswordSerena",
//     bio: "This is my profile bio",
//     venueManager: true
// };

// export async function registerUser(registerData) {
//     const response = await fetch(`${apiUrl}/auth/register`, {
//         method: `POST`,
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(registerData)
//     });

//     if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await response.json();
// }
