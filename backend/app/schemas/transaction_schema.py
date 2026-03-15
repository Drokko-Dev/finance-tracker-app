from pydantic import BaseModel

class TransactionCreate(BaseModel):
    amount: float
    description: str


class Transaction(BaseModel):
    id: int
    amount: float
    description: str

    class Config:
        from_attributes = True