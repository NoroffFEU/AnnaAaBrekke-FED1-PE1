export function showLoader() {
  console.log("Showing loader");
  const loader = document.getElementById("loadingInd");
  if (loader) {
    loader.style.display = "flex"; 
    console.log("Loader displayed");
  } else {
    console.error("Loader element not found");
  }
}

export function hideLoader() {
  console.log("Hiding loader");
  const loader = document.getElementById("loadingInd");
  if (loader) {
    loader.style.display = "none"; 
    console.log("Loader hidden");
  } else {
    console.error("Loader element not found");
  }
}

