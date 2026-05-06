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

def get_quick_access_list(db: Session, user_id: int):
    """
    Queda pendiente agregar la url del avatar en la tabla de usuarios para mostrarla aquí.
    """
    friends = friend_repository.get_accepted_friends(db, user_id=user_id)
    
    result = []
    for friend in friends:
        name_parts = friend.name.strip().split()
        if len(name_parts) >= 2:
            initials = f"{name_parts[0][0]}{name_parts[1][0]}".upper()
        else:
            initials = friend.name[:2].upper()
            
        color_index = friend.id % len(TAILWIND_COLORS)
        bg_color = TAILWIND_COLORS[color_index]
        
        result.append({
            "id": friend.id,
            "name": friend.name,
            "initials": initials,
            "avatar": "", 
            "bgColor": bg_color
        })
        
    return result

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
    results = friend_repository.get_pending_requests_for_user(db, current_user_id)
    pending_list = []
    
    for friend_rel, sender in results:
        name_parts = sender.name.strip().split()
        initials = f"{name_parts[0][0]}{name_parts[1][0]}".upper() if len(name_parts) >= 2 else sender.name[:2].upper()
        
        color_index = sender.id % len(TAILWIND_COLORS)
        bg_color = TAILWIND_COLORS[color_index]

        pending_list.append({
            "request_id": friend_rel.id,
            "sender_id": sender.id,
            "sender_name": sender.name,
            "sender_initials": initials,
            "created_at": friend_rel.created_at,
            "bgColor": bg_color
        })
    return pending_list


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
        return {"message": "Solicitud eliminada"}