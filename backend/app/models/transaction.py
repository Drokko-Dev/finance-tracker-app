import enum
from sqlalchemy import Boolean, Column, Integer, Float, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
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
    type = Column(
        Enum(
            TransactionType, 
            # Esto le dice a SQLAlchemy: "Usa el .value ('expense'), no el .name ('EXPENSE')"
            values_callable=lambda obj: [e.value for e in obj]
        ), 
        nullable=False
    )
    amount = Column(Integer, nullable=False)
    description = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    deleted_at = Column(DateTime, nullable=True)  # Para soft delete
    transaction_split = Column(Boolean, nullable=True)  # Para identificar transacciones divididas
    #relaciones
    account = relationship("Account")
    category = relationship("Category")
