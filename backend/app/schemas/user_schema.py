from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    name: str
    password_hash: str

class User(BaseModel):
    id: int
    email: str
    name: str
