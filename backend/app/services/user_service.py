from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.repositories import user_repository as repository
from app.schemas.user_schema import UserCreate
from app.core.security import get_password_hash

def create_user(db: Session, data: UserCreate):
    # 1. Regla de Negocio: Evitar correos duplicados
    existing_user = repository.get_by_email(db, data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado."
        )

    # 2. Regla de Negocio: Proteger la contraseña
    hashed_pwd = get_password_hash(data.password)
    
    # 3. Preparamos los datos exactos que necesita la BD
    user_dict = {
        "name": data.name,
        "email": data.email,
        "password_hash": hashed_pwd
        # "role": "user" # Por defecto, todos nacen como 'user'
    }

    # 4. Mandamos a guardar
    return repository.create(db, user_dict)