from pydantic import BaseModel, Field
from typing import Optional, Literal

class Task(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str
    description: str
    status: Literal["pending", "in-progress", "completed"]
    order: int

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    }
