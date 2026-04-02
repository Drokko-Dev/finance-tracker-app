from app.db.session import SessionLocal
from app.models.account import Account
from app.models.user import User
import random

# Datos realistas para Chile (o ajusta según tu país)
BANCOS = ["Banco de Chile", "Banco Estado", "BCI", "Santander", "Scotiabank", "Itaú"]
TIPOS_CUENTA = ["credit_card", "debit", "checking", "cash"]
NOMBRES_CUENTA = ["Cuenta Corriente", "Ahorro Vista", "Visa Signature", "Efectivo Personal"]

def seed_accounts(accounts_per_user=2):
    db = SessionLocal()
    try:
        # 3. Obtener todos los IDs de usuarios existentes
        user_ids = [user.id for user in db.query(User.id).all()]

        if not user_ids:
            print("❌ No se encontraron usuarios. Por favor, corre primero el seed de usuarios.")
            return

        print(f"Sembrando cuentas para {len(user_ids)} usuarios...")

        for u_id in user_ids:
            # Creamos un número aleatorio de cuentas para cada usuario
            for _ in range(random.randint(1, accounts_per_user)):
                new_account = Account(
                    user_id=u_id,
                    name=random.choice(NOMBRES_CUENTA),
                    type=random.choice(TIPOS_CUENTA),
                    bank=random.choice(BANCOS)
                )
                db.add(new_account)
        
        db.commit()
        print("✅ Seed de cuentas completado.")

    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_accounts() 