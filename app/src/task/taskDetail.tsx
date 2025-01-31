import React, { useState } from "react";
import { Checkbox, TextField } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useTasks } from "./taskProvider.tsx";

export const TaskDetail = (task) => {
    const { updateTask, deleteTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex items-center justify-between p-1 w-full hover:bg-blue-100">
            <div className="flex items-center justify-center gap-2 w-full cursor-pointer" onClick={() => setIsEditing(true)}>
                <Checkbox
                    checked={task.status === "completed"}
                    onChange={() => updateTask({ ...task, status: task.status === "completed" ? "pending" : "completed" })}
                />

                <div className="w-full">
                    {isEditing ? (
                        <div className="flex flex-col gap-2">
                            <TextField
                                label={"title"}
                                variant="standard"
                                name="title"
                                value={editedTask.title}
                                onChange={handleEditChange}
                                autoFocus
                            />
                            <TextField
                                label={"description"}
                                variant="standard"
                                name="description"
                                value={editedTask.description}
                                onChange={handleEditChange}
                            />
                        </div>
                    ) : (
                        <div onClick={() => setIsEditing(true)}>
                            <p className="text-sm font-medium">{task.title}</p>
                            <p className="text-xs text-gray-600">{task.description}</p>
                        </div>
                    )}
                </div>
                <DeleteOutline className="hover:text-sky-900 text-sky-700 cursor-pointer" onClick={() => deleteTask(task.id)}/>
            </div>
        </div>
    );
};
