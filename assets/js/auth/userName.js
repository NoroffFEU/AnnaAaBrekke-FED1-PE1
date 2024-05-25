export function getName() {
  try {
    const storedData = JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage
    if (storedData && storedData.name) {
      return storedData.name; // Return the user's name
    }
  } catch (error) {
    console.error("Error reading user name from localStorage:", error);
  }
  return "Serena"; // Default name
}
