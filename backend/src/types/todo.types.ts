// shape of data we expect when user creates a todo
export interface ICreateTodoBody{
    title: string;
}

// shape of data we expect when user updates a todo
export interface IUpdateTodoBody{
    title?: string; // optional, user might only update one field
    completed?: boolean; // optional, user might only update one field
}

