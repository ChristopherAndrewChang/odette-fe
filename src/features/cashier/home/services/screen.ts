import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"

export const patchBilledScreen = (id: string) => {
    return api({
        method: "PATCH",
        urlKey: API_URL.SCREEN_TAKEOVER.MARK_BILLED.replace(":id", id),
    });
}
