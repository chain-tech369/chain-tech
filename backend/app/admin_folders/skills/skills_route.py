from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db

from app.admin_folders.skills.skills_schema import (
    SkillCreate,
    SkillResponse,
    SkillUpdate,
)

from app.admin_folders.skills.skills_service import (
    SkillService,
)


router = APIRouter(
    prefix="/admin/skills",
    tags=["Skills"],
)


# ============================================
# SERVICE DEPENDENCY
# ============================================

def get_skill_service(
    db: Session = Depends(get_db),
) -> SkillService:
    return SkillService(db)


# ============================================
# GET ALL SKILLS
# ============================================

@router.get(
    "/",
    response_model=list[SkillResponse],
)
def get_skills(
    service: SkillService = Depends(get_skill_service),
):
    return service.get_all()


# ============================================
# GET ONE SKILL
# ============================================

@router.get(
    "/{skill_id}",
    response_model=SkillResponse,
)
def get_skill(
    skill_id: int,
    service: SkillService = Depends(get_skill_service),
):
    return service.get_by_id(skill_id)


# ============================================
# CREATE SKILL
# ============================================

@router.post(
    "/",
    response_model=SkillResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_skill(
    data: SkillCreate,
    service: SkillService = Depends(get_skill_service),
):
    return service.create(data)


# ============================================
# UPDATE SKILL
# ============================================

@router.put(
    "/{skill_id}",
    response_model=SkillResponse,
)
def update_skill(
    skill_id: int,
    data: SkillUpdate,
    service: SkillService = Depends(get_skill_service),
):
    return service.update(
        skill_id,
        data,
    )


# ============================================
# DELETE SKILL
# ============================================

@router.delete(
    "/{skill_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_skill(
    skill_id: int,
    service: SkillService = Depends(get_skill_service),
):
    service.delete(skill_id)

    return None