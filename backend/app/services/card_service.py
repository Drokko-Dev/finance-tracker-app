from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories import card_repository as repository
from app.schemas.card_schema import CardCreate, CardUpdate

def get_cards_by_account(db: Session, account_id: int):
    return repository.get_by_account(db, account_id)

def create_card(db: Session, data: CardCreate):
    return repository.create(db, data)

def update_card(db: Session, card_id: int, data: CardUpdate):
    card = repository.get_by_id(db, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Tarjeta no encontrada")
    return repository.update(db, card, data)

def delete_card(db: Session, card_id: int):
    card = repository.get_by_id(db, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Tarjeta no encontrada")
    repository.delete(db, card)