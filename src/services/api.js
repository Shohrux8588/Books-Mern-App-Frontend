const url = "http://localhost:5000";

export const fetchApi = (path, method = "GET", token, body) =>
  fetch(`${url}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
