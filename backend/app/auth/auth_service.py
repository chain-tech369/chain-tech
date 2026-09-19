from sqlalchemy.orm import Session

from app.auth.auth_schema import RegisterRequest
from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.user.user_repository import UserRepository


class AuthService:
    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)

    def register(self, user_data: RegisterRequest):
        existing_user = self.user_repository.get_by_email(
            user_data.email
        )

        if existing_user:
            raise ValueError("Email already registered")

        hashed_password = hash_password(
            user_data.password
        )

        user = self.user_repository.create(
            user_data=user_data,
            hashed_password=hashed_password,
            role_id=2,
        )

        return user

    def login(self, email: str, password: str):
        user = self.user_repository.get_by_email(email)

        if not user:
            raise ValueError("Invalid email or password")

        if not user.is_active:
            raise ValueError("User account is inactive")

        password_valid = verify_password(
            password,
            user.hashed_password,
        )

        if not password_valid:
            raise ValueError("Invalid email or password")

        access_token = create_access_token(user.id)

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }