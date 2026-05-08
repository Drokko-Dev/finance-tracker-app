from app.db.session import SessionLocal
from app.models.bank import Bank

def seed_banks():
    bank_names = [
        "Banco de Chile",
        "Banco Santander",
        "Banco BCI",
        "Banco Estado",
        "Banco Itaú",
        "Banco Falabella",
        "Banco Ripley",
        "Banco Security",
        "Banco BICE",
        "Banco Scotiabank",
        "Banco Internacional",
        "Tenpo",
        "Mercado Pago",
        "Otro",
    ]

    db = SessionLocal()
    try:
        print("Sembrando bancos...")
        for name in bank_names:
            exists = db.query(Bank).filter(Bank.name == name).first()
            if not exists:
                db.add(Bank(name=name))
                print(f"✅ Banco creado: {name}")
            else:
                print(f"🟡 '{name}' ya existe, saltando...")
        db.commit()
        print("\n¡Semilla plantada con éxito! 🌱")
    except Exception as e:
        print(f"❌ Error al sembrar: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_banks()