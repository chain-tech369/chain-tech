from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


application_skills = Table(
    "application_skills",
    Base.metadata,

    Column(
        "application_id",
        ForeignKey("join_applications.id"),
        primary_key=True,
    ),

    Column(
        "skill_id",
        ForeignKey("skills.id"),
        primary_key=True,
    ),
)


class Skill(Base):
    __tablename__ = "skills"

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
        secondary=application_skills,
        back_populates="skills",
    )