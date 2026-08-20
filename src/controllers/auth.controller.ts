import { Request, Response } from "express";
import {authService} from "../services/auth.service"; //service (we create next)

//SIGNUP CONTROLLER
export const signup = async (req: Request, res: Response): Promise<void>=>{
    try{
        const {name, email, password} = req.body; //get datat from request body

        const result= await authService.signup({name, email, password}); // call servie

        res.status(201).json({
            success: true,
            message: "ACcount created Successfully",
            data: result,  //send result back to frontend 
        });
    }catch (error:any){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    };
};

//LOGIN CONTROLLER
export const login= async (req: Request, res: Response): Promise<void>=>{
    try{
        const {email, password}= req.body; //get data from request body

        const result= await authService.login({email, password}); //call service

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result, //send result back to frontend 
        });
    }catch (error:any){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};