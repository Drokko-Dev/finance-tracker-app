from pydantic import BaseModel
from typing import Optional, List

class BankRead(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True

class CardRead(BaseModel):
    id: int
    name: str
    last_four: Optional[str] = None
    billing_day: Optional[int] = None
    credit_limit: Optional[int] = None
    class Config:
        from_attributes = True

class AccountCreate(BaseModel):
    bank_id: int
    name: str
    type: str  # corriente, vista, ahorro

class AccountUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None

class AccountResponse(BaseModel):
    id: int
    name: str
    type: str
    bank: BankRead
    cards: List[CardRead] = []
    class Config:
        from_attributes = True
