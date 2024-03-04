import { useEffect, useState } from "react";
import { SessionUser } from "../spec/spec";
import { getUserBySessionId, isValidSessionId } from "../api/user.api";


type UseUserType = (sessionId: string | null) => SessionUser | null

const useUser: UseUserType = (sessionId) => {
    const [user, setUser] = useState<SessionUser | null>(null);
    const handleGetUserBySessionId = () => {
        if (sessionId == null) {
            setUser(null);
            localStorage.clear();
            return;
        }

        isValidSessionId(sessionId)
            .then(res => {
                if (res.data) {
                    getUserBySessionId(sessionId)
                    .then(res => {
                        setUser({...res.data, sessionId});
                    })
                    .catch(err => {
                        throw err;
                    })
                }
            })
            .catch(err => {
                throw err;
            })
    }

    useEffect(handleGetUserBySessionId, [sessionId]);
    return user
}


export default useUser;