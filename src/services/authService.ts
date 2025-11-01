import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || "http://localhost:5000/apiCli",
});

export async function loginUser(credentials: { email: string; password: string }) {
  return await api.post("/auth/login", credentials);
}
