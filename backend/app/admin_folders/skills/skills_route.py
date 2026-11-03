from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db
from app.authorization.authorization import require_permission
from app.user.user_models import User

from app.admin_folders.skills import (
    SkillCreate,
    SkillResponse,
    SkillUpdate,
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
    current_user: User = Depends(
        require_permission("skills:read")
    ),
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
    current_user: User = Depends(
        require_permission("skills:read")
    ),
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
    current_user: User = Depends(
        require_permission("skills:create")
    ),
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
    current_user: User = Depends(
        require_permission("skills:update")
    ),
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
    current_user: User = Depends(
        require_permission("skills:delete")
    ),
):
    service.delete(skill_id)

    return None