import api from "./axios";
import { getToken } from "../utils/storage";

// Helper function to add auth token to requests
const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ============================================================================
// DASHBOARD OVERVIEW & STATS
// ============================================================================

export const getDashboardOverview = async () => {
  try {
    const res = await api.get("/dashboard/overview", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching dashboard overview:", err);
    throw err;
  }
};

export const getDashboardStats = async () => {
  try {
    const res = await api.get("/dashboard/stats", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    throw err;
  }
};

export const getVendorStats = async () => {
  try {
    const res = await api.get("/dashboard/vendor-stats", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching vendor stats:", err);
    throw err;
  }
};

export const getProjectStats = async () => {
  try {
    const res = await api.get("/dashboard/project-stats", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching project stats:", err);
    throw err;
  }
};

export const getCountryStats = async () => {
  try {
    const res = await api.get("/dashboard/country-stats", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching country stats:", err);
    throw err;
  }
};

export const getUserActivity = async () => {
  try {
    const res = await api.get("/dashboard/user-activity", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching user activity:", err);
    throw err;
  }
};

export const getSurveyTrends = async () => {
  try {
    const res = await api.get("/dashboard/survey-trends", getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Error fetching survey trends:", err);
    throw err;
  }
};