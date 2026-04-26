from pydantic import BaseModel, Field, field_validator, computed_field
from datetime import datetime, date
from typing import List, Optional, Any


class TransactionCreate(BaseModel):
    account_id: int
    category_id: int
    type: str
    amount: int
    description: str


class TransactionOg(BaseModel):
    id: int
    amount: float
    description: str

    class Config:
        from_attributes = True
        
class Transaction(BaseModel):
    id: int
    user_id: int       
    account_id: int    
    category_id: int    
    type: str           
    amount: float
    description: str
    created_at: datetime 

class DashboardSummaryResponse(BaseModel):
    total_income: float
    total_expense: float
    total_balance: float
    
class AccountRead(BaseModel):
    id: int
    name: str
    bank: str
    class Config:
        from_attributes = True

class CategoryRead(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True

# 2. Tu esquema de respuesta actualizado
class TransactionResponse(BaseModel):
    id: int
    amount: float
    description: Optional[str]
    type: str
    created_at: datetime
    # En lugar de solo IDs, enviamos el objeto completo
    account: AccountRead 
    category: CategoryRead
    debt: bool 

    @field_validator("debt", mode="before")
    @classmethod
    def convert_debt_to_bool(cls, v: Any) -> bool:
        # Si v es el objeto TransactionDebt, devolvemos True, si es None, False
        return v is not None

    class Config:
        from_attributes = True
        
# Objeto para agrupar los filtros (DTO)
class TransactionFilterParams(BaseModel):
    page: int = Field(1, ge=1)
    size: int = Field(10, ge=1, le=100)
    search: Optional[str] = None
    category: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    sort_by: str = "created_at"
    order: str = "desc"

    @field_validator("sort_by")
    def validate_sort_field(cls, v):
        allowed = ["amount", "type", "account_id", "category_id", "created_at", "description"]
        if v not in allowed:
            raise ValueError(f"Campo de ordenamiento no permitido. Usa: {allowed}")
        return v

    @field_validator("order")
    def validate_order(cls, v):
        if v.lower() not in ["asc", "desc"]:
            raise ValueError("El orden debe ser 'asc' o 'desc'")
        return v.lower()

# Respuesta con Metadatos
class PaginatedTransactionResponse(BaseModel):
    items: List[TransactionResponse]
    total: int
    page: int
    size: int
    pages: int