from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: str
    name: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
