from pydantic import BaseModel, Field
from typing import Optional, Literal

class Task(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str = Field(..., min_length=1, max_length=100, description="Title is required")
    description: Optional[str] = Field(None, max_length=500)
    status: Literal["pending", "in-progress", "completed"] = Field(..., description="Status is required")
    order: int = Field(..., ge=0, description="Order must be a positive integer")

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    }
