interface PageTitleProps {
    title: string
    desc: string
}


const PageTitle = ({ title, desc }: PageTitleProps) => {
    return (
        <header className="pt-50">
            <h1 className="text-40 font-bold font-sans">{title}</h1>
            <p className="text-slate-500 text-14">{desc}</p>
        </header>
    )
}


export default PageTitle;