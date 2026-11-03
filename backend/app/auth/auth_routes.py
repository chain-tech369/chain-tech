from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    status,
)
from sqlalchemy.orm import Session

from app.auth import (
    AuthService,
    LoginRequest,
    RegisterRequest,
    TokenResponse,
)
from app.dependencies.get_db import get_db
from app.user.user_schemas import UserResponse


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# ============================================================
# REGISTER
# ============================================================

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user_data: RegisterRequest,
    db: Session = Depends(get_db),
):
    service = AuthService(db)

    try:
        return service.register(user_data)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc


# ============================================================
# LOGIN
# ============================================================

@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    login_data: LoginRequest,
    response: Response,
    db: Session = Depends(get_db),
):
    service = AuthService(db)

    try:
        tokens = service.login(
            email=login_data.email,
            password=login_data.password,
            remember=login_data.remember,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
            headers={
                "WWW-Authenticate": "Bearer",
            },
        ) from exc

    # --------------------------------------------------------
    # Refresh token cookie
    # --------------------------------------------------------

    cookie_options = {
        "key": "refresh_token",
        "value": tokens["refresh_token"],
        "httponly": True,
        "secure": False,  # Change to True in production with HTTPS
        "samesite": "lax",
        "path": "/",
    }

    if login_data.remember:
        cookie_options["max_age"] = 60 * 60 * 24 * 30

    response.set_cookie(**cookie_options)

    # --------------------------------------------------------
    # Return only the access token
    # --------------------------------------------------------

    return {
        "access_token": tokens["access_token"],
        "token_type": tokens["token_type"],
    }


# ============================================================
# REFRESH ACCESS TOKEN
# ============================================================

@router.post(
    "/refresh",
    response_model=TokenResponse,
)
def refresh(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token not found",
            headers={
                "WWW-Authenticate": "Bearer",
            },
        )

    service = AuthService(db)

    try:
        tokens = service.refresh_access_token(
            refresh_token
        )

    except ValueError as exc:
        response.delete_cookie(
            key="refresh_token",
            path="/",
        )

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
            headers={
                "WWW-Authenticate": "Bearer",
            },
        ) from exc

    # --------------------------------------------------------
    # Refresh token rotation
    # --------------------------------------------------------

    new_refresh_token = tokens.get("refresh_token")

    if new_refresh_token:
        response.set_cookie(
            key="refresh_token",
            value=new_refresh_token,
            httponly=True,
            secure=False,  # Change to True in production with HTTPS
            samesite="lax",
            max_age=60 * 60 * 24 * 30,
            path="/",
        )

    return {
        "access_token": tokens["access_token"],
        "token_type": tokens.get("token_type", "bearer"),
    }


# ============================================================
# LOGOUT
# ============================================================

@router.post(
    "/logout",
    status_code=status.HTTP_200_OK,
)
def logout(
    response: Response,
):
    response.delete_cookie(
        key="refresh_token",
        path="/",
    )

    return {
        "message": "Successfully logged out",
    }