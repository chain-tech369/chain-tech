from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db

from app.admin_folders.role.role_schema import (
    RoleCreate,
    RoleResponse,
    RoleUpdate,
)

from app.admin_folders.role.role_service import (
    RoleService,
)


router = APIRouter(
    prefix="/admin/roles",
    tags=["Roles"],
)


def get_role_service(
    db: Session = Depends(get_db),
) -> RoleService:
    return RoleService(db)


@router.get(
    "/",
    response_model=list[RoleResponse],
)
def get_roles(
    service: RoleService = Depends(get_role_service),
):
    return service.get_all()


@router.get(
    "/{role_id}",
    response_model=RoleResponse,
)
def get_role(
    role_id: int,
    service: RoleService = Depends(get_role_service),
):
    return service.get_by_id(role_id)


@router.post(
    "/",
    response_model=RoleResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_role(
    role_data: RoleCreate,
    service: RoleService = Depends(get_role_service),
):
    return service.create(role_data)


@router.put(
    "/{role_id}",
    response_model=RoleResponse,
)
def update_role(
    role_id: int,
    role_data: RoleUpdate,
    service: RoleService = Depends(get_role_service),
):
    return service.update(
        role_id,
        role_data,
    )


@router.delete(
    "/{role_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_role(
    role_id: int,
    service: RoleService = Depends(get_role_service),
):
    service.delete(role_id)

    return None