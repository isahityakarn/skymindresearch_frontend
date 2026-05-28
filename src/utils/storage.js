const storage = {
  set: (key, value) => {
    try {
      const serializedValue = typeof value === "object" ? JSON.stringify(value) : value;
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      // Try to parse as JSON, if it fails, return the raw string
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return null;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
};

export const setToken = (token) => storage.set("token", token);
export const getToken = () => storage.get("token");
export const removeToken = () => storage.remove("token");

export const setUser = (user) => storage.set("user", user);
export const getUser = () => storage.get("user");
export const removeUser = () => storage.remove("user");

export const clearAuth = () => {
  storage.remove("token");
  storage.remove("user");
};

export default storage;
