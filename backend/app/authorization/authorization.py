from collections.abc import Callable

from fastapi import Depends, HTTPException, status

from app.dependencies.get_current_user import get_current_user
from app.user.user_models import User


def require_permission(permission_name: str) -> Callable:
    """
    Create a FastAPI dependency that requires the current user
    to have a specific permission.
    """

    def permission_dependency(
        current_user: User = Depends(get_current_user),
    ) -> User:

        if current_user.role is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User does not have a role",
            )

        has_permission = any(
            permission.name == permission_name
            for permission in current_user.role.permissions
        )

        if not has_permission:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission required: {permission_name}",
            )

        return current_user

    return permission_dependency