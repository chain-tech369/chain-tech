from sqlalchemy.orm import Session

from app.admin_folders.role.role_repository import RoleRepository
from app.authorization.permission.permission_repository import (
    PermissionRepository,
)
from app.authorization.role_permission.role_permission_model import (
    RolePermission,
)
from app.authorization.role_permission.role_permission_repository import (
    RolePermissionRepository,
)
from app.authorization.role_permission.role_permission_schema import (
    RolePermissionCreate,
    RolePermissionResponse,
)


class RolePermissionService:
    def __init__(self, db: Session):
        self.db = db

        self.repository = RolePermissionRepository(db)
        self.role_repository = RoleRepository(db)
        self.permission_repository = PermissionRepository(db)

    def create(
        self,
        data: RolePermissionCreate,
    ) -> RolePermissionResponse:

        role = self.role_repository.get_by_id(
            data.role_id
        )

        if role is None:
            raise LookupError(
                "Role not found"
            )

        permission = self.permission_repository.get_by_id(
            data.permission_id
        )

        if permission is None:
            raise LookupError(
                "Permission not found"
            )

        existing = self.repository.get(
            role_id=data.role_id,
            permission_id=data.permission_id,
        )

        if existing is not None:
            raise ValueError(
                "Permission is already assigned to this role"
            )

        role_permission = RolePermission(
            role_id=data.role_id,
            permission_id=data.permission_id,
        )

        try:
            self.repository.create(
                role_permission
            )

            self.db.commit()

        except Exception:
            self.db.rollback()
            raise

        return RolePermissionResponse.model_validate(
            role_permission
        )

    def get(
        self,
        role_id: int,
        permission_id: int,
    ) -> RolePermissionResponse:

        role_permission = self.repository.get(
            role_id=role_id,
            permission_id=permission_id,
        )

        if role_permission is None:
            raise LookupError(
                "Role permission not found"
            )

        return RolePermissionResponse.model_validate(
            role_permission
        )

    def get_by_role_id(
        self,
        role_id: int,
    ) -> list[RolePermissionResponse]:

        role = self.role_repository.get_by_id(
            role_id
        )

        if role is None:
            raise LookupError(
                "Role not found"
            )

        role_permissions = self.repository.get_by_role_id(
            role_id
        )

        return [
            RolePermissionResponse.model_validate(
                role_permission
            )
            for role_permission in role_permissions
        ]

    def get_by_permission_id(
        self,
        permission_id: int,
    ) -> list[RolePermissionResponse]:

        permission = self.permission_repository.get_by_id(
            permission_id
        )

        if permission is None:
            raise LookupError(
                "Permission not found"
            )

        role_permissions = (
            self.repository.get_by_permission_id(
                permission_id
            )
        )

        return [
            RolePermissionResponse.model_validate(
                role_permission
            )
            for role_permission in role_permissions
        ]

    def delete(
        self,
        role_id: int,
        permission_id: int,
    ) -> None:

        role_permission = self.repository.get(
            role_id=role_id,
            permission_id=permission_id,
        )

        if role_permission is None:
            raise LookupError(
                "Role permission not found"
            )

        try:
            self.repository.delete(
                role_permission
            )

            self.db.commit()

        except Exception:
            self.db.rollback()
            raise