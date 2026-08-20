import {Request, Response, NextFunction } from "express";

//4 parameters= Express knows this is error handling middleware
export const errorHandler=(
    err: Error, //the actual error that was thrown
    req: Request, //incoming request
    res: Response, //outgoing response
    next: NextFunction, //request by Express even if unused
): void =>{

    console.log("Error:", err.message); //logs error on server

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};


