from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies.get_current_user import get_current_user
from app.dependencies.get_db import get_db
from app.user.user_models import User
from app.user.user_schemas import UserCreate, UserResponse, UserUpdate
from app.user.user_services import UserService


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


# ==========================================
# Get current logged-in user
# ==========================================

@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user


# ==========================================
# Create user
# ==========================================

@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    service = UserService(db)

    try:
        # For public registration, use your normal USER role ID.
        # Replace 2 with the ID of your normal user role.
        user = service.create_user(
            user_data=user_data,
            role_id=2,
        )

        return user

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


# ==========================================
# Get all users
# ==========================================

@router.get(
    "/",
    response_model=list[UserResponse],
)
def get_all_users(
    db: Session = Depends(get_db),
):
    service = UserService(db)

    users = service.get_all_users()

    return users


# ==========================================
# Get user by ID
# ==========================================

@router.get(
    "/{user_id}",
    response_model=UserResponse,
)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
):
    service = UserService(db)

    user = service.get_user_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user


# ==========================================
# Get user by email
# ==========================================

@router.get(
    "/email/{email}",
    response_model=UserResponse,
)
def get_user_by_email(
    email: str,
    db: Session = Depends(get_db),
):
    service = UserService(db)

    user = service.get_user_by_email(email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user


# ==========================================
# Update user
# ==========================================

@router.put(
    "/{user_id}",
    response_model=UserResponse,
)
def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
):
    service = UserService(db)

    try:
        user = service.update_user(
            user_id=user_id,
            user_data=user_data,
        )

        return user

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


# ==========================================
# Delete user
# ==========================================

@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
):
    service = UserService(db)

    try:
        service.delete_user(user_id)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )