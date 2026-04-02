import type { TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { API_URL } from "@/data/internal/api-route";
import type { TMySongReq } from "@/features/user/song-request/types/song-request";
import type { ResponseWrapper } from "@/types/api";
import { api } from "@/utils/api"

export const __getAllMusicRequest = (params?: Record<any, any>): Promise<ResponseWrapper<TMySongReq[]>> => {
    return api({
        method: "GET",
        urlKey: API_URL.SONG_REQUEST.INDEX,
        queryParams: params
    });
}

export const getAllMusicRequest = (params?: Record<any, any>): Promise<ResponseWrapper<TPaginationResponseType<TMySongReq[]>>> => {
    return api({
        method: "GET",
        urlKey: API_URL.SONG_REQUEST.INDEX,
        queryParams: params
    });
}
