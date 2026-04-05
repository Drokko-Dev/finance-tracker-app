from sqlalchemy.orm import Session
from app.models.user import User

def get_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create(db: Session, user_data: dict):
    # Recibimos un diccionario limpio y lo insertamos en la BD
    db_user = User(**user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
