from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import base

from app.auth.auth_routes import router as auth_router
from app.user.user_routes import router as user_router
from app.profile.profile_route import router as profile_router


app = FastAPI(
    title="Chain-Tech API",
)


# ========================================
# CORS
# ========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ========================================
# ROUTES
# ========================================

# Authentication routes
app.include_router(auth_router)


# User routes
app.include_router(user_router)


# Profile routes
app.include_router(profile_router)


# ========================================
# HEALTH CHECK
# ========================================

@app.get("/health")
def health_check():
    return {"status": "ok"}


# ========================================
# ROOT
# ========================================

@app.get("/")
def read_root():
    return {"message": "Chain-Tech API is running"}