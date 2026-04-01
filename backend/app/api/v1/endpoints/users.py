from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db # Importamos la FUNCIÓN, no la Base
from app.services import user_service as service
from app.schemas.user_schema import UserCreate, User

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=User)
def create_user_endpoint(data: UserCreate, db: Session = Depends(get_db)):
    return service.create_user(db, data)