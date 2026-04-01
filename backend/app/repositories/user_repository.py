from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user_schema import UserCreate

def get_all(db: Session):
    return db.query(User).all()

def create(db: Session, data: UserCreate):
    db_user = User(**data.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
