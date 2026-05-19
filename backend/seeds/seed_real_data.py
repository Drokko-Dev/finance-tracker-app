from app.db.session import SessionLocal
from app.models.account import Account
from app.models.user import User
from app.models.category import Category
from app.models.transaction import Transaction, TransactionMethod, TransactionType
import random
from datetime import datetime, timezone

TEST_USER_EMAIL = "paulharris@example.com"
SUELDO = 1_000_000

EXPENSE_TEMPLATES = [
    {"desc": "Compra Tottus",                "min": 15_000, "max": 80_000,  "hint": ["supermercado", "alimentacion", "comida", "gasto"]},
    {"desc": "Compra Jumbo",                 "min": 20_000, "max": 90_000,  "hint": ["supermercado", "alimentacion", "comida", "gasto"]},
    {"desc": "Compra Lider",                 "min": 12_000, "max": 70_000,  "hint": ["supermercado", "alimentacion", "comida", "gasto"]},
    {"desc": "Compra Santa Isabel",          "min": 8_000,  "max": 45_000,  "hint": ["supermercado", "alimentacion", "comida", "gasto"]},
    {"desc": "Panadería El Trigal",          "min": 1_500,  "max": 5_000,   "hint": ["alimentacion", "comida", "panaderia", "gasto"]},
    {"desc": "Panadería Don Lucho",          "min": 1_200,  "max": 4_500,   "hint": ["alimentacion", "comida", "panaderia", "gasto"]},
    {"desc": "Pan y marraquetas",            "min": 800,    "max": 3_000,   "hint": ["alimentacion", "comida", "gasto"]},
    {"desc": "Bebestibles Unimarc",          "min": 3_000,  "max": 15_000,  "hint": ["bebestible", "bebida", "alimentacion", "gasto"]},
    {"desc": "Coca-Cola y jugos",            "min": 2_000,  "max": 8_000,   "hint": ["bebestible", "bebida", "gasto"]},
    {"desc": "Agua mineral x6",             "min": 2_500,  "max": 6_000,   "hint": ["bebestible", "bebida", "gasto"]},
    {"desc": "Cerveza fin de semana",        "min": 3_500,  "max": 12_000,  "hint": ["bebestible", "bebida", "entretenimiento", "gasto"]},
    {"desc": "Gastos comunes edificio",      "min": 35_000, "max": 80_000,  "hint": ["gasto comun", "vivienda", "arriendo", "gasto"]},
    {"desc": "Cuenta de luz Enel",           "min": 15_000, "max": 40_000,  "hint": ["luz", "electricidad", "servicios", "gasto"]},
    {"desc": "Cuenta de agua Aguas Andinas", "min": 8_000,  "max": 20_000,  "hint": ["agua", "servicios", "gasto"]},
    {"desc": "Internet VTR",                "min": 19_990, "max": 29_990,  "hint": ["internet", "tecnologia", "servicios", "gasto"]},
    {"desc": "Internet Entel Hogar",         "min": 17_990, "max": 27_990,  "hint": ["internet", "tecnologia", "servicios", "gasto"]},
    {"desc": "Plan celular Entel",           "min": 12_990, "max": 22_990,  "hint": ["celular", "telefono", "servicios", "gasto"]},
    {"desc": "Plan celular Claro",           "min": 9_990,  "max": 19_990,  "hint": ["celular", "telefono", "servicios", "gasto"]},
    {"desc": "Carga Bip!",                   "min": 5_000,  "max": 20_000,  "hint": ["transporte", "metro", "bus", "gasto"]},
    {"desc": "Bencina Copec",                "min": 25_000, "max": 60_000,  "hint": ["transporte", "auto", "bencina", "gasto"]},
    {"desc": "Estacionamiento centro",       "min": 2_000,  "max": 6_000,   "hint": ["transporte", "auto", "gasto"]},
    {"desc": "Taxi/Uber",                    "min": 3_500,  "max": 12_000,  "hint": ["transporte", "taxi", "gasto"]},
    {"desc": "Almuerzo trabajo",             "min": 3_500,  "max": 8_000,   "hint": ["restaurante", "comida", "alimentacion", "gasto"]},
    {"desc": "Café en Starbucks",            "min": 3_500,  "max": 7_000,   "hint": ["cafe", "restaurante", "gasto"]},
    {"desc": "PedidosYa",                    "min": 8_000,  "max": 22_000,  "hint": ["delivery", "comida", "restaurante", "gasto"]},
    {"desc": "Almuerzo restaurant",          "min": 6_000,  "max": 18_000,  "hint": ["restaurante", "comida", "gasto"]},
    {"desc": "Farmacia Cruz Verde",          "min": 3_000,  "max": 25_000,  "hint": ["farmacia", "salud", "gasto"]},
    {"desc": "Farmacia Salcobrand",          "min": 2_500,  "max": 20_000,  "hint": ["farmacia", "salud", "gasto"]},
    {"desc": "Netflix",                      "min": 8_490,  "max": 8_490,   "hint": ["streaming", "entretenimiento", "gasto"]},
    {"desc": "Spotify",                      "min": 5_990,  "max": 5_990,   "hint": ["streaming", "entretenimiento", "musica", "gasto"]},
    {"desc": "Cine Cinemark",                "min": 5_000,  "max": 10_000,  "hint": ["cine", "entretenimiento", "gasto"]},
    {"desc": "Ropa Zara",                    "min": 15_000, "max": 50_000,  "hint": ["ropa", "vestuario", "gasto"]},
    {"desc": "Ferretería",                   "min": 5_000,  "max": 30_000,  "hint": ["hogar", "ferreteria", "gasto"]},
]

# Gastos que típicamente se pagan con tarjeta de crédito
CREDIT_KEYWORDS = ["Netflix", "Spotify", "Zara", "Starbucks", "Cinemark", "PedidosYa"]

def find_category(categories, hints, fallback_type):
    for hint in hints:
        for cat in categories:
            if hint.lower() in cat.name.lower():
                return cat.id
    for cat in categories:
        if fallback_type.lower() in cat.name.lower():
            return cat.id
    return random.choice([c.id for c in categories])

def random_time(year, month, day):
    return datetime(
        year, month, day,
        random.randint(7, 22),
        random.randint(0, 59),
        random.randint(0, 59),
        tzinfo=timezone.utc
    )

def pick_payment_method(description: str) -> TransactionMethod:
    """Asigna método de pago según el tipo de gasto."""
    if any(k in description for k in CREDIT_KEYWORDS):
        return TransactionMethod.CREDIT
    if any(k in description for k in ["Bencina", "Estacionamiento", "Taxi", "Uber", "Bip"]):
        return TransactionMethod.DEBIT
    return random.choice([TransactionMethod.CASH, TransactionMethod.DEBIT])

def seed_test_user_transactions():
    db = SessionLocal()
    try:
        test_user = db.query(User).filter(User.email == TEST_USER_EMAIL).first()
        if not test_user:
            print(f"❌ No se encontró el usuario con email '{TEST_USER_EMAIL}'.")
            return

        account = db.query(Account).filter(Account.user_id == test_user.id).first()
        if not account:
            print("❌ El usuario no tiene ninguna cuenta creada.")
            return

        categories = db.query(Category).all()
        if not categories:
            print("❌ No hay categorías creadas.")
            return

        print(f"👤 Usuario: {test_user.email}")
        print(f"🏦 Cuenta:  {account.id}")
        print("🧹 Borrando transacciones anteriores...")
        db.query(Transaction).filter(Transaction.user_id == test_user.id).delete()
        db.commit()

        transactions = []

        months = [
            (2026, 1, 1, 31),
            (2026, 2, 1, 28),
            (2026, 3, 1, 31),
            (2026, 4, 1, 22),
        ]

        for (year, month, day_start, day_end) in months:
            month_name = datetime(year, month, 1).strftime("%B %Y")
            print(f"📅 Generando transacciones para {month_name}...")

            # Sueldo
            salary_day = random.randint(1, 5)
            salary_cat = find_category(categories, ["ingreso", "sueldo", "salario", "trabajo"], "ingreso")
            transactions.append(Transaction(
                user_id        = test_user.id,
                account_id     = account.id,
                category_id    = salary_cat,
                type           = "income",
                amount         = SUELDO,
                title          = "Sueldo mensual",        # ← nuevo campo
                description    = "Ingreso mensual fijo",
                payment_method = TransactionMethod.DEBIT, # ← depósito en cuenta
                card_id        = None,
                created_at     = random_time(year, month, salary_day),
            ))

            # Ahorro
            saving_total = int(SUELDO * random.uniform(0.15, 0.20))
            n_savings    = random.randint(1, 3)
            if n_savings == 1:
                saving_amounts = [saving_total]
            else:
                cuts = sorted(random.sample(range(1, saving_total // 1000), n_savings - 1))
                parts = [cuts[0]] + [cuts[i] - cuts[i-1] for i in range(1, len(cuts))] + [saving_total // 1000 - cuts[-1]]
                saving_amounts = [p * 1000 for p in parts if p > 0]
                saving_amounts[-1] += saving_total - sum(saving_amounts)

            saving_cat = find_category(categories, ["ahorro", "saving", "inversion", "inversión"], "ahorro")
            for i, s_amount in enumerate(saving_amounts):
                s_day = random.randint(day_start + 1, min(day_start + 10, day_end))
                transactions.append(Transaction(
                    user_id        = test_user.id,
                    account_id     = account.id,
                    category_id    = saving_cat,
                    type           = "saving",
                    amount         = -s_amount,
                    title          = f"Ahorro mensual{' (cuota ' + str(i+1) + ')' if n_savings > 1 else ''}",
                    description    = "Transferencia a cuenta de ahorro",
                    payment_method = TransactionMethod.DEBIT,
                    card_id        = None,
                    created_at     = random_time(year, month, s_day),
                ))

            # Gastos
            n_expenses = random.randint(12, 14)
            fixed_keywords   = ["Gastos comunes", "Internet", "Plan celular", "Netflix"]
            fixed_expenses   = [t for t in EXPENSE_TEMPLATES if any(k in t["desc"] for k in fixed_keywords)]
            variable_expenses = [t for t in EXPENSE_TEMPLATES if t not in fixed_expenses]

            selected = list(fixed_expenses)
            pool = list(variable_expenses)
            random.shuffle(pool)
            selected += pool[:n_expenses - len(selected)]

            for tmpl in selected:
                exp_day = random.randint(day_start, day_end)
                amount  = round(random.randint(tmpl["min"], tmpl["max"]) / 100) * 100
                exp_cat = find_category(categories, tmpl["hint"], "gasto")
                method  = pick_payment_method(tmpl["desc"])

                transactions.append(Transaction(
                    user_id        = test_user.id,
                    account_id     = account.id,
                    category_id    = exp_cat,
                    type           = "expense",
                    amount         = amount,
                    title          = tmpl["desc"],         # ← nuevo campo
                    description    = None,                 # opcional
                    payment_method = method,
                    card_id        = None,                 # sin tarjetas aún
                    created_at     = random_time(year, month, exp_day),
                ))

        db.add_all(transactions)
        db.commit()
        print(f"\n✅ Se crearon {len(transactions)} transacciones para '{test_user.email}'.")

    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_test_user_transactions()