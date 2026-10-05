from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.authorization.permission.permission_model import Permission


class PermissionRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(
        self,
        permission_id: int,
    ) -> Permission | None:
        statement = select(Permission).where(
            Permission.id == permission_id
        )

        return self.db.execute(
            statement
        ).scalar_one_or_none()

    def get_by_name(
        self,
        name: str,
    ) -> Permission | None:
        statement = select(Permission).where(
            Permission.name == name
        )

        return self.db.execute(
            statement
        ).scalar_one_or_none()

    def get_all(self) -> list[Permission]:
        statement = select(Permission).order_by(
            Permission.id
        )

        return list(
            self.db.execute(
                statement
            ).scalars().all()
        )

    def create(
        self,
        permission: Permission,
    ) -> Permission:
        self.db.add(permission)
        self.db.flush()
        self.db.refresh(permission)

        return permission

    def update(
        self,
        permission: Permission,
        data: dict[str, Any],
    ) -> Permission:

        for field, value in data.items():
            setattr(permission, field, value)

        self.db.flush()
        self.db.refresh(permission)

        return permission

    def delete(
        self,
        permission: Permission,
    ) -> None:
        self.db.delete(permission)
        self.db.flush()