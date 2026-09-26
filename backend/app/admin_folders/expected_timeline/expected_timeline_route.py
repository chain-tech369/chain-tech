from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db

from app.admin_folders.expected_timeline.expected_timeline_schema import (
    ExpectedTimelineCreate,
    ExpectedTimelineUpdate,
    ExpectedTimelineResponse,
)

from app.admin_folders.expected_timeline.expected_timeline_service import (
    ExpectedTimelineService,
)


router = APIRouter(
    prefix="/admin/expected-timelines",
    tags=["Expected Timelines"],
)


def get_expected_timeline_service(
    db: Session = Depends(get_db),
) -> ExpectedTimelineService:
    return ExpectedTimelineService(db)


@router.get(
    "/",
    response_model=list[ExpectedTimelineResponse],
)
def get_expected_timelines(
    service: ExpectedTimelineService = Depends(
        get_expected_timeline_service
    ),
):
    return service.get_all()


@router.get(
    "/{timeline_id}",
    response_model=ExpectedTimelineResponse,
)
def get_expected_timeline(
    timeline_id: int,
    service: ExpectedTimelineService = Depends(
        get_expected_timeline_service
    ),
):
    return service.get_by_id(timeline_id)


@router.post(
    "/",
    response_model=ExpectedTimelineResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_expected_timeline(
    data: ExpectedTimelineCreate,
    service: ExpectedTimelineService = Depends(
        get_expected_timeline_service
    ),
):
    return service.create(data)


@router.put(
    "/{timeline_id}",
    response_model=ExpectedTimelineResponse,
)
def update_expected_timeline(
    timeline_id: int,
    data: ExpectedTimelineUpdate,
    service: ExpectedTimelineService = Depends(
        get_expected_timeline_service
    ),
):
    return service.update(timeline_id, data)


@router.delete(
    "/{timeline_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_expected_timeline(
    timeline_id: int,
    service: ExpectedTimelineService = Depends(
        get_expected_timeline_service
    ),
):
    service.delete(timeline_id)

    return None