import type { TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { API_URL } from "@/data/internal/api-route";
import type { ResponseWrapper } from "@/types/api";
import { api } from "@/utils/api"
import type { TScreenTakeover } from "../types/screen-takeover";

export const getAllScreenTakeover = (params?: Record<any, any>): Promise<ResponseWrapper<TPaginationResponseType<TScreenTakeover[]>>> => {
    return api({
        method: "GET",
        urlKey: API_URL.SCREEN_TAKEOVER.INDEX,
        queryParams: params
    });
}

export const patchApprovalScreenTakeover = (id: string, data?: Record<any, any>) => {
    return api({
        method: "PATCH",
        data: data,
        urlKey: API_URL.SCREEN_TAKEOVER.APPROVAL.replace(":id", id)
    });
}
