from sqlalchemy.orm import Session

from app.protected_folders.service_request.service_request_model import (
    ServiceRequest,
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
) -> ServiceRequest:

    service_request = ServiceRequest(
        **service_request_data.model_dump()
    )

    db.add(service_request)
    db.commit()
    db.refresh(service_request)

    return service_request


# ==========================================
# GET ALL
# ==========================================

def get_service_requests(
    db: Session,
) -> list[ServiceRequest]:

    return (
        db.query(ServiceRequest)
        .order_by(ServiceRequest.created_at.desc())
        .all()
    )


# ==========================================
# GET ONE
# ==========================================

def get_service_request(
    db: Session,
    service_request_id: int,
) -> ServiceRequest | None:

    return (
        db.query(ServiceRequest)
        .filter(ServiceRequest.id == service_request_id)
        .first()
    )


# ==========================================
# UPDATE
# ==========================================

def update_service_request(
    db: Session,
    service_request: ServiceRequest,
    service_request_data: ServiceRequestUpdate,
) -> ServiceRequest:

    update_data = service_request_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(service_request, field, value)

    db.commit()
    db.refresh(service_request)

    return service_request


# ==========================================
# DELETE
# ==========================================

def delete_service_request(
    db: Session,
    service_request: ServiceRequest,
) -> None:

    db.delete(service_request)
    db.commit()