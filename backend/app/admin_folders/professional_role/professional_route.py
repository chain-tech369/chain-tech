from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db

from app.admin_folders.professional_role.professional_schema import (
    ProfessionalRoleCreate,
    ProfessionalRoleResponse,
    ProfessionalRoleUpdate,
)

from app.admin_folders.professional_role.professional_service import (
    ProfessionalRoleService,
)


router = APIRouter(
    prefix="/admin/professional-roles",
    tags=["Professional Roles"],
)


def get_professional_role_service(
    db: Session = Depends(get_db),
) -> ProfessionalRoleService:
    return ProfessionalRoleService(db)


@router.get(
    "/",
    response_model=list[ProfessionalRoleResponse],
)
def get_professional_roles(
    service: ProfessionalRoleService = Depends(
        get_professional_role_service
    ),
):
    return service.get_all()


@router.get(
    "/{role_id}",
    response_model=ProfessionalRoleResponse,
)
def get_professional_role(
    role_id: int,
    service: ProfessionalRoleService = Depends(
        get_professional_role_service
    ),
):
    return service.get_by_id(role_id)


@router.post(
    "/",
    response_model=ProfessionalRoleResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_professional_role(
    data: ProfessionalRoleCreate,
    service: ProfessionalRoleService = Depends(
        get_professional_role_service
    ),
):
    return service.create(data)


@router.put(
    "/{role_id}",
    response_model=ProfessionalRoleResponse,
)
def update_professional_role(
    role_id: int,
    data: ProfessionalRoleUpdate,
    service: ProfessionalRoleService = Depends(
        get_professional_role_service
    ),
):
    return service.update(role_id, data)


@router.delete(
    "/{role_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_professional_role(
    role_id: int,
    service: ProfessionalRoleService = Depends(
        get_professional_role_service
    ),
):
    service.delete(role_id)