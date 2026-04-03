from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from app.schemas.transaction_schema import TransactionCreate

def get_transactions(db: Session, user_id: int = None, account_id: int = None):
    query = db.query(Transaction)
    if user_id:
        query = query.filter(Transaction.user_id == user_id)
    if account_id:
        query = query.filter(Transaction.account_id == account_id)
    return query.all()

def create(db: Session, data: TransactionCreate, user_id: int):
    db_transaction = Transaction(user_id=user_id, **data.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


