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

export const postMinimumDonationSettings = (data?: Record<any, any>) => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.SETTINGS_DONATION.INDEX
    });
};

export const deleteMinimumDonationSettings = (id?: string) => {
    return api({
        method: "DELETE",
        urlKey: API_URL.SETTINGS_DONATION.DETAIL.replace(":id", id || "")
    });
};

export const patchMinimumDonationSettings = (id?: string, data?: Record<any, any>) => {
    return api({
        method: "PATCH",
        data: data,
        urlKey: API_URL.SETTINGS_DONATION.DETAIL.replace(":id", id || "")
    });
};

export const patchActivateMinimumDonationSettings = (id: string) => {
    return api({
        method: "PATCH",
        urlKey: API_URL.SETTINGS_DONATION.ACTIVE.replace(":id", id)
    });
};
