import { AxiosResponse, HttpStatusCode } from "axios";
import { authClient as client } from "./client"


export interface Patch {
    fileName: string
    fileDesc: string
}


interface PatchResultType {
    result: Array<Patch>
}


type SearchPatchType = (category: string) => Promise<AxiosResponse<PatchResultType>>; 


export const searchPatch: SearchPatchType = async (category) => {
    const accessToken = localStorage.getItem("access_token");
    const res = await client.get(`/file/${category}`, { headers: { 'Authorization': `Bearer ${accessToken}`}});
    if (res.status !== HttpStatusCode.Ok) return Promise.reject();

    const result: Array<Patch> = res.data['result'];
    result.map(obj => ({
        "fileName": obj.fileName,
        "fileDesc": obj.fileDesc
    }))

    return Promise.resolve(res);
}


export const downloadFile = async (category: string, fileName: string) => {
    const accessToken = localStorage.getItem("access_token");
    const res = await client.get(`/file/download/${category}/${fileName}`, {
        responseType: "blob",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if (res.status !== HttpStatusCode.Ok) return Promise.reject();
    return Promise.resolve(res);
}