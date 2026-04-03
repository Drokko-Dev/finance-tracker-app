from pydantic import BaseModel

class TransactionCreate(BaseModel):
    account_id: int
    category_id: int
    type: str
    amount: int
    description: str


class Transaction(BaseModel):
    id: int
    amount: float
    description: str

    class Config:
        from_attributes = True