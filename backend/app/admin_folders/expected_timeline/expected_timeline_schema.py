from pydantic import BaseModel, ConfigDict, Field


class ExpectedTimelineBase(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100,
    )

    description: str | None = None

    is_active: bool = True


class ExpectedTimelineCreate(ExpectedTimelineBase):
    pass


class ExpectedTimelineUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    description: str | None = None

    is_active: bool | None = None


class ExpectedTimelineResponse(ExpectedTimelineBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )