import { downloadFile } from "../api/patch.api";
import { useSearchFile } from "../store/query";


interface ReportArticleProps {
    title: string
    category: string
}


const ReportArticle = ({ title, category }: ReportArticleProps) => {
    const fileList = useSearchFile(category);

    const handleFileDownload = async (e: React.MouseEvent<HTMLElement>, category: string, filename: string) => {
        e.preventDefault();
        const result = await downloadFile(category, filename)
    
        if (result.status == 200) {
            const res = result.data;
            const url = URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            
            let fileName = String(result.headers['content-disposition']).split(" ")[1];
            fileName = fileName.substring(fileName.indexOf("\"") + 1, fileName.lastIndexOf("\""));
    
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (
        <article className="px-30 py-30">
            <h2 className="font-bold text-22">{title}</h2>
            <p className="text-14 text-gray-500">category: {category}</p>
            <ul className="pt-10">
                {fileList && fileList.map((filename, idx) => (
                    <li key={idx}>
                        <button onClick={e => handleFileDownload(e, category, filename)}>{filename}</button>
                    </li>
                ))}
            </ul>
        </article>
    )
}


export default ReportArticle;