from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.admin_folders.professional_role.professional_model import (
    ProfessionalRole,
)

from app.admin_folders.experience_level.experience_model import (
    Experience,
)

from app.admin_folders.skills.skills_model import (
    Skill,
)

from app.protected_folders.join_us.join_model import (
    JoinUsApplication,
)

from app.protected_folders.join_us.join_repository import (
    JoinUsApplicationRepository,
)

from app.protected_folders.join_us.join_schema import (
    JoinUsApplicationCreate,
    JoinUsApplicationUpdate,
)


class JoinUsApplicationService:

    def __init__(self, db: Session):
        self.db = db
        self.repository = JoinUsApplicationRepository(db)

    # =====================================================
    # GET ALL APPLICATIONS
    # =====================================================

    def get_all(self) -> list[JoinUsApplication]:

        return self.repository.get_all()

    # =====================================================
    # GET APPLICATION BY ID
    # =====================================================

    def get_by_id(
        self,
        application_id: int,
    ) -> JoinUsApplication:

        application = self.repository.get_by_id(
            application_id
        )

        if not application:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Join Us application not found.",
            )

        return application

    # =====================================================
    # VALIDATE PROFESSIONAL ROLE
    # =====================================================

    def _get_professional_role(
        self,
        professional_role_id: int,
    ) -> ProfessionalRole:

        statement = select(ProfessionalRole).where(
            ProfessionalRole.id == professional_role_id
        )

        result = self.db.execute(statement)

        professional_role = result.scalar_one_or_none()

        if not professional_role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Professional role not found.",
            )

        return professional_role

    # =====================================================
    # VALIDATE EXPERIENCE
    # =====================================================

    def _get_experience(
        self,
        experience_id: int,
    ) -> Experience:

        statement = select(Experience).where(
            Experience.id == experience_id
        )

        result = self.db.execute(statement)

        experience = result.scalar_one_or_none()

        if not experience:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Experience level not found.",
            )

        return experience

    # =====================================================
    # GET SKILLS
    # =====================================================

    def _get_skills(
        self,
        skill_ids: list[int],
    ) -> list[Skill]:

        if not skill_ids:
            return []

        statement = select(Skill).where(
            Skill.id.in_(skill_ids)
        )

        result = self.db.execute(statement)

        skills = list(result.scalars().all())

        found_skill_ids = {
            skill.id
            for skill in skills
        }

        missing_skill_ids = set(skill_ids) - found_skill_ids

        if missing_skill_ids:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=(
                    "One or more skills were not found: "
                    f"{sorted(missing_skill_ids)}"
                ),
            )

        return skills

    # =====================================================
    # CREATE APPLICATION
    # =====================================================

    def create(
        self,
        data: JoinUsApplicationCreate,
    ) -> JoinUsApplication:

        # Validate professional role
        self._get_professional_role(
            data.professional_role_id
        )

        # Validate experience
        self._get_experience(
            data.experience_id
        )

        # Get actual Skill objects
        skills = self._get_skills(
            data.skills
        )

        application = JoinUsApplication(
            name=data.name,
            email=data.email,
            phone=data.phone,
            professional_role_id=data.professional_role_id,
            experience_id=data.experience_id,
            github=data.github,
            portfolio=data.portfolio,
            linkedin=data.linkedin,
            message=data.message,
            terms=data.terms,
        )

        # Connect Skill objects
        application.skills = skills

        return self.repository.create(
            application
        )

    # =====================================================
    # UPDATE APPLICATION
    # =====================================================

    def update(
        self,
        application_id: int,
        data: JoinUsApplicationUpdate,
    ) -> JoinUsApplication:

        application = self.get_by_id(
            application_id
        )

        update_data = data.model_dump(
            exclude_unset=True
        )

        # -----------------------------------------------
        # PROFESSIONAL ROLE
        # -----------------------------------------------

        if "professional_role_id" in update_data:

            self._get_professional_role(
                update_data["professional_role_id"]
            )

            application.professional_role_id = (
                update_data["professional_role_id"]
            )

        # -----------------------------------------------
        # EXPERIENCE
        # -----------------------------------------------

        if "experience_id" in update_data:

            self._get_experience(
                update_data["experience_id"]
            )

            application.experience_id = (
                update_data["experience_id"]
            )

        # -----------------------------------------------
        # SKILLS
        # -----------------------------------------------

        if "skills" in update_data:

            skills = self._get_skills(
                update_data["skills"]
            )

            application.skills = skills

        # -----------------------------------------------
        # OTHER FIELDS
        # -----------------------------------------------

        simple_fields = [
            "name",
            "email",
            "phone",
            "github",
            "portfolio",
            "linkedin",
            "message",
            "terms",
        ]

        for field in simple_fields:

            if field in update_data:

                setattr(
                    application,
                    field,
                    update_data[field],
                )

        return self.repository.update(
            application
        )

    # =====================================================
    # DELETE APPLICATION
    # =====================================================

    def delete(
        self,
        application_id: int,
    ) -> None:

        application = self.get_by_id(
            application_id
        )

        self.repository.delete(
            application
        )