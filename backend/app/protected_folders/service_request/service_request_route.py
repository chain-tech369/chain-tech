from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db

from app.protected_folders.service_request import (
    service_request_service,
)

from app.protected_folders.service_request.service_request_schema import (
    ServiceRequestCreate,
    ServiceRequestResponse,
    ServiceRequestUpdate,
)


# ==========================================
# ROUTER
# ==========================================

router = APIRouter(
    prefix="/service-requests",
    tags=["Service Requests"],
)


# ==========================================
# CREATE SERVICE REQUEST
# ==========================================

@router.post(
    "/",
    response_model=ServiceRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_service_request(
    service_request_data: ServiceRequestCreate,
    db: Session = Depends(get_db),
):

    return service_request_service.create_service_request(
        db,
        service_request_data,
    )


# ==========================================
# GET ALL SERVICE REQUESTS
# ==========================================

@router.get(
    "/",
    response_model=list[ServiceRequestResponse],
)
def get_service_requests(
    db: Session = Depends(get_db),
):

    return service_request_service.get_service_requests(db)


# ==========================================
# GET ONE SERVICE REQUEST
# ==========================================

@router.get(
    "/{service_request_id}",
    response_model=ServiceRequestResponse,
)
def get_service_request(
    service_request_id: int,
    db: Session = Depends(get_db),
):

    return service_request_service.get_service_request(
        db,
        service_request_id,
    )


# ==========================================
# UPDATE SERVICE REQUEST
# ==========================================

@router.put(
    "/{service_request_id}",
    response_model=ServiceRequestResponse,
)
def update_service_request(
    service_request_id: int,
    service_request_data: ServiceRequestUpdate,
    db: Session = Depends(get_db),
):

    return service_request_service.update_service_request(
        db,
        service_request_id,
        service_request_data,
    )


# ==========================================
# DELETE SERVICE REQUEST
# ==========================================

@router.delete(
    "/{service_request_id}",
    status_code=status.HTTP_200_OK,
)
def delete_service_request(
    service_request_id: int,
    db: Session = Depends(get_db),
):

    return service_request_service.delete_service_request(
        db,
        service_request_id,
    )