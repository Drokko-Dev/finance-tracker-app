import enum
from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime, Enum, relationship
from datetime import datetime, timezone
from app.db.session import Base

# 1. Definimos una clase Enum
class TransactionType(str, enum.Enum):
    EXPENSE = "expense"
    INCOME = "income"
    SAVING = "saving"

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    account_id = Column(Integer, ForeignKey("accounts.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    type = Column(Enum(TransactionType), nullable=False)  
    amount = Column(Integer, nullable=False)
    description = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    user = relationship("User", back_populates="transactions")
    account = relationship("Account", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")