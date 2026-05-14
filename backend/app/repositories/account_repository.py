from sqlalchemy.orm import Session, joinedload
from app.models.account import Account
from app.schemas.account_schema import AccountCreate, AccountUpdate

def get_all(db: Session, user_id: int):
    return (
        db.query(Account)
        .options(joinedload(Account.bank), joinedload(Account.cards))
        .filter(Account.user_id == user_id)
        .all()
    )

def get_by_id(db: Session, account_id: int, user_id: int):
    return (
        db.query(Account)
        .options(joinedload(Account.bank), joinedload(Account.cards))
        .filter(Account.id == account_id, Account.user_id == user_id)
        .first()
    )

def create(db: Session, data: AccountCreate, user_id: int):
    account = Account(user_id=user_id, **data.model_dump())
    db.add(account)
    db.commit()
    db.refresh(account)
    return account

def update(db: Session, account: Account, data: AccountUpdate):
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(account, key, value)
    db.commit()
    db.refresh(account)
    return account

def delete(db: Session, account: Account):
    db.delete(account)
    db.commit()