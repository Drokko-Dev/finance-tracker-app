from app.db.session import SessionLocal
from app.models.user import User 
from faker import Faker
from passlib.context import CryptContext

# Configuración de Seguridad y Faker
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
fake = Faker()

def seed_users(n=10):
    db = SessionLocal()
    try:
        print(f"Sembrando {n} usuarios...")
        for _ in range(n):
            # 1. Asegúrate de que el password sea un string simple
            raw_password = "password123"
            
            # 2. Forzamos a passlib a usar bcrypt de forma segura
            hashed_password = pwd_context.hash(raw_password)
            
            new_user = User(
                email=fake.unique.email(),
                name=fake.name(),
                password_hash=hashed_password,
            )
            db.add(new_user)
        
        db.commit()
        print("¡Seed completado con éxito!")
    except Exception as e:
        print(f"Error durante el seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Opcional: Crea las tablas si no existen
    # Base.metadata.create_all(bind=engine)
    
    seed_users(15)