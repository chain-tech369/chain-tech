# =======================================
# import fastapi models and packages here
# =======================================
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

#======================================
# import others dependencies files here
# =====================================
from app.db import base

#=========================
# import routes files here
#=========================
from app.auth.auth_routes import router as auth_router
from app.user.user_routes import router as user_router
from app.protected_folders.profile.profile_route import router as profile_router
from app.admin_folders.experience_level.experience_route import router as experience_router


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
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ========================================
# ROUTES
# ========================================

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(profile_router)
app.include_router(experience_router)


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