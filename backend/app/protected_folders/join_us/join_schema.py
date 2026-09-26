from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# ---------------------------------------------------------
# APPLICATION STATUS
# ---------------------------------------------------------

class ApplicationStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


# ---------------------------------------------------------
# PROFESSIONAL ROLE RESPONSE
# ---------------------------------------------------------

class ProfessionalRoleResponse(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(
        from_attributes=True
    )


# ---------------------------------------------------------
# EXPERIENCE RESPONSE
# ---------------------------------------------------------

class ExperienceResponse(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(
        from_attributes=True
    )


# ---------------------------------------------------------
# SKILL RESPONSE
# ---------------------------------------------------------

class SkillResponse(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(
        from_attributes=True
    )


# ---------------------------------------------------------
# BASE SCHEMA
# ---------------------------------------------------------

class JoinUsApplicationBase(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=150,
    )

    email: EmailStr

    phone: str = Field(
        min_length=5,
        max_length=30,
    )

    professional_role_id: int

    experience_id: int

    github: str | None = Field(
        default=None,
        max_length=500,
    )

    portfolio: str | None = Field(
        default=None,
        max_length=500,
    )

    linkedin: str | None = Field(
        default=None,
        max_length=500,
    )

    message: str

    terms: bool


# ---------------------------------------------------------
# CREATE SCHEMA
# ---------------------------------------------------------

class JoinUsApplicationCreate(JoinUsApplicationBase):
    skills: list[int] = Field(
        min_length=1
    )


# ---------------------------------------------------------
# UPDATE SCHEMA
# ---------------------------------------------------------

class JoinUsApplicationUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    email: EmailStr | None = None

    phone: str | None = Field(
        default=None,
        min_length=5,
        max_length=30,
    )

    professional_role_id: int | None = None

    experience_id: int | None = None

    skills: list[int] | None = None

    github: str | None = Field(
        default=None,
        max_length=500,
    )

    portfolio: str | None = Field(
        default=None,
        max_length=500,
    )

    linkedin: str | None = Field(
        default=None,
        max_length=500,
    )

    message: str | None = None

    terms: bool | None = None


# ---------------------------------------------------------
# ADMIN STATUS UPDATE SCHEMA
# ---------------------------------------------------------

class JoinUsApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus


# ---------------------------------------------------------
# RESPONSE SCHEMA
# ---------------------------------------------------------

class JoinUsApplicationResponse(BaseModel):
    id: int

    name: str

    email: EmailStr

    phone: str

    professional_role_id: int

    professional_role: ProfessionalRoleResponse

    experience_id: int

    experience: ExperienceResponse

    skills: list[SkillResponse]

    github: str | None

    portfolio: str | None

    linkedin: str | None

    message: str

    terms: bool

    # -----------------------------------------------------
    # APPLICATION STATUS
    # -----------------------------------------------------

    status: ApplicationStatus

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )