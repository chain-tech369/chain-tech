# =============================
# import file packages here
# =============================
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # =============================
    # application configuration
    # =============================
    APP_TITLE: str
    APP_VERSION: str
    APP_DESCRIPTION: str

    # =============================
    # database configuration
    # =============================
    DATABASE_URL: str

    # =============================
    # jwt secret values
    # =============================
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"

    # =============================
    # access token configuration
    # =============================
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10

    # =============================
    # refresh token configuration
    # =============================
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    REFRESH_TOKEN_EXPIRE_HOURS: int = 1

    # =============================
    # cors configuration
    # =============================
    BACKEND_CORS_ORIGINS: list[str]

    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: list[str]
    CORS_ALLOW_HEADERS: list[str]

    # =============================
    # environment configuration
    # =============================
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=True,
    )


# =============================
# initialize settings
# =============================
settings = Settings()