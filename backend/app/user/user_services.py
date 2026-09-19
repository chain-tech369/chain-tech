from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.user.user_repository import UserRepository
from app.user.user_schemas import UserCreate, UserUpdate


class UserService:

    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)

    def get_all_users(self):
        return self.user_repository.get_all()

    def get_user_by_id(self, user_id: int):
        return self.user_repository.get_by_id(user_id)

    def get_user_by_email(self, email: str):
        return self.user_repository.get_by_email(email)

    def create_user(
        self,
        user_data: UserCreate,
        role_id: int,
    ):
        existing_user = self.user_repository.get_by_email(
            user_data.email
        )

        if existing_user:
            raise ValueError(
                "Email already registered"
            )

        hashed_password = hash_password(
            user_data.password
        )

        return self.user_repository.create(
            user_data=user_data,
            hashed_password=hashed_password,
            role_id=role_id,
        )

    def update_user(
        self,
        user_id: int,
        user_data: UserUpdate,
    ):
        user = self.user_repository.get_by_id(user_id)

        if not user:
            raise ValueError("User not found")

        hashed_password = None

        if user_data.password:
            hashed_password = hash_password(
                user_data.password
            )

        return self.user_repository.update(
            user=user,
            user_data=user_data,
            hashed_password=hashed_password,
        )

    def delete_user(self, user_id: int):
        user = self.user_repository.get_by_id(user_id)

        if not user:
            raise ValueError("User not found")

        return self.user_repository.delete(user)