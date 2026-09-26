from pydantic import BaseModel, ConfigDict, Field


class ServiceRequiredBase(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100,
    )

    description: str | None = None

    is_active: bool = True


class ServiceRequiredCreate(ServiceRequiredBase):
    pass


class ServiceRequiredUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    description: str | None = None

    is_active: bool | None = None


class ServiceRequiredResponse(ServiceRequiredBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )