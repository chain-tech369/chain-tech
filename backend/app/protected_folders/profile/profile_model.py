from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    phone = Column(
        String(30),
        nullable=True,
        default="",
        server_default="",
    )

    profile_image = Column(
        String(500),
        nullable=True,
        default="",
        server_default="",
    )

    bio = Column(
        Text,
        nullable=True,
        default="",
        server_default="",
    )

    address = Column(
        String(255),
        nullable=True,
        default="",
        server_default="",
    )

    user = relationship(
        "User",
        back_populates="profile",
    )