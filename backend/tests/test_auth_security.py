from datetime import timedelta

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.security import create_access_token, hash_password, verify_password
from app.db.base_class import Base
from app.role.role_model import Role
from app.user.user_models import User
from app.user.user_services import authenticate_user, register_user


@pytest.fixture
def db_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()

    role = Role(name="user", description="Default user")
    session.add(role)
    session.commit()
    session.refresh(role)

    yield session

    session.close()


def test_hash_password_and_verify_password():
    raw = "StrongPass123!"
    hashed = hash_password(raw)

    assert hashed != raw
    assert hashed.startswith("$argon2id$")
    assert verify_password(raw, hashed) is True
    assert verify_password("wrong-password", hashed) is False


def test_create_access_token_contains_user_id():
    token = create_access_token(subject=42, expires_delta=timedelta(minutes=15))

    assert isinstance(token, str)
    assert token


def test_register_user_creates_hashed_password(db_session):
    user = register_user(
        db=db_session,
        email="new@example.com",
        username="newuser",
        password="StrongPass123!",
    )

    assert user.email == "new@example.com"
    assert user.username == "newuser"
    assert user.hashed_password != "StrongPass123!"
    assert user.role_id is not None


def test_authenticate_user_with_valid_credentials(db_session):
    register_user(
        db=db_session,
        email="login@example.com",
        username="loginuser",
        password="StrongPass123!",
    )

    result = authenticate_user(
        db=db_session,
        email="login@example.com",
        password="StrongPass123!",
    )

    assert result.email == "login@example.com"
    assert result.username == "loginuser"


def test_authenticate_user_with_invalid_password(db_session):
    register_user(
        db=db_session,
        email="wrongpass@example.com",
        username="wrongpassuser",
        password="StrongPass123!",
    )

    with pytest.raises(ValueError):
        authenticate_user(
            db=db_session,
            email="wrongpass@example.com",
            password="WrongPass123!",
        )
