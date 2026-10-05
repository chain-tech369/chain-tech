from sqlalchemy import select
from sqlalchemy.orm import Session

from app.authorization.role_permission.role_permission_model import RolePermission


class RolePermissionRepository:
    def __init__(self, db: Session):
        self.db = db

    def get(
        self,
        role_id: int,
        permission_id: int,
    ) -> RolePermission | None:

        statement = select(RolePermission).where(
            RolePermission.role_id == role_id,
            RolePermission.permission_id == permission_id,
        )

        return self.db.execute(
            statement
        ).scalar_one_or_none()

    def get_by_role_id(
        self,
        role_id: int,
    ) -> list[RolePermission]:

        statement = select(RolePermission).where(
            RolePermission.role_id == role_id
        )

        return list(
            self.db.execute(
                statement
            ).scalars().all()
        )

    def get_by_permission_id(
        self,
        permission_id: int,
    ) -> list[RolePermission]:

        statement = select(RolePermission).where(
            RolePermission.permission_id == permission_id
        )

        return list(
            self.db.execute(
                statement
            ).scalars().all()
        )

    def create(
        self,
        role_permission: RolePermission,
    ) -> RolePermission:

        self.db.add(role_permission)
        self.db.flush()

        return role_permission

    def delete(
        self,
        role_permission: RolePermission,
    ) -> None:

        self.db.delete(role_permission)
        self.db.flush()