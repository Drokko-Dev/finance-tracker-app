from fastapi import Request, HTTPException, status
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from app.core.config import settings

# Configuraciones (En producción, SECRET_KEY debe ir en un archivo .env)
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

# Configuración de bcrypt (La que arreglamos antes con la versión 3.2.2)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    """Verifica que la contraseña plana coincida con el hash de la BD"""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    """Genera el token JWT firmado"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    
    # Crea el token real
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user_id(request: Request):
    """Extrae el token de la cookie y devuelve el ID del usuario"""
    token = request.cookies.get("access_token")
    
    if not token:
        raise HTTPException(status_code=401, detail="No autenticado. Inicia sesión.")
        
    try:
        # Decodificamos el token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        return int(user_id)
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="El token expiró")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

def get_password_hash(password: str) -> str:
    """Toma una contraseña plana y devuelve el hash seguro"""
    return pwd_context.hash(password)