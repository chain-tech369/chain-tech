# =====================================
# import base.py file dependencies here
# =====================================
from app.db.base_class import Base

# ===============================
# import public models files here
# ===============================
# from app.public_folders.about.about_model import About
# from app.public_folders.contact.contact_model import About
# from app.public_folders.home.home_model import Home
# from app.public_folders.service.service_model import Service

# ==================================
# import protected models files here
# ==================================
from app.protected_folders.profile.profile_model import Profile
from app.protected_folders.join_us.join_model import JoinUsApplication
# from app.protected_folders.skillsform.skills_form_model import SkillsForm
from app.protected_folders.service_request.service_request_model import ServiceRequest


# ==============================
# import admin models files here 
# ==============================
from app.admin_folders.role.role_model import Role
from app.admin_folders.experience_level.experience_model import Experience
from app.admin_folders.professional_role.professional_model import ProfessionalRole
from app.admin_folders.skills.skills_model import Skill
from app.admin_folders.estimated_budget.estimated_budget_model import EstimatedBudget
from app.admin_folders.expected_timeline.expected_timeline_model import ExpectedTimeline
from app.admin_folders.service_required.service_required_model import ServiceRequired

# =================================
# import user and others model here
# =================================
from app.user.user_models import User
