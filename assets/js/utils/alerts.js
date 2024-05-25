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

  setTimeout(() => {
    alertContainer.classList.add("show");
    setTimeout(() => {
      alertContainer.classList.remove("show");
      setTimeout(() => {
        alertContainer.remove();
      }, 300); // Delay to allow the transition to complete
    }, 3000);
  }, 100); // Small delay to ensure the class 'show' is added
}