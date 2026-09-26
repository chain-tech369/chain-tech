from datetime import datetime

from pydantic import BaseModel, ConfigDict


# ==========================================
# SERVICE REQUIRED RESPONSE
# ==========================================

class ServiceRequiredNested(BaseModel):
    id: int
    name: str
    description: str | None = None

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# ESTIMATED BUDGET RESPONSE
# ==========================================

class EstimatedBudgetNested(BaseModel):
    id: int
    name: str
    description: str | None = None

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# EXPECTED TIMELINE RESPONSE
# ==========================================

class ExpectedTimelineNested(BaseModel):
    id: int
    name: str
    description: str | None = None

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# BASE SCHEMA
# ==========================================

class ServiceRequestBase(BaseModel):
    full_name: str
    email: str
    phone: str | None = None
    company: str | None = None

    service_required_id: int

    project_name: str | None = None
    description: str

    budget_id: int | None = None
    timeline_id: int | None = None

    additional_information: str | None = None

    terms: bool


# ==========================================
# CREATE SCHEMA
# ==========================================

class ServiceRequestCreate(ServiceRequestBase):
    pass


# ==========================================
# UPDATE SCHEMA
# ==========================================

class ServiceRequestUpdate(BaseModel):
    full_name: str | None = None
    email: str | None = None
    phone: str | None = None
    company: str | None = None

    service_required_id: int | None = None

    project_name: str | None = None
    description: str | None = None

    budget_id: int | None = None
    timeline_id: int | None = None

    additional_information: str | None = None

    terms: bool | None = None
    status: str | None = None


# ==========================================
# RESPONSE SCHEMA
# ==========================================

class ServiceRequestResponse(ServiceRequestBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

    status: str

    created_at: datetime
    updated_at: datetime

    # ======================================
    # NESTED RELATIONSHIPS
    # ======================================

    service_required: ServiceRequiredNested | None = None

    budget: EstimatedBudgetNested | None = None

    timeline: ExpectedTimelineNested | None = None