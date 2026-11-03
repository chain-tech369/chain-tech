from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.admin_folders.service_required import (
    ServiceRequiredCreate,
    ServiceRequiredResponse,
    ServiceRequiredUpdate,
     ServiceRequiredService,
)

from app.dependencies.get_db import get_db
from app.authorization.authorization import require_permission
from app.user.user_models import User


router = APIRouter(
    prefix="/admin/service-requireds",
    tags=["Service Required"],
)

service_required_service = ServiceRequiredService()


@router.get(
    "/",
    response_model=list[ServiceRequiredResponse],
    status_code=status.HTTP_200_OK,
)
def get_service_requireds(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("service_required:read")
    ),
):
    return service_required_service.get_all_service_requireds(db)


@router.get(
    "/{service_required_id}",
    response_model=ServiceRequiredResponse,
    status_code=status.HTTP_200_OK,
)
def get_service_required(
    service_required_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("service_required:read")
    ),
):
    return service_required_service.get_service_required_by_id(
        db,
        service_required_id,
    )


@router.post(
    "/",
    response_model=ServiceRequiredResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_service_required(
    service_required_data: ServiceRequiredCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("service_required:create")
    ),
):
    return service_required_service.create_service_required(
        db,
        service_required_data,
    )


@router.patch(
    "/{service_required_id}",
    response_model=ServiceRequiredResponse,
    status_code=status.HTTP_200_OK,
)
def update_service_required(
    service_required_id: int,
    service_required_data: ServiceRequiredUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("service_required:update")
    ),
):
    return service_required_service.update_service_required(
        db,
        service_required_id,
        service_required_data,
    )


@router.delete(
    "/{service_required_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_service_required(
    service_required_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("service_required:delete")
    ),
):
    service_required_service.delete_service_required(
        db,
        service_required_id,
    )

    return None