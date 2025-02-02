import axios from "axios";
import { Task } from "../types/taskTypes";

const API_URL = "http://backend:8000/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
    const response = await axios.post<Task>(API_URL, task);
    return response.data;
};

export const updateTask = async (updatedTask: Task): Promise<Task> => {
    const response = await axios.put<Task>(`${API_URL}/${updatedTask.id}`, updatedTask);
    return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
