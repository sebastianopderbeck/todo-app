from fastapi import APIRouter
from controllers.taskController import get_all_tasks, get_task, add_task, edit_task, remove_task
from models.taskModel import Task

router = APIRouter()

router.get("/tasks")(get_all_tasks)
router.get("/tasks/{task_id}")(get_task)
router.post("/tasks")(add_task)
router.put("/tasks/{task_id}")(edit_task)
router.delete("/tasks/{task_id}")(remove_task)
