from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from datetime import datetime, timezone
from app.db.session import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    account_id = Column(Integer, ForeignKey("accounts.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))

    type = Column(String, nullable=False)  # expense | income | saving
    amount = Column(Float, nullable=False)

    description = Column(String)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))