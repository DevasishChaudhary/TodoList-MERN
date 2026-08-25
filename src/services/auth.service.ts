//Class method 
import { User } from "../models/User.model"; //User model to talk to MongoDB
import  jwt  from "jsonwebtoken";  // to generate JWT token
import { ISignupBody, ILoginBody } from "../types/auth.types";

export class AuthService {

    //SIGNUP
    async signup(data: ISignupBody){
        const {name, email, password}= data;

        //1. check if user already exist
        const existingUser= await User.findOne({email});
        if(existingUser){
            throw new Error("Email already registered");
        }

        //2. create user (password hashed automatically by model)
        const user= await User.create({name, email, password});

        //3. generate JWT token
        const token= this.generateToken(user._id.toString(), user.email);

        return {
            token, 
            user:{
                id: user._id.toString(),
                name: user.name,
                email: user.email,

            },
        };
    }

    //LOGIN 
    async login(data: ILoginBody){
        const {email, password}= data;

        //1. finder user by email
        const user= await User.findOne({email});
        if(!user){
            throw new Error("Invalid email or password");
        }

        //2.compare password
        const isMatch=  await user.comparePassword(password);
        if (!isMatch){
            throw new Error("Invalid email or password");
        }

        //3. generate JWT token
        const token= this.generateToken(user._id.toString(), user.email);

        return {
            token, 
            user:{
                id: user._id.toString(),
                name: user.name,
                email:user.email,
            },
        };
    }

    // GENERATE TOKEN (private helper)
    private generateToken(userId: string, email:string):string{
        const payload= {userId, email};
        const secret= process.env.JWT_SECRET!;
        const token= jwt.sign(payload, secret, {expiresIn: "7d"});
        return token;
    }
}

export const authService= new AuthService();