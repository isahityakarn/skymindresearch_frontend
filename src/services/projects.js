import api from "./axios";
import { getToken } from "../utils/storage";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getAllProjects = async () => {
  try {
    const res = await api.get("/projects", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw err;
  }
};

export const getProjectById = async (id) => {
  try {
    const res = await api.get(`/projects/${id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching project ${id}:`, err);
    throw err;
  }
};

export const getProjectByPid = async (pid) => {
  try {
    const res = await api.get(`/projects/pid/${pid}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching project with PID ${pid}:`, err);
    throw err;
  }
};

export const getProjectByMid = async (mid) => {
  try {
    const res = await api.get(`/projects/mid/${mid}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching project with MID ${mid}:`, err);
    throw err;
  }
};

export const getProjectsByVendorId = async (vendor_id) => {
  try {
    const res = await api.get(`/projects/vendor/${vendor_id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching projects for vendor ${vendor_id}:`, err);
    throw err;
  }
};

export const getProjectsByCountryId = async (country_id) => {
  try {
    const res = await api.get(`/projects/country/${country_id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error fetching projects for country ${country_id}:`, err);
    throw err;
  }
};

export const getActiveProjects = async () => {
  try {
    const res = await api.get("/projects/active", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching active projects:", err);
    throw err;
  }
};

export const createProject = async (projectData) => {
  try {
    const res = await api.post("/projects", projectData, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error creating project:", err);
    throw err;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const res = await api.put(`/projects/${id}`, projectData, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error updating project ${id}:`, err);
    throw err;
  }
};

export const deactivateProject = async (id) => {
  try {
    const res = await api.patch(`/projects/${id}/deactivate`, {}, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error deactivating project ${id}:`, err);
    throw err;
  }
};

export const deleteProject = async (id) => {
  try {
    const res = await api.delete(`/projects/${id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error deleting project ${id}:`, err);
    throw err;
  }
};
