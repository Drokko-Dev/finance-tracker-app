from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from app.db.session import get_db 
from app.services import transaction_service as service
from app.schemas.transaction_schema import TransactionCreate, Transaction, TransactionResponse
from app.core.security import get_current_user_id

router = APIRouter(prefix="/transactions", tags=["transactions"])

# Corrección 1: Cambiamos "/transactions" por "/"
@router.get("/", response_model=list[Transaction])
def read_transactions(
    user_id: int = Depends(get_current_user_id), 
    account_id: Optional[int] = None, 
    db: Session = Depends(get_db)
):
    if account_id is not None:
        return service.get_transactions(db, user_id=user_id, account_id=account_id)
    else:
        return service.get_transactions(db, user_id=user_id)
    
@router.get("/movimientos/", response_model=list[TransactionResponse])
def read_filter_transactions(
    user_id: int = Depends(get_current_user_id), 
    account_id: Optional[int] = None, 
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1),
    search: Optional[str] = Query(None),
    category: str = Query(None)
):
    print(f'DEBUG categoy {category}')
    if category:
        lista_ids = [int(i) for i in category.split(',')]
        print(f'DEBUG entro al if category {lista_ids}')
        return service.get_filtered_transactions(db, user_id=user_id, account_id=account_id,category_ids=lista_ids, page=page, size=size, search=search)
    if account_id is not None:
        return service.get_filtered_transactions(db, user_id=user_id, account_id=account_id,category_ids=None, page=page, size=size, search=search)
    else:
        return service.get_filtered_transactions(db, user_id=user_id,category_ids=None, page=page, size=size, search=search)

# Corrección 2: Agregamos el guardia al POST
@router.post("/", response_model=Transaction)
def create_transaction_endpoint(
    data: TransactionCreate, 
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id) # ¡El guardia de la cookie!
):    
    return service.create_transaction(db, data, user_id )