# Proyecto con Docker Compose

Este proyecto utiliza **Docker Compose** para configurar y ejecutar un entorno de desarrollo completo con **Frontend (Bun + React)**, **Backend (FastAPI + Python)** y **MongoDB**.

## 📌 Requisitos previos
Asegúrate de tener instalado en tu sistema:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 📂 Estructura del Proyecto
```
./
├── app/            # Código del frontend (Bun + React)
│   ├── Dockerfile  # Dockerfile del frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/         # Código del backend (FastAPI + Python)
│   ├── Dockerfile  # Dockerfile del backend
│   ├── main.py     # Archivo principal de FastAPI
│   ├── requirements.txt  # Dependencias de Python
│   └── ...
│
├── docker-compose.yml  # Definición de los servicios con Docker Compose
└── README.md  # Documentación del proyecto
```

## 🚀 Cómo ejecutar el proyecto

1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. **Levantar los contenedores**
   ```sh
   docker-compose up --build
   ```

3. **Acceder a las aplicaciones**
    - **Frontend:** [http://localhost:9001](http://localhost:9001)
    - **Backend (FastAPI docs):** [http://localhost:8000/docs](http://localhost:8000/docs)
    - **MongoDB (puerto expuesto):** `27017`

## 📦 Descripción de los Servicios

### **Frontend (Bun + React)**
- Ubicado en la carpeta `app/`.
- Usa el `bun` como gestor de paquetes y entorno de ejecución.
- Expone el puerto `9001`.
- Se ejecuta con:
  ```sh
  bun run dev
  ```

### **Backend (FastAPI + Python)**
- Ubicado en la carpeta `server/`.
- Usa `uvicorn` como servidor ASGI.
- Conectado a MongoDB.
- Expone el puerto `8000`.
- Se ejecuta con:
  ```sh
  uvicorn main:app --host 0.0.0.0 --port 8000
  ```

### **MongoDB**
- Usa la imagen oficial `mongo:latest`.
- Guarda los datos en un volumen persistente `mongo_data`.
- Expone el puerto `27017`.

## 🛠 Comandos Útiles

### **Levantar y reconstruir los contenedores**
```sh
docker-compose up --build
```

### **Detener los contenedores**
```sh
docker-compose down
```

### **Eliminar los volúmenes (borrar datos de MongoDB)**
```sh
docker-compose down -v
```

### **Ver logs en tiempo real**
```sh
docker-compose logs -f
```
