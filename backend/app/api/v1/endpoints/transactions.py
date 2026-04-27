from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from app.db.session import get_db 
from app.services import transaction_service as service
from app.schemas.transaction_schema import DashboardSummaryResponse, TransactionCreate, Transaction, PaginatedTransactionResponse, TransactionFilterParams
from app.core.security import get_current_user_id

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.get("/", response_model=list[Transaction])
def read_transactions(
    user_id: int = Depends(get_current_user_id), 
    account_id: Optional[int] = None, 
    month_id: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return service.get_transactions(
        db=db, 
        user_id=user_id, 
        account_id=account_id, 
        month_id=month_id
    )

@router.get("/summarized/", response_model=DashboardSummaryResponse)
def dashboard_summarized_transactions(
    user_id: int = Depends(get_current_user_id), 
    account_id: Optional[int] = None, 
    month_id: Optional[str] = None,
    limit: int = 5,
    db: Session = Depends(get_db),
):
    return service.get_dashboard_summary(
        db=db, 
        user_id=user_id, 
        account_id=account_id, 
        month_id=month_id,
        limit=limit
    )
    
@router.get("/year-months/", response_model=list[tuple[int, int]])
def get_year_months_transactions(
    user_id: int = Depends(get_current_user_id), 
    db: Session = Depends(get_db),
):
    return service.get_year_months(db, user_id=user_id)

@router.get("/evolution/")
def get_evolution_history(
    user_id: int = Depends(get_current_user_id), 
    account_id: Optional[int] = None, 
    month_id: Optional[str] = None,
    period: str = "1Y",
    db: Session = Depends(get_db),
):
    if month_id is None:
        month_id = datetime.now().strftime("%Y-%m") 

    return service.get_evolution_history(
        db=db, 
        user_id=user_id, 
        account_id=account_id, 
        month_id=month_id,
        period=period
    )


@router.get("/movimientos/", response_model=PaginatedTransactionResponse)
def read_filter_transactions(
    params: TransactionFilterParams = Depends(),
    user_id: int = Depends(get_current_user_id), 
    account_id: Optional[int] = None, 
    db: Session = Depends(get_db)
):
    # Convertimos el string de categorías a lista aquí o en el service
    category_ids = [int(i) for i in params.category.split(',')] if params.category else None
    
    return service.get_filtered_transactions(
        db, 
        user_id=user_id, 
        account_id=account_id,
        category_ids=category_ids,
        params=params
    )
# Corrección 2: Agregamos el guardia al POST
@router.post("/", response_model=Transaction)
def create_transaction_endpoint(
    data: TransactionCreate, 
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id) # ¡El guardia de la cookie!
):    
    return service.create_transaction(db, data, user_id )