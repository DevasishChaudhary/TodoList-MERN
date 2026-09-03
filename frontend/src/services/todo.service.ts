import axiosInstance from "./axios.config"; // our custom axios instance with base URL and token interceptor
import type { ICreateTodo, IUpdateTodo, ITodoResponse} from "../types";

//GET ALL TODOS
//fetches all todos for logged in user
export const getTodos= async (): Promise<ITodoResponse>=>{
    const response= await axiosInstance.get<ITodoResponse>("/todos");
    return response.data;
};

//CREATE TODO
//sends new todo data to backend
export const createTodo= async (todoData: ICreateTodo): Promise<ITodoResponse>=>{
    const response= await axiosInstance.post<ITodoResponse>("/todos", todoData);
    return response.data;
};

//UPDATE TODO
//sends update todo data to backend
export const updateTodo= async (id: string, todoData: IUpdateTodo): Promise<ITodoResponse>=>{
    const response= await axiosInstance.put<ITodoResponse>(`/todos/${id}`, todoData);
    return response.data;
}


//DELETE TODO
//sends delete request to backend
export const deleteTodo= async (id: string): Promise<ITodoResponse>=>{
    const response= await axiosInstance.delete<ITodoResponse>(`/todos/${id}`);
    return response.data;
}