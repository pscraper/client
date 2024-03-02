import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../store";


const Home = () => {
    const [user, _] = useRecoilState(userState);

    return (
        <div className="">
            <h1>{user.email}님 환영합니다</h1>
            <h1>User ID: {user.id}</h1>
            <h1>User Role: {user.role}</h1>
            <h1 className="text-blue-400">pscraper monitoring</h1>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </div>
    )
}


export default Home;