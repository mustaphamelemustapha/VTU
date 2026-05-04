import sys
import os

# Add the project directory to sys.path
sys.path.append(os.getcwd())

from app.core.database import SessionLocal
from app.models.data_plan import DataPlan

db = SessionLocal()
plans = db.query(DataPlan).filter(DataPlan.network == "airtel").all()
print(f"Total Airtel plans: {len(plans)}")
for plan in plans:
    print(f"ID: {plan.id}, Code: {plan.plan_code}, Name: {plan.plan_name}, Provider: {plan.provider}, Active: {plan.is_active}")
db.close()
