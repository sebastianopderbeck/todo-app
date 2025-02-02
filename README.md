# Project with Docker Compose

This project uses **Docker Compose** to set up and run a complete development environment with **Frontend (Bun + React)**, **Backend (FastAPI + Python)**, and **MongoDB**.

## 📌 Prerequisites
Make sure you have installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 📂 Project Structure
```
./
├── app/            # Frontend code (Bun + React)
│   ├── Dockerfile  # Frontend Dockerfile
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/         # Backend code (FastAPI + Python)
│   ├── Dockerfile  # Backend Dockerfile
│   ├── main.py     # Main FastAPI file
│   ├── requirements.txt  # Python dependencies
│   └── ...
│
├── docker-compose.yml  # Service definitions with Docker Compose
└── README.md  # Project documentation
```

## 🚀 How to Run the Project

1. **Clone the repository**
   ```sh
   git clone https://github.com/sebastianopderbeck/todo-app.git
   cd your-repo
   ```

2. **Start the containers**
   ```sh
   docker-compose up --build
   ```

3. **Access the applications**
    - **Frontend:** [http://localhost:9001](http://localhost:9001)
    - **Backend (FastAPI docs):** [http://localhost:8000/docs](http://localhost:8000/docs)
    - **MongoDB (exposed port):** `27017`

## 📦 Service Description

### **Frontend (Bun + React)**
- Located in the `app/` folder.
- Uses `bun` as the package manager and runtime.
- Exposes port `9001`.
- Runs with:
  ```sh
  bun run dev
  ```

### **Backend (FastAPI + Python)**
- Located in the `server/` folder.
- Uses `uvicorn` as the ASGI server.
- Connected to MongoDB.
- Exposes port `8000`.
- Runs with:
  ```sh
  uvicorn main:app --host 0.0.0.0 --port 8000
  ```

### **MongoDB**
- Uses the official `mongo:latest` image.
- Stores data in a persistent volume `mongo_data`.
- Exposes port `27017`.

## 🛠 Useful Commands

### **Start and rebuild containers**
```sh
docker-compose up --build
```

### **Stop containers**
```sh
docker-compose down
```

### **Remove volumes (delete MongoDB data)**
```sh
docker-compose down -v
```

### **View real-time logs**
```sh
docker-compose logs -f
```

