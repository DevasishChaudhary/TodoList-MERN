import axios from "axios";

//BASE URL CONFIGURATION
// all API requests will start with this base URL
//chnage this one line = updates everywhere in the project where this base URL is 
const axiosInstance= axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // read/get the base URL from .env file
});

//REQUEST INTERCEPTOR
//runs before EVERY request is sent to the backend
//automatically attaches token to every request 
axiosInstance.interceptors.request.use((config)=>{
    const token= localStorage.getItem("token"); //get token from local storage

    if(token){
        config.headers.Authorization= `Bearer ${token}`; //attach token to header
    }
    return config;
});

export default axiosInstance; //export the axios instance to be used in other parts of the project