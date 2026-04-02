import type { TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { API_URL } from "@/data/internal/api-route";
import { STORAGE_KEY } from "@/data/internal/storage";
import type { ResponseWrapper } from "@/types/api";
import { api } from "@/utils/api"
import type { TMySongReq } from "../types/song-request";

export const getMySongRequest = (params?: Record<any, any>): Promise<ResponseWrapper<TPaginationResponseType<TMySongReq[]>>> => {
    return api({
        method: "GET",
        queryParams: params,
        urlKey: API_URL.SONG_REQUEST.INDEX,
        noAuth: true,
        headers: {
            "X-Session-Token": localStorage.getItem(STORAGE_KEY.USER_SESSION)
        }
    });
}

export const submitRequest = (data?: Record<any, any>) => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.SONG_REQUEST.INDEX,
        noAuth: true,
        headers: {
            "X-Session-Token": localStorage.getItem(STORAGE_KEY.USER_SESSION)
        }
    });
}
