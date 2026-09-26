from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


if TYPE_CHECKING:
    from app.admin_folders.professional_role.professional_model import (
        ProfessionalRole,
    )
    from app.admin_folders.experience_level.experience_model import (
        Experience,
    )
    from app.admin_folders.skills.skills_model import (
        Skill,
    )


class JoinUsApplication(Base):
    __tablename__ = "join_applications"

    # =========================
    # PRIMARY KEY
    # =========================

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    # =========================
    # APPLICANT INFORMATION
    # =========================

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    phone: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    # =========================
    # PROFESSIONAL ROLE
    # =========================

    professional_role_id: Mapped[int] = mapped_column(
        ForeignKey("professional_roles.id"),
        nullable=False,
        index=True,
    )

    professional_role: Mapped["ProfessionalRole"] = relationship(
        back_populates="applications"
    )

    # =========================
    # EXPERIENCE
    # =========================

    experience_id: Mapped[int] = mapped_column(
        ForeignKey("experiences.id"),
        nullable=False,
        index=True,
    )

    experience: Mapped["Experience"] = relationship(
        back_populates="applications"
    )

    # =========================
    # SKILLS
    # =========================

    skills: Mapped[list["Skill"]] = relationship(
        secondary="application_skills",
        back_populates="applications",
    )

    # =========================
    # OTHER INFORMATION
    # =========================

    github: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    portfolio: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    linkedin: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    terms: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    # =========================
    # APPLICATION STATUS
    # =========================

    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="pending",
        index=True,
    )

    # =========================
    # TIMESTAMPS
    # =========================

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )