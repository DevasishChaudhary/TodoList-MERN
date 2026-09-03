import axiosInstance from "./axios.config"; //our custom axios instance with base URL and token interceptor
import type { ISignupData, ILoginData, IAuthResponse } from "../types"; //TypeScript types for signup, login and auth response

//SIGNUP
//sends signup data to backend and returns the response
//stores token in localStorage on successful signup
export const signup= async (signupData: ISignupData): Promise<IAuthResponse>=>{
    const response= await axiosInstance.post<IAuthResponse>("/auth/signup", signupData); //send signup data to backend

    if(response.data.data.token){
        localStorage.setItem("token", response.data.data.token); //store token in localStorage
    }

    return response.data; //return the response data
};

//LOGIN
//sends login data to backend and returns the response
//stores token in localStorage on successful login
export const login=async (loginData: ILoginData): Promise<IAuthResponse>=>{
    const response= await axiosInstance.post<IAuthResponse>("/auth/login", loginData); //send login data to backend

    if(response.data.data.token){
        localStorage.setItem("token", response.data.data.token); //store token in localStorage
    }

    return response.data; //return the response data
};


//LOGOUT
//removes token from localStorage
export const logout= (): void=>{
    localStorage.removeItem("token");
}
