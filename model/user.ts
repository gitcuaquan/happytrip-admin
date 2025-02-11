export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string;
    tokenType: string;
    accessToken?: string;
}

export interface UserLogin {
    phone: string;
    password: string;
}