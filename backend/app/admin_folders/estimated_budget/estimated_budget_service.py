from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.admin_folders.estimated_budget.estimated_budget_repository import (
    EstimatedBudgetRepository,
)
from app.admin_folders.estimated_budget.estimated_budget_schema import (
    EstimatedBudgetCreate,
    EstimatedBudgetUpdate,
)
from app.admin_folders.estimated_budget.estimated_budget_model import EstimatedBudget


class EstimatedBudgetService:

    @staticmethod
    def get_all(
        db: Session,
    ) -> list[EstimatedBudget]:
        return EstimatedBudgetRepository.get_all(db)

    @staticmethod
    def get_by_id(
        db: Session,
        estimated_budget_id: int,
    ) -> EstimatedBudget:
        estimated_budget = (
            EstimatedBudgetRepository.get_by_id(
                db,
                estimated_budget_id,
            )
        )

        if not estimated_budget:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Estimated budget not found.",
            )

        return estimated_budget

    @staticmethod
    def create(
        db: Session,
        data: EstimatedBudgetCreate,
    ) -> EstimatedBudget:
        existing_budget = (
            EstimatedBudgetRepository.get_by_name(
                db,
                data.name,
            )
        )

        if existing_budget:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Estimated budget with this name already exists.",
            )

        estimated_budget = EstimatedBudget(
            name=data.name,
            description=data.description,
            is_active=data.is_active,
        )

        try:
            return EstimatedBudgetRepository.create(
                db,
                estimated_budget,
            )

        except IntegrityError:
            db.rollback()

            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Estimated budget with this name already exists.",
            )

    @staticmethod
    def update(
        db: Session,
        estimated_budget_id: int,
        data: EstimatedBudgetUpdate,
    ) -> EstimatedBudget:
        estimated_budget = EstimatedBudgetService.get_by_id(
            db,
            estimated_budget_id,
        )

        update_data = data.model_dump(
            exclude_unset=True
        )

        if "name" in update_data:
            existing_budget = (
                EstimatedBudgetRepository.get_by_name(
                    db,
                    update_data["name"],
                )
            )

            if (
                existing_budget
                and existing_budget.id != estimated_budget_id
            ):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Estimated budget with this name already exists.",
                )

        try:
            return EstimatedBudgetRepository.update(
                db,
                estimated_budget,
                update_data,
            )

        except IntegrityError:
            db.rollback()

            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Estimated budget with this name already exists.",
            )

    @staticmethod
    def delete(
        db: Session,
        estimated_budget_id: int,
    ) -> None:
        estimated_budget = EstimatedBudgetService.get_by_id(
            db,
            estimated_budget_id,
        )

        if estimated_budget.service_requests:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=(
                    "Cannot delete this estimated budget because "
                    "it is being used by service requests."
                ),
            )

        EstimatedBudgetRepository.delete(
            db,
            estimated_budget,
        )