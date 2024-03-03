import { useState, useEffect } from "react";
import { getUserBySessionId } from "../api/user.api";
import { HttpStatusCode } from "axios";
import { UserResponse } from "../spec/spec";
import Header from "../components/Header";
import ReportArticle from "../components/ReportArticle";


const articleTitles = [".Net Framework", "JDK 8", "Adobe Continuous Track", "Adobe Classic Track"];
const categoryMap = new Map<string, string>([
    [".Net Framework", "dotnet"],
    ["JDK 8", "java"],
    ["Adobe Continuous Track", "adobe"],
    ["Adobe Classic Track", "adobe"]
]);


const Home = () => {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [user, setUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        const ses = localStorage.getItem("session_id");
        if (ses !== null) {
            getUserBySessionId(ses)
                .then(res => {
                    if (res.status === HttpStatusCode.Ok) {
                        setUser(res.data);
                        setSessionId(ses);
                    }
                })
                .catch(err => {
                    console.error(err.response);
                }
            )
        }
    }, []);

    return (
        <div>
            <Header 
                sessionId={sessionId} 
                setSessionId={setSessionId} 
                setUser={setUser} 
            />
            <hr />
            
            <section className="bg-slate-300">
                    <p className="px-30 font-sans">
                        <span className="font-semibold">{user && user.email}</span>
                        &nbsp;님 환영합니다.
                    </p>
            </section>

            <main className="grid grid-cols-2 gap-10 py-30">
                {articleTitles.map((title, idx) => (
                    <section key={idx}>
                        <ReportArticle title={title} category={categoryMap.get(title)} />
                    </section>
                ))}
            </main>
        </div>
    )
}


export default Home;