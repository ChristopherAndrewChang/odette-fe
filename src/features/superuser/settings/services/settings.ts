import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"
import type { TSettings } from "../types/settings";
import type { ResponseWrapper } from "@/types/api";

export const getSettings = (): Promise<ResponseWrapper<TSettings>> => {
    return api({
        method: "GET",
        urlKey: API_URL.SETTINGS.INDEX,
    });
}

export const patchSetting = (data?: Record<any, any>) => {
    return api({
        method: "PATCH",
        urlKey: API_URL.SETTINGS.INDEX,
        data: data
    });
}
