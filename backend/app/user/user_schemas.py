from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


# -------------------------
# User Base
# -------------------------

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr


# -------------------------
# User Registration
# -------------------------

class UserCreate(UserBase):
    password: str


# -------------------------
# User Update
# -------------------------

class UserUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    password: str | None = None
    is_active: bool | None = None


# -------------------------
# User Response
# -------------------------

class UserResponse(UserBase):
    id: int
    is_active: bool
    role_id: int
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )