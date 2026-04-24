import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"

export const postAddBadWords = (data: Record<any, any>) => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.SETTINGS_BAD_WORDS.INDEX,
    });
}
