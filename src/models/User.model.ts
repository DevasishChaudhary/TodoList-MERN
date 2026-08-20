import mongoose, {Schema, Document}  from "mongoose"; // Schema= blueprint builder, Document= MongoDB document type

//defines the shapepattern of a User in Typescript
//IUser tells Typescript what fields a User has
export interface IUser extends Document { // extends Document= adds MongoDB built-in fields like_id
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

//builds the actual blueprint using the IUser interface
const UserSchema= new Schema<IUser>(
    {
        name: {
            type: String,
            required:true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password:{
            type: String,
            required:true,
        },
    },
    {
        timestamps: true,  // auto adds createdAt and updatedAt fields
    }
);

//creates the User model using Schema
// "User"= collection name in MongoDB (auto becomes "users")
export const User= mongoose.model<IUser>("User", UserSchema);


