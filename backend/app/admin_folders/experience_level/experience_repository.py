from sqlalchemy import select
from sqlalchemy.orm import Session

from app.admin_folders.experience_level.experience_model import Experience
from app.admin_folders.experience_level.experience_schema import (
    ExperienceCreate,
    ExperienceUpdate,
)


class ExperienceRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, data: ExperienceCreate) -> Experience:
        experience = Experience(
            name=data.name
        )

        self.db.add(experience)
        self.db.commit()
        self.db.refresh(experience)

        return experience

    def get_all(self) -> list[Experience]:
        result = self.db.execute(
            select(Experience)
        )

        return list(result.scalars().all())

    def get_by_id(self, experience_id: int) -> Experience | None:
        result = self.db.execute(
            select(Experience).where(
                Experience.id == experience_id
            )
        )

        return result.scalar_one_or_none()

    def update(
        self,
        experience: Experience,
        data: ExperienceUpdate,
    ) -> Experience:

        experience.name = data.name

        self.db.commit()
        self.db.refresh(experience)

        return experience

    def delete(self, experience: Experience) -> None:
        self.db.delete(experience)
        self.db.commit()