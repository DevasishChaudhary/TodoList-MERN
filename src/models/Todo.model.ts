import mongoose, {Schema, Document} from "mongoose"; //blueprint builder, Document= MongoDB document type

//defines the shape/pattern of a Todo in TypeScript
export interface ITodo extends Document{//extends Document= inherits MongoDB built-in fields like _id
    title: string;
    completed: boolean;
    userId: mongoose.Types.ObjectId; //reference to User who owns this todo
    createdAt: Date;
}

//builds the actual blueprint using ITodo interface
const TodoSchema= new Schema<ITodo>(
    {
        title:{
            type: String,
            required:true,
        },
        completed:{
            type: Boolean,
            default: false, // new todos always start as not completed
        },
        userId: {
            type: Schema.Types.ObjectId, // stores reference?lonk to a User
            ref: "User", //tells Mongoose which collection to refernce
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Todo= mongoose.model<ITodo>("Todo", TodoSchema);


