import { HttpStatusCode } from "axios";
import { authClient as client } from "./client"



type SearchFileType = (category: string) => Promise<string[]>; 

export const searchFile: SearchFileType = async (category) => {
    const accessToken = localStorage.getItem("access_token");
    const res = await client.get(`/file/${category}`, { headers: { 'Authorization': `Bearer ${accessToken}`}});
    if (res.status !== HttpStatusCode.Ok) return Promise.reject();

    const result: string[] = res.data['result'].sort();
    return Promise.resolve(result);
}

export const downloadFile = async (category: string, filename: string) => {
    const accessToken = localStorage.getItem("access_token");
    const res = await client.get(`/file/download/${category}/${filename}`, {
        responseType: "blob",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if (res.status !== HttpStatusCode.Ok) return Promise.reject();
    return Promise.resolve(res);
}