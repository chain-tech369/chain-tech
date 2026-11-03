from fastapi import APIRouter

from app.auth.auth_routes import router as auth_router
from app.user.user_routes import router as user_router
from app.protected_folders.profile.profile_route import (
    router as profile_router,
)
from app.admin_folders.experience_level.experience_route import (
    router as experience_router,
)
from app.admin_folders.professional_role.professional_route import (
    router as professional_roles_router,
)
from app.admin_folders.skills.skills_route import router as skills_router
from app.admin_folders.role.role_route import router as role_router
from app.protected_folders.join_us.join_route import (
    router as join_us_router,
)
from app.admin_folders.estimated_budget.estimated_budget_route import (
    router as estimated_budget_router,
)
from app.admin_folders.expected_timeline.expected_timeline_route import (
    router as expected_timeline_router,
)
from app.admin_folders.service_required.service_required_route import (
    router as service_required_router,
)
from app.protected_folders.service_request.service_request_route import (
    router as service_request_router,
)
from app.authorization.permission.permission_route import (
    router as permission_router,
)
from app.authorization.role_permission.role_permission_route import (
    router as role_permission_router,
)

api_v1_router = APIRouter()

routers = [
    auth_router,
    user_router,
    profile_router,
    experience_router,
    professional_roles_router,
    skills_router,
    role_router,
    join_us_router,
    estimated_budget_router,
    expected_timeline_router,
    service_required_router,
    service_request_router,
    permission_router,
    role_permission_router,
]

for router in routers:
    api_v1_router.include_router(router)