import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"
import type { TLoginResponse } from "../types/login";
import type { ResponseWrapper } from "@/types/api";

export const login = (data?: Record<any, any>): Promise<ResponseWrapper<TLoginResponse>> => {
    return api({
        method: "POST",
        data: data,
        noAuth: true,
        urlKey: API_URL.LOGIN.INDEX,
    });
}
