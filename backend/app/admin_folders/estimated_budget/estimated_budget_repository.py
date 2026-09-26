from sqlalchemy import select
from sqlalchemy.orm import Session

from app.admin_folders.estimated_budget.estimated_budget_model import EstimatedBudget


class EstimatedBudgetRepository:

    @staticmethod
    def get_all(
        db: Session,
    ) -> list[EstimatedBudget]:
        statement = select(EstimatedBudget).order_by(
            EstimatedBudget.id
        )

        return list(
            db.scalars(statement).all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        estimated_budget_id: int,
    ) -> EstimatedBudget | None:
        statement = select(EstimatedBudget).where(
            EstimatedBudget.id == estimated_budget_id
        )

        return db.scalars(statement).first()

    @staticmethod
    def get_by_name(
        db: Session,
        name: str,
    ) -> EstimatedBudget | None:
        statement = select(EstimatedBudget).where(
            EstimatedBudget.name == name
        )

        return db.scalars(statement).first()

    @staticmethod
    def create(
        db: Session,
        estimated_budget: EstimatedBudget,
    ) -> EstimatedBudget:
        db.add(estimated_budget)
        db.commit()
        db.refresh(estimated_budget)

        return estimated_budget

    @staticmethod
    def update(
        db: Session,
        estimated_budget: EstimatedBudget,
        data: dict,
    ) -> EstimatedBudget:
        for field, value in data.items():
            setattr(
                estimated_budget,
                field,
                value,
            )

        db.commit()
        db.refresh(estimated_budget)

        return estimated_budget

    @staticmethod
    def delete(
        db: Session,
        estimated_budget: EstimatedBudget,
    ) -> None:
        db.delete(estimated_budget)
        db.commit()