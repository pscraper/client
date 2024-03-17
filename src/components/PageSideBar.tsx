import React from "react";
import { GoServer } from "react-icons/go";
import { GoDownload } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { PiPackage } from "react-icons/pi";


const PageSideBar = React.memo(() => {
    const navigate = useNavigate();

    const handleTitleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/");
        window.location.reload();
    }

    const handleLogoutBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
    }

    const navigatePage = (e: React.MouseEvent<HTMLButtonElement>, path: string) => {
        e.preventDefault();
        navigate(path);
    }

    return (
        <div className="bg-[#205081] flex flex-col justify-around px-30">
            <div>
                <button 
                    onClick={e => handleTitleBtnClick(e)} 
                    className="cursor-pointer hover:bg-slate-500/50 pl-5 pr-5 pb-5"
                >
                    <p className="text-30 text-white font-semibold">
                        PSCRAPER <br/> MONITORING
                    </p>
                </button>
            </div>

            <div>
                <div className="w-200 overflow-hidden rounded-full">
                    <img src="/img/profile.jpg" />
                </div>

                <p className="text-17 mt-15 ml-20 text-white">
                    {localStorage.getItem("email")}
                </p>
                
                <p className="text-17 ml-20 text-white">
                    {localStorage.getItem("last_login")}
                </p>

                <button onClick={e => handleLogoutBtnClick(e)} className="text-15 text-slate-300 font-semibold border border-gray-500 px-20 py-10 hover:bg-white hover:text-black ml-50 mt-15">
                    Logout
                </button>
            </div>

            <nav>
            {NavItems.map(({ title, path, NavIcon }, index) => (
                <div key={index} className="mb-15 hover:bg-slate-500/50 pt-5">
                    <button className="inline-flex" onClick={e => navigatePage(e, path)}>
                        <span className="text-30 text-white ml-5">
                            <NavIcon />
                        </span>

                        <span className="text-white text-25 font-semibold font-sans relative bottom-5 ml-20">
                            {title}
                        </span>
                    </button>
                </div>
            ))}
            </nav>

            <footer className="mx-auto">
                <span className="text-slate-300 text-50 font-bold">
                    AhnLab
                </span>

                <p className="text-slate-300 text-18">
                    Serviced by PatchLab
                </p>
            </footer>
        </div>
    )
})


const NavItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        NavIcon: GoServer
    },
    {
        title: "Packaging",
        path: "/packaging",
        NavIcon: PiPackage
    },
    {
        title: "카탈로그",
        path: "/catalog",
        NavIcon: GoDownload
    }
]
    

export default PageSideBar;