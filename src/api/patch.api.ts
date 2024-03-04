import { AxiosResponse, HttpStatusCode } from "axios";
import { defaultClient } from "./client"


export interface Patch {
    fileName: string
    fileDesc: string
}


interface PatchResultType {
    result: Array<Patch>
}


type SearchPatchType = (category: string) => Promise<AxiosResponse<PatchResultType>>; 


export const searchPatch: SearchPatchType = async (category) => {
    const res = await defaultClient.get(`/file/${category}`);
    if (res.status !== HttpStatusCode.Ok) return Promise.reject();

    const result: Array<Patch> = res.data['result'];
    result.map(obj => ({
        "fileName": obj.fileName,
        "fileDesc": obj.fileDesc
    }))

    return Promise.resolve(res);
}


export const downloadFile = async (category: string, fileName: string) => {
    const res = await defaultClient.get(`/file/download/${category}/${fileName}`, {
        responseType: "blob"
    });
    if (res.status !== HttpStatusCode.Ok) return Promise.reject();
    return Promise.resolve(res);
}