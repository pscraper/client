import { Link } from "react-router-dom";


const Home = () => {

    return (
        <div className="">
            <h1 className="text-blue-400">pscraper monitoring</h1>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </div>
    )
}


export default Home;