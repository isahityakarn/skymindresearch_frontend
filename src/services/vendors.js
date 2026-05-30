import api from "./axios";
import { getToken } from "../utils/storage";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getAllVendors = async () => {
  try {
    const res = await api.get("/vendors", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching vendors:", err);
    throw err;
  }
};

export const getVendorById = async (id) => {
  try {
    const res = await api.get(`/vendors/${id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching vendor ${id}:`, err);
    throw err;
  }
};

export const getVendorByEmail = async (email) => {
  try {
    const res = await api.get(`/vendors/email/${email}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching vendor with email ${email}:`, err);
    throw err;
  }
};

export const getActiveVendors = async () => {
  try {
    const res = await api.get("/vendors/active", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching active vendors:", err);
    throw err;
  }
};

export const createVendor = async (vendorData) => {
  try {
    const res = await api.post("/vendors", vendorData, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error creating vendor:", err);
    throw err;
  }
};

export const updateVendor = async (id, vendorData) => {
  try {
    const res = await api.put(`/vendors/${id}`, vendorData, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error updating vendor ${id}:`, err);
    throw err;
  }
};

export const deactivateVendor = async (id) => {
  try {
    const res = await api.patch(`/vendors/${id}/deactivate`, {}, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error deactivating vendor ${id}:`, err);
    throw err;
  }
};

export const deleteVendor = async (id) => {
  try {
    const res = await api.delete(`/vendors/${id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error deleting vendor ${id}:`, err);
    throw err;
  }
};
