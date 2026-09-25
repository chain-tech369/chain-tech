from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


class ProfessionalRole(Base):
    __tablename__ = "professional_roles"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        unique=True,
    )

    applications: Mapped[list["JoinUsApplication"]] = relationship(
        back_populates="professional_role"
    )