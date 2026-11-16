// Check whether the user has one specific permission
export const hasPermission = (permissions = [], requiredPermission) => {
  return permissions.includes(requiredPermission);
};

// Check whether the user has at least one required permission
export const hasAnyPermission = (
  permissions = [],
  requiredPermissions = []
) => {
  return requiredPermissions.some((permission) =>
    permissions.includes(permission)
  );
};

// Check whether the user has all required permissions
export const hasAllPermissions = (
  permissions = [],
  requiredPermissions = []
) => {
  return requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );
};

// Check whether the user can perform an action
export const canPerformAction = (permissions = [], requiredPermission) => {
  return hasPermission(permissions, requiredPermission);
};