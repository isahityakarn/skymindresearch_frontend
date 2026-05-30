import api from "./axios";
import { getToken } from "../utils/storage";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getAllVendorSurveys = async () => {
  try {
    const res = await api.get("/vendor-surveys", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching vendor surveys:", err);
    throw err;
  }
};

export const getVendorSurveyById = async (id) => {
  try {
    const res = await api.get(`/vendor-surveys/${id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching vendor survey ${id}:`, err);
    throw err;
  }
};

export const getVendorSurveysByVendorId = async (vendor_id) => {
  try {
    const res = await api.get(`/vendor-surveys/vendor/${vendor_id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching vendor surveys for vendor ${vendor_id}:`, err);
    throw err;
  }
};

export const getVendorSurveysByProjectId = async (project_id) => {
  try {
    const res = await api.get(`/vendor-surveys/project/${project_id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching vendor surveys for project ${project_id}:`, err);
    throw err;
  }
};

export const getVendorSurveysByPid = async (pid) => {
  try {
    const res = await api.get(`/vendor-surveys/pid/${pid}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching vendor surveys for PID ${pid}:`, err);
    throw err;
  }
};

export const getVendorSurveysByUserId = async (uid) => {
  try {
    const res = await api.get(`/vendor-surveys/user/${uid}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching vendor surveys for user ${uid}:`, err);
    throw err;
  }
};

export const getVendorSurveysByMid = async (mid) => {
  try {
    const res = await api.get(`/vendor-surveys/mid/${mid}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching vendor surveys for MID ${mid}:`, err);
    throw err;
  }
};

export const getVendorSurveysByStatus = async (status) => {
  try {
    const res = await api.get(`/vendor-surveys/status/${status}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching vendor surveys with status ${status}:`, err);
    throw err;
  }
};

export const getVendorSurveysByIp = async (ip) => {
  try {
    const res = await api.get(`/vendor-surveys/ip/${ip}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching vendor surveys for IP ${ip}:`, err);
    throw err;
  }
};

export const createVendorSurvey = async (vendorSurveyData) => {
  try {
    const res = await api.post("/vendor-surveys", vendorSurveyData, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error creating vendor survey:", err);
    throw err;
  }
};

export const updateVendorSurvey = async (id, vendorSurveyData) => {
  try {
    const res = await api.put(`/vendor-surveys/${id}`, vendorSurveyData, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error updating vendor survey ${id}:`, err);
    throw err;
  }
};

export const updateVendorSurveyStatus = async (id, status) => {
  try {
    const res = await api.patch(`/vendor-surveys/${id}/status`, { status }, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error updating vendor survey ${id} status:`, err);
    throw err;
  }
};

export const updateVendorSurveyEndIp = async (id, end_ip) => {
  try {
    const res = await api.patch(`/vendor-surveys/${id}/end-ip`, { end_ip }, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error updating vendor survey ${id} end IP:`, err);
    throw err;
  }
};

export const deleteVendorSurvey = async (id) => {
  try {
    const res = await api.delete(`/vendor-surveys/${id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error deleting vendor survey ${id}:`, err);
    throw err;
  }
};
