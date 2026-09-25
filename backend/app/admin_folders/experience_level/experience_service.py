from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.admin_folders.experience_level.experience_repository import ExperienceRepository
from app.admin_folders.experience_level.experience_schema import (
    ExperienceCreate,
    ExperienceUpdate,
)


class ExperienceService:

    def __init__(self, db: Session):
        self.repository = ExperienceRepository(db)

    def create(self, data: ExperienceCreate):

        try:
            return self.repository.create(data)

        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Experience already exists.",
            )

    def get_all(self):
        return self.repository.get_all()

    def get_by_id(self, experience_id: int):

        experience = self.repository.get_by_id(experience_id)

        if not experience:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Experience not found.",
            )

        return experience

    def update(
        self,
        experience_id: int,
        data: ExperienceUpdate,
    ):

        experience = self.repository.get_by_id(experience_id)

        if not experience:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Experience not found.",
            )

        try:
            return self.repository.update(
                experience,
                data,
            )

        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Experience already exists.",
            )

    def delete(self, experience_id: int):

        experience = self.repository.get_by_id(experience_id)

        if not experience:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Experience not found.",
            )

        self.repository.delete(experience)

        return {
            "message": "Experience deleted successfully."
        }