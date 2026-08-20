import dotenv from "dotenv"; //imports the dotenv package
dotenv.config(); //reads .env file and loads PORT, JWT_SECRET etc into process.env

import app from "./app"; // imports the Express app (We create this next)
import connectDB from "./config/db";

const PORT= process.env.PORT || 5000; //reads PORT from .env, if not found use 5000 as default

connectDB(); //connect to MongoDB first

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`); //confirm servr started successfully
});

