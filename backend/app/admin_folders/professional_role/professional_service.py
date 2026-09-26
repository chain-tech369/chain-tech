from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.admin_folders.professional_role.professional_model import (
    ProfessionalRole,
)

from app.admin_folders.professional_role.professional_schema import (
    ProfessionalRoleCreate,
    ProfessionalRoleUpdate,
)

from app.admin_folders.professional_role.professional_repository import (
    ProfessionalRoleRepository,
)


class ProfessionalRoleService:

    def __init__(self, db: Session):
        self.repository = ProfessionalRoleRepository(db)

    def get_all(self) -> list[ProfessionalRole]:
        return self.repository.get_all()

    def get_by_id(self, role_id: int) -> ProfessionalRole:

        role = self.repository.get_by_id(role_id)

        if not role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Professional role not found",
            )

        return role

    def create(
        self,
        data: ProfessionalRoleCreate,
    ) -> ProfessionalRole:

        existing_role = self.repository.get_by_name(
            data.name
        )

        if existing_role:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Professional role already exists",
            )

        role = ProfessionalRole(
            name=data.name.strip(),
        )

        return self.repository.create(role)

    def update(
        self,
        role_id: int,
        data: ProfessionalRoleUpdate,
    ) -> ProfessionalRole:

        role = self.get_by_id(role_id)

        existing_role = self.repository.get_by_name(
            data.name
        )

        if existing_role and existing_role.id != role_id:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Professional role already exists",
            )

        role.name = data.name.strip()

        return self.repository.update(role)

    def delete(self, role_id: int) -> None:

        role = self.get_by_id(role_id)

        self.repository.delete(role)