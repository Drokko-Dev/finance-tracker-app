from sqlalchemy import asc, desc, func
from sqlalchemy.orm import Session, joinedload
from app.models.transaction import Transaction
from app.schemas.transaction_schema import TransactionCreate, TransactionFilterParams
from typing import Optional, List

def create(db: Session, data: TransactionCreate, user_id: int):
    db_transaction = Transaction(user_id=user_id, **data.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def get_transactions(db: Session, user_id: int | None = None, account_id: int | None = None):
    query = db.query(Transaction)
    if user_id:
        query = query.filter(Transaction.user_id == user_id)
    if account_id:
        query = query.filter(Transaction.account_id == account_id)
    return query.all()

def get_filtered_transactions(
    db: Session, 
    user_id: int, 
    account_id: Optional[int], 
    category_ids: Optional[List[int]], 
    params: TransactionFilterParams
):
    query = db.query(Transaction).options(
        joinedload(Transaction.account),
        joinedload(Transaction.category)
    )

    # --- Aplicar Filtros ---
    if user_id:
        query = query.filter(Transaction.user_id == user_id)
    if account_id:
        query = query.filter(Transaction.account_id == account_id)
    if category_ids:
        query = query.filter(Transaction.category_id.in_(category_ids))
    if params.search:
        query = query.filter(Transaction.description.ilike(f"%{params.search}%"))
    if params.start_date:
        query = query.filter(Transaction.created_at >= params.start_date)
    if params.end_date:
        query = query.filter(Transaction.created_at <= params.end_date)

    # --- Conteo Total (Antes de paginar) ---
    total_items = query.count()

    # --- Manejo de Sorting ---
    sort_map = {
        "monto": Transaction.amount,
        "tipo": Transaction.type,
        "cuenta": Transaction.account_id,
        "categoria": Transaction.category_id,
        "fecha": Transaction.created_at,
        "descripcion": Transaction.description
    }
    
    column = sort_map.get(params.sort_by, Transaction.created_at)
    sort_func = asc(column) if params.order == "asc" else desc(column)
    query = query.order_by(sort_func)

    # --- Aplicar Paginación ---
    offset = (params.page - 1) * params.size
    items = query.offset(offset).limit(params.size).all()

    # --- Retorno con Metadatos ---
    return {
        "items": items,
        "total": total_items,
        "page": params.page,
        "size": params.size,
        "pages": (total_items + params.size - 1) // params.size
    }


