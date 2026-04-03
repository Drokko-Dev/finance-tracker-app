from fastapi import APIRouter, Depends, Response, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.db.session import get_db
from app.models.user import User  # Asegúrate de que esta ruta sea correcta
from app.core.security import verify_password, create_access_token

from app.core.security import get_current_user_id
from app.models.user import User

router = APIRouter()

# Schema para lo que el frontend nos va a enviar
class LoginRequest(BaseModel):
    email: str
    password: str

@router.get("/me")
def get_current_user(
    user_id: int = Depends(get_current_user_id), 
    db: Session = Depends(get_db)
):
    # Si llega aquí, el 'guardia' ya validó la cookie
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Devolvemos los datos básicos (sin el password_hash obviamente)
    return {
        "id": user.id, 
        "name": user.name, 
        "email": user.email
    }

@router.post("/login")
def login(login_data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    # 1. Buscar al usuario por email
    user = db.query(User).filter(User.email == login_data.email).first()
    
    # 2. Verificar que el usuario exista y la contraseña coincida
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos"
        )

    # 3. Generar el JWT (guardamos el ID del usuario como 'sub' - subject)
    token = create_access_token(data={"sub": str(user.id)})

    # 4. Inyectar el token en la Cookie HttpOnly
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,   # Fundamental: JS del frontend no puede leerla
        max_age=3600,    # Expira en 3600 segundos (1 hora)
        samesite="lax",  # Protege contra ataques CSRF
        secure=False     # IMPORTANTE: Dejar en False en localhost, cambiar a True con HTTPS
    )

    # Devolvemos info útil al frontend (NO el token)
    return {
        "msg": "Login exitoso", 
        "user": {"id": user.id, "name": user.name, "email": user.email}
    }

@router.post("/logout")
def logout(response: Response):
    # Simplemente eliminamos la cookie
    response.delete_cookie(key="access_token")
    return {"msg": "Sesión cerrada"}