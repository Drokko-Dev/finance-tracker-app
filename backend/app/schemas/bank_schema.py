from pydantic import BaseModel


class BankBase(BaseModel):
    name: str

class BankCreate(BankBase):
    pass

class BankResponse(BankBase):
    id: int

    class Config:
        from_attributes = True