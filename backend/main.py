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
from app.admin_folders.professional_role.professional_route import router as professional_roles_router
from app.admin_folders.skills.skills_route import router as skills_router
from app.admin_folders.role.role_route import router as role_router
from app.protected_folders.join_us.join_route import router as join_us_router
from app.admin_folders.estimated_budget.estimated_budget_route import router as estimated_budget_router
from app.admin_folders.expected_timeline.expected_timeline_route import router as expected_timeline_router
from app.admin_folders.service_required.service_required_route import router as service_required_router
from app.protected_folders.service_request.service_request_route import router as service_request_router




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
app.include_router(professional_roles_router)
app.include_router(skills_router)
app.include_router(role_router)
app.include_router(join_us_router)
app.include_router(estimated_budget_router)
app.include_router(expected_timeline_router)
app.include_router(service_required_router)
app.include_router(service_request_router)




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