import React from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { useState } from "react";
import {useTasks} from "../context/taskProvider";
import {Task} from "../types/taskTypes";

const DEFAULT_TASK: Omit<Task, "_id"> = { title: "", description: "", status: "pending", order: 0 };

export const NewTask: React.FC = () => {
    const [newTask, setNewTask] = useState<Omit<Task, "_id">>(DEFAULT_TASK);
    const { addTask } = useTasks();
    const canAdd = !newTask.title || !newTask.status;

    const handleCreate = () => {
        addTask(newTask);
        setNewTask(DEFAULT_TASK);
    };

    return (
        <div className="grid grid-cols-3 gap-4">
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
            <div className="flex gap-4">
                <FormControl className="!min-w-48" fullWidth variant="standard">
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

        </div>
    );
};
