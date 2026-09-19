from sqlalchemy.orm import Session

from app.profile.profile_model import Profile
from app.profile.profile_schema import ProfileCreate, ProfileUpdate


class ProfileRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, profile_id: int):
        return (
            self.db.query(Profile)
            .filter(Profile.id == profile_id)
            .first()
        )

    def get_by_user_id(self, user_id: int):
        return (
            self.db.query(Profile)
            .filter(Profile.user_id == user_id)
            .first()
        )

    def create(
        self,
        user_id: int,
        profile_data: ProfileCreate,
    ):
        profile = Profile(
            user_id=user_id,
            phone=profile_data.phone,
            profile_image=profile_data.profile_image,
            bio=profile_data.bio,
            address=profile_data.address,
        )

        self.db.add(profile)
        self.db.commit()
        self.db.refresh(profile)

        return profile

    def update(
        self,
        profile: Profile,
        profile_data: ProfileUpdate,
    ):
        if profile_data.phone is not None:
            profile.phone = profile_data.phone

        if profile_data.profile_image is not None:
            profile.profile_image = profile_data.profile_image

        if profile_data.bio is not None:
            profile.bio = profile_data.bio

        if profile_data.address is not None:
            profile.address = profile_data.address

        self.db.commit()
        self.db.refresh(profile)

        return profile

    def delete(self, profile: Profile):
        self.db.delete(profile)
        self.db.commit()

        return True