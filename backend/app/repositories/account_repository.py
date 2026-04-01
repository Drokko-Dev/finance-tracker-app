from sqlalchemy.orm import Session
from app.models.account import Account
from app.schemas.account_schema import AccountCreate

def get_all(db: Session):
    return db.query(Account).all()

def create(db: Session, data: AccountCreate):
    db_account = Account(**data.model_dump())
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account