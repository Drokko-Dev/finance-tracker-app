from pydantic import BaseModel
from typing import Optional

class CardCreate(BaseModel):
    account_id: int
    name: str
    last_four: Optional[str] = None
    billing_day: Optional[int] = None
    credit_limit: Optional[int] = None

class CardUpdate(BaseModel):
    name: Optional[str] = None
    last_four: Optional[str] = None
    billing_day: Optional[int] = None
    credit_limit: Optional[int] = None

class CardResponse(BaseModel):
    id: int
    account_id: int
    name: str
    last_four: Optional[str] = None
    billing_day: Optional[int] = None
    credit_limit: Optional[int] = None
    class Config:
        from_attributes = True