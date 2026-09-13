from fastapi.testclient import TestClient

from app.core.settings import settings
from main import app


def test_settings_are_loaded():
    assert settings.DATABASE_URL
    assert settings.JWT_SECRET_KEY
    assert settings.JWT_ALGORITHM == "HS256"
    assert settings.ACCESS_TOKEN_EXPIRE_MINUTES > 0


def test_app_starts():
    client = TestClient(app)
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
