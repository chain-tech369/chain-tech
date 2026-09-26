from sqlalchemy.orm import Session

from app.admin_folders.skills.skills_model import Skill


class SkillRepository:

    def __init__(self, db: Session):
        self.db = db

    # ============================================
    # GET ALL SKILLS
    # ============================================

    def get_all(self) -> list[Skill]:
        return (
            self.db.query(Skill)
            .order_by(Skill.id.asc())
            .all()
        )

    # ============================================
    # GET ONE SKILL
    # ============================================

    def get_by_id(self, skill_id: int) -> Skill | None:
        return (
            self.db.query(Skill)
            .filter(Skill.id == skill_id)
            .first()
        )

    # ============================================
    # GET BY NAME
    # ============================================

    def get_by_name(self, name: str) -> Skill | None:
        return (
            self.db.query(Skill)
            .filter(Skill.name == name)
            .first()
        )

    # ============================================
    # CREATE
    # ============================================

    def create(self, skill: Skill) -> Skill:
        self.db.add(skill)
        self.db.commit()
        self.db.refresh(skill)

        return skill

    # ============================================
    # UPDATE
    # ============================================

    def update(self, skill: Skill) -> Skill:
        self.db.commit()
        self.db.refresh(skill)

        return skill

    # ============================================
    # DELETE
    # ============================================

    def delete(self, skill: Skill) -> None:
        self.db.delete(skill)
        self.db.commit()