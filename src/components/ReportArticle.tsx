import { useEffect, useState } from "react";
import { UserResponse } from "../spec/spec";
import { HttpStatusCode } from "axios";
import { Patch } from "../api/patch.api";
import { downloadFile, searchPatch } from "../api/patch.api";


interface ReportArticleProps {
    title: string
    category: string | undefined
}


const ReportArticle = ({ title, category }: ReportArticleProps) => {
    const [files, setFiles] = useState<Array<Patch>>([]);

    useEffect(() => {
        if (category !== undefined) {
            searchPatch(category)
            .then(res => {
                const data = res.data['result'];
                setFiles(data);
            })
        }
    }, []);

    const handleFileDownload = (e: React.MouseEvent<HTMLElement>, category: string, file: string) => {
        e.preventDefault();
        downloadFile(category, file)
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            
            let fileName = String(res.headers['content-disposition']).split(" ")[1];
            fileName = fileName.substring(fileName.indexOf("\"") + 1, fileName.lastIndexOf("\""));

            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            return link;
        })
        .then(link => {
            document.body.removeChild(link);
        })
    }

    return (
        <article className="px-30 py-30">
            <h2 className="font-bold text-22">{title}</h2>
            <p className="text-14 text-gray-500">category: {category}</p>
            <ul className="pt-10">
                {files.map((file, idx) => (
                    <li key={idx}>
                        <button onClick={e => handleFileDownload(e, category!!, file.fileName)}>{file.fileName}</button>
                    </li>
                ))}
            </ul>
        </article>
        
    )
}


export default ReportArticle;