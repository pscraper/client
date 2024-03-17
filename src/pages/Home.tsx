import { useEffect, useState } from "react";
import { User } from "../spec/spec";
import PageSideBar from "../components/PageSideBar";
import PageTitle from "../components/PageTitle";
import { useNavigate } from "react-router-dom";


const Home = () => {

    return (
        <>
        <div className="flex">
            <section className="flex min-h-screen">
                <PageSideBar />
            </section>

            <div className="flex flex-col bg-white min-w-full pl-150">
                <section>
                    <PageTitle title="Home" desc="환영합니다" />
                </section>

                <section className="mt-150">
                </section>
            </div>
        </div>
        </>
    )
}


export default Home;