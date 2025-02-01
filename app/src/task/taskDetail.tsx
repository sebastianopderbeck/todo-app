import React, { useState } from "react";
import { Checkbox, TextField, IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useTasks } from "./taskProvider.tsx";

export const TaskDetail = ({ id, title, description, status }) => {
    const { updateTask, deleteTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ id, title, description, status });

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        updateTask(editedTask);
        setIsEditing(false);
    };
    return (
            <div className="flex items-center p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100">
                <Checkbox
                    checked={status === "completed"}
                    onChange={() => updateTask({ ...editedTask, status: "completed" })}
                />
                <div className="w-full">
                    {isEditing ? (
                        <div className="flex flex-col gap-1">
                            <TextField
                                variant="standard"
                                name="title"
                                value={editedTask.title}
                                onChange={handleEditChange}
                                onBlur={handleSave}
                                autoFocus
                            />
                            <TextField
                                variant="standard"
                                name="description"
                                value={editedTask.description}
                                onChange={handleEditChange}
                                onBlur={handleSave}
                            />
                        </div>
                    ) : (
                        <div className="cursor-pointer w-full" onClick={() => setIsEditing(true)}>
                            <p className="text-sm font-medium">{title}</p>
                            <p className="text-xs text-gray-500">{description}</p>
                        </div>
                    )}
                </div>

                <IconButton onClick={() => deleteTask(id)}>
                    <DeleteOutline className="text-sky-700 hover:text-sky-800" />
                </IconButton>
            </div>
    );
};
