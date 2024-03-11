import { useState } from "react";
import { User } from "../spec/spec";
import PageSideBar from "../layouts/PageSideBar";
import PageTitle from "../components/PageTitle";


const Home = () => {


    return (
        <div className="flex">
            <section className="flex min-h-screen mr-70">
                <PageSideBar />
            </section>

            <div>
                <PageTitle title="Home" desc="환영합니다" />
            </div>
        </div>
    )
}


export default Home;