import { UserRole } from "../enums/enum"


export interface User {
    id: number,
    email: string,
    password: string,
    refresh_token: string
}


export interface UserResponse {
    id: number,
    email: string,
    role: UserRole
}


export interface TokenResponse {
    access_token: string,
    token_type: string
}