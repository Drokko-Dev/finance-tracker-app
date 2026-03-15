# Imagen base
FROM node:22

# Carpeta de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer puerto de Vite
EXPOSE 5173

# Iniciar servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host"]