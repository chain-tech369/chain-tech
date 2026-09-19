from pydantic import BaseModel, ConfigDict


# -------------------------
# Profile Base
# -------------------------

class ProfileBase(BaseModel):
    phone: str | None = None
    profile_image: str | None = None
    bio: str | None = None
    address: str | None = None


# -------------------------
# Profile Create
# -------------------------

class ProfileCreate(ProfileBase):
    pass


# -------------------------
# Profile Update
# -------------------------

class ProfileUpdate(BaseModel):
    phone: str | None = None
    profile_image: str | None = None
    bio: str | None = None
    address: str | None = None


# -------------------------
# Profile Response
# -------------------------

class ProfileResponse(ProfileBase):
    id: int
    user_id: int

    model_config = ConfigDict(
        from_attributes=True
    )