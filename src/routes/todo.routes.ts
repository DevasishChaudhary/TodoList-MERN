import {Router} from "express";
import {protect} from "../middlewares/auth.middleware";  //auth middleware
import {
    getTodos, 
    createTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todo.controller"; //controllers (we create next)

const router= Router();

// all todo routes are protected (require login)
router.get("/", protect, getTodos); //GET /api/todos
router.post("/", protect, createTodo);  //POST /api/todos
router.put("/:id", protect, updateTodo);  //PUT /api/todos/:id
router.delete("/:id",protect, deleteTodo); //DELETE /api/todos/:id

export default router;

