import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {useTasks} from "./taskProvider.tsx";
import {useState} from "react";

export const NewTask = () => {
    const { createTask } = useTasks();
    const [newTask, setNewTask] = useState({ title: '', description: '', status: '', order: 0 });
    const canAdd = !newTask.title || !newTask.status;
    return (
        <div className="flex gap-4">
            <TextField
                label="Title"
                variant="outlined"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full"
            />
            <TextField
                label="Description"
                variant="outlined"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full"
            />
            <FormControl className="!max-w-48" fullWidth variant="standard">
                <InputLabel id="select-status">Status</InputLabel>
                <Select
                    labelId="select-status"
                    id="select-status-id"
                    value={newTask.status}
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>
            </FormControl>
            <Button
                className="!min-w-36"
                variant="contained"
                onClick={() => createTask(newTask)}
                startIcon={<AddCircle/>}
                disabled={canAdd}
            >
                Add Task
            </Button>
        </div>
    )
}