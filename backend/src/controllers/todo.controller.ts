import { Request, Response } from "express";
// import {todoService} from "../services/todo.service"; // service (we create next)  // for using class in services
import {SgetTodos, ScreateTodo, SupdateTodo, SdeleteTodo} from "../services/todo.service"; // service (we create next)  

//GET ALL TODOS
export const getTodos= async (req: Request, res:Response):Promise<void>=>{
    try{
        const userId= req.user!.userId; //get logged in user's id from token

        // const todos= await todoService.getTodos(userId); //call service  //when services is written in class
        const todos= await SgetTodos(userId); //call service  //when services is written in function

        res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            data: todos,
        });
    }catch(error:any){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//CREATE TODO
export const createTodo= async (req: Request, res: Response): Promise<void>=>{
    try{
        const userId= req.user!.userId; //get logged in user's id from token
        const {title}= req.body; //get title from request body

        // const todo= await todoService.createTodo({title, userId}); // call service  //when services is written in class
        const todo= await ScreateTodo({title, userId}); // call service  //when services is written in function

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo,
        });
    }catch(error:any){
        res.status(400).json({
            success: false,
            message: error.message
        });
    };
}

//UPDATE TODO
export const updateTodo= async(req: Request, res: Response): Promise<void>=>{
    try{
        const userId= req.user!.userId; //get logged in user's id
        const id= req.params.id  as string; //get todo id from URL    // ← fix: tell TypeScript this is a string

        const {title, completed}= req.body; //get update data

        // const todo= await todoService.updateTodo({id, userId, title, completed}); //call service // when services is written in class
        const todo= await SupdateTodo({id, userId, title, completed}); //call service // when services is written in function

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo
        });
    }catch (error: any){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//DELETE TODO
export const deleteTodo= async (req: Request, res: Response): Promise<void>=>{
    try{
        const userId= req.user!.userId; //get logged in user's id
        const id= req.params.id as string; //get todo id from URL    // ← fix: tell TypeScript this is a string


        //  await todoService.deleteTodo({id, userId}); //call service //when services is written in class
         const todo= await SdeleteTodo({id, userId}); //call service //when services is written in function

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
        });
    }catch(error: any){
        res.status(400).json({
            success: false, message: error.message
        });
    }
};



