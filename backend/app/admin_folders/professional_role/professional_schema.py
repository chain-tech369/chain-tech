from pydantic import BaseModel, ConfigDict, Field


class ProfessionalRoleBase(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=150,
    )


class ProfessionalRoleCreate(ProfessionalRoleBase):
    pass


class ProfessionalRoleUpdate(ProfessionalRoleBase):
    pass


class ProfessionalRoleResponse(ProfessionalRoleBase):
    id: int

    model_config = ConfigDict(from_attributes=True)