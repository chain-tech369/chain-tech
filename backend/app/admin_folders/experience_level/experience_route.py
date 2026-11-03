from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db
from app.authorization.authorization import require_permission
from app.user.user_models import User
from app.admin_folders.experience_level.experience_schema import (
    ExperienceCreate,
    ExperienceResponse,
    ExperienceUpdate,
)
from app.admin_folders.experience_level.experience_service import ExperienceService


router = APIRouter(
    prefix="/admin/experiences",
    tags=["Experiences"],
)


@router.post(
    "/",
    response_model=ExperienceResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_experience(
    data: ExperienceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("experience_level:create")
    ),
):

    service = ExperienceService(db)

    return service.create(data)


@router.get(
    "/",
    response_model=list[ExperienceResponse],
)
def get_experiences(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("experience_level:read")
    ),
):

    service = ExperienceService(db)

    return service.get_all()


@router.get(
    "/{experience_id}",
    response_model=ExperienceResponse,
)
def get_experience(
    experience_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("experience_level:read")
    ),
):

    service = ExperienceService(db)

    return service.get_by_id(experience_id)


@router.put(
    "/{experience_id}",
    response_model=ExperienceResponse,
)
def update_experience(
    experience_id: int,
    data: ExperienceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("experience_level:update")
    ),
):

    service = ExperienceService(db)

    return service.update(
        experience_id,
        data,
    )


@router.delete(
    "/{experience_id}",
)
def delete_experience(
    experience_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_permission("experience_level:delete")
    ),
):

    service = ExperienceService(db)

    return service.delete(experience_id)