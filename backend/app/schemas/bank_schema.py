from pydantic import BaseModel


class BankRead(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True