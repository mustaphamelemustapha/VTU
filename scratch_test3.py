import asyncio
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, select, text, String
from app.core.database import SessionLocal
from app.models import User, Transaction, TransactionType

db = SessionLocal()
try:
    print("Trying query...")
    q = db.query(Transaction.id).filter(Transaction.tx_type.cast(String).in_(['data', 'airtime', 'cable', 'electricity', 'exam'])).limit(1).all()
    print("Success:", q)
except Exception as e:
    import traceback
    traceback.print_exc()
