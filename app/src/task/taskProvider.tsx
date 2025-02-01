import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

// Task type interface
export interface Task {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    order: number;
}

// API base URL
const API_URL = "http://localhost:8000/tasks";

// Context for global state management
const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Fetch tasks from backend
    useEffect(() => {
        setTasks([
            {id: 1, title: "asd1", description: "pending", order: 1, status: "pending"},
            {id: 2, title: "asd2", description: "progress", order: 2, status: "in-progress"},
            {id: 3, title: "asd3", description: "completed", order: 3, status: "completed"},
            {id: 4, title: "asd4", description: "completed 2", order: 1, status: "completed"},
        ])
        //axios.get(API_URL).then((res) => setTasks(res.data));
    }, []);

    // Create a task
    const createTask = async (task: Omit<Task, "id">) => {
        const res = await axios.post(API_URL, task);
        setTasks([...tasks, res.data]);
    };

    // Update a task
    const updateTask = async (id: string, updatedTask: Partial<Task>) => {
        await axios.put(`${API_URL}/${id}`, updatedTask);
        setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
    };

    // Delete a task
    const deleteTask = async (id: string) => {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Reorder tasks
    const reorderTasks = (newOrder: Task[]) => {
        setTasks(newOrder);
    };

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask, reorderTasks }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTasks = () => {
    return useContext(TaskContext);
}

export default TaskProvider