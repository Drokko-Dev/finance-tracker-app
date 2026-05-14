from sqlalchemy.orm import Session
from app.models.card import Card
from app.schemas.card_schema import CardCreate, CardUpdate

def get_by_account(db: Session, account_id: int):
    return db.query(Card).filter(Card.account_id == account_id).all()

def get_by_id(db: Session, card_id: int):
    return db.query(Card).filter(Card.id == card_id).first()

def create(db: Session, data: CardCreate):
    card = Card(**data.model_dump())
    db.add(card)
    db.commit()
    db.refresh(card)
    return card

def update(db: Session, card: Card, data: CardUpdate):
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(card, key, value)
    db.commit()
    db.refresh(card)
    return card

def delete(db: Session, card: Card):
    db.delete(card)
    db.commit()