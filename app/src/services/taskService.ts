import axios from "axios";
import { Task } from "../types/taskTypes";

const TASK_API_URL = "http://0.0.0.0:8000/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(TASK_API_URL);
    return response.data;
};

export const createTask = async (task: Omit<Task, "_id">): Promise<Task> => {
    const response = await axios.post<Task>(TASK_API_URL, task);
    return response.data;
};

export const updateTask = async (updatedTask: Task): Promise<Task> => {
    const response = await axios.put<Task>(`${TASK_API_URL}/${updatedTask._id}`, updatedTask);
    return response.data;
};

export const deleteTask = async (_id: string): Promise<void> => {
    await axios.delete(`${TASK_API_URL}/${_id}`);
};
