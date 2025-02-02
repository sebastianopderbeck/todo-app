from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId
from typing import Literal

class Task(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    title: str
    description: str
    status: Literal["pending", "in-progress", "completed"]
    order: int
