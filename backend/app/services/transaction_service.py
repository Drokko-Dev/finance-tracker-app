from app.repositories import transaction_repository as repository
from sqlalchemy.orm import Session
from app.schemas.transaction_schema import TransactionCreate, TransactionFilterParams
from typing import Optional, List

def create_transaction(db: Session, data: TransactionCreate, user_id: int):
    return repository.create(db, data, user_id)

def get_transactions(db: Session, user_id: int | None = None, account_id: int| None = None):
    return repository.get_transactions(db, user_id=user_id, account_id=account_id)

def get_filtered_transactions(
    db: Session, 
    user_id: int, 
    account_id: Optional[int], 
    category_ids: Optional[List[int]], 
    params: TransactionFilterParams
):
    """
    Orquestador para obtener transacciones filtradas y paginadas.
    Aquí podrías agregar lógica extra, como verificar permisos 
    específicos o disparar eventos de auditoría.
    """
    
    # Llamada al repositorio pasando el objeto de parámetros completo
    return repository.get_filtered_transactions(
        db, 
        user_id=user_id, 
        account_id=account_id, 
        category_ids=category_ids, 
        params=params
    )