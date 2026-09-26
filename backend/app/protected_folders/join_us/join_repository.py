from sqlalchemy import select
from sqlalchemy.orm import Session

from app.protected_folders.join_us.join_model import JoinUsApplication


class JoinUsApplicationRepository:

    def __init__(self, db: Session):
        self.db = db

    # =====================================================
    # GET ALL
    # =====================================================

    def get_all(self) -> list[JoinUsApplication]:
        statement = select(JoinUsApplication)

        result = self.db.execute(statement)

        return list(result.scalars().all())

    # =====================================================
    # GET BY ID
    # =====================================================

    def get_by_id(
        self,
        application_id: int,
    ) -> JoinUsApplication | None:

        statement = select(JoinUsApplication).where(
            JoinUsApplication.id == application_id
        )

        result = self.db.execute(statement)

        return result.scalar_one_or_none()

    # =====================================================
    # CREATE
    # =====================================================

    def create(
        self,
        application: JoinUsApplication,
    ) -> JoinUsApplication:

        self.db.add(application)

        self.db.commit()

        self.db.refresh(application)

        return application

    # =====================================================
    # UPDATE
    # =====================================================

    def update(
        self,
        application: JoinUsApplication,
    ) -> JoinUsApplication:

        self.db.commit()

        self.db.refresh(application)

        return application

    # =====================================================
    # DELETE
    # =====================================================

    def delete(
        self,
        application: JoinUsApplication,
    ) -> None:

        self.db.delete(application)

        self.db.commit()