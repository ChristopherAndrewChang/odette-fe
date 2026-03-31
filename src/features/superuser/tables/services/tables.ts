import { API_URL } from "@/data/internal/api-route";
import type { ResponseWrapper } from "@/types/api";
import { api } from "@/utils/api"
import type { TTables } from "../types/tables";

export const getAllTables = (params?: Record<any, any>): Promise<ResponseWrapper<TTables[]>> => {
    return api({
        method: "GET",
        urlKey: API_URL.TABLES.INDEX,
        queryParams: params,
        headers: {
            "ngrok-skip-browser-warning": "69420"
        }
    });
}

export const createTable = (data?: Record<any, any>) => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.TABLES.INDEX
    });
}

export const createTableBulk = (data?: Record<any, any>) => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.TABLES.BULK
    });
}
