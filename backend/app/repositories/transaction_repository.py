from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from app.schemas.transaction_schema import TransactionCreate

def get_all(db: Session):
    return db.query(Transaction).all()

def create(db: Session, data: TransactionCreate):
    db_transaction = Transaction(**data.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


