import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"

export const closeNight = (data?: Record<any, any>) => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.TABLES.CLOSE_NIGHT
    });
}

export const openNight = (data?: Record<any, any>) => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.TABLES.OPEN_NIGHT
    });
}
