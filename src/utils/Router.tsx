import { Routes, Route } from "react-router-dom";
import App from "../App";
import LoginComponent from "../components/Login";
import TestComponent from "../components/Test";


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/test" element={<TestComponent />} />
        </Routes>
    )
}


export default Router;