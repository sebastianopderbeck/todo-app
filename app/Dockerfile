# Usa la imagen oficial de Node.js 22 con soporte para Bun
FROM oven/bun:1.1.5

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración primero
COPY package.json bun.lockb ./

# Instala las dependencias con Bun si está disponible, de lo contrario usa npm
RUN bun install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto de Vite
EXPOSE 9001

# Comando por defecto: usa Bun si está instalado, de lo contrario usa npm
CMD ["bun", "run", "dev"]