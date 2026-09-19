from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db
from app.profile.profile_schema import (
    ProfileCreate,
    ProfileResponse,
    ProfileUpdate,
)
from app.profile.profile_service import ProfileService


router = APIRouter(
    prefix="/profiles",
    tags=["Profiles"],
)


@router.post(
    "/{user_id}",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_profile(
    user_id: int,
    profile_data: ProfileCreate,
    db: Session = Depends(get_db),
):
    service = ProfileService(db)

    try:
        profile = service.create_profile(
            user_id=user_id,
            profile_data=profile_data,
        )

        return profile

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get(
    "/{user_id}",
    response_model=ProfileResponse,
)
def get_profile(
    user_id: int,
    db: Session = Depends(get_db),
):
    service = ProfileService(db)

    profile = service.get_profile_by_user_id(user_id)

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )

    return profile


@router.put(
    "/{user_id}",
    response_model=ProfileResponse,
)
def update_profile(
    user_id: int,
    profile_data: ProfileUpdate,
    db: Session = Depends(get_db),
):
    service = ProfileService(db)

    try:
        profile = service.update_profile(
            user_id=user_id,
            profile_data=profile_data,
        )

        return profile

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_profile(
    user_id: int,
    db: Session = Depends(get_db),
):
    service = ProfileService(db)

    try:
        service.delete_profile(user_id)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )