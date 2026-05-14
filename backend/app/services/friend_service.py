from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories import friend_repository
from app.models.friend import Friend
from app.models.user import User
 
TAILWIND_COLORS = [
    "bg-purple-600", 
    "bg-orange-600", 
    "bg-blue-600", 
    "bg-emerald-600", 
    "bg-pink-600",
    "bg-indigo-600",
    "bg-amber-600"
]
 
def _get_initials(name: str) -> str:
    parts = name.strip().split()
    if len(parts) >= 2:
        return f"{parts[0][0]}{parts[1][0]}".upper()
    return name[:2].upper()
 
def _get_color(user_id: int) -> str:
    return TAILWIND_COLORS[user_id % len(TAILWIND_COLORS)]
 
 
def get_quick_access_list(db: Session, user_id: int):
    friends = friend_repository.get_accepted_friends(db, user_id=user_id)
    
    return [
        {
            "id": friend.id,
            "name": friend.name,
            "initials": _get_initials(friend.name),
            "avatar": "",
            "bgColor": _get_color(friend.id),
        }
        for friend in friends
    ]
 
 
def send_friend_request(db: Session, user_id: int, target_email: str):
    target_user = db.query(User).filter(User.email == target_email).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    if target_user.id == user_id:
        raise HTTPException(status_code=400, detail="No puedes agregarte a ti mismo")
 
    existing = friend_repository.get_friendship_between_users(db, user_id, target_user.id)
    if existing:
        if existing.status == "accepted":
            raise HTTPException(status_code=400, detail="Ya son amigos")
        raise HTTPException(status_code=400, detail="Ya existe una solicitud pendiente")
 
    new_request = Friend(
        user_id=user_id,
        friend_user_id=target_user.id,
        status="pending"
    )
    db.add(new_request)
    db.commit()
    return {"message": "Solicitud enviada con éxito"}
 
 
def get_pending_requests(db: Session, current_user_id: int):
    """Solicitudes que otros me enviaron a mí."""
    results = friend_repository.get_pending_requests_for_user(db, current_user_id)
 
    return [
        {
            "request_id": friend_rel.id,
            "sender_id": sender.id,
            "sender_name": sender.name,
            "sender_initials": _get_initials(sender.name),
            "created_at": friend_rel.created_at,
            "bgColor": _get_color(sender.id),
        }
        for friend_rel, sender in results
    ]
 
 
def get_sent_requests(db: Session, current_user_id: int):
    """Solicitudes que yo envié y siguen pendientes."""
    results = friend_repository.get_sent_requests_by_user(db, current_user_id)
 
    return [
        {
            "request_id": friend_rel.id,
            "receiver_id": receiver.id,
            "receiver_name": receiver.name,
            "receiver_initials": _get_initials(receiver.name),
            "created_at": friend_rel.created_at,
            "bgColor": _get_color(receiver.id),
        }
        for friend_rel, receiver in results
    ]
 
 
def respond_friend_request(db: Session, request_id: int, current_user_id: int, accept: bool):
    request = friend_repository.get_friendship_by_id(db, request_id)
    
    if not request:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
        
    if request.friend_user_id != current_user_id:
        raise HTTPException(status_code=403, detail="No tienes permiso para responder a esta solicitud")
        
    if accept:
        request.status = "accepted"
        db.commit()
        return {"message": "Solicitud aceptada"}
    else:
        db.delete(request)
        db.commit()
        return {"message": "Solicitud rechazada"}
 
 
def cancel_friend_request(db: Session, request_id: int, current_user_id: int):
    """Cancela una solicitud que YO envié."""
    request = friend_repository.get_friendship_by_id(db, request_id)
 
    if not request:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
 
    if request.user_id != current_user_id:
        raise HTTPException(status_code=403, detail="No tienes permiso para cancelar esta solicitud")
 
    if request.status != "pending":
        raise HTTPException(status_code=400, detail="Esta solicitud ya fue respondida")
 
    db.delete(request)
    db.commit()
    return {"message": "Solicitud cancelada"}