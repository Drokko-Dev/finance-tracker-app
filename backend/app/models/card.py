from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    
    name = Column(String, nullable=False)        # "Visa Oro", "Mastercard Black"
    last_four = Column(String, nullable=True)     # "4521" — útil para identificarla
    billing_day = Column(Integer, nullable=True)  # día de facturación, ej: 15

    # Relación inversa
    account = relationship("Account")