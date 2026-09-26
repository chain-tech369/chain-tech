from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.admin_folders.service_required.service_required_schema import (
    ServiceRequiredCreate,
    ServiceRequiredResponse,
    ServiceRequiredUpdate,
)
from app.admin_folders.service_required import (
    service_required_service,
)
from app.dependencies.get_db import get_db


router = APIRouter(
    prefix="/admin/service-requireds",
    tags=["Service Required"],
)


@router.get(
    "/",
    response_model=list[ServiceRequiredResponse],
    status_code=status.HTTP_200_OK,
)
def get_service_requireds(
    db: Session = Depends(get_db),
):
    return service_required_service.get_all_service_requireds(
        db
    )


@router.get(
    "/{service_required_id}",
    response_model=ServiceRequiredResponse,
    status_code=status.HTTP_200_OK,
)
def get_service_required(
    service_required_id: int,
    db: Session = Depends(get_db),
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
):
    service_required_service.delete_service_required(
        db,
        service_required_id,
    )

    return None