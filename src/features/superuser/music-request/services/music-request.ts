import type { TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { API_URL } from "@/data/internal/api-route";
import type { TMySongReq } from "@/features/user/song-request/types/song-request";
import type { ResponseWrapper } from "@/types/api";
import { api } from "@/utils/api"
import type { TSummary } from "../types/summary";

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

export const getSummaryMusicRequest = (params?: Record<any, any>): Promise<ResponseWrapper<TSummary>> => {
    return api({
        method: "GET",
        urlKey: API_URL.SONG_REQUEST.SUMMARY,
        queryParams: params
    });
}

export const reviewRequest = (id: string, data?: Record<any, any>) => {
    return api({
        method: "PATCH",
        data: data,
        urlKey: API_URL.SONG_REQUEST.APPROVAL.replace(":id", id),
    });
}
