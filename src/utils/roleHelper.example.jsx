/**
 * Role Helper Usage Examples
 * 
 * This file demonstrates how to use the role helper functions
 * to show/hide UI elements based on user permissions
 */

import { isAdmin, hasRole, RoleProtected } from './roleHelper';

// ============================================================================
// Example 1: Hide/Show entire sections
// ============================================================================
function ExampleComponent1() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Show only to admins (role 1 or 2) */}
      {isAdmin() && (
        <div className="admin-section">
          <h2>Admin Controls</h2>
          <button>Delete All Data</button>
        </div>
      )}
      
      {/* Show to everyone */}
      <div className="public-section">
        <h2>Your Profile</h2>
      </div>
    </div>
  );
}

// ============================================================================
// Example 2: Hide menu items conditionally
// ============================================================================
function NavigationMenu() {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', allowedRoles: [] }, // All users
    { id: 'surveys', label: 'Surveys', allowedRoles: [] }, // All users
    { id: 'projects', label: 'Projects', allowedRoles: [1, 2] }, // Admin only
    { id: 'settings', label: 'Settings', allowedRoles: [2] }, // Super admin only
  ];

  // Filter based on role
  const visibleItems = menuItems.filter(item => {
    if (item.allowedRoles.length === 0) return true;
    return hasRole(...item.allowedRoles);
  });

  return (
    <nav>
      {visibleItems.map(item => (
        <a key={item.id} href={`#${item.id}`}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

// ============================================================================
// Example 3: Using RoleProtected component
// ============================================================================
function ExampleComponent3() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Protected content - only for admins */}
      <RoleProtected allowedRoles={[1, 2]}>
        <div className="admin-section">
          <h2>Admin Panel</h2>
          <button>Manage Users</button>
        </div>
      </RoleProtected>
      
      {/* Protected content - only for super admin */}
      <RoleProtected allowedRoles={[2]}>
        <div className="super-admin-section">
          <h2>System Settings</h2>
          <button>Configure System</button>
        </div>
      </RoleProtected>
      
      {/* No protection - visible to all */}
      <RoleProtected allowedRoles={[]}>
        <div className="public-section">
          <h2>Your Profile</h2>
        </div>
      </RoleProtected>
    </div>
  );
}

// ============================================================================
// Example 4: Conditional button rendering
// ============================================================================
function ExampleComponent4() {
  return (
    <div className="user-card">
      <h3>John Doe</h3>
      
      {/* Edit button - visible to all */}
      <button className="btn btn-primary">Edit Profile</button>
      
      {/* Delete button - only admins */}
      {isAdmin() && (
        <button className="btn btn-danger">Delete User</button>
      )}
      
      {/* Promote button - only super admins */}
      {hasRole(2) && (
        <button className="btn btn-warning">Promote to Admin</button>
      )}
    </div>
  );
}

// ============================================================================
// Example 5: Conditional rendering of table columns
// ============================================================================
function UserTable() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          {/* Actions column only for admins */}
          {isAdmin() && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {isAdmin() && (
              <td>
                <button className="btn btn-sm btn-primary">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ============================================================================
// Example 6: Conditional form fields
// ============================================================================
function UserForm() {
  return (
    <form>
      <div className="mb-3">
        <label>Name</label>
        <input type="text" className="form-control" />
      </div>
      
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" />
      </div>
      
      {/* Role selection - only admins can change roles */}
      {isAdmin() && (
        <div className="mb-3">
          <label>Role</label>
          <select className="form-control">
            <option value="1">User</option>
            <option value="2">Admin</option>
            <option value="3">Manager</option>
          </select>
        </div>
      )}
      
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

// ============================================================================
// Example 7: Multiple role checks
// ============================================================================
function ExampleComponent7() {
  return (
    <div>
      {/* Show to admins or managers (role 1, 2, or 3) */}
      {hasRole(1, 2, 3) && (
        <div className="manager-section">
          <h2>Management Dashboard</h2>
        </div>
      )}
      
      {/* Show only to managers and supervisors (role 3 or 4) */}
      {hasRole(3, 4) && (
        <div className="staff-section">
          <h2>Staff Reports</h2>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Example 8: Disable buttons based on role
// ============================================================================
function ExampleComponent8() {
  const canDelete = isAdmin(); // Only admins can delete
  
  return (
    <div>
      <button className="btn btn-primary">View Details</button>
      <button 
        className="btn btn-danger" 
        disabled={!canDelete}
        title={!canDelete ? "Only admins can delete" : "Delete item"}
      >
        Delete
      </button>
    </div>
  );
}

// ============================================================================
// Role ID Reference
// ============================================================================
/*
  Role IDs in your system:
  1 = Super Admin (highest privileges)
  2 = Admin (standard admin privileges)
  3 = User (regular user, limited access)
  
  Helper functions:
  - isAdmin() - Returns true for Super Admin (1) or Admin (2)
  - isSuperAdmin() - Returns true for Super Admin (1) only
  - isRegularAdmin() - Returns true for Admin (2) only
  - isUser() - Returns true for User (3) only
  - hasRole(1, 2) - Returns true if user has role 1 OR 2
*/

export default {
  ExampleComponent1,
  ExampleComponent3,
  ExampleComponent4,
  UserTable,
  UserForm,
  ExampleComponent7,
  ExampleComponent8
};
