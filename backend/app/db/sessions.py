from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.settings import settings


connect_args = {
    "check_same_thread": False
}


engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)