// api.js - small helpers around the browser's built-in fetch() (no axios needed).
// Paths start with /api; the Vite proxy sends them to the Express server.

// Does one request, adds the login token if we have one, returns the JSON.
async function request(method, url, body) {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('token');
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json(); // parse the JSON text into a JS object
  if (!res.ok) throw new Error(data.message || 'Something went wrong'); // 4xx/5xx -> error
  return data;
}

export const get = (url) => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const del = (url) => request('DELETE', url);
