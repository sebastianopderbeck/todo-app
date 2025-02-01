from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class Task(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    title: str
    description: str
    status: str  # "pending" | "in-progress" | "completed"
    order: int

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
