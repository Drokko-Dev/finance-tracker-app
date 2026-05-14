from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.bank import Bank
from app.schemas.bank_schema import BankRead
from typing import List

router = APIRouter(prefix="/banks", tags=["Banks"])

@router.get("/", response_model=List[BankRead])
def get_banks(db: Session = Depends(get_db)):
    return db.query(Bank).all()
