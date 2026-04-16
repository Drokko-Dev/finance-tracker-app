from app.core.security import get_current_user_id
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db # Importamos la FUNCIÓN, no la Base
from app.services import account_service as service
from app.schemas.account_schema import AccountCreate, Account

router = APIRouter(prefix="/accounts", tags=["accounts"])

@router.post("/", response_model=Account)
def create_account_endpoint(data: AccountCreate, db: Session = Depends(get_db)):
    return service.create_account(db, data)

@router.get("/", response_model=list[Account])
def read_accounts(
    user_id: int = Depends(get_current_user_id), 
    db: Session = Depends(get_db)
):
    return service.get_accounts(db, user_id=user_id)