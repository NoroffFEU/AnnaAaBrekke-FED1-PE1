import { apiUrlRegister } from "./api.mjs";

// const registerData = {
//   name: "SerenaTravel",
//   email: "annaas00208@stud.noroff.no",
//   password: "firstRegisterApiPasswordSerena",
//   venueManager: true, // Assuming this field is always true for new registrations
// };

// HereYouGo

const method = "post";

export async function register(registerData) {
  const body = JSON.stringify(registerData);
  const response = await fetch(apiUrlRegister, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Registration failed: ${errorText}`);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  console.log("Registration Result:", result);
  return result;
}


// (make  file later)


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
