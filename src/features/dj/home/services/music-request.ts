import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"

export const patchApprovalDjMusicRequest = (id: string, data?: Record<any, any>) => {
    return api({
        method: "PATCH",
        data: data,
        urlKey: API_URL.DJ_SONG_APPROVAL.DETAILS.replace(":id", id),
    });
}
