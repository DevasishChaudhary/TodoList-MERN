//USER TYPES
export interface IUser {
    id: string;
    name: string;
    emmail: string;
}

//AUTH TYPES
export interface ISignupData {
    name: string;
    email: string;
    password: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IAuthResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: IUser;
    };
}

//TODO TYPES
export interface ITodo {
    _id: string;
    title: string;
    completed: boolean;
    userId: string;
    createdAt: string;
}

export interface ICreateTodo{
    title: string;
}

export interface IUpdateTodo{
    title?: string;
    completed?: boolean;
}

export interface ITodoResponse {
    success: boolean;
    message: string;
    data: ITodo | ITodo[]
}