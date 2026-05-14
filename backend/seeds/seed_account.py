import random
from app.db.session import SessionLocal
from app.models.account import Account, AccountType
from app.models.user import User
from app.models.bank import Bank  # Importamos el modelo Bank

# Listas para generar datos aleatorios
BANCOS_DEFAULT = ["Banco de Chile", "Santander", "BCI", "Scotiabank", "Itaú", "Estado"]
NOMBRES_CUENTA = ["Mi Cuenta Principal", "Ahorro Vacaciones", "Gastos Comunes", "Fondo de Emergencia"]

def seed_accounts(accounts_per_user=2):
    db = SessionLocal()
    try:
        # 1. Verificar si hay usuarios
        user_ids = [user.id for user in db.query(User.id).all()]
        if not user_ids:
            print("❌ No se encontraron usuarios. Por favor, corre primero el seed de usuarios.")
            return

        # 2. Asegurarnos de que existan bancos y obtener sus IDs
        # Si no hay bancos, creamos algunos por defecto
        banks = db.query(Bank).all()
        if not banks:
            print("🏦 No se encontraron bancos. Creando bancos iniciales...")
            for nombre in BANCOS_DEFAULT:
                db.add(Bank(name=nombre))
            db.commit()
            banks = db.query(Bank).all()
        
        bank_ids = [bank.id for bank in banks]

        print(f"Sembrando cuentas para {len(user_ids)} usuarios...")

        for u_id in user_ids:
            # Creamos un número aleatorio de cuentas para cada usuario
            for _ in range(random.randint(1, accounts_per_user)):
                new_account = Account(
                    user_id=u_id,
                    bank_id=random.choice(bank_ids), # Asignamos el ID del banco
                    name=random.choice(NOMBRES_CUENTA),
                    type=random.choice(list(AccountType)) # Usamos el Enum AccountType
                )
                db.add(new_account)
        
        db.commit()
        print("✅ Seed de cuentas y bancos completado con éxito.")

    except Exception as e:
        print(f"❌ Error durante el seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_accounts(3) # Genera hasta 3 cuentas por usuario