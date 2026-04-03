📂 Estructura del Proyecto: Finanzas App
Este proyecto utiliza una arquitectura de Monorepo con separación total entre el Frontend y el Backend, orquestado mediante Docker.

🖥️ Frontend (React + Vite + TypeScript)
Localización: /frontend

Estructura basada en Features (Dominios de negocio) para máxima escalabilidad:

src/api/: Configuración centralizada de Axios e Interceptores para el manejo del Token JWT.

src/components/:

ui/: Componentes atómicos reutilizables (Botones, Inputs, Modales).

layout/: Estructura global (Navbar, Sidebar, Footer).

src/features/: (Capa Lógica) Cada carpeta contiene componentes, hooks y servicios específicos de una funcionalidad.

auth/: Login, Registro y recuperación de contraseña.

transactions/: Gestión de ingresos y gastos.

dashboard/: Visualización de datos y gráficos.

src/store/: Gestión de estado global con Zustand, tanStack.

src/hooks/: Hooks personalizados globales (ej. useAuth, useDebounce).

src/types/: Definiciones de interfaces de TypeScript para asegurar la integridad de los datos financieros.

⚙️ Backend (FastAPI + SQLAlchemy + PostgreSQL)
Localización: /backend

Estructura siguiendo el patrón Repository-Service-Controller:

app/api/v1/endpoints/: (Controllers) Definición de rutas y entrada de peticiones. Solo gestiona la comunicación HTTP.

app/services/: (Capa de Negocio) Contiene la lógica compleja, validaciones y cálculos antes de persistir datos.

app/repositories/: (Capa de Datos) Único lugar donde se realizan consultas directas a la base de datos (SQLAlchemy queries).

app/models/: Definición de tablas de la base de datos (SQLAlchemy Models).

app/schemas/: Definición de contratos de entrada y salida de datos (Pydantic Schemas).

app/db/: Configuración de la conexión, motor de base de datos y generador de sesiones (get_db).

app/core/: Configuraciones globales, seguridad y variables de entorno.

🐳 Infraestructura (Docker)
docker-compose.yml: Orquestador que levanta tres servicios:

db: Base de datos PostgreSQL local (mapeada al puerto 5433).

backend: API de FastAPI con Hot-Reload (puerto 8000).

frontend: App de React/Vite con Hot-Reload (puerto 5173).

🛠️ Comandos Rápidos
Levantar todo: docker-compose up --build

Documentación API: http://localhost:8000/docs

Acceso Web: http://localhost:5173
