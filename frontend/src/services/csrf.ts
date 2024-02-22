export default async function getCSRF() {
  // Get the CSRF token from /sanctum/csrf-cookie
  return await fetch("http://localhost:8000/sanctum/csrf-cookie", {
    method: "GET",
    credentials: "include",
  });
}
