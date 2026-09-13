from fastapi import FastAPI

from app.core.settings import settings

app = FastAPI(title="Chain-Tech API")


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/")
def read_root():
    return {"message": "Chain-Tech API is running"}
