from argon2 import PasswordHasher
import jwt
from argon2.exceptions import VerificationError
from app.core.settings import settings
from datetime import datetime, timedelta, timezone



# password hashing
password_hasher = PasswordHasher()

def hash_password(password:str) -> str
  return password_hasher.hash(password)

# verify password
def verify_password(password:str, password_hasher:str) -> bool
   try: 
    password_hasher.verify(password_hasher, password)
    return True
   except VerificationError:
    return False

# create token
def create_access_token(user_id:int)->str:
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes = settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user_id),
        "exp": expires_at,
    }

    token = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm = settings.JWT_ALGORITHM,
    )

    return token

# decode access token
def decode_access_token(token:str)->dict:
    return jwt.decode(
        token,
        settings.JWT_SECRET_KEY,
        algorithm = [settings.JWT_ALGORITHM],
    )