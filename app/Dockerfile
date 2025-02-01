# Usa la imagen de Bun
FROM oven/bun:1.0

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración primero
COPY package.json bun.lockb ./

# Instala las dependencias
RUN bun install

# Copia el resto del código
COPY . .

# Expone el puerto de Vite
EXPOSE 5173

# Comando por defecto para desarrollo
CMD ["bun", "run", "dev"]
