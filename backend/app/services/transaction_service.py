from app.repositories import transaction_repository as repository
from sqlalchemy.orm import Session
from app.schemas.transaction_schema import TransactionCreate

def get_transactions(db: Session, user_id: int = None, account_id: int = None):
    return repository.get_transactions(db, user_id=user_id, account_id=account_id)

def create_transaction(db: Session, data: TransactionCreate, user_id: int):
    return repository.create(db, data, user_id)