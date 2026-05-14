import enum
from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.session import Base

class AccountType(str, enum.Enum):
    CORRIENTE = "corriente"
    VISTA = "vista"
    AHORRO = "ahorro"

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    bank_id = Column(Integer, ForeignKey("banks.id"))
    name = Column(String, nullable=False)
    type = Column(
        Enum(AccountType, values_callable=lambda obj: [e.value for e in obj]),
        nullable=False
    )

    bank = relationship("Bank")
    cards = relationship("Card", back_populates="account")