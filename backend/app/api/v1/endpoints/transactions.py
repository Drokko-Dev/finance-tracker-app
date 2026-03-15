from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db # Importamos la FUNCIÓN, no la Base
from app.services import transaction_service as service
from app.schemas.transaction_schema import TransactionCreate, Transaction

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.get("/", response_model=list[Transaction])
def read_transactions(db: Session = Depends(get_db)):
    return service.get_transactions(db)

@router.post("/", response_model=Transaction)
def create_transaction_endpoint(data: TransactionCreate, db: Session = Depends(get_db)):
    return service.create_transaction(db, data)