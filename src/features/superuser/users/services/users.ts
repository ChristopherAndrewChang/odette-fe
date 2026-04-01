import { API_URL } from "@/data/internal/api-route";
import { ResponseWrapper } from "@/types/api";
import { api } from "@/utils/api"
import { TPaginationResponseType } from "@ozanplanviu/planviu-core";
import { TUsers } from "../types/users";

export const getAllUsers = (params?: Record<any, any>): Promise<ResponseWrapper<TPaginationResponseType<TUsers[]>>> => {
    return api({
        method: "GET",
        queryParams: params,
        urlKey: API_URL.USERS.INDEX,
    });
}

export const postAddUser = (data?: Record<any, any>) => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.USERS.INDEX,
    });
}

export const patchUsers = (id: string, data?: Record<any, any>) => {
    return api({
        method: "PATCH",
        urlKey: API_URL.USERS.DETAILS.replace(":id", id),
        data: data,
    });
}
