from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo
import calendar

from app.repositories import transaction_repository as repository
from sqlalchemy.orm import Session
from app.schemas.transaction_schema import TransactionCreate, TransactionFilterParams
from typing import Optional, List

def create_transaction(db: Session, data: TransactionCreate, user_id: int):
    return repository.create(db, data, user_id)

def get_transactions(db: Session, user_id: int | None = None, account_id: int| None = None, month_id: str | None = None):
    return repository.get_transactions(db, user_id=user_id, account_id=account_id, month_id=month_id)

def get_year_months(db: Session, user_id: int):
    transactions = repository.get_transactions(db, user_id=user_id)
    return sorted(
        set((t.created_at.year, t.created_at.month) for t in transactions), 
        reverse=True
    )

def get_dashboard_summary(db: Session, user_id: int, account_id: Optional[int], month_id: Optional[str]):
    start_date = None
    end_date = None
    
    if month_id and month_id != "ALL":
        year, month = map(int, month_id.split('-'))
        _, last_day = calendar.monthrange(year, month)
        start_date = datetime(year, month, 1, 0, 0, 0)
        end_date = datetime(year, month, last_day, 23, 59, 59)
        
    transactions = repository.get_transactions(
        db=db, 
        user_id=user_id, 
        account_id=account_id, 
        start_date=start_date, 
        end_date=end_date
    )
    
    total_income = sum(t.amount for t in transactions if t.type == "income")
    total_expense = sum(abs(t.amount) for t in transactions if t.type == "expense")
    total_balance = total_income - total_expense
    
    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "total_balance": total_balance
    }

def get_evolution_history(db: Session, user_id: int, account_id: Optional[int], month_id: str, period: str):
    year, month = map(int, month_id.split('-'))
    tz_usuario = ZoneInfo("America/Santiago") 
    
    _, last_day = calendar.monthrange(year, month)
    end_date_local = datetime(year, month, last_day, 23, 59, 59, tzinfo=tz_usuario)

    start_date_local = None
    if period == "1M":
        start_date_local = datetime(year, month, 1, 0, 0, 0, tzinfo=tz_usuario)
    elif period == "3M":
        start_date_local = end_date_local - timedelta(days=90)
    elif period == "1Y":
        start_date_local = end_date_local - timedelta(days=365)

    end_date_utc = end_date_local.astimezone(timezone.utc)
    start_date_utc = start_date_local.astimezone(timezone.utc) if start_date_local else None

    transactions = repository.get_transactions(
        db=db, user_id=user_id, account_id=account_id, 
        start_date=start_date_utc, end_date=end_date_utc
    )
    
    meses_es = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    group_by_day = period in ["1M", "3M"]
    agrupado = {}

    for t in transactions:
        if t.type not in ["expense"]:
            continue

        if t.created_at.tzinfo is None:
            fecha_local = t.created_at.replace(tzinfo=timezone.utc).astimezone(tz_usuario)
        else:
            fecha_local = t.created_at.astimezone(tz_usuario)

        if group_by_day:
            key = fecha_local.strftime("%Y-%m-%d")
            label = fecha_local.strftime("%d %b")
        else:
            key = fecha_local.strftime("%Y-%m")
            label = f"{meses_es[fecha_local.month - 1]} {fecha_local.year}"

        if key not in agrupado:
            agrupado[key] = {"month": label, "amount": 0}
            
        agrupado[key]["amount"] += t.amount
        

    resultado = [agrupado[k] for k in sorted(agrupado.keys())]

    return resultado


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