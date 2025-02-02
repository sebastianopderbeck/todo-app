import pytest
import pytest_asyncio
from httpx import AsyncClient
from fastapi import FastAPI
from services.taskService import create_task, get_task_by_id, delete_task
from routes.taskRoutes import router
from models.taskModel import Task

app = FastAPI()
app.include_router(router)

@pytest_asyncio.fixture
async def client():
    async with AsyncClient(base_url="http://0.0.0.0:8000/api") as ac:
        yield ac

@pytest_asyncio.fixture
async def sample_task():
    task_data = Task(title="Test Task", description="Test Description", status="pending", order=1)
    created_task = await create_task(task_data)
    yield created_task if isinstance(created_task, dict) else created_task.dict()
    await delete_task(created_task["_id"])


@pytest.mark.asyncio
async def test_get_all_tasks(client):
    response = await client.get("/tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_create_task(client):
    task_data = {"title": "New Task", "description": "New Description", "status": "pending", "order": 1}
    response = await client.post("/tasks", json=task_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "New Task"
    await delete_task(data['_id'])

@pytest.mark.asyncio
async def test_get_task_by_id(client, sample_task):
    response = await client.get(f"/tasks/{sample_task['_id']}")
    assert response.status_code == 200
    assert response.json()["title"] == "Test Task"

@pytest.mark.asyncio
async def test_edit_task(client, sample_task):
    updated_data = {"title": "Updated Task"}
    response = await client.put(f"/tasks/{sample_task['_id']}", json=updated_data)
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Task"

@pytest.mark.asyncio
async def test_delete_task(client, sample_task):
    response = await client.delete(f"/tasks/{sample_task['_id']}")
    assert response.status_code == 200
    response = await client.get(f"/tasks/{sample_task['_id']}")
    assert response.status_code == 404
