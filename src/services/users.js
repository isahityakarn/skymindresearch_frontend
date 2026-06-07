import api from "./axios"
import { getToken } from "../utils/storage"

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const login = async (email, password) => {
    const response = await api.post("/users/login", {email, password})
    return response
}

export const getAllUsers = async () => {
  const res = await api.get("/users/all-users", getAuthConfig());
  return res.data;
};

export const changePassword = async (id, newPassword) => {
  const res = await api.patch(`/users/${id}/change-password`, { newPassword }, getAuthConfig());
  return res.data;
};

