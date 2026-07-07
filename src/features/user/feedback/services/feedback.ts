import { API_URL } from "@/data/internal/api-route";
import { STORAGE_KEY } from "@/data/internal/storage";
import { api } from "@/utils/api"

export const postFeedback = (data?: Record<any, any>) => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.FEEDBACKS_STAFF.INDEX,
        noAuth: true,
        headers: {
            "X-Session-Token": localStorage.getItem(STORAGE_KEY.USER_SESSION)
        }
    });
}
