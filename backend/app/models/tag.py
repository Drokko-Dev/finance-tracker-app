from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from datetime import datetime, timezone
from app.db.session import Base

class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False) #Viaje, salida viernes, viaje a la playa, etc.