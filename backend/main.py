from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Central API router
from app.api.v1.v1 import api_v1_router

# Application settings
from app.core.settings import settings


# ==========================================
# INITIALIZE FASTAPI APPLICATION
# ==========================================

app = FastAPI(
    title=settings.APP_TITLE,
    version=settings.APP_VERSION,
    description=settings.APP_DESCRIPTION,
)


# ==========================================
# CORS CONFIGURATION
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)


# ==========================================
# API ROUTES
# ==========================================

# Keep existing frontend URLs without /api/v1 for now.
app.include_router(api_v1_router)


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}


# ==========================================
# ROOT
# ==========================================

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Chain-Tech API is running"}