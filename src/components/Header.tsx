import { useNavigate } from "react-router-dom";
import { signout } from "../api/user.api";
import { UserResponse } from "../spec/spec";
import HeaderItem from "./HeaderItem";


const Header = ({ sessionId, setSessionId, setUser }: {
    sessionId: string | null,
    setSessionId: (sessionId: string | null) => void,
    setUser: (user: UserResponse | null) => void
}) => {
    const navigate = useNavigate();

    const handleTitleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        window.location.reload();
    }

    const handleDashboardClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate("/dashboard");
    }

    const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate("/login");
    }

    const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (sessionId !== null) {
            await signout(sessionId!!);
            setSessionId(null);
            setUser(null);
            localStorage.clear()
        }
    }

    return (
        <header className="py-20 flex justify-between items-center bg-[#205081]">
            <button onClick={e => handleTitleClick(e)}>
                <h1 className="hover:bg-sky-800 p-5 text-20 font-semibold font-sans ml-30 text-white">
                    pscraper monitoring
                </h1>
            </button>            
            <nav>
                <ul className="inline-flex">
                    <li>
                        <HeaderItem text="Dashboard" onClick={handleDashboardClick} />
                    </li>

                    <li className="px-20">
                        {sessionId && <HeaderItem text="Logout" onClick={handleLogout} />}
                        {!sessionId && <HeaderItem text="Login" onClick={handleLogin} />}
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default Header;