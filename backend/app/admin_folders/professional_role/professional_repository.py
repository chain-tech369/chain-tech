from sqlalchemy import select
from sqlalchemy.orm import Session

from app.admin_folders.professional_role.professional_schema import (
    ProfessionalRoleCreate,
    ProfessionalRoleUpdate,
)

from app.admin_folders.professional_role.professional_model import (
    ProfessionalRole,
)


class ProfessionalRoleRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[ProfessionalRole]:
        statement = select(ProfessionalRole).order_by(
            ProfessionalRole.id
        )

        return list(self.db.scalars(statement).all())

    def get_by_id(
        self,
        role_id: int,
    ) -> ProfessionalRole | None:

        statement = select(ProfessionalRole).where(
            ProfessionalRole.id == role_id
        )

        return self.db.scalar(statement)

    def get_by_name(
        self,
        name: str,
    ) -> ProfessionalRole | None:

        statement = select(ProfessionalRole).where(
            ProfessionalRole.name == name
        )

        return self.db.scalar(statement)

    def create(
        self,
        role: ProfessionalRole,
    ) -> ProfessionalRole:

        self.db.add(role)
        self.db.commit()
        self.db.refresh(role)

        return role

    def update(
        self,
        role: ProfessionalRole,
    ) -> ProfessionalRole:

        self.db.commit()
        self.db.refresh(role)

        return role

    def delete(
        self,
        role: ProfessionalRole,
    ) -> None:

        self.db.delete(role)
        self.db.commit()