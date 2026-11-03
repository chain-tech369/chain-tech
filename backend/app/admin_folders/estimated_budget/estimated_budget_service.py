from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session


from app.admin_folders.estimated_budget.estimated_budget_repository import (
    EstimatedBudgetRepository,
)
from app.admin_folders.estimated_budget import (
    EstimatedBudgetCreate,
    EstimatedBudgetUpdate,
    EstimatedBudget,
    EstimatedBudgetRepository,

)


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
        estimated_budget = EstimatedBudgetRepository.get_by_id(
            db,
            estimated_budget_id,
        )

        if estimated_budget is None:
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

        existing_budget = EstimatedBudgetRepository.get_by_name(
            db,
            data.name,
        )

        if existing_budget is not None:
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
            EstimatedBudgetRepository.create(
                db,
                estimated_budget,
            )

            db.commit()
            db.refresh(estimated_budget)

        except IntegrityError:
            db.rollback()

            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Estimated budget with this name already exists.",
            )

        except Exception:
            db.rollback()

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create estimated budget.",
            )

        return estimated_budget

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
            existing_budget = EstimatedBudgetRepository.get_by_name(
                db,
                update_data["name"],
            )

            if (
                existing_budget is not None
                and existing_budget.id != estimated_budget_id
            ):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Estimated budget with this name already exists.",
                )

        try:
            EstimatedBudgetRepository.update(
                db,
                estimated_budget,
                update_data,
            )

            db.commit()
            db.refresh(estimated_budget)

        except IntegrityError:
            db.rollback()

            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Estimated budget with this name already exists.",
            )

        except Exception:
            db.rollback()

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update estimated budget.",
            )

        return estimated_budget

    @staticmethod
    def delete(
        db: Session,
        estimated_budget_id: int,
    ) -> None:

        estimated_budget = EstimatedBudgetService.get_by_id(
            db,
            estimated_budget_id,
        )

        try:
            EstimatedBudgetRepository.delete(
                db,
                estimated_budget,
            )

            db.commit()

        except IntegrityError:
            db.rollback()

            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=(
                    "Cannot delete this estimated budget because "
                    "it is being used by service requests."
                ),
            )

        except Exception:
            db.rollback()

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete estimated budget.",
            )