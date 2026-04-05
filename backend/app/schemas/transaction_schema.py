from pydantic import BaseModel
from datetime import datetime


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