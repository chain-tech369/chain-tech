from pydantic import BaseModel, ConfigDict, Field


# ============================================
# CREATE
# ============================================

class SkillCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=150,
    )


# ============================================
# UPDATE
# ============================================

class SkillUpdate(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=150,
    )


# ============================================
# RESPONSE
# ============================================

class SkillResponse(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(
        from_attributes=True,
    )