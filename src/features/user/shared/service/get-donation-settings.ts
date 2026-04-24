import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api"
import type { TDonationSettingsPublic } from "../types/donation-setting";
import type { ResponseWrapper } from "@/types/api";

export const getDonationSettings = (): Promise<ResponseWrapper<TDonationSettingsPublic>> => {
    return api({
        method: "GET",
        urlKey: API_URL.SETTINGS_DONATION.PUBLIC,
        noAuth: true
    });
}
