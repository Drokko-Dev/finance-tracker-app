from sqlalchemy import Column, Integer, ForeignKey
from app.db.session import Base


class TransactionTag(Base):
    __tablename__ = "transaction_tags"

    id = Column(Integer, primary_key=True, index=True)

    transaction_id = Column(Integer, ForeignKey("transactions.id"))

    tag_id = Column(Integer, ForeignKey("tags.id"))