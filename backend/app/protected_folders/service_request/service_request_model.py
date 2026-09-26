from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class ServiceRequest(Base):
    __tablename__ = "service_requests"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # =========================
    # CUSTOMER INFORMATION
    # =========================

    full_name = Column(
        String(150),
        nullable=False,
    )

    email = Column(
        String(255),
        nullable=False,
        index=True,
    )

    phone = Column(
        String(30),
        nullable=True,
    )

    company = Column(
        String(150),
        nullable=True,
    )

    # =========================
    # SERVICE REQUIRED FOREIGN KEY
    # =========================

    service_required_id = Column(
        Integer,
        ForeignKey("service_requireds.id"),
        nullable=False,
        index=True,
    )

    # =========================
    # PROJECT INFORMATION
    # =========================

    project_name = Column(
        String(200),
        nullable=True,
    )

    description = Column(
        Text,
        nullable=False,
    )

    # =========================
    # BUDGET FOREIGN KEY
    # =========================

    budget_id = Column(
        Integer,
        ForeignKey("estimated_budgets.id"),
        nullable=True,
        index=True,
    )

    # =========================
    # TIMELINE FOREIGN KEY
    # =========================

    timeline_id = Column(
        Integer,
        ForeignKey("expected_timelines.id"),
        nullable=True,
        index=True,
    )

    # =========================
    # ADDITIONAL INFORMATION
    # =========================

    additional_information = Column(
        Text,
        nullable=True,
    )

    # =========================
    # AGREEMENT
    # =========================

    terms = Column(
        Boolean,
        nullable=False,
        default=False,
    )

    # =========================
    # STATUS
    # =========================

    status = Column(
        String(50),
        nullable=False,
        default="pending",
        index=True,
    )

    # =========================
    # TIMESTAMPS
    # =========================

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    # =========================
    # RELATIONSHIPS
    # =========================

    service_required = relationship(
        "ServiceRequired",
        back_populates="service_requests",
    )

    budget = relationship(
        "EstimatedBudget",
        back_populates="service_requests",
    )

    timeline = relationship(
        "ExpectedTimeline",
        back_populates="service_requests",
    )