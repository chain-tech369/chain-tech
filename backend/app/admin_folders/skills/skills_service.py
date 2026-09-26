from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.admin_folders.skills.skills_model import Skill
from app.admin_folders.skills.skills_repository import SkillRepository
from app.admin_folders.skills.skills_schema import (
    SkillCreate,
    SkillUpdate,
)


class SkillService:

    def __init__(self, db: Session):
        self.repository = SkillRepository(db)

    # ============================================
    # GET ALL
    # ============================================

    def get_all(self) -> list[Skill]:
        return self.repository.get_all()

    # ============================================
    # GET ONE
    # ============================================

    def get_by_id(self, skill_id: int) -> Skill:

        skill = self.repository.get_by_id(skill_id)

        if not skill:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Skill not found",
            )

        return skill

    # ============================================
    # CREATE
    # ============================================

    def create(self, data: SkillCreate) -> Skill:

        existing_skill = self.repository.get_by_name(
            data.name
        )

        if existing_skill:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Skill already exists",
            )

        skill = Skill(
            name=data.name.strip(),
        )

        return self.repository.create(skill)

    # ============================================
    # UPDATE
    # ============================================

    def update(
        self,
        skill_id: int,
        data: SkillUpdate,
    ) -> Skill:

        skill = self.repository.get_by_id(skill_id)

        if not skill:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Skill not found",
            )

        existing_skill = self.repository.get_by_name(
            data.name
        )

        if (
            existing_skill
            and existing_skill.id != skill_id
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Skill name already exists",
            )

        skill.name = data.name.strip()

        return self.repository.update(skill)

    # ============================================
    # DELETE
    # ============================================

    def delete(self, skill_id: int) -> None:

        skill = self.repository.get_by_id(skill_id)

        if not skill:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Skill not found",
            )

        self.repository.delete(skill)