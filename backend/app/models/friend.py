from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from datetime import datetime, timezone
from app.db.session import Base

class Friend(Base):
    __tablename__ = "friends"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    friend_user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="pending", nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc)) 