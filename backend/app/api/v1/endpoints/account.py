from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.core.security import get_current_user_id
from app.services import account_service, card_service
from app.schemas.account_schema import AccountCreate, AccountUpdate, AccountResponse
from app.schemas.card_schema import CardCreate, CardUpdate, CardResponse

router = APIRouter(prefix="/accounts", tags=["accounts"])

@router.get("/", response_model=List[AccountResponse])
def get_accounts(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return account_service.get_accounts(db, user_id)

@router.post("/", response_model=AccountResponse)
def create_account(
    data: AccountCreate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return account_service.create_account(db, data, user_id)

@router.put("/{account_id}", response_model=AccountResponse)
def update_account(
    account_id: int,
    data: AccountUpdate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return account_service.update_account(db, account_id, data, user_id)

@router.delete("/{account_id}", status_code=204)
def delete_account(
    account_id: int,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    account_service.delete_account(db, account_id, user_id)

# --- Tarjetas anidadas bajo la cuenta ---

@router.post("/{account_id}/cards", response_model=CardResponse)
def create_card(
    account_id: int,
    data: CardCreate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return card_service.create_card(db, data)

@router.put("/{account_id}/cards/{card_id}", response_model=CardResponse)
def update_card(
    account_id: int,
    card_id: int,
    data: CardUpdate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return card_service.update_card(db, card_id, data)

@router.delete("/{account_id}/cards/{card_id}", status_code=204)
def delete_card(
    account_id: int,
    card_id: int,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    card_service.delete_card(db, card_id)