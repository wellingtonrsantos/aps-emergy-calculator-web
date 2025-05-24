import { AuthResponse, LoginPayload, User } from "@/types/auth";
import api from "./api";

export interface RegisterPayload {
  name: string;
  surname: string;
  email: string;
  password: string;
  mobile_number: string;
}

export async function registerUser(data: RegisterPayload) {
  const response = await api.post("/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
}

export async function loginUser(data: LoginPayload): Promise<AuthResponse> {
  const response = await api.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get("/auth/me", {
    headers: {
      Accept: "application/json",
    },
  });
  return response.data;
}
