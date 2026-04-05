from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db 
from app.services import transaction_service as service
from app.schemas.transaction_schema import TransactionCreate, Transaction
from app.core.security import get_current_user_id

router = APIRouter(prefix="/transactions", tags=["transactions"])

# Corrección 1: Cambiamos "/transactions" por "/"
@router.get("/", response_model=list[Transaction])
def read_transactions(
    user_id: int = Depends(get_current_user_id), 
    account_id: int = None, 
    db: Session = Depends(get_db)
):
    return service.get_transactions(db, user_id=user_id, account_id=account_id)

# Corrección 2: Agregamos el guardia al POST
@router.post("/", response_model=Transaction)
def create_transaction_endpoint(
    data: TransactionCreate, 
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id) # ¡El guardia de la cookie!
):    
    return service.create_transaction(db, data, user_id )