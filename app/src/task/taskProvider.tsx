import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import {random} from "lodash";

type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus
    order: number;
}

const API_URL = "http://localhost:8000/tasks";

const TaskContext = createContext<any>(null);

const Task = [{id: 1, title: "asd1", description: "pending", order: 1, status: "pending"},
    {id: 2, title: "asd2", description: "progress", order: 2, status: "in-progress"},
    {id: 3, title: "asd3", description: "completed", order: 3, status: "completed"},
    {id: 4, title: "asd4", description: "completed 2", order: 1, status: "completed"},]

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks(Task);
        //axios.get(API_URL).then((res) => setTasks(res.data));
    }, []);

    const createTask = async (task: Omit<Task, "id">) => {
        setTasks([...tasks, { ...task, id: crypto.randomUUID() }]); // Generar ID único
    };

    const updateTask = async (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? { ...updatedTask } : task))
        );
    };

    const deleteTask = async (id: string) => {
        //await axios.delete(${API_URL}/${id});
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask}}>
            {children}
        </TaskContext.Provider>
    );
};


export const useTasks = () => {
    return useContext(TaskContext);
}

export default TaskProvider