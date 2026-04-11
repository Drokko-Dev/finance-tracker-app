from app.db.session import SessionLocal
from app.models.account import Account
from app.models.user import User
from app.models.category import Category
from app.models.transaction import Transaction
import enum
import random
from datetime import datetime, timezone, timedelta

# Datos realistas para Chile (o ajusta según tu país)
class TransactionType(str, enum.Enum):
    EXPENSE = "expense"
    INCOME = "income"
    SAVING = "saving"

def seed_transactions(n_per_account=10):
    db = SessionLocal()
    try:
        # Obtener datos base
        users = db.query(User).all()
        categories = db.query(Category).all()
        category_ids = [c.id for c in categories]

        if not users or not categories:
            print("❌ Error: Necesitas tener usuarios y categorías creadas primero.")
            return

        print(f"Sembrando transacciones...")

        for user in users:
            # Buscar cuentas que pertenecen a ESTE usuario únicamente
            user_accounts = db.query(Account).filter(Account.user_id == user.id).all()
            
            if not user_accounts:
                continue

            for account in user_accounts:
                for _ in range(n_per_account):
                    # Generar una fecha aleatoria en los últimos 30 días
                    random_days = random.randint(0, 30)
                    dt = datetime.now(timezone.utc) - timedelta(days=random_days)

                    new_transaction = Transaction(
                        user_id=user.id,
                        account_id=account.id,
                        category_id=random.choice(category_ids),
                        type=random.choice(list(TransactionType)).value,
                        amount=random.randint(1000, 50000), # Montos entre 1k y 50k
                        description=f"Compra de prueba {random.randint(1, 100)}",
                        created_at=dt
                    )
                    db.add(new_transaction)
        
        db.commit()
        print(f"✅ Se han creado {n_per_account} transacciones por cada cuenta encontrada.")

    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_transactions(20)