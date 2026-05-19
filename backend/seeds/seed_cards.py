import random
from app.db.session import SessionLocal
from app.models.account import Account, AccountType
from app.models.card import Card

# Datos para la generación aleatoria
NOMBRES_TARJETAS = [
    "Visa Signature", "Mastercard Black", "Visa Platinum", 
    "American Express Gold", "Débito Preferencial"
]

def seed_cards(max_cards_per_account=1):
    db = SessionLocal()
    try:
        # 1. Obtener todas las cuentas existentes
        accounts = db.query(Account).all()
        
        if not accounts:
            print("❌ No se encontraron cuentas. Por favor, corre primero el seed de accounts.")
            return

        print(f"Sembrando tarjetas para {len(accounts)} cuentas posibles...")

        cards_created = 0
        for acc in accounts:
            # Lógica opcional: solo crear tarjetas para ciertos tipos de cuenta
            # Por ejemplo, si es 'ahorro' o 'corriente'
            if acc.type in [AccountType.AHORRO, AccountType.CORRIENTE]:
                
                # Decidimos aleatoriamente si esta cuenta tendrá 0, 1 o más tarjetas
                num_cards = random.randint(0, max_cards_per_account)
                
                for _ in range(num_cards):
                    new_card = Card(
                        account_id=acc.id,
                        name=random.choice(NOMBRES_TARJETAS),
                        last_four=str(random.randint(1000, 9999)),
                        billing_day=random.choice([1, 5, 10, 15, 25]),
                        # El límite de crédito es opcional (nullable)
                        credit_limit=random.choice([500000, 1000000, 2500000, None])
                    )
                    db.add(new_card)
                    cards_created += 1
        
        db.commit()
        print(f"✅ Seed de tarjetas completado. Se crearon {cards_created} tarjetas.")

    except Exception as e:
        print(f"❌ Error durante el seeding de tarjetas: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Ejecutamos el seed permitiendo hasta 2 tarjetas por cuenta
    seed_cards(2)