from sqlalchemy import Column, Integer, Float, ForeignKey, String
from app.db.session import Base


class TransactionDebt(Base):
    __tablename__ = "transaction_debts"

    id = Column(Integer, primary_key=True, index=True)

    transaction_id = Column(Integer, ForeignKey("transactions.id"))

    debtor_user_id = Column(Integer, ForeignKey("users.id"))
    creditor_user_id = Column(Integer, ForeignKey("users.id"))

    amount = Column(Float)

    status = Column(String, default="pending")