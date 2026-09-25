from pydantic import BaseModel, ConfigDict


class ExperienceBase(BaseModel):
    name: str


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceUpdate(ExperienceBase):
    pass


class ExperienceResponse(ExperienceBase):
    id: int

    model_config = ConfigDict(from_attributes=True)