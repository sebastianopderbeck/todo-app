import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import {Task, useTasks} from "./taskProvider.tsx";
import { useState } from "react";

const DEFAULT_TASK: Omit<Task, "id"> = { title: "", description: "", status: "pending", order: 0 };

export const NewTask: React.FC = () => {
    const [newTask, setNewTask] = useState<Omit<Task, "id">>(DEFAULT_TASK);
    const { createTask } = useTasks();
    const canAdd = !newTask.title || !newTask.status;

    const handleCreate = () => {
        createTask(newTask);
        setNewTask(DEFAULT_TASK);
    };

    return (
        <div className="flex gap-4">
            <TextField
                label="Title"
                variant="outlined"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full"
            />
            <TextField
                label="Description"
                variant="outlined"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full"
            />
            <FormControl className="!max-w-48" fullWidth variant="standard">
                <InputLabel id="select-status">Status</InputLabel>
                <Select
                    labelId="select-status"
                    id="select-status-id"
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TaskStatus })}
                >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>
            </FormControl>
            <Button
                className="!min-w-36"
                variant="contained"
                onClick={handleCreate}
                startIcon={<AddCircle />}
                disabled={canAdd}
            >
                Add Task
            </Button>
        </div>
    );
};
