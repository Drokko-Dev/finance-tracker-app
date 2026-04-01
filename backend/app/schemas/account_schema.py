from pydantic import BaseModel

class AccountCreate(BaseModel):
    user_id: int
    name: str
    type: str
    bank: str

class Account(BaseModel):
    id: int
    user_id: int
    name: str
    type: str
    bank: str

