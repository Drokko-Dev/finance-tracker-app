from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Definimos qué variables esperamos
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Esta es la sintaxis moderna de Pydantic V2 para leer el .env
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

# Instanciamos la clase
settings = Settings()