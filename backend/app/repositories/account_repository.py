from sqlalchemy.orm import Session
from app.models.account import Account
from app.schemas.account_schema import AccountCreate

def get_accounts(db: Session, user_id: int):
    query = db.query(Account).filter(Account.user_id == user_id)
    return query.all()

def create(db: Session, data: AccountCreate):
    db_account = Account(**data.model_dump())
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account