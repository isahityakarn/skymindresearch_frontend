/**
 * Role Constants
 * These should match the backend role IDs in the database
 */

export const ROLES = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  USER: 3
};

export const ROLE_NAMES = {
  1: "Super Admin",
  2: "Admin",
  3: "User"
};

export const roles = [
  {
    id: 1,
    name: "Super Admin"
  },
  {
    id: 2,
    name: "Admin"
  },
  {
    id: 3,
    name: "User"
  }
];

/**
 * Get role name by ID
 * @param {number} roleId - Role ID
 * @returns {string} Role name
 */
export const getRoleName = (roleId) => {
  return ROLE_NAMES[roleId] || "Unknown";
};

/**
 * Check if a role is admin (Super Admin or Admin)
 * @param {number} roleId - Role ID
 * @returns {boolean} True if role is admin
 */
export const isAdminRole = (roleId) => {
  return roleId === ROLES.SUPER_ADMIN || roleId === ROLES.ADMIN;
};

export default ROLES;
