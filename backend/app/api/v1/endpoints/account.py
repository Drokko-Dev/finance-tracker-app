from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db # Importamos la FUNCIÓN, no la Base
from app.services import account_service as service
from app.schemas.account_schema import AccountCreate, Account

router = APIRouter(prefix="/accounts", tags=["accounts"])

@router.post("/", response_model=Account)
def create_account_endpoint(data: AccountCreate, db: Session = Depends(get_db)):
    return service.create_account(db, data)