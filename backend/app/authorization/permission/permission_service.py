from sqlalchemy.orm import Session

from app.authorization.permission.permission_model import Permission
from app.authorization.permission.permission_repository import PermissionRepository
from app.authorization.permission.permission_schema import (
    PermissionCreate,
    PermissionUpdate,
)


class PermissionService:
    def __init__(self, db: Session):
        self.repository = PermissionRepository(db)
        self.db = db

    def create(
        self,
        data: PermissionCreate,
    ) -> Permission:

        existing_permission = self.repository.get_by_name(
            data.name
        )

        if existing_permission is not None:
            raise ValueError(
                "Permission with this name already exists"
            )

        permission = Permission(
            name=data.name,
            description=data.description,
        )

        try:
            self.repository.create(permission)

            self.db.commit()
            self.db.refresh(permission)

        except Exception:
            self.db.rollback()
            raise

        return permission

    def get_by_id(
        self,
        permission_id: int,
    ) -> Permission:

        permission = self.repository.get_by_id(
            permission_id
        )

        if permission is None:
            raise LookupError(
                "Permission not found"
            )

        return permission

    def get_all(self) -> list[Permission]:
        return self.repository.get_all()

    def update(
        self,
        permission_id: int,
        data: PermissionUpdate,
    ) -> Permission:

        permission = self.repository.get_by_id(
            permission_id
        )

        if permission is None:
            raise LookupError(
                "Permission not found"
            )

        update_data = data.model_dump(
            exclude_unset=True
        )

        if "name" in update_data:
            existing_permission = (
                self.repository.get_by_name(
                    update_data["name"]
                )
            )

            if (
                existing_permission is not None
                and existing_permission.id != permission.id
            ):
                raise ValueError(
                    "Permission with this name already exists"
                )

        if not update_data:
            return permission

        try:
            self.repository.update(
                permission,
                update_data,
            )

            self.db.commit()
            self.db.refresh(permission)

        except Exception:
            self.db.rollback()
            raise

        return permission

    def delete(
        self,
        permission_id: int,
    ) -> None:

        permission = self.repository.get_by_id(
            permission_id
        )

        if permission is None:
            raise LookupError(
                "Permission not found"
            )

        try:
            self.repository.delete(permission)

            self.db.commit()

        except Exception:
            self.db.rollback()
            raise