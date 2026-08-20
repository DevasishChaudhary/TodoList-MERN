// shape of data we expect when user signs up
export interface ISignupBody{
    name: string;
    email: string;
    password: string;
}

// shape of data we expect when user logs in
export interface ILoginBody{
    email: string;
    password: string;
}

// shape of data we send BACK to frontend afer login/signup
export interface IAuthResponse {
    success: boolean;
    message: string; //optional, only present on success
    token?: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}

//shape of data stored INSIDE the JWT token
export interface IJwtPayload {
    userId: string;
    email: string;
}

