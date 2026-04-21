from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db 
from app.schemas.category_schema import  Category
from app.models.category import Category as model_category


router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/", response_model=list[Category])
def read_categories(
    db: Session = Depends(get_db)
):
    return db.query(model_category).all()