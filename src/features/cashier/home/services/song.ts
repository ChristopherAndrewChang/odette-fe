import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"

export const patchMarkBilled = (id: string) => {
    return api({
        method: "PATCH",
        urlKey: API_URL.SONG_REQUEST.MARK_BILLED.replace(":id", id),
    });
}
