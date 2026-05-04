from typing import List

from app.core.security import get_current_user_id
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db # Importamos la FUNCIÓN, no la Base
from app.services import friend_service as service
from app.schemas.friend_schema import QuickAccessFriendOut, FriendRequestCreate, PendingRequestOut

router = APIRouter(prefix="/friends", tags=["friends"])

@router.get("/quick-access", response_model=List[QuickAccessFriendOut])
def get_frequent_friends(
    user_id: int = Depends(get_current_user_id), 
    db: Session = Depends(get_db),
):
    """
    Obtiene la lista de amigos frecuentes formatiada 
    para el componente de Acceso Rápido del Dashboard.
    """
    return service.get_quick_access_list(db, user_id=user_id)

@router.post("/request")
def send_request(
    data: FriendRequestCreate, 
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id), 
):
    """Envía una solicitud de amistad por email"""
    return service.send_friend_request(db, user_id, data.email)

@router.get("/requests/pending", response_model=List[PendingRequestOut])
def get_pending(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """Obtiene las solicitudes de amistad recibidas y pendientes"""
    return service.get_pending_requests(db, user_id)

@router.post("/requests/{request_id}/accept")
def accept_request(
    request_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """Acepta una solicitud de amistad"""
    return service.respond_friend_request(db, request_id, user_id, accept=True)

@router.delete("/requests/{request_id}/reject")
def reject_request(
    request_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """Rechaza (elimina) una solicitud de amistad"""
    return service.respond_friend_request(db, request_id, user_id, accept=False)