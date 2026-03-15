from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine, Base

# Importamos los modelos para que SQLAlchemy los reconozca al crear las tablas
from app.models import (
    user, account, category, transaction, 
    transaction_debt, cycle, friend, tag, transaction_tag
)

# Importar routers
from app.api.v1.endpoints import transactions

# Crear tablas (Solo para desarrollo inicial)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Finanzas API", version="1.0.0")

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambiar por ["http://tu-dominio.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro de Rutas
app.include_router(transactions.router, prefix="/api/v1")

@app.get("/", tags=["Root"])
def root():
    return {"message": "API Finanzas funcionando", "docs": "/docs"}