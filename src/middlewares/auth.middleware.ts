import {Request, Response, NextFunction } from "express"; //express types 
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../types/auth.types";

declare global { // giving type for this line   req.user= decoded  
    namespace Express {
        interface Request {
            user?: IJwtPayload;
        }
    }
}

export const protect=(
    req: Request,
    res: Response,
    next: NextFunction,
): void =>{

    try {
        //1. get token from request header
        const authHeader= req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            res.status(401).json({
                success: false,
                message: "No token provided",
            });
            return; // stop here, dont move forward
        }

        // 2. extract token (remove "Bearer" part)
        const token= authHeader.split(" ")[1];

        //3. verify token using our secret key
        const jwtSecret= process.env.JWT_SECRET!;
        const decoded= jwt.verify(token, jwtSecret) as IJwtPayload;

        //4. attach user info to request object
        req.user= decoded;

        //5. move to next step (controller)
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

