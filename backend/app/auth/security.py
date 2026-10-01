# ==========================================
# IMPORT PACKAGES
# ==========================================

from datetime import datetime, timedelta, timezone

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError

from app.core.settings import settings


password_hasher = PasswordHasher()


# ==========================================
# PASSWORD HASHING
# ==========================================

def hash_password(password: str) -> str:
    return password_hasher.hash(password)


def verify_password(
    password: str,
    hashed_password: str,
) -> bool:

    try:
        password_hasher.verify(
            hashed_password,
            password,
        )

        return True

    except VerificationError:
        return False


# ==========================================
# ACCESS TOKEN
# ==========================================

def create_access_token(
    user_id: int,
) -> str:

    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    payload = {
        "sub": str(user_id),
        "type": "access",
        "exp": expires_at,
    }

    token = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )

    return token


def decode_access_token(
    token: str,
) -> dict:

    return jwt.decode(
        token,
        settings.JWT_SECRET_KEY,
        algorithms=[settings.JWT_ALGORITHM],
    )


# ==========================================
# REFRESH TOKEN
# ==========================================

def create_refresh_token(
    user_id: int,
    remember: bool = False,
) -> str:

    # Remember Me enabled
    # Refresh token lives for 30 days
    if remember:

        expires_at = (
            datetime.now(timezone.utc)
            + timedelta(
                days=settings.REFRESH_TOKEN_EXPIRE_DAYS
            )
        )

    # Remember Me disabled
    # Refresh token lives for 1 hour
    else:

        expires_at = (
            datetime.now(timezone.utc)
            + timedelta(
                hours=settings.REFRESH_TOKEN_EXPIRE_HOURS
            )
        )

    payload = {
        "sub": str(user_id),
        "type": "refresh",
        "exp": expires_at,
    }

    token = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )

    return token


def decode_refresh_token(
    token: str,
) -> dict:

    return jwt.decode(
        token,
        settings.JWT_SECRET_KEY,
        algorithms=[settings.JWT_ALGORITHM],
    )