from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.authorization.authorization import require_permission
from app.admin_folders.estimated_budget import (
    EstimatedBudgetCreate,
    EstimatedBudgetResponse,
    EstimatedBudgetUpdate,
    EstimatedBudgetService,
)

from app.dependencies.get_db import get_db
from app.user.user_models import User


router = APIRouter(
    prefix="/admin/estimated-budgets",
    tags=["Estimated Budgets"],
)


@router.get(
    "/",
    response_model=list[EstimatedBudgetResponse],
)
def get_estimated_budgets(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("estimated_budget:read")
    ),
):
    return EstimatedBudgetService.get_all(db)


@router.get(
    "/{estimated_budget_id}",
    response_model=EstimatedBudgetResponse,
)
def get_estimated_budget(
    estimated_budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("estimated_budget:read")
    ),
):
    return EstimatedBudgetService.get_by_id(
        db,
        estimated_budget_id,
    )


@router.post(
    "/",
    response_model=EstimatedBudgetResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_estimated_budget(
    data: EstimatedBudgetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("estimated_budget:create")
    ),
):
    return EstimatedBudgetService.create(
        db,
        data,
    )


@router.patch(
    "/{estimated_budget_id}",
    response_model=EstimatedBudgetResponse,
)
def update_estimated_budget(
    estimated_budget_id: int,
    data: EstimatedBudgetUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("estimated_budget:update")
    ),
):
    return EstimatedBudgetService.update(
        db,
        estimated_budget_id,
        data,
    )


@router.delete(
    "/{estimated_budget_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_estimated_budget(
    estimated_budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("estimated_budget:delete")
    ),
):
    EstimatedBudgetService.delete(
        db,
        estimated_budget_id,
    )

    return None