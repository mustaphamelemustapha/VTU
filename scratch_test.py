import asyncio
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models import User
from app.api.v1.endpoints.leaderboard import get_leaderboard

db = SessionLocal()
user = db.query(User).first()
if user:
    print(f"Testing for user {user.id}")
    try:
        res = get_leaderboard(user=user, db=db)
        print(res)
    except Exception as e:
        import traceback
        traceback.print_exc()
else:
    print("No user found")
