import type { TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { API_URL } from "@/data/internal/api-route";
import { STORAGE_KEY } from "@/data/internal/storage";
import type { ResponseWrapper } from "@/types/api";
import { api } from "@/utils/api"
import type { TScreenTakeOver, TScreenTakeOverResponseMutation } from "../types/screen-takeover";

export const getMyScreenTakeover = (params?: Record<any, any>): Promise<ResponseWrapper<TPaginationResponseType<TScreenTakeOver[]>>> => {
    return api({
        method: "GET",
        urlKey: API_URL.SCREEN_TAKEOVER.INDEX,
        queryParams: params,
        noAuth: true,
        headers: {
            "X-Session-Token": localStorage.getItem(STORAGE_KEY.USER_SESSION)
        }
    });
}

export const postReqScreenTakeOverText = (data?: Record<any, any>): Promise<ResponseWrapper<TScreenTakeOverResponseMutation>> => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.SCREEN_TAKEOVER.INDEX,
        noAuth: true,
        headers: {
            "X-Session-Token": localStorage.getItem(STORAGE_KEY.USER_SESSION),
            "ngrok-skip-browser-warning": 'true'
        }
    })
}

export const postReqScreenTakeOverMedia = (data?: Record<any, any>): Promise<ResponseWrapper<TScreenTakeOverResponseMutation>> => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.SCREEN_TAKEOVER.INDEX,
        noAuth: true,
        headers: {
            "X-Session-Token": localStorage.getItem(STORAGE_KEY.USER_SESSION),
            "Content-Type": "multipart/form-data",
        }
    })
}
