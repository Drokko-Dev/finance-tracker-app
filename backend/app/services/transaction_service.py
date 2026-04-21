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
    # 👇 CORREGIDO: Usando la función global sorted() envolviendo al set()
    return sorted(
        set((t.created_at.year, t.created_at.month) for t in transactions), 
        reverse=True
    )

def get_dashboard_summary(db: Session, user_id: int, account_id: Optional[int], month_id: Optional[str]):
    start_date = None
    end_date = None
    
    # 1. Traducimos el mes a rangos de fecha (Como lo vimos antes)
    if month_id and month_id != "ALL":
        year, month = map(int, month_id.split('-'))
        _, last_day = calendar.monthrange(year, month)
        start_date = datetime(year, month, 1, 0, 0, 0)
        end_date = datetime(year, month, last_day, 23, 59, 59)
        
    # 2. Obtenemos las transacciones usando tu repositorio limpio
    transactions = repository.get_transactions(
        db=db, 
        user_id=user_id, 
        account_id=account_id, 
        start_date=start_date, 
        end_date=end_date
    )
    
    # 3. Calculamos los totales en Python (Mucho más rápido que en JS)
    total_income = sum(t.amount for t in transactions if t.type == "income")
    total_expense = sum(abs(t.amount) for t in transactions if t.type == "expense")
    total_balance = total_income - total_expense
    
    # 4. Devolvemos el "Paquete" completo
    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "total_balance": total_balance,
        "transactions": transactions
    }

def get_evolution_history(db: Session, user_id: int, account_id: Optional[int], month_id: str, period: str):
    year, month = map(int, month_id.split('-'))
    tz_usuario = ZoneInfo("America/Santiago") # 📍 La zona horaria del usuario
    
    # 1. Definimos el tope superior (Último segundo del mes en HORA LOCAL)
    _, last_day = calendar.monthrange(year, month)
    end_date_local = datetime(year, month, last_day, 23, 59, 59, tzinfo=tz_usuario)

    # 2. Definimos el inicio exacto en HORA LOCAL
    start_date_local = None
    if period == "1M":
        # Para 1M, en lugar de restar 30 días, empezamos exactamente el día 1 a las 00:00:00
        start_date_local = datetime(year, month, 1, 0, 0, 0, tzinfo=tz_usuario)
    elif period == "3M":
        start_date_local = end_date_local - timedelta(days=90)
    elif period == "1Y":
        start_date_local = end_date_local - timedelta(days=365)

    # 3. TRADUCCIÓN A UTC PARA LA BASE DE DATOS
    # Le pasamos a SQL las fechas exactas convertidas al tiempo universal
    end_date_utc = end_date_local.astimezone(timezone.utc)
    start_date_utc = start_date_local.astimezone(timezone.utc) if start_date_local else None

    # Consultamos la base de datos
    transactions = repository.get_transactions(
        db=db, user_id=user_id, account_id=account_id, 
        start_date=start_date_utc, end_date=end_date_utc
    )
    
    meses_es = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    group_by_day = period in ["1M", "3M"]
    agrupado = {}

    for t in transactions:
        # 👇 LA MAGIA OCURRE AQUÍ 👇
        # Tomamos la fecha UTC de la base de datos y la pasamos a la hora de Chile.
        # Si tu base de datos guarda fechas "naive" (sin zona), primero le decimos que es UTC.
        if t.created_at.tzinfo is None:
            fecha_local = t.created_at.replace(tzinfo=timezone.utc).astimezone(tz_usuario)
        else:
            fecha_local = t.created_at.astimezone(tz_usuario)

        # 2. CREAR LLAVE DINÁMICA (Ahora usando la fecha_local correcta)
        if group_by_day:
            key = fecha_local.strftime("%Y-%m-%d")
            label = fecha_local.strftime("%d %b")
        else:
            key = fecha_local.strftime("%Y-%m")
            label = f"{meses_es[fecha_local.month - 1]} {fecha_local.year}"

        if key not in agrupado:
            agrupado[key] = {"month": label, "amount": 0}
            
        # Sumar ingresos y restar gastos
        if t.type == "income":
            agrupado[key]["amount"] += t.amount
        else:
            agrupado[key]["amount"] -= abs(t.amount)

    # 3. ORDENAR Y FORMATEAR
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