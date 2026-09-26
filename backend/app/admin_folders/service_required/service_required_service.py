from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.admin_folders.service_required import (
    service_required_repository,
)
from app.admin_folders.service_required.service_required_model import (
    ServiceRequired,
)
from app.admin_folders.service_required.service_required_schema import (
    ServiceRequiredCreate,
    ServiceRequiredUpdate,
)


def get_all_service_requireds(
    db: Session,
) -> list[ServiceRequired]:
    return service_required_repository.get_service_requireds(
        db
    )


def get_service_required_by_id(
    db: Session,
    service_required_id: int,
) -> ServiceRequired:
    service_required = (
        service_required_repository.get_service_required(
            db,
            service_required_id,
        )
    )

    if service_required is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service required not found",
        )

    return service_required


def create_service_required(
    db: Session,
    service_required_data: ServiceRequiredCreate,
) -> ServiceRequired:
    existing_service_required = (
        service_required_repository.get_service_required_by_name(
            db,
            service_required_data.name,
        )
    )

    if existing_service_required:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Service required already exists",
        )

    try:
        return service_required_repository.create_service_required(
            db,
            service_required_data,
        )

    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Service required already exists",
        )


def update_service_required(
    db: Session,
    service_required_id: int,
    service_required_data: ServiceRequiredUpdate,
) -> ServiceRequired:
    service_required = get_service_required_by_id(
        db,
        service_required_id,
    )

    if service_required_data.name is not None:
        existing_service_required = (
            service_required_repository.get_service_required_by_name(
                db,
                service_required_data.name,
            )
        )

        if (
            existing_service_required
            and existing_service_required.id
            != service_required_id
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Service required already exists",
            )

    try:
        return service_required_repository.update_service_required(
            db,
            service_required,
            service_required_data,
        )

    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Service required already exists",
        )


def delete_service_required(
    db: Session,
    service_required_id: int,
) -> None:
    service_required = get_service_required_by_id(
        db,
        service_required_id,
    )

    try:
        service_required_repository.delete_service_required(
            db,
            service_required,
        )

    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Cannot delete this service required "
                "because it is being used by a service request"
            ),
        )