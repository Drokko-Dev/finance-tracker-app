from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class Card(Base):
    __tablename__ = "cards"
    id = Column(Integer, primary_key=True)
    account_id = Column(Integer, ForeignKey("accounts.id"))
    name = Column(String)           # "Visa Signature", "Mastercard Black"
    last_four = Column(String, nullable=True)
    billing_day = Column(Integer, nullable=True)
    credit_limit = Column(Integer, nullable=True)
    account = relationship("Account", back_populates="cards")