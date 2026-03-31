import { API_URL } from "@/data/internal/api-route";
import type { ResponseWrapper } from "@/types/api";
import { api } from "@/utils/api"

export const generateSingleTableQR = (id: string): Promise<ResponseWrapper<any>> => {
    return api({
        method: "POST",
        urlKey: API_URL.TABLES.SINGLE_GENERATE_QR.replace(":id", id),
        responseType: "blob",
    });
}
