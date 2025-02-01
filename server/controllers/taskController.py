from fastapi import HTTPException
from services.taskService import get_tasks, get_task_by_id, create_task, update_task, delete_task
from models.taskModel import Task

async def get_all_tasks():
    return await get_tasks()

async def get_task(task_id: str):
    task = await get_task_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

async def add_task(task: Task):
    return await create_task(task)

async def edit_task(task_id: str, task: dict):
    return await update_task(task_id, task)

async def remove_task(task_id: str):
    if not await delete_task(task_id):
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
