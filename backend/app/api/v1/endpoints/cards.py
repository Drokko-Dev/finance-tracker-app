from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.card import Card
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/cards", tags=["Cards"])


class CardCreate(BaseModel):
    account_id: int
    name: str
    last_four: str | None = None
    billing_day: int | None = None

class CardResponse(CardCreate):
    id: int
    class Config:
        from_attributes = True


@router.get("/", response_model=List[CardResponse])
def get_cards(db: Session = Depends(get_db)):
    return db.query(Card).all()