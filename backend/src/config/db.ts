import mongoose  from "mongoose"; // mongoose package to connect MongoDB

const connectDB= async (): Promise<void>  =>{ //async function, returns nothing (void),, Promise<void> is optional, Typescript can infer it automatically even without giving this type annotation
    try{
        const mongoURI= process.env.MONGODB_URL; //read mongoDB URL from .env file

        if(!mongoURI){ //if MONGODB_URL is missing in .env
            throw new Error("MONGODB_URL is not defined"); //stop and shows error
        }

        await mongoose.connect(mongoURI); //connect to MongoDB
        console.log("MongoDB is Connected");

    } catch (error){
        console.log("MongoDB connection failed ", error);
        process.exit(1); //kills the server if database connection is fails(server stopped coz of error)

    }
};

export default connectDB;

