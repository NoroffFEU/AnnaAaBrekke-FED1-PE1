import { performLogin } from "./api.js";

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const loginData = {
        email: document.getElementById('ownerEmail').value,
        password: document.getElementById('ownerPassword').value
    };

    try {
        const loginResponse = await performLogin(loginData);
        localStorage.setItem('token', loginResponse.token);  // Store the token in local storage
        document.getElementsByClassName('login-message')[0].textContent = 'Login successful!';

        // Redirect to edit page after successful login
        // window.location.href = 'post/edit.html';  

    } catch (error) {
        document.getElementsByClassName('login-message')[0].textContent = 'Login failed: ' + error.message;
    }
});
