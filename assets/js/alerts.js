// export async function displayError(message) {
//   const errorContainer = 
// }


export function showSuccessAlert(message) {
  showAlert(message, "success");
}

export function showErrorAlert(message) {
  showAlert(message, "error");
}

function showAlert(message, type) {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alert", `alert-${type}`);
  alertContainer.textContent = message;

  document.body.appendChild(alertContainer);

  // Automatically show the alert and remove it after 3 seconds
  setTimeout(() => {
    alertContainer.classList.add("show");
  }, 10);

  setTimeout(() => {
    alertContainer.classList.remove("show");
    setTimeout(() => {
      alertContainer.remove();
    }, 300); // Delay to allow the transition to complete
  }, 3000);
}
