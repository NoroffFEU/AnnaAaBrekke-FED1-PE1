// Function to get user data
// export function getUserData() {
//   const userDataJSON = localStorage.getItem("user");
//   return userDataJSON ? JSON.parse(userDataJSON) : null;
// }

// // Function to save user data
// export function setUserData(userData) {
//   localStorage.setItem("user", JSON.stringify(userData));
// }

// // Function to clear user data
// export function clearUserData() {
//   localStorage.removeItem("user");
// }

// export function getName() {
//   const userData = getUserData();
//   return userData ? userData.name : null; // Corrected to access name property from userData
// }

export function getName() {
  try {
    const storedData = JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage
    if (storedData && storedData.name) {
      // Check if the name is available
      return storedData.name; // Return the user's name
    }
  } catch (error) {
    console.error("Error reading user name from localStorage:", error);
  }
  return "DefaultUser"; // Return 'DefaultUser' as a fallback
}

// export function getPostId(postData) {
//   try {
//     // Parse the postData JSON string to an object
//     const parsedData = JSON.parse(postData);

//     // Check if parsedData is available and has an ID
//     if (parsedData && parsedData.id) {
//       return parsedData.id; // Return the post ID
//     }
//   } catch (error) {
//     console.error("Error reading post ID:", error);
//   }
//   return null; // Return null if post ID is not available
// }
