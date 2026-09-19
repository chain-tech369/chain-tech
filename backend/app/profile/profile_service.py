from sqlalchemy.orm import Session

from app.profile.profile_repository import ProfileRepository
from app.profile.profile_repository import ProfileCreate, ProfileUpdate


class ProfileService:

    def __init__(self, db: Session):
        self.profile_repository = ProfileRepository(db)

    def get_profile_by_id(self, profile_id: int):
        return self.profile_repository.get_by_id(profile_id)

    def get_profile_by_user_id(self, user_id: int):
        return self.profile_repository.get_by_user_id(user_id)

    def create_profile(
        self,
        user_id: int,
        profile_data: ProfileCreate,
    ):
        # Check if user already has a profile
        existing_profile = (
            self.profile_repository.get_by_user_id(user_id)
        )

        if existing_profile:
            raise ValueError(
                "User already has a profile"
            )

        return self.profile_repository.create(
            user_id=user_id,
            profile_data=profile_data,
        )

    def update_profile(
        self,
        user_id: int,
        profile_data: ProfileUpdate,
    ):
        profile = (
            self.profile_repository.get_by_user_id(user_id)
        )

        if not profile:
            raise ValueError("Profile not found")

        return self.profile_repository.update(
            profile=profile,
            profile_data=profile_data,
        )

    def delete_profile(self, user_id: int):
        profile = (
            self.profile_repository.get_by_user_id(user_id)
        )

        if not profile:
            raise ValueError("Profile not found")

        return self.profile_repository.delete(profile)