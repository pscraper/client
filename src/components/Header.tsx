import { Link } from "react-router-dom";
import { signout } from "../api/user.api";
import { UserResponse } from "../spec/spec";


interface HeaderPropTypes {
    sessionId: string | null
    setSessionId: (sessionId: string | null) => void
    setUser: (user: UserResponse | null) => void
}


const Header = ({ sessionId, setSessionId, setUser }: HeaderPropTypes) => {
    const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (sessionId !== null) {
            await signout(sessionId!!);
            setSessionId(null);
            setUser(null);
            localStorage.removeItem("session_id");
        }
    }

    return (
        <header className="py-20 flex justify-between items-center">
            <h1 className="text-25 font-semibold font-sans px-30">
                pscraper monitoring
            </h1>
            <nav>
                <ul className="inline-flex">
                    <li className="px-20">
                        {sessionId ? 
                            <button onClick={e => handleLogout(e)}>로그아웃</button> :
                            <Link to="/login">로그인</Link>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default Header;