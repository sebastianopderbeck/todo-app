from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://mongo:27017/")
DB_NAME = os.getenv("DB_NAME", "task_db")

client = MongoClient(MONGO_URL)
db = client[DB_NAME]
tasks_collection = db["tasks"]