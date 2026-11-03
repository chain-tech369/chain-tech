from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session


from app.admin_folders.service_required import (
    ServiceRequiredCreate,
    ServiceRequiredUpdate,
    ServiceRequired,
    ServiceRequiredRepository,
)


class ServiceRequiredService:

    def __init__(self) -> None:
        self.repository = ServiceRequiredRepository()

    def get_all_service_requireds(
        self,
        db: Session,
    ) -> list[ServiceRequired]:
        return self.repository.get_service_requireds(db)

    def get_service_required_by_id(
        self,
        db: Session,
        service_required_id: int,
    ) -> ServiceRequired:
        service_required = self.repository.get_service_required(
            db,
            service_required_id,
        )

        if service_required is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Service required not found",
            )

        return service_required

    def create_service_required(
        self,
        db: Session,
        service_required_data: ServiceRequiredCreate,
    ) -> ServiceRequired:
        existing_service_required = (
            self.repository.get_service_required_by_name(
                db,
                service_required_data.name,
            )
        )

        if existing_service_required:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Service required already exists",
            )

        try:
            return self.repository.create_service_required(
                db,
                service_required_data,
            )
        except IntegrityError as exc:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Service required already exists",
            ) from exc

    def update_service_required(
        self,
        db: Session,
        service_required_id: int,
        service_required_data: ServiceRequiredUpdate,
    ) -> ServiceRequired:
        service_required = self.get_service_required_by_id(
            db,
            service_required_id,
        )

        update_data = service_required_data.model_dump(
            exclude_unset=True,
        )

        if "name" in update_data:
            existing_service_required = (
                self.repository.get_service_required_by_name(
                    db,
                    update_data["name"],
                )
            )

            if (
                existing_service_required is not None
                and existing_service_required.id != service_required_id
            ):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Service required already exists",
                )

        try:
            return self.repository.update_service_required(
                db,
                service_required,
                service_required_data,
            )
        except IntegrityError as exc:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Service required already exists",
            ) from exc

    def delete_service_required(
        self,
        db: Session,
        service_required_id: int,
    ) -> None:
        service_required = self.get_service_required_by_id(
            db,
            service_required_id,
        )

        try:
            self.repository.delete_service_required(
                db,
                service_required,
            )
        except IntegrityError as exc:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=(
                    "Cannot delete this service required because "
                    "it is being used by a service request"
                ),
            ) from exc