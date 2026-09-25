from sqlalchemy.orm import Session

from app.user.user_models import User
from app.user.user_schemas import UserCreate, UserUpdate
from app.protected_folders.profile.profile_model import Profile


class UserRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(User).all()

    def get_by_id(self, user_id: int):
        return (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    def get_by_email(self, email: str):
        return (
            self.db.query(User)
            .filter(User.email == email)
            .first()
        )

    def create(
        self,
        user_data: UserCreate,
        hashed_password: str,
        role_id: int,
    ):
        # Create User
        user = User(
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            email=user_data.email,
            hashed_password=hashed_password,
            role_id=role_id,
        )

        # Create empty Profile automatically
        user.profile = Profile()

        # Save User + Profile
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user

    def update(
        self,
        user: User,
        user_data: UserUpdate,
        hashed_password: str | None = None,
    ):
        if user_data.first_name is not None:
            user.first_name = user_data.first_name

        if user_data.last_name is not None:
            user.last_name = user_data.last_name

        if user_data.email is not None:
            user.email = user_data.email

        if user_data.is_active is not None:
            user.is_active = user_data.is_active

        if hashed_password is not None:
            user.hashed_password = hashed_password

        self.db.commit()
        self.db.refresh(user)

        return user

    def delete(self, user: User):
        self.db.delete(user)
        self.db.commit()

        return True