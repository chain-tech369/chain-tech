from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.admin_folders.expected_timeline.expected_timeline_model import (
    ExpectedTimeline,
)

from app.admin_folders.expected_timeline.expected_timeline_repository import (
    ExpectedTimelineRepository,
)

from app.admin_folders.expected_timeline.expected_timeline_schema import (
    ExpectedTimelineCreate,
    ExpectedTimelineUpdate,
)


class ExpectedTimelineService:
    def __init__(self, db: Session):
        self.repository = ExpectedTimelineRepository(db)

    def get_all(self) -> list[ExpectedTimeline]:
        return self.repository.get_all()

    def get_by_id(self, timeline_id: int) -> ExpectedTimeline:
        timeline = self.repository.get_by_id(timeline_id)

        if not timeline:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Expected timeline not found",
            )

        return timeline

    def create(
        self,
        data: ExpectedTimelineCreate,
    ) -> ExpectedTimeline:

        existing_timeline = self.repository.get_by_name(
            data.name
        )

        if existing_timeline:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Expected timeline with this name already exists",
            )

        timeline = ExpectedTimeline(
            name=data.name,
            description=data.description,
            is_active=data.is_active,
        )

        return self.repository.create(timeline)

    def update(
        self,
        timeline_id: int,
        data: ExpectedTimelineUpdate,
    ) -> ExpectedTimeline:

        timeline = self.get_by_id(timeline_id)

        if data.name is not None:
            existing_timeline = self.repository.get_by_name(
                data.name
            )

            if (
                existing_timeline
                and existing_timeline.id != timeline_id
            ):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Expected timeline with this name already exists",
                )

            timeline.name = data.name

        if data.description is not None:
            timeline.description = data.description

        if data.is_active is not None:
            timeline.is_active = data.is_active

        return self.repository.update(timeline)

    def delete(self, timeline_id: int) -> None:
        timeline = self.get_by_id(timeline_id)

        self.repository.delete(timeline)