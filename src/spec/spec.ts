import { UserRole } from "../enums/enum"



export interface UserResponse {
    id: number,
    email: string,
    role: UserRole
}


export interface User extends UserResponse {
    password: string,
    refresh_token: string,
}


export interface SessionUser extends UserResponse {
    sessionId: string
}


export interface TokenResponse {
    access_token: string,
    refresh_token: string,
    token_type: string
}