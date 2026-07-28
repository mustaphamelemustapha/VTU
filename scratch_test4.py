import enum
from sqlalchemy import Column, Integer, Enum
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class TransactionType(str, enum.Enum):
    DATA = "data"
    AIRTIME = "airtime"

class Transaction(Base):
    __tablename__ = 'tx'
    id = Column(Integer, primary_key=True)
    tx_type = Column(Enum(TransactionType))

print(Transaction.tx_type.in_([TransactionType.DATA.value, TransactionType.AIRTIME.value]).compile(compile_kwargs={"literal_binds": True}))
print(Transaction.tx_type.in_([TransactionType.DATA, TransactionType.AIRTIME]).compile(compile_kwargs={"literal_binds": True}))
