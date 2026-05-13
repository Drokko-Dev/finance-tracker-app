from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories import account_repository as repository
from app.schemas.account_schema import AccountCreate, AccountUpdate

def get_accounts(db: Session, user_id: int):
    return repository.get_all(db, user_id)

def create_account(db: Session, data: AccountCreate, user_id: int):
    return repository.create(db, data, user_id)

def update_account(db: Session, account_id: int, data: AccountUpdate, user_id: int):
    account = repository.get_by_id(db, account_id, user_id)
    if not account:
        raise HTTPException(status_code=404, detail="Cuenta no encontrada")
    return repository.update(db, account, data)

def delete_account(db: Session, account_id: int, user_id: int):
    account = repository.get_by_id(db, account_id, user_id)
    if not account:
        raise HTTPException(status_code=404, detail="Cuenta no encontrada")
    repository.delete(db, account)