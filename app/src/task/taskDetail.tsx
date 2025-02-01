import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { TextField, Button } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import { useTasks } from "./taskProvider.tsx";

interface TaskProps {
    id: string;
    title: string;
    description: string;
    status: string;
}

export const TaskDetail: React.FC<TaskProps> = ({ id, title, description, status }) => {
    const { updateTask, deleteTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ id, title, description, status });
    const [originalTask, setOriginalTask] = useState({ id, title, description, status });
    const taskRef = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id, title, description, status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: !isEditing,
    }));

    const handleEditChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setEditedTask((prev) => ({ ...prev, [e.target.name as string]: e.target.value }));
    };

    const handleSave = () => {
        updateTask(editedTask);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTask(originalTask);
        setIsEditing(false);
    };

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
    }, [isEditing]);

    return (
        <div
            ref={taskRef}
            className={`flex items-center p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition ${
                isDragging ? "opacity-50" : "opacity-100"
            }`}
            onClick={() => !isEditing && setIsEditing(true)}
        >
            {/* Drag Handle separado */}
            {!isEditing && (
                <div ref={drag} className="cursor-move p-2" onClick={(e) => e.stopPropagation()}>
                    <DragIndicator className="text-gray-500" />
                </div>
            )}

            <div className="w-full cursor-pointer">
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
                    <div className="w-full">
                        <p className="text-sm font-medium">{title}</p>
                        <p className="text-xs text-gray-500">{description}</p>
                    </div>
                )}
            </div>

            {isEditing && (
                <div className="fixed bottom-0 left-0 w-full bg-white p-3 shadow-md border-t border-gray-300 flex justify-end gap-4">
                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        className="text-blue-400 text-sm !capitalize underline cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => deleteTask(id)}
                        color="error"
                        variant="contained"
                        className="text-sm !capitalize"
                    >
                        Delete
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained" className="text-sm !capitalize">
                        Save
                    </Button>

                </div>
            )}
        </div>
    );
};
