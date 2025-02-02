from fastapi import HTTPException
from services.taskService import get_tasks, get_task_by_id, create_task, update_task, delete_task
from models.taskModel import Task

async def get_all_tasks():
    tasks = await get_tasks()
    return sorted(tasks, key=lambda t: t.order)

async def get_task(task_id: str):
    task = await get_task_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

async def add_task(task: Task):
    return await create_task(task)

async def edit_task(task_id: str, task_data: dict):
    task = Task(**task_data)
    return await update_task(task_id, task.model_dump(exclude_unset=True))

async def remove_task(task_id: str):
    task = await get_task_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    await delete_task(task_id)
    return {"message": "Task deleted successfully"}
