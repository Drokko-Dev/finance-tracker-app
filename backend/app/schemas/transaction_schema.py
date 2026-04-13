from pydantic import BaseModel
from datetime import datetime
from typing import Optional



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

    class Config:
        from_attributes = True