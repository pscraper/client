import { atom } from "recoil";
import { UserResponse } from "./spec/spec";
import { UserRole } from "./enums/enum";



export const userState = atom<UserResponse>({
    key: "user",
    default: {
        id: -1,
        email: "",
        role: UserRole.TEMPORAL
    }
});