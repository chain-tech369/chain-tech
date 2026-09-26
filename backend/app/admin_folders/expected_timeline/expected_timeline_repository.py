from sqlalchemy.orm import Session

from app.admin_folders.expected_timeline.expected_timeline_model import (
    ExpectedTimeline,
)


class ExpectedTimelineRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[ExpectedTimeline]:
        return (
            self.db.query(ExpectedTimeline)
            .order_by(ExpectedTimeline.id)
            .all()
        )

    def get_by_id(self, timeline_id: int) -> ExpectedTimeline | None:
        return (
            self.db.query(ExpectedTimeline)
            .filter(ExpectedTimeline.id == timeline_id)
            .first()
        )

    def get_by_name(self, name: str) -> ExpectedTimeline | None:
        return (
            self.db.query(ExpectedTimeline)
            .filter(ExpectedTimeline.name == name)
            .first()
        )

    def create(
        self,
        timeline: ExpectedTimeline,
    ) -> ExpectedTimeline:
        self.db.add(timeline)
        self.db.commit()
        self.db.refresh(timeline)

        return timeline

    def update(
        self,
        timeline: ExpectedTimeline,
    ) -> ExpectedTimeline:
        self.db.commit()
        self.db.refresh(timeline)

        return timeline

    def delete(
        self,
        timeline: ExpectedTimeline,
    ) -> None:
        self.db.delete(timeline)
        self.db.commit()