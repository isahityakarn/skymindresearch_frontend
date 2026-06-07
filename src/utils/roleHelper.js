import { getUser } from './storage';
import { ROLES } from '../constants/roles';

/**
 * Get current user's role ID
 * @returns {number|null} Role ID or null if not logged in
 */
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

/**
 * Check if user has one of the allowed roles
 * @param {...number} allowedRoles - Role IDs to check
 * @returns {boolean} True if user has permission
 */
export const hasRole = (...allowedRoles) => {
  const userRole = getUserRole();
  if (userRole === null) return false;
  return allowedRoles.includes(userRole);
};

/**
 * Check if user is admin (Super Admin or Admin - role ID 1 or 2)
 * @returns {boolean} True if user is admin
 */
export const isAdmin = () => {
  return hasRole(ROLES.SUPER_ADMIN, ROLES.ADMIN);
};

/**
 * Check if user is Super Admin (role ID 1)
 * @returns {boolean} True if user is super admin
 */
export const isSuperAdmin = () => {
  return hasRole(ROLES.SUPER_ADMIN);
};

/**
 * Check if user is Admin (role ID 2)
 * @returns {boolean} True if user is admin
 */
export const isRegularAdmin = () => {
  return hasRole(ROLES.ADMIN);
};

/**
 * Check if user is regular User (role ID 3)
 * @returns {boolean} True if user is regular user
 */
export const isUser = () => {
  return hasRole(ROLES.USER);
};

/**
 * Higher-order component to conditionally render based on role
 * @param {React.Component} Component - Component to render
 * @param {...number} allowedRoles - Role IDs allowed to see the component
 * @returns {React.Component|null} Component or null
 */
export const RoleProtected = ({ children, allowedRoles = [] }) => {
  if (allowedRoles.length === 0) {
    // No restrictions, show to all authenticated users
    return children;
  }

  if (hasRole(...allowedRoles)) {
    return children;
  }

  return null;
};

/**
 * Hook to check if user has required role
 * @param {...number} allowedRoles - Role IDs to check
 * @returns {boolean} True if user has permission
 */
export const useHasRole = (...allowedRoles) => {
  return hasRole(...allowedRoles);
};

/**
 * Get user's role name (if stored)
 * @returns {string|null} Role name or null
 */
export const getUserRoleName = () => {
  const user = getUser();
  return user?.role_name || null;
};
