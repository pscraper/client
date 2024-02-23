import { HttpStatusCode } from "axios";
import { defaultClient } from "./client"


interface Response {
    size: number,
    data: any
}

type SearchPatchType = () => Promise<Response>


export const searchPatch: SearchPatchType = async () => {
    const params = { "date": "2024/02", "product_tag": "OFFICE" };
    const res = await defaultClient.get("/patch", {params});

    if (res.status !== HttpStatusCode.Ok) {
        throw Error("");
    }

    return Promise.resolve(res.data)
}