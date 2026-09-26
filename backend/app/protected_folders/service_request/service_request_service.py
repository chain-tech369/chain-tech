from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.protected_folders.service_request import (
    service_request_repository,
)

from app.protected_folders.service_request.service_request_schema import (
    ServiceRequestCreate,
    ServiceRequestUpdate,
)


# ==========================================
# CREATE
# ==========================================

def create_service_request(
    db: Session,
    service_request_data: ServiceRequestCreate,
):

    if not service_request_data.terms:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must agree to the terms and conditions.",
        )

    return service_request_repository.create_service_request(
        db,
        service_request_data,
    )


# ==========================================
# GET ALL
# ==========================================

def get_service_requests(
    db: Session,
):

    return service_request_repository.get_service_requests(db)


# ==========================================
# GET ONE
# ==========================================

def get_service_request(
    db: Session,
    service_request_id: int,
):

    service_request = (
        service_request_repository.get_service_request(
            db,
            service_request_id,
        )
    )

    if service_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service request not found.",
        )

    return service_request


# ==========================================
# UPDATE
# ==========================================

def update_service_request(
    db: Session,
    service_request_id: int,
    service_request_data: ServiceRequestUpdate,
):

    service_request = (
        service_request_repository.get_service_request(
            db,
            service_request_id,
        )
    )

    if service_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service request not found.",
        )

    return service_request_repository.update_service_request(
        db,
        service_request,
        service_request_data,
    )


# ==========================================
# DELETE
# ==========================================

def delete_service_request(
    db: Session,
    service_request_id: int,
):

    service_request = (
        service_request_repository.get_service_request(
            db,
            service_request_id,
        )
    )

    if service_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service request not found.",
        )

    service_request_repository.delete_service_request(
        db,
        service_request,
    )

    return {
        "message": "Service request deleted successfully."
    }