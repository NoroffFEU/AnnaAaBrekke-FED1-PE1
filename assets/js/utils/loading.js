// loading.js
export function showLoader() {
  console.log("Showing loader");
  const loader = document.getElementById("loadingInd");
  if (loader) {
    loader.style.display = "flex"; // Set display to flex
    console.log("Loader displayed");
  } else {
    console.error("Loader element not found");
  }
}

export function hideLoader() {
  console.log("Hiding loader");
  const loader = document.getElementById("loadingInd");
  if (loader) {
    loader.style.display = "none"; // Set display to none
    console.log("Loader hidden");
  } else {
    console.error("Loader element not found");
  }
}


// I know style display inside js is not the best way, but that seems to work