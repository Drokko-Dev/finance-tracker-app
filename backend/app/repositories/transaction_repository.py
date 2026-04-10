from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from app.schemas.transaction_schema import TransactionCreate
from typing import Optional, List

def get_transactions(db: Session, user_id: int | None = None, account_id: int | None = None):
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

def get_filtered_transactions(db: Session,page: int, size: int,search: Optional[str],category_ids: List[int] | None, user_id: int | None = None, account_id: int | None = None):
    print(f'entro al repository {category_ids}')
    query = db.query(Transaction)
    if user_id:
        query = query.filter(Transaction.user_id == user_id)
    if account_id:
        query = query.filter(Transaction.account_id == account_id)
    if search:
        query = query.filter(Transaction.description.ilike(f"%{search}%"))
    if category_ids:
        # Crea una lista de condiciones: [Transaction.category_id == 3, Transaction.category_id == 4]
        condiciones = [Transaction.category_id == cat_id for cat_id in category_ids]
        # Aplica el OR entre todas ellas
        query = query.filter(or_(*condiciones))
    return query.all()


