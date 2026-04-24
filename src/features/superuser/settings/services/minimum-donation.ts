import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api";
import type { TMinimumDonation } from "../types/minimum-donation";
import type { ResponseWrapper } from "@/types/api";

export const getMinimumDonationSettings = (params?: Record<any, any>): Promise<ResponseWrapper<TMinimumDonation[]>> => {
    return api({
        method: "GET",
        queryParams: params,
        urlKey: API_URL.SETTINGS_DONATION.INDEX
    });
};

export const patchMinimumDonationSettings = (data?: Record<any, any>) => {
    return api({
        method: "PATCH",
        data: data,
        urlKey: API_URL.SETTINGS_DONATION.INDEX
    });
};
