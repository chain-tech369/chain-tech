from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    status,
)
from sqlalchemy.orm import Session

from app.auth.auth_schema import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
)
from app.auth.auth_service import AuthService
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
        user = service.register(user_data)
        return user

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


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

        # ====================================================
        # REMEMBER ME
        # ====================================================

        if login_data.remember:

            # Remember Me enabled
            # Cookie persists for 30 days
            response.set_cookie(
                key="refresh_token",
                value=tokens["refresh_token"],
                httponly=True,
                secure=False,  # True in production with HTTPS
                samesite="lax",
                max_age=60 * 60 * 24 * 30,
                path="/",
            )

        else:

            # Remember Me disabled
            # Session cookie: removed when browser session ends
            response.set_cookie(
                key="refresh_token",
                value=tokens["refresh_token"],
                httponly=True,
                secure=False,  # True in production with HTTPS
                samesite="lax",
                path="/",
            )

        # Return ONLY the access token
        return {
            "access_token": tokens["access_token"],
            "token_type": tokens["token_type"],
        }

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={
                "WWW-Authenticate": "Bearer",
            },
        )


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
    refresh_token = request.cookies.get(
        "refresh_token"
    )

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token not found",
        )

    service = AuthService(db)

    try:
        tokens = service.refresh_access_token(
            refresh_token
        )

        # If refresh token rotation is enabled,
        # replace the existing cookie.
        if tokens.get("refresh_token"):

            response.set_cookie(
                key="refresh_token",
                value=tokens["refresh_token"],
                httponly=True,
                secure=False,
                samesite="lax",
                max_age=60 * 60 * 24 * 30,
                path="/",
            )

        return {
            "access_token": tokens["access_token"],
            "token_type": tokens.get(
                "token_type",
                "bearer",
            ),
        }

    except ValueError as e:

        response.delete_cookie(
            key="refresh_token",
            path="/",
        )

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )


# ============================================================
# LOGOUT
# ============================================================

@router.post("/logout")
def logout(response: Response):

    response.delete_cookie(
        key="refresh_token",
        path="/",
    )

    return {
        "message": "Successfully logged out",
    }