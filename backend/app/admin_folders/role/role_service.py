from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.admin_folders.role.role_model import Role
from app.admin_folders.role.role_repository import RoleRepository
from app.admin_folders.role.role_schema import (
    RoleCreate,
    RoleUpdate,
)


class RoleService:
    def __init__(self, db: Session):
        self.repository = RoleRepository(db)

    def get_all(self) -> list[Role]:
        return self.repository.get_all()

    def get_by_id(self, role_id: int) -> Role:
        role = self.repository.get_by_id(role_id)

        if not role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Role not found",
            )

        return role

    def create(self, role_data: RoleCreate) -> Role:
        existing_role = self.repository.get_by_name(
            role_data.name
        )

        if existing_role:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Role already exists",
            )

        role = Role(
            name=role_data.name,
            description=role_data.description,
        )

        return self.repository.create(role)

    def update(
        self,
        role_id: int,
        role_data: RoleUpdate,
    ) -> Role:
        role = self.get_by_id(role_id)

        if role_data.name is not None:
            existing_role = self.repository.get_by_name(
                role_data.name
            )

            if (
                existing_role
                and existing_role.id != role.id
            ):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Role name already exists",
                )

            role.name = role_data.name

        if role_data.description is not None:
            role.description = role_data.description

        return self.repository.update(role)

    def delete(self, role_id: int) -> None:
        role = self.get_by_id(role_id)

        self.repository.delete(role)