from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.authorization.permission.permission_schema import (
    PermissionCreate,
    PermissionResponse,
    PermissionUpdate,
)
from app.authorization.permission.permission_service import PermissionService
from app.dependencies.get_db import get_db


router = APIRouter(
    prefix="/permissions",
    tags=["Permissions"],
)


# ==========================================
# Create permission
# ==========================================

@router.post(
    "",
    response_model=PermissionResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_permission(
    data: PermissionCreate,
    db: Session = Depends(get_db),
):
    service = PermissionService(db)

    try:
        return service.create(data)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        )


# ==========================================
# Get all permissions
# ==========================================

@router.get(
    "",
    response_model=list[PermissionResponse],
    status_code=status.HTTP_200_OK,
)
def get_permissions(
    db: Session = Depends(get_db),
):
    service = PermissionService(db)

    return service.get_all()


# ==========================================
# Get permission by ID
# ==========================================

@router.get(
    "/{permission_id}",
    response_model=PermissionResponse,
    status_code=status.HTTP_200_OK,
)
def get_permission(
    permission_id: int,
    db: Session = Depends(get_db),
):
    service = PermissionService(db)

    try:
        return service.get_by_id(permission_id)

    except LookupError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


# ==========================================
# Update permission
# ==========================================

@router.patch(
    "/{permission_id}",
    response_model=PermissionResponse,
    status_code=status.HTTP_200_OK,
)
def update_permission(
    permission_id: int,
    data: PermissionUpdate,
    db: Session = Depends(get_db),
):
    service = PermissionService(db)

    try:
        return service.update(
            permission_id,
            data,
        )

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
# Delete permission
# ==========================================

@router.delete(
    "/{permission_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_permission(
    permission_id: int,
    db: Session = Depends(get_db),
):
    service = PermissionService(db)

    try:
        service.delete(permission_id)

    except LookupError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )