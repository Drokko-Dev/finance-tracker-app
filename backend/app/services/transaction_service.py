from app.repositories import transaction_repository as repository
from sqlalchemy.orm import Session
from app.schemas.transaction_schema import TransactionCreate
from typing import Optional, List

def create_transaction(db: Session, data: TransactionCreate, user_id: int):
    return repository.create(db, data, user_id)

def get_transactions(db: Session, user_id: int | None = None, account_id: int| None = None):
    return repository.get_transactions(db, user_id=user_id, account_id=account_id)

def get_filtered_transactions(db: Session,page: int, size: int,search: Optional[str],category_ids: List[int] | None, user_id: int | None = None, account_id: int| None = None):
    print(f'entro al service {category_ids}')
    return repository.get_filtered_transactions(db,page, size, search,category_ids, user_id=user_id, account_id=account_id)
