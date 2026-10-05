from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.authorization.role_permission.role_permission_schema import (
    RolePermissionCreate,
    RolePermissionResponse,
)
from app.authorization.role_permission.role_permission_service import (
    RolePermissionService,
)
from app.dependencies.get_db import get_db


router = APIRouter(
    prefix="/role-permissions",
    tags=["Role Permissions"],
)


# ==========================================
# Assign permission to role
# ==========================================

@router.post(
    "",
    response_model=RolePermissionResponse,
    status_code=status.HTTP_201_CREATED,
)
def assign_permission_to_role(
    data: RolePermissionCreate,
    db: Session = Depends(get_db),
):
    service = RolePermissionService(db)

    try:
        return service.create(data)

    except LookupError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        )


# ==========================================
# Get permissions for a role
# ==========================================

@router.get(
    "/role/{role_id}",
    response_model=list[RolePermissionResponse],
    status_code=status.HTTP_200_OK,
)
def get_role_permissions(
    role_id: int,
    db: Session = Depends(get_db),
):
    service = RolePermissionService(db)

    try:
        return service.get_by_role_id(role_id)

    except LookupError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


# ==========================================
# Get roles for a permission
# ==========================================

@router.get(
    "/permission/{permission_id}",
    response_model=list[RolePermissionResponse],
    status_code=status.HTTP_200_OK,
)
def get_permission_roles(
    permission_id: int,
    db: Session = Depends(get_db),
):
    service = RolePermissionService(db)

    try:
        return service.get_by_permission_id(
            permission_id
        )

    except LookupError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


# ==========================================
# Get specific role-permission
# ==========================================

@router.get(
    "/{role_id}/{permission_id}",
    response_model=RolePermissionResponse,
    status_code=status.HTTP_200_OK,
)
def get_role_permission(
    role_id: int,
    permission_id: int,
    db: Session = Depends(get_db),
):
    service = RolePermissionService(db)

    try:
        return service.get(
            role_id=role_id,
            permission_id=permission_id,
        )

    except LookupError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


# ==========================================
# Remove permission from role
# ==========================================

@router.delete(
    "/{role_id}/{permission_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_permission_from_role(
    role_id: int,
    permission_id: int,
    db: Session = Depends(get_db),
):
    service = RolePermissionService(db)

    try:
        service.delete(
            role_id=role_id,
            permission_id=permission_id,
        )

    except LookupError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )