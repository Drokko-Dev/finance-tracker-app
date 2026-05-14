from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class QuickAccessFriendOut(BaseModel):
    id: int 
    name: str
    initials: str
    avatar: Optional[str] = "" 
    bgColor: str

    class Config:
        from_attributes = True

class FriendRequestCreate(BaseModel):
    email: EmailStr

class PendingRequestOut(BaseModel):
    request_id: int  
    sender_id: int
    sender_name: str
    sender_initials: str
    created_at: datetime
    bgColor: str

    class Config:
        from_attributes = True

class SentRequestOut(BaseModel):
    request_id: int
    receiver_id: int
    receiver_name: str
    receiver_initials: str
    bgColor: str
    created_at: datetime
 
    class Config:
        from_attributes = True