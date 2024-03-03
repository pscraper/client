import { useEffect, useState } from "react";
import { UserResponse } from "../spec/spec";
import { downloadFile, searchPatch } from "../api/patch.api";
import { HttpStatusCode } from "axios";


interface ReportArticleProps {
    title: string
    category: string | undefined
}


const ReportArticle = ({ title, category }: ReportArticleProps) => {
    const [files, setFiles] = useState<Array<string>>([]);

    useEffect(() => {
        if (category !== undefined) {
            searchPatch(category)
                .then(res => setFiles(res.data["result"].map(patch => patch.fileName)))
        }
    }, []);

    const handleFileDownload = (e: React.MouseEvent<HTMLElement>, category: string, file: string) => {
        e.preventDefault();
        downloadFile(category, file)
            .then(res => {
                console.log(res);
            })
    }

    return (
        <article className="px-30 py-30">
            <h2 className="font-bold text-22">{title}</h2>
            <p className="text-14 text-gray-500">category: {category}</p>
            <ul className="pt-10">
                {files.map((file, idx) => (
                    <li key={idx}>
                        <button onClick={e => handleFileDownload(e, category!!, file)}>{file}</button>
                    </li>
                ))}
            </ul>
        </article>
        
    )
}


export default ReportArticle;