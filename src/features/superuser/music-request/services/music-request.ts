import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"

export const getAllMusicRequest = (params?: Record<any, any>) => {
    return api({
        method: "GET",
        urlKey: API_URL.SONG_REQUEST.INDEX,
        queryParams: params
    });
}
