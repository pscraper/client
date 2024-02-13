import React, { useState, useCallback, useEffect } from "react";
import { getAllUsers, getCookie, signup, deleteUser } from "./api/user.api";
import { User } from "./spec/spec"


let init = false;

/*
* React, TypeScript, Vite, eslint, prettier 초기 세팅
* https://velog.io/@navyjeongs/vite%EB%A1%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B4%88%EA%B8%B0-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-1-with.-typescript-eslint-prettier-husky-%EC%A0%88%EB%8C%80%EA%B2%BD%EB%A1%9C 
*/
const App = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!init) {
            getAllUsers().then(res => setUsers(res));
            init = true;
        }
    });

    const onSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const uuid = crypto.randomUUID();   // 웹 표준 API (Web Crypto API)
        const res = await signup(uuid, "123");
        setUsers([...users, res]);
    };

    const onDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
    };


    return (
        <div>
            <button onClick={e => onSignup(e)}>생성</button>
            {users.map(user => (
                <ul key={user.id}>
                    <UserProfile key={user.id} user={user} onDelete={onDelete} />
                </ul>
            ))}

        </div>
    );
}


interface UserProfileProps {
    user: User,
    onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: number) => {}
}


const UserProfile = ({ user, onDelete }: UserProfileProps) => {
    const { id, email, password, refresh_token } = user;

    return (
        <div>
            <p>ID: {id}</p>
            <p>EMAIL: {email}</p>
            <p>PASSWORD: {password}</p>
            <p>REFRESH TOKEN: {refresh_token}</p>
            <button onClick={(e) => onDelete(e, id)}>삭제</button>
        </div>
    )
}


export default App;
