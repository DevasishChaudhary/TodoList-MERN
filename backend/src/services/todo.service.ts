// //Class method
// import {Todo} from '../models/Todo.model'; //Todo model to talk to MongoDB
// import {ICreateTodoBody, IUpdateTodoBody} from "../types/todo.types"; // request body types

// // TODO SERVICE CLASS
// // contains all business logic for todos
// // create, read, update, delete
// export class TodoService {

//       // GET ALL TODOS
//   // fetch all todos that belong to logged in user
//   async getTodos(userId: string) {
//     const todos= await Todo.find({userId}); // find all todos where userId matches logged in user
//     return todos;
//   }

//   // CREATE TODO
//   // create  new todo for logged in user
//   async createTodo(data: ICreateTodoBody & {userId: string}) {
//     const {title, userId}= data;

//     const todo= await Todo.create({
//         title,
//         userId,  //stores logged in user's id
//         completed: false, //new todo always starts as not completed
//     });
//     return todo;
//   }

//   // UPDATE TODO
//   // update todo by id- only if it belongs to logged in user
//   async updateTodo(data:IUpdateTodoBody & {id: string; userId: string;}){
//     const {id, userId, title, completed}= data;

//     //find todo by id AND userId
//   // userId check = user can only update THEIR OWN todos
//   const todo = await Todo.findOneAndUpdate(
//     { _id: id, userId},  //find todo that matches both id AND userId
//     {title, completed}, //update these fields
//     {new: true}     // return updted todo (not old one)
//   );

//    if (!todo) {
//     throw new Error("Todo not found"); //todo doesnot exist or doesnot belong to user
//   }
//   return todo;
//   }

//   //DELETE TODO
//   // delete todo by id- only if belongs to logged in user
//   async deleteTodo(data: {id: string; userId: string}) {
//     const {id, userId}= data;

//     //find todo by id AND userId
//     //userId check= user can only delete THEIR OWN todos
//     const todo= await Todo.findOneAndDelete({_id: id, userId});

//     if (!todo){
//         throw new Error("Todo not found"); //todo doesnt exist or doesnt belongs to user
//     }

//     return todo;
//   }
// }

// //Export single instance of TodoService
// export const todoService= new TodoService();




//Function
import {Todo} from '../models/Todo.model';
import jwt from "jsonwebtoken";
import {ICreateTodoBody, IUpdateTodoBody} from "../types/todo.types";

// GET ALL TODOS
export const SgetTodos= async (userId: string)=>{
  const todos= await Todo.find({userId});
  return todos;
}

// CREATE TODO
export const ScreateTodo= async (data: ICreateTodoBody & {userId: string})=>{
  const {title, userId}= data;

  const todo= await Todo.create({
    title, 
    userId,
    completed: false,
  });
  return todo;
};

// UPDATE TODO
export const SupdateTodo= async (data: IUpdateTodoBody & {id:string;  userId:string; })=>{
  const {id, userId, title, completed}= data;

  const todo= await Todo.findOneAndUpdate(
    {_id:id, userId},
    {title, completed},
     {new: true}  
);

if (!todo){
  throw new Error("Todo not found");
}
return todo;
};

// DELETE TODO
export const SdeleteTodo= async (data: {id: string; userId:string;})=>{
  const {id, userId}= data;

  const todo= await Todo.findOneAndDelete({_id:id, userId});

  if(!todo){
    throw new Error("Todo not found");
  }
  return todo;
};