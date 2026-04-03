from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user_schema import UserCreate, UserResponse
from app.services import user_service as service

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user_endpoint(data: UserCreate, db: Session = Depends(get_db)):
    # ¡Mira qué limpio queda! El service se encarga de todo
    return service.create_user(db, data)