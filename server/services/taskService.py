from models.taskModel import Task
from database import tasks_collection
from bson import ObjectId

async def get_tasks():
    return [Task(**{**task, "_id": str(task["_id"])}) for task in tasks_collection.find()]

async def get_task_by_id(task_id: str):
    task = tasks_collection.find_one({"_id": ObjectId(task_id)})
    if task:
        task["_id"] = str(task["_id"])
        return Task(**task)
    return None

async def create_task(task: Task):
    task_dict = task.dict(by_alias=True, exclude={"id"})  # Convertir Task a dict sin `id`
    result = tasks_collection.insert_one(task_dict)  # Insertar en MongoDB

    # 🔹 Agregar el ID generado por MongoDB como string
    task_dict["_id"] = str(result.inserted_id)

    return task_dict  # ✅ Retornar solo datos serializables

async def update_task(task_id: str, task_data: dict):
    tasks_collection.update_one({"_id": ObjectId(task_id)}, {"$set": task_data})
    return await get_task_by_id(task_id)

async def delete_task(task_id: str):
    tasks_collection.delete_one({"_id": ObjectId(task_id)})
    return True
