from sqlalchemy import Column, Integer, String
from app.db.session import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False) # Alimentación, Transporte, Entretenimiento, etc.
    type = Column(String, nullable=False) # income o expense.