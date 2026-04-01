# Usamos la imagen de Python que ya tienes
FROM python:3.11-slim

# Instalamos pipenv en el contenedor
RUN pip install pipenv

WORKDIR /app

# Copiamos los archivos de Pipenv
COPY Pipfile Pipfile.lock ./

# Instalamos las dependencias directamente en el sistema del contenedor
# --system le dice a Pipenv que no cree otro entorno virtual dentro de Docker
RUN pipenv install --system --deploy

# Copiamos el resto del código
COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]