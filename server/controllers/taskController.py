from fastapi import HTTPException
from services.taskService import get_tasks, get_task_by_id, create_task, update_task, delete_task
from models.taskModel import Task
from typing import List

async def get_all_tasks():
    tasks = await get_tasks()
    return sorted(tasks, key=lambda t: t.order)

async def get_task(task_id: str):
    task = await get_task_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

async def add_task(task: Task):
    if not task.title.strip():
        raise HTTPException(status_code=400, detail="Title cannot be empty")

    if task.status not in ["pending", "in-progress", "completed"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    tasks = await get_tasks()
    tasks_in_status = [t for t in tasks if t.status == task.status]
    task.order = len(tasks_in_status) + 1

    return await create_task(task)

async def edit_task(task_id: str, task_data: dict):
    task_data.pop("_id", None)

    if not task_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    existing_task = await get_task_by_id(task_id)
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")

    previous_status = existing_task.status
    updated_task = existing_task.copy(update=task_data)

    if updated_task.status != previous_status:
        await reorder_tasks_within_status(previous_status)

    result = await update_task(task_id, updated_task.dict(exclude_unset=True))

    await reorder_tasks_within_status(updated_task.status)

    return result

async def remove_task(task_id: str):
    task = await get_task_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    await delete_task(task_id)

    await reorder_tasks_within_status(task.status)

    return {"message": "Task deleted successfully"}

async def reorder_tasks_within_status(status: str):
    tasks = await get_tasks()
    tasks_in_status = sorted([t for t in tasks if t.status == status], key=lambda t: t.order)

    for index, task in enumerate(tasks_in_status):
        if task.order != index + 1:
            task.order = index + 1
            await update_task(task.id, {"order": task.order})
