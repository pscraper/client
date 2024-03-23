import PageSideBar from "../components/PageSideBar";
import ReportArticle from "../components/ReportArticle";
import PageTitle from "../components/PageTitle";


const DashBoard = () => {
    return ( 
        <div className="flex">
            <div className="flex min-h-screen mr-70">
                <PageSideBar />
            </div>
            
            <div>
                <PageTitle title="DashBoard" desc="서버 현황을 확인해보세요" />

                <main className="">
                {articleTitles.map((title, idx) => (
                    <section key={idx}>
                        <ReportArticle 
                            title={title} 
                            category={categoryMap.get(title)!} />
                    </section>
                ))}
                </main>
            </div>
        </div>
    )
}

const articleTitles = [
    ".Net Framework", 
    "JDK 8", 
    "Adobe Continuous Track", 
    "Adobe Classic Track"
];

const categoryMap = new Map<string, string>([
    [".Net Framework", "dotnet"],
    ["JDK 8", "java"],
    ["Adobe Continuous Track", "adobe"],
    ["Adobe Classic Track", "adobe"]
]);


export default DashBoard;