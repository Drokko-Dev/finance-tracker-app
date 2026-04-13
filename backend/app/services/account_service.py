from sqlalchemy.orm import Session
from app.repositories import account_repository as repository

def create_account(db, data):
    return repository.create(db, data)

def get_accounts(db: Session, user_id: int):
    return repository.get_accounts(db, user_id=user_id)