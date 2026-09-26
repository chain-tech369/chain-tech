from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.admin_folders.service_required.service_required_model import (
    ServiceRequired,
)
from app.admin_folders.service_required.service_required_schema import (
    ServiceRequiredCreate,
    ServiceRequiredUpdate,
)


def get_service_requireds(
    db: Session,
) -> list[ServiceRequired]:
    statement = select(ServiceRequired).order_by(
        ServiceRequired.id
    )

    return list(
        db.scalars(statement).all()
    )


def get_service_required(
    db: Session,
    service_required_id: int,
) -> ServiceRequired | None:
    statement = select(ServiceRequired).where(
        ServiceRequired.id == service_required_id
    )

    return db.scalars(statement).first()


def get_service_required_by_name(
    db: Session,
    name: str,
) -> ServiceRequired | None:
    statement = select(ServiceRequired).where(
        ServiceRequired.name == name
    )

    return db.scalars(statement).first()


def create_service_required(
    db: Session,
    service_required_data: ServiceRequiredCreate,
) -> ServiceRequired:
    service_required = ServiceRequired(
        name=service_required_data.name,
        description=service_required_data.description,
        is_active=service_required_data.is_active,
    )

    db.add(service_required)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise

    db.refresh(service_required)

    return service_required


def update_service_required(
    db: Session,
    service_required: ServiceRequired,
    service_required_data: ServiceRequiredUpdate,
) -> ServiceRequired:
    update_data = service_required_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            service_required,
            field,
            value,
        )

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise

    db.refresh(service_required)

    return service_required


def delete_service_required(
    db: Session,
    service_required: ServiceRequired,
) -> None:
    db.delete(service_required)

    db.commit()