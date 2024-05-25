import { apiUrlRegister } from "./apiUrl.mjs";

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

  const { data } = await response.json();
  return data;
}
