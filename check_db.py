import sys
import os
sys.path.append(os.path.abspath('vtu-backend'))
from app.core.database import SessionLocal
from app.models.promo import UserPromo, PromoCode
from app.models.transaction import Transaction

db = SessionLocal()
print("--- Last 5 Transactions ---")
txs = db.query(Transaction).order_by(Transaction.id.desc()).limit(5).all()
for tx in txs:
    print(f"Tx {tx.id}: amount={tx.amount}, data_plan_code={tx.data_plan_code}")

print("\n--- Last 5 Promos ---")
promos = db.query(PromoCode).order_by(PromoCode.id.desc()).limit(5).all()
for p in promos:
    print(f"Promo {p.code}: discount={p.discount_amount}, is_pct={p.is_percentage}, nw={p.applicable_network}, size={p.applicable_plan_size}")

print("\n--- Last 5 User Promos ---")
upromos = db.query(UserPromo).order_by(UserPromo.id.desc()).limit(5).all()
for up in upromos:
    print(f"UserPromo {up.id}: status={up.status}, used_at={up.used_at}")
db.close()
