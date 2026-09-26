from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db

from app.protected_folders.join_us.join_schema import (
    JoinUsApplicationCreate,
    JoinUsApplicationResponse,
    JoinUsApplicationUpdate,
)

from app.protected_folders.join_us.join_service import (
    JoinUsApplicationService,
)


router = APIRouter(
    prefix="/join-us",
    tags=["Join Us"],
)


def get_join_us_service(
    db: Session = Depends(get_db),
) -> JoinUsApplicationService:

    return JoinUsApplicationService(db)


@router.post(
    "/",
    response_model=JoinUsApplicationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_join_us_application(
    data: JoinUsApplicationCreate,
    service: JoinUsApplicationService = Depends(
        get_join_us_service
    ),
):

    return service.create(data)


@router.get(
    "/",
    response_model=list[JoinUsApplicationResponse],
)
def get_all_join_us_applications(
    service: JoinUsApplicationService = Depends(
        get_join_us_service
    ),
):

    return service.get_all()


@router.get(
    "/{application_id}",
    response_model=JoinUsApplicationResponse,
)
def get_join_us_application(
    application_id: int,
    service: JoinUsApplicationService = Depends(
        get_join_us_service
    ),
):

    return service.get_by_id(application_id)


@router.patch(
    "/{application_id}",
    response_model=JoinUsApplicationResponse,
)
def update_join_us_application(
    application_id: int,
    data: JoinUsApplicationUpdate,
    service: JoinUsApplicationService = Depends(
        get_join_us_service
    ),
):

    return service.update(
        application_id,
        data,
    )


@router.delete(
    "/{application_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_join_us_application(
    application_id: int,
    service: JoinUsApplicationService = Depends(
        get_join_us_service
    ),
):

    service.delete(application_id)

    return None