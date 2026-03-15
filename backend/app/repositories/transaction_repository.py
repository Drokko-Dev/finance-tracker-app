from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from app.schemas.transaction_schema import TransactionCreate

def get_all(db: Session):
    return db.query(Transaction).all()

def create(db: Session, data: TransactionCreate):
    # Convertimos Schema (Pydantic) a Modelo (SQLAlchemy)
    db_transaction = Transaction(
        amount=data.amount,
        description=data.description
        # Nota: Si en tu modelo user_id es obligatorio, aquí fallará.
        # Por ahora lo dejamos así para probar la conexión básica.
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction