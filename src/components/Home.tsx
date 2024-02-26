import React from "react";
import { Link } from "react-router-dom";
import LoginComponent from "./Login";


const HomeComponent = () => {

    return (
        <div className="">
            <h1>pscraper monitoring</h1>
            <ul>
                <li><Link to="/login">Enter</Link></li>
                <li><Link to="/test">Just Test</Link></li>
            </ul>
        </div>
    )
}


export default HomeComponent;