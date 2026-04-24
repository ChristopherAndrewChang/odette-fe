import { useQuery } from "@tanstack/react-query"

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getDonationSettings } from "../service/get-donation-settings";
import type { TDonationSettingsPublic } from "../types/donation-setting";
import type { ResponseWrapper } from "@/types/api";

export const useDonationSettingsPublicQuery = () => {
    return useQuery<ResponseWrapper<TDonationSettingsPublic>>({
        queryKey: [QUERY_KEY.SETTINGS_DONATION.PUBLIC],
        queryFn: () => {
            return getDonationSettings();
        },
        retry: false,
        refetchOnWindowFocus: false
    });
}
