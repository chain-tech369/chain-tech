from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db
from app.authorization.authorization import require_permission
from app.user.user_models import User

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
    current_user: User = Depends(
        require_permission("professional_role:read")
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
    current_user: User = Depends(
        require_permission("professional_role:read")
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
    current_user: User = Depends(
        require_permission("professional_role:create")
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
    current_user: User = Depends(
        require_permission("professional_role:update")
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
    current_user: User = Depends(
        require_permission("professional_role:delete")
    ),
):
    service.delete(role_id)