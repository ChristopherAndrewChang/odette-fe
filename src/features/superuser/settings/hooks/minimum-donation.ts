import { useMutation, useQuery } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { deleteMinimumDonationSettings, getMinimumDonationSettings, patchActivateMinimumDonationSettings, patchMinimumDonationSettings, postMinimumDonationSettings } from "../services/minimum-donation";
import type { TMinimumDonation } from "../types/minimum-donation";
import type { ResponseWrapper } from "@/types/api";

export const useMinimumDonationSettingsQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TMinimumDonation[]>>({
        queryKey: [QUERY_KEY.SETTINGS_DONATION.INDEX, params],
        queryFn: () => getMinimumDonationSettings(params),
        retry: false,
        refetchOnWindowFocus: false
    });
}

export const useMinimumDonationSettingsMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ method, id, data, isActivate }: MutateParamsType & { isActivate?: boolean }) => {
            if (isActivate) {
                return patchActivateMinimumDonationSettings(id || "");
            }

            if (method === "POST") {
                return postMinimumDonationSettings(data);
            } else if (method === "DELETE") {
                return deleteMinimumDonationSettings(id);
            } else {
                return patchMinimumDonationSettings(id, data);
            }
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
