import { atom } from "recoil";
import { UserResponse } from "./spec/spec";
import { UserRole } from "./enums/enum";



export const userState = atom<UserResponse>({
    key: "user",
    default: {
        "email": "회원",
        "id": -1,
        "role": UserRole.USER
    }
});