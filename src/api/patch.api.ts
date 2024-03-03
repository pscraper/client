import { AxiosResponse, HttpStatusCode } from "axios";
import { defaultClient } from "./client"


interface Patch {
    fileName: string
    fileDesc: string
}


interface PatchResultType {
    result: Array<Patch>
}


type SearchPatchType = (category: string) => Promise<AxiosResponse<PatchResultType>>; 
type DownloadFileType = (category: string, fileName: string) => Promise<void>;


export const searchPatch: SearchPatchType = async (category) => {
    const res = await defaultClient.get(`/file/${category}`);
    if (res.status !== HttpStatusCode.Ok) return Promise.reject();

    // snake case -> camel case
    const result = res.data['result'];
    result.map(obj => ({
        "fileName": obj.file_name,
        "fileDesc": obj.file_desc
    }))

    return Promise.resolve(res);
}


export const downloadFile: DownloadFileType = async (category, fileName) => {
    const res = await defaultClient.get(`/file/download/${category}/${fileName}`);
    if (res.status !== HttpStatusCode.Ok) return Promise.reject();
    return Promise.resolve();
}