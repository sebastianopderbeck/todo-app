from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  # Cargar variables de entorno desde .env

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = MongoClient(MONGO_URL)
db = client["todo_db"]  # Base de datos
tasks_collection = db["tasks"]  # Colección de tareas
