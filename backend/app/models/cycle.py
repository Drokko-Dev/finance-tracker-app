from sqlalchemy import Column, ForeignKey, Integer, String
from app.db.session import Base


class Cycle(Base):
    __tablename__ = "cycles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False) # Ciclo Enero, Sueldo Enero, Enero, etc.
    start_day = Column(Integer, nullable=False)
    end_day = Column(Integer, nullable=False)
    budget_cycle = Column(Integer, nullable=False)