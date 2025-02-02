import React, { useEffect, useState, createContext, useContext } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import { Task } from "../types/taskTypes";

const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async (task: Omit<Task, "_id">) => {
        try {
            const newTask = await createTask(task);
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const modifyTask = async (updatedTask: Task) => {
        try {
            const task = await updateTask(updatedTask);
            setTasks((prevTasks) => prevTasks.map((t) => (t._id === task._id ? task : t)));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const removeTask = async (_id: string) => {
        try {
            await deleteTask(_id);
            setTasks(tasks.filter((task) => task._id !== _id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, modifyTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};

export default TaskProvider;
