# =============================
# import file packages here
# =============================
from datetime import datetime, timedelta, timezone
import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError

# ======================================
# import security file dependencies here
# ======================================
from app.core.settings import settings


# ==========================================
# Password hashing
# ==========================================

password_hasher = PasswordHasher()


def hash_password(password: str) -> str:
    return password_hasher.hash(password)


# ==========================================
# Verify password
# ==========================================

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
# Create access token
# ==========================================

def create_access_token(user_id: int) -> str:

    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user_id),
        "exp": expires_at,
    }

    token = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )

    return token


# ==========================================
# Decode access token
# ==========================================

def decode_access_token(token: str) -> dict:

    return jwt.decode(
        token,
        settings.JWT_SECRET_KEY,
        algorithms=[settings.JWT_ALGORITHM],
    )