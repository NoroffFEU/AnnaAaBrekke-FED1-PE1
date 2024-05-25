export function showLoader() {
  const loader = document.getElementById("loadingInd");
  if (loader) {
    loader.style.display = "flex";
  } else {
    console.error("Loader element not found");
  }
}

export function hideLoader() {
  const loader = document.getElementById("loadingInd");
  if (loader) {
    loader.style.display = "none";
  } else {
    console.error("Loader element not found");
  }
}
