import express, {Application} from "express"; //imports express and its Typescript types
import cors from "cors"; // allows frontend to communicate with backend
import authRoutes from "./routes/auth.routes";  //auth routes
import todoRoutes from "./routes/todo.routes"; //todo routes
import { errorHandler } from "./middlewares/error.middleware"; //global error handler

const app: Application= express(); // creates the Express Application

//MIDDLEWARE
//No — you do not always use app.use() for everything.
//You use app.use() specifically when you want to register middleware in Express.js.
//The key understanding is:
//app.use() = “Run this function before routes or requests continue.”
app.use(cors()); //enables cross-origin requests from the frotend
app.use(express.json()); //allows backend to read JSON from the request body

// // Test Route
// app.get("/", (req, res)=>{ //when browser visits https://localhost:5000
//     res.json({message: "API is runnig"}); //sends back this JSON response
// });

//ROUTES
//register routes with base URL
app.use("/api/auth", authRoutes); //all auth routes start with /api/auth
app.use("/api/todos", todoRoutes); //all todo routes start with /api/todos

// ERROR HANDLER MIDDLEWARE
// must be registered LAST — after all routes
// catches all unhandled errors from routes/controllers
app.use(errorHandler); //global error handling middleware


export default app; //exports app so server.ts can import it



