from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.session import Base


class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    name = Column(String, nullable=False) #Cuenta corriente, cuenta de ahorro, tarjeta de crédito, etc.
    type = Column(String, nullable=False)  # credit_card, debit, checking, cash

    bank = Column(String, nullable=False) #banco chile, banco estado, banco bci, banco itau, etc.