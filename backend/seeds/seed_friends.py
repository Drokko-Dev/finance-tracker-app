from app.db.session import SessionLocal
from app.models.user import User
from app.models.friend import Friend

# ──────────────────────────────────────────────
#  CONFIGURACIÓN DEL USUARIO DE PRUEBA
# ──────────────────────────────────────────────
TEST_USER_EMAIL = "andrewjoyce@example.org"   # Usamos el mismo del seed de transacciones

# ──────────────────────────────────────────────
#  DATOS REALISTAS PARA FRONTEND (Mock Data)
# ──────────────────────────────────────────────
MOCK_FRIENDS = [
    {"name": "Carlos Alberto de las Mercedes Valenzuela", "email": "carlos@ejemplo.com"},
    {"name": "Ana", "email": "ana@ejemplo.com"},
    {"name": "Miguel Ríos", "email": "miguel.r@ejemplo.com"},
    {"name": "Juan Pablo", "email": "jp@ejemplo.com"},
    {"name": "Sofía", "email": "sofia@ejemplo.com"},
    {"name": "Lucas", "email": "lucas@ejemplo.com"},
    {"name": "Valeria", "email": "valeria@ejemplo.com"},
    {"name": "Diego", "email": "diego@ejemplo.com"},
    {"name": "Camila", "email": "camila@ejemplo.com"},
    {"name": "Mateo", "email": "mateo@ejemplo.com"},
]

# ──────────────────────────────────────────────
#  SEED PRINCIPAL
# ──────────────────────────────────────────────
def seed_test_user_friends():
    db = SessionLocal()
    try:
        # ── 1. Obtener usuario de prueba ──────────────────
        main_user = db.query(User).filter(User.email == TEST_USER_EMAIL).first()
        if not main_user:
            print(f"❌ No se encontró el usuario con email '{TEST_USER_EMAIL}'.")
            return

        print(f"👤 Usuario Principal: {main_user.email} (ID: {main_user.id})")

        # 👇 NUEVO: Borrar amistades existentes (RESET) 👇
        print("🧹 Borrando amistades anteriores para evitar duplicados...")
        db.query(Friend).filter(
            (Friend.user_id == main_user.id) | (Friend.friend_user_id == main_user.id)
        ).delete()
        db.commit()

        amigos_creados = 0

        # ── 2. Crear usuarios y amistades ─────────────────
        print("🤝 Generando red de amigos para Acceso Rápido...")
        
        for i, friend_data in enumerate(MOCK_FRIENDS):
            # A. Revisar si el usuario amigo ya existe en la BD
            friend_user = db.query(User).filter(User.email == friend_data["email"]).first()
            
            # Si no existe, lo creamos
            if not friend_user:
                friend_user = User(
                    name=friend_data["name"],
                    email=friend_data["email"],
                    password_hash="fake_hash_123"
                )
                db.add(friend_user)
                db.flush() # flush() le asigna un ID a friend_user sin cerrar la transacción

            # B. Crear la relación de amistad
            # Alternamos quién envía la solicitud para asegurar que el backend busca en ambas columnas
            if i % 2 == 0:
                amistad = Friend(
                    user_id=main_user.id, 
                    friend_user_id=friend_user.id, 
                    status="accepted"
                )
            else:
                amistad = Friend(
                    user_id=friend_user.id, 
                    friend_user_id=main_user.id, 
                    status="accepted"
                )
            
            db.add(amistad)
            amigos_creados += 1

        # ── 3. Insertar todo ──────────────────────────────
        db.commit()
        print(f"\n✅ Se crearon {amigos_creados} amigos para '{main_user.email}'.")

    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_test_user_friends()