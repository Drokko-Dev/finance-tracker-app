from typing import List

from app.core.security import get_current_user_id
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services import friend_service as service
from app.schemas.friend_schema import (
    QuickAccessFriendOut,
    FriendRequestCreate,
    PendingRequestOut,
    SentRequestOut,
)

router = APIRouter(prefix="/friends", tags=["friends"])

@router.get("/quick-access", response_model=List[QuickAccessFriendOut])
def get_frequent_friends(
    user_id: int = Depends(get_current_user_id), 
    db: Session = Depends(get_db),
):
    """Obtiene la lista de amigos para el componente de Acceso Rápido."""
    return service.get_quick_access_list(db, user_id=user_id)

@router.post("/request")
def send_request(
    data: FriendRequestCreate, 
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id), 
):
    """Envía una solicitud de amistad por email."""
    return service.send_friend_request(db, user_id, data.email)

@router.get("/requests/pending", response_model=List[PendingRequestOut])
def get_pending(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """Obtiene las solicitudes de amistad recibidas y pendientes."""
    return service.get_pending_requests(db, user_id)

@router.get("/requests/sent", response_model=List[SentRequestOut])
def get_sent(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """Obtiene las solicitudes de amistad enviadas y pendientes de respuesta."""
    return service.get_sent_requests(db, user_id)

@router.post("/requests/{request_id}/accept")
def accept_request(
    request_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """Acepta una solicitud de amistad recibida."""
    return service.respond_friend_request(db, request_id, user_id, accept=True)

@router.delete("/requests/{request_id}/reject")
def reject_request(
    request_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """Rechaza una solicitud de amistad recibida."""
    return service.respond_friend_request(db, request_id, user_id, accept=False)

@router.delete("/requests/{request_id}/cancel")
def cancel_request(
    request_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """Cancela una solicitud de amistad que yo envié."""
    return service.cancel_friend_request(db, request_id, user_id)