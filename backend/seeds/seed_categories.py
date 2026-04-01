from app.db.session import SessionLocal
from app.models.category import Category  # Asegúrate de que la ruta sea correcta

def seed_categories():
    # Lista de tus categorías
    categories_names = [
        "Alimentos", "Transporte", "Hogar", "Salud", 
        "Ocio", "Mascotas", "Compras", "Fijos", "Otros"
    ]
    
    db = SessionLocal()
    try:
        print("Sembrando categorías...")
        for name in categories_names:
            # Verificamos si ya existe para no duplicar si corres el script 2 veces
            exists = db.query(Category).filter(Category.name == name).first()
            if not exists:
                new_category = Category(name=name)
                db.add(new_category)
                print(f"✅ Categoría creada: {name}")
            else:
                print(f"🟡 La categoría '{name}' ya existe, saltando...")
        
        db.commit()
        print("\n¡Semilla plantada con éxito! 🌱")
    except Exception as e:
        print(f"❌ Error al sembrar: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_categories()