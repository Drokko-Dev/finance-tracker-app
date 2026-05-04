from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.friend import Friend
from app.models.user import User

def get_accepted_friends(db: Session, user_id: int):
    friends = db.query(User).join(
        Friend,
        or_(
            (Friend.user_id == user_id) & (Friend.friend_user_id == User.id),
            (Friend.friend_user_id == user_id) & (Friend.user_id == User.id)
        )
    ).filter(
        Friend.status == "accepted" 
    ).all()
    
    return friends

def get_friendship_between_users(db: Session, user1_id: int, user2_id: int):
    """Busca si ya existe alguna relación (pendiente o aceptada) entre dos usuarios."""
    return db.query(Friend).filter(
        or_(
            (Friend.user_id == user1_id) & (Friend.friend_user_id == user2_id),
            (Friend.user_id == user2_id) & (Friend.friend_user_id == user1_id)
        )
    ).first()

def get_pending_requests_for_user(db: Session, user_id: int):
    """Obtiene las solicitudes que le ENVIARON al usuario actual."""
    return db.query(Friend, User).join(
        User, Friend.user_id == User.id
    ).filter(
        Friend.friend_user_id == user_id, 
        Friend.status == "pending"
    ).all()

def get_friendship_by_id(db: Session, request_id: int):
    return db.query(Friend).filter(Friend.id == request_id).first()