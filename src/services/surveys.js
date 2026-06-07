import api from "./axios";
import { getToken } from "../utils/storage";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getAllSurveys = async (params = {}) => {
  try {
    const res = await api.get("/surveys", {
      ...getAuthConfig(),
      params,
    });
    // console.log('getAllSurveys raw response:', res);
    // The backend returns: { success: true, message: "...", surveys: [...], pagination: {...} }
    // Axios wraps this in res.data, so we return res.data which contains surveys and pagination
    return res.data;
  } catch (err) {
    console.error("Error fetching surveys:", err);
    throw err;
  }
};

export const getSurveyById = async (id) => {
  try {
    const res = await api.get(`/surveys/${id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching survey ${id}:`, err);
    throw err;
  }
};

export const getSurveysByProjectId = async (pid, params = {}) => {
  try {
    const res = await api.get(`/surveys/project/${pid}`, {
      ...getAuthConfig(),
      params,
    });
    return res.data;
  } catch (err) {
    console.error(`Error fetching surveys for project ${pid}:`, err);
    throw err;
  }
};

export const getSurveysByUserId = async (uid, params = {}) => {
  try {
    const res = await api.get(`/surveys/user/${uid}`, {
      ...getAuthConfig(),
      params,
    });
    return res.data;
  } catch (err) {
    console.error(`Error fetching surveys for user ${uid}:`, err);
    throw err;
  }
};

export const getSurveysByStatus = async (status, params = {}) => {
  try {
    const res = await api.get(`/surveys/status/${status}`, {
      ...getAuthConfig(),
      params,
    });
    return res.data;
  } catch (err) {
    console.error(`Error fetching surveys with status ${status}:`, err);
    throw err;
  }
};

export const createSurvey = async (surveyData) => {
  try {
    const res = await api.post("/surveys", surveyData, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error creating survey:", err);
    throw err;
  }
};

export const updateSurvey = async (id, surveyData) => {
  try {
    const res = await api.put(`/surveys/${id}`, surveyData, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error updating survey ${id}:`, err);
    throw err;
  }
};

export const updateSurveyStatus = async (id, status) => {
  try {
    const res = await api.patch(`/surveys/${id}/status`, { status }, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error updating survey ${id} status:`, err);
    throw err;
  }
};

export const updateSurveyEndIp = async (id, end_ip) => {
  try {
    const res = await api.patch(`/surveys/${id}/end-ip`, { end_ip }, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error updating survey ${id} end IP:`, err);
    throw err;
  }
};

export const deleteSurvey = async (id) => {
  try {
    const res = await api.delete(`/surveys/${id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error deleting survey ${id}:`, err);
    throw err;
  }
};
