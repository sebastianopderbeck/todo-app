import React, { useRef, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useTasks } from "../context/taskProvider";
import { Task } from "../types/taskTypes";

interface TaskDetailProps {
    task: Task;
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;
}

export const TaskDetail: React.FC<TaskDetailProps> = ({ task, isEditing, setIsEditing }) => {
    const { modifyTask, removeTask } = useTasks();
    const [editedTask, setEditedTask] = useState<Task>({ ...task }); // Estado local para edición
    const taskRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (taskRef.current && !taskRef.current.contains(event.target as Node)) {
                setIsEditing(false);
            }
        };

        if (isEditing) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing, setIsEditing]);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        modifyTask(editedTask);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTask({ ...task });
        setIsEditing(false);
    };

    return (
        <div ref={taskRef} className="relative flex flex-col p-2 bg-white rounded-e-lg shadow-sm w-full" onClick={() => !isEditing && setIsEditing(true)}>
            <div className="w-full">
                {isEditing ? (
                    <div className="flex flex-col gap-2">
                        <TextField
                            label="Título"
                            variant="standard"
                            name="title"
                            value={editedTask.title}
                            onChange={handleEditChange}
                            autoFocus
                        />
                        <TextField
                            label="Descripción"
                            variant="standard"
                            name="description"
                            value={editedTask.description}
                            onChange={handleEditChange}
                        />
                    </div>
                ) : (
                    <div>
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.description}</p>
                    </div>
                )}
            </div>

            {isEditing && (
                <div className="fixed bottom-0 left-0 w-full bg-white p-3 text-sm shadow-md border-t border-gray-300 flex justify-end gap-4">
                    <Button variant="outlined" onClick={handleCancel} color="info" className="!capitalize">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => removeTask(task._id)} color="error" className="!capitalize">
                        Delete
                    </Button>
                    <Button variant="contained" onClick={handleSave} color="primary" className="!capitalize">
                        Save
                    </Button>
                </div>
            )}
        </div>
    );
};
