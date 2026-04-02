import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"
import type { TScanResponse } from "../types/scan";
import type { ResponseWrapper } from "@/types/api";

export const userScan = (data?: Record<any, any>): Promise<ResponseWrapper<TScanResponse>> => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.USER_SCAN.INDEX,
        noAuth: true
    });
}
