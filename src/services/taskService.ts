import axios from "axios";
import type { Task, CreateTaskData, UpdateTaskData} from "../types/task";

axios.defaults.baseURL = "https://62584f320c918296a49543e7.mockapi.io";

export const getTasks = async (counter: number): Promise<Task[]> => {
    console.log(counter);
    
    const res = await axios.get<Task[]>("/tasks");
    return res.data;
};

export const createTask = async (data: CreateTaskData): Promise<Task> => {
    const res = await axios.post<Task>("/tasks", data);
    return res.data;
};

export const deleteTask = async (id: Task["id"]): Promise<void>=> {
    await axios.delete(`/tasks/${id}`);
};

export const updateTask = async (id: Task["id"], data: UpdateTaskData) => {
    const res = await axios.put<Task>(`/tasks/${id}`, data);
    return res.data;
};