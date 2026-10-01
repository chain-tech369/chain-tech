# =============================
# import file packages here
# =============================
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # database url
    DATABASE_URL: str

    # jwt secret values
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"

    # access token
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # refresh token
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    REFRESH_TOKEN_EXPIRE_HOURS: int = 1

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()