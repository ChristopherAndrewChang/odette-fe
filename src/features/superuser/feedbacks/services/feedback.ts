import type { TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"
import type { TFeedbacks } from "../types/feedback";
import type { ResponseWrapper } from "@/types/api";

export const getFeedbacksForStaff = (params?: Record<any, any>): Promise<ResponseWrapper<TPaginationResponseType<TFeedbacks[]>>> => {
    return api({
        method: "GET",
        urlKey: API_URL.FEEDBACKS_STAFF.INDEX,
        queryParams: params
    });
}

export const patchFeedbackMarkAsRead = (id: string) => {
    return api({
        method: "PATCH",
        urlKey: API_URL.FEEDBACKS_STAFF.READ.replace(":id", id),
    });
}
