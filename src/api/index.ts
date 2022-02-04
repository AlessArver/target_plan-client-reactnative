import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  headers: {
    "API-KEY": "a9b36abe-d689-4dc1-9b92-adeaba26d689",
    // Authorization: `Token `,
  },
  baseURL: "http://127.0.0.1:8000/api/",
});
