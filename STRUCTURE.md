# 📂 Project Structure: Finance Tracker App

This project follows a **Monorepo** architecture with a strict separation between Frontend and Backend, orchestrated using **Docker**.

---

## 🖥️ Frontend (React + Vite + TypeScript)

Location: `/frontend`

Built with a **Feature-based** architecture for maximum scalability:

- **`src/api/`**: Centralized Axios configuration and Interceptors for JWT handling.
- **`src/components/`**:
  - `ui/`: Reusable atomic UI components (Buttons, Inputs, Modals).
  - `layout/`: Global structure (Navbar, Sidebar, Footer).
- **`src/features/`**: **(Logical Layer)** Domain-driven folders containing specific components, hooks, and services.
  - `auth/`: Login, Register, and password recovery.
  - `transactions/`: Income and expense management.
  - `dashboard/`: Data visualization and charts.
- **`src/store/`**: Global state management using **Zustand**.
- **`src/hooks/`**: Global custom hooks (e.g., `useAuth`, `useDebounce`).
- **`src/types/`**: TypeScript interfaces to ensure financial data integrity.

---

## ⚙️ Backend (FastAPI + SQLAlchemy + PostgreSQL)

Location: `/backend`

Following the **Repository-Service-Controller** pattern:

- **`app/api/v1/endpoints/`**: **(Controllers)** Route definitions and request handling. Manages HTTP communication.
- **`app/services/`**: **(Business Logic Layer)** Contains complex logic, validations, and calculations.
- **`app/repositories/`**: **(Data Access Layer)** The only place where direct database queries (SQLAlchemy) are executed.
- **`app/models/`**: SQLAlchemy Database models (Tables definition).
- **`app/schemas/`**: Pydantic Schemas for data validation (Input/Output contracts).
- **`app/db/`**: Connection setup, engine configuration, and session generator (`get_db`).
- **`app/core/`**: Global configurations, security settings, and environment variables.

---

## 🐳 Infrastructure (Docker)

- **`docker-compose.yml`**: Orchestrator for three main services:
  1.  `db`: Local PostgreSQL database (mapped to port 5433).
  2.  `backend`: FastAPI API with Hot-Reload (port 8000).
  3.  `frontend`: React/Vite app with Hot-Reload (port 5173).

---

## 🛠️ Quick Start

- **Run everything**: `docker-compose up --build`
- **API Documentation**: `http://localhost:8000/docs`
- **Web Access**: `http://localhost:5173`
