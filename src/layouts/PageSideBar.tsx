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

    const navigatePage = (e: React.MouseEvent<HTMLButtonElement>, path: string) => {
        e.preventDefault();
        navigate(path);
    }

    return (
        <div className="fix pl-20 pr-20 bg-[#205081] flex flex-col justify-around">
            <div>
                <p className="text-16 font-semibold text-slate-300/70 pl-5 mb-20">
                    Check & Download<br/>
                    Scraping Result
                </p>
                <button 
                    onClick={e => handleTitleBtnClick(e)} 
                    className="cursor-pointer hover:bg-slate-500/50 pl-5 pr-5 pb-5"
                >
                    <p className="text-27 text-white font-semibold">
                        PSCRAPER
                    </p>

                    <p className="text-27 text-white font-semibold pr-45">
                        CLIENT
                    </p>
                </button>

                <hr className="mt-10" />
            </div>

            <nav>
            {NavItems.map(({ title, path, NavIcon }, index) => (
                <div key={index} className="mb-15 hover:bg-slate-500/50 pt-5">
                    <button className="inline-flex" onClick={e => navigatePage(e, path)}>
                        <span className="text-30 text-white ml-5">
                            <NavIcon />
                        </span>

                        <span className="text-white text-18 font-semibold font-sans relative top-4 ml-20">
                            {title}
                        </span>
                    </button>
                </div>
            ))}
            </nav>

            <div></div>
            <div></div>

            <footer>
                <span className="text-slate-300 text-40 font-bold">
                    AhnLab
                </span>

                <p className="text-slate-300 text-14 pl-3">
                    Serviced by PatchLab
                </p>
            </footer>
        </div>
    )
})


const NavItems = [
    {
        title: "대시보드",
        path: "/dashboard",
        NavIcon: GoServer
    },
    {
        title: "패키징",
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